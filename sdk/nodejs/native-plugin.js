import { createInterface } from 'node:readline'
import { loadManagedStorage } from './managed-connection.js'

const API_VERSION = '1'
const VALID_NAME = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/

function loggerLine(level, values) {
  const text = values.map(value => value instanceof Error ? (value.stack || value.message) : typeof value === 'string' ? value : JSON.stringify(value)).join(' ')
  process.stderr.write(`[${new Date().toISOString()}] [${level}] ${text}\n`)
}

/**
 * Native IPC plugin runtime. stdout is reserved for the framework protocol;
 * use ctx.logger (stderr) for every diagnostic message.
 */
export function createNativePlugin(options = {}) {
  const pluginId = String(options.pluginId || '').toLowerCase()
  const version = String(options.version || '')
  if (!VALID_NAME.test(pluginId)) throw new Error('pluginId is invalid')
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error('version must use x.y.z')
  const actions = new Set((options.actions || []).map(value => String(value).toLowerCase()))
  const events = new Set(options.events || [])
  const input = options.input || process.stdin
  const output = options.output || process.stdout
  const pending = new Map()
  const eventListeners = new Map()
  const lifecycleListeners = new Map()
  const configListeners = new Set()
  let sequence = 0
  let ready = false
  let active = false
  let closed = false
  let lineReader
  let readyResolve
  let readyReject
  let configRevision = 0
  let configSnapshot = Object.freeze({})

  function immutableConfig(value) {
    const clone = JSON.parse(JSON.stringify(value && typeof value === 'object' ? value : {}))
    const freeze = item => {
      if (!item || typeof item !== 'object' || Object.isFrozen(item)) return item
      for (const nested of Object.values(item)) freeze(nested)
      return Object.freeze(item)
    }
    return freeze(clone)
  }

  const log = Object.freeze({
    debug: (...values) => loggerLine('DEBUG', values),
    info: (...values) => loggerLine('INFO', values),
    warn: (...values) => loggerLine('WARN', values),
    error: (...values) => loggerLine('ERROR', values),
  })

  function write(message) {
    if (closed) throw new Error('native plugin transport is closed')
    output.write(`${JSON.stringify(message)}\n`)
  }

  function addListener(registry, name, handler) {
    if (typeof handler !== 'function') throw new TypeError('listener must be a function')
    const key = String(name)
    const set = registry.get(key) || new Set()
    set.add(handler)
    registry.set(key, set)
    return () => {
      set.delete(handler)
      if (!set.size) registry.delete(key)
    }
  }

  async function emit(registry, names, value) {
    const invoked = new Set()
    for (const name of names) {
      for (const handler of registry.get(name) || []) {
        if (invoked.has(handler)) continue
        invoked.add(handler)
        try { await handler(value) } catch (error) { log.error(`handler failed (${name})`, error) }
      }
    }
  }

  function call(action, params = {}, options = {}) {
    action = String(action || '').toLowerCase()
    if (!actions.has(action)) return Promise.reject(new Error(`action is not declared in the plugin manifest: ${action}`))
    if (!ready) return Promise.reject(new Error('framework native IPC is not ready'))
    const id = `native_${Date.now().toString(36)}_${(++sequence).toString(36)}`
    const timeoutMs = Math.max(1000, Math.min(Number(options.timeoutMs) || 30000, 300000))
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new Error(`action ${action} timed out (${timeoutMs}ms)`))
      }, timeoutMs)
      pending.set(id, { resolve, reject, timer, stream: options.onStream })
      try { write({ type: 'action', id, action, params }) } catch (error) {
        clearTimeout(timer)
        pending.delete(id)
        reject(error)
      }
    })
  }

  async function receive(line) {
    let message
    try { message = JSON.parse(line) } catch { throw new Error('framework sent invalid native IPC JSON') }
    if (message.type === 'ready') {
      if (message.transport !== 'native-ipc-v1' || message.api_version !== API_VERSION) throw new Error('framework native IPC version mismatch')
      configRevision = Number(message.config_revision) || 0
      configSnapshot = immutableConfig(message.config)
      ready = true
      readyResolve?.(ctx)
      return
    }
    if (message.type === 'action_stream') {
      const waiter = pending.get(message.id)
      if (waiter?.stream) await waiter.stream(message.data)
      return
    }
    if (message.type === 'action_result') {
      const waiter = pending.get(message.id)
      if (!waiter) return
      clearTimeout(waiter.timer)
      pending.delete(message.id)
      if (message.ok) waiter.resolve(message.data)
      else waiter.reject(new Error(message.error || 'action failed'))
      return
    }
    if (message.type === 'event') {
      const event = message.data || {}
      await emit(eventListeners, ['*', event.event_type, event.category, event.post_type].filter(Boolean), event)
      return
    }
    if (message.type === 'lifecycle') {
      active = message.event === 'activate' ? true : message.event === 'stop' ? false : active
      await emit(lifecycleListeners, ['*', message.event].filter(Boolean), message.data)
      return
    }
    if (message.type === 'config') {
      const revision = Number(message.revision)
      if (!Number.isSafeInteger(revision) || revision <= configRevision || !message.data || typeof message.data !== 'object' || Array.isArray(message.data)) return
      configRevision = revision
      configSnapshot = immutableConfig(message.data)
      for (const handler of [...configListeners]) {
        try { await handler(configSnapshot, configRevision) } catch (error) { log.error('config handler failed', error) }
      }
    }
  }

  function close(error = new Error('native plugin transport closed')) {
    if (closed) return
    closed = true
    active = false
    readyReject?.(error)
    for (const waiter of pending.values()) {
      clearTimeout(waiter.timer)
      waiter.reject(error)
    }
    pending.clear()
    lineReader?.close()
  }

  let storage
  try { storage = loadManagedStorage(options.connectionFile) } catch (error) {
    if (!options.allowMissingManagedStorage) throw error
    storage = { dataDirectory: '', allowedDirectories: [] }
  }
  const ctx = Object.freeze({
    pluginId,
    version,
    dataPath: storage.dataDirectory,
    allowedDirectories: Object.freeze([...storage.allowedDirectories]),
    logger: log,
    actions: Object.freeze({ call }),
    events: Object.freeze({ on: (name, handler) => addListener(eventListeners, name, handler) }),
    lifecycle: Object.freeze({ on: (name, handler) => addListener(lifecycleListeners, name, handler) }),
    config: Object.freeze({
      get: () => configSnapshot,
      onChange(handler) {
        if (typeof handler !== 'function') throw new TypeError('config handler must be a function')
        configListeners.add(handler)
        return () => configListeners.delete(handler)
      },
      get revision() { return configRevision },
    }),
    get ready() { return ready },
    get active() { return active },
  })

  return {
    ctx,
    async start() {
      if (lineReader) throw new Error('native plugin already started')
      const started = new Promise((resolve, reject) => { readyResolve = resolve; readyReject = reject })
      lineReader = createInterface({ input, crlfDelay: Infinity })
      lineReader.on('line', line => { void receive(line).catch(error => close(error)) })
      lineReader.on('close', () => close())
      write({ type: 'hello', api_version: API_VERSION, plugin_id: pluginId, version })
      return started
    },
    close,
  }
}

export const nativePluginAPIVersion = API_VERSION
