import { readFileSync } from 'node:fs'
import { isAbsolute } from 'node:path'
import { Session, SDKError, API_ACTIONS, timeoutValue } from './common.js'

export function createNativePlugin(options = {}) {
  const { pluginId, version } = options
  if (typeof pluginId !== 'string' || !/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(pluginId)) throw new TypeError('pluginId is required')
  if (typeof version !== 'string' || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) throw new TypeError('version is required')
  const declared = new Set(options.actions || [])
  if ([...declared].some(action => !API_ACTIONS.includes(action))) throw new TypeError('Manifest contains an unknown action')
  const connectionPath = options.connectionFile || process.env.MENGKA_PLUGIN_CONNECTION_FILE
  let connection = null
  if (connectionPath) {
    connection = JSON.parse(readFileSync(connectionPath, 'utf8'))
    if (connection.schema !== 1 || connection.transport !== 'native-ipc-v1' || connection.framework_api !== '3.0.0' || !isAbsolute(connection.data_directory || '')) throw new Error('Unsupported managed connection file')
  }
  const input = options.input || process.stdin, output = options.output || process.stdout
  const dataPath = connection?.data_directory || process.env.MENGKA_PLUGIN_DATA_DIR || ''
  if (dataPath && !isAbsolute(dataPath)) throw new Error('Plugin data directory must be absolute')
  const api = new Session('ipc'), originalCall = api.call.bind(api)
  // All generated methods delegate here, so manifest enforcement also covers helpers.
  api.call = (action, params = {}, callOptions = {}) => declared.has(action) ? originalCall(action, params, callOptions) : Promise.reject(new SDKError(`Action is not declared: ${action}`))
  api.sender = (message, callback) => output.write(`${JSON.stringify(message)}\n`, callback)
  let started = false, closed = false, buffer = Buffer.alloc(0), rejectStart, timer
  const onClose = () => { if (closed) return; closed = true; clearTimeout(timer); api.disconnect(); rejectStart?.(new SDKError('IPC closed before ready')); input.off('data', onData); input.off('end', onClose); input.off('error', onClose); output.off('error', onClose); input.pause?.(); if (!options.input) { input.unref?.(); input.destroy() } }
  let accept
  const onData = chunk => {
    if (closed) return
    try {
      buffer = Buffer.concat([buffer, Buffer.from(chunk)])
      let at
      while ((at = buffer.indexOf(10)) >= 0) {
        if (closed) return
        if (at > 16 * 1024 * 1024) throw new Error('IPC frame too large')
        const message = JSON.parse(buffer.subarray(0, at).toString('utf8')); buffer = buffer.subarray(at + 1)
        if (!api.ready) {
          if (message.type !== 'ready' || message.transport !== 'native-ipc-v1' || message.api_version !== '1' || message.framework_api !== '3.0.0' || message.plugin_id !== pluginId || !Number.isSafeInteger(message.node_id) || message.node_id < 0 || (connection && message.node_id !== connection.node_id)) throw new Error('IPC ready identity mismatch')
          clearTimeout(timer); api.ready = true; ctx.nodeId = message.node_id; rejectStart = null; accept(ctx); api.notify('ready')
        } else api.receive(message)
      }
      if (buffer.length > 16 * 1024 * 1024) throw new Error('IPC frame too large')
    } catch (error) { rejectStart?.(error); onClose() }
  }
  const ctx = { api, call: (...args) => api.call(...args), on: (name, handler) => { api.on(name, handler); return () => api.off(name, handler) }, dataPath, nodeId: connection?.node_id, instanceId: connection?.instance_id,
    logger: Object.fromEntries(['debug', 'info', 'warn', 'error'].map(level => [level, (...values) => process.stderr.write(`[${level}] ${values.map(String).join(' ')}\n`)])),
    start() {
      if (started || closed) return Promise.reject(new Error('IPC already started or closed'))
      started = true
      return new Promise((resolve, reject) => {
        accept = resolve; rejectStart = reject
        timer = setTimeout(() => { reject(new SDKError('IPC handshake timed out')); onClose() }, timeoutValue(options.handshakeTimeoutMs || 10000))
        input.on('data', onData); input.on('end', onClose); input.on('error', onClose); output.on('error', onClose); input.resume?.()
        output.write(`${JSON.stringify({ type: 'hello', api_version: '1', framework_api: '3.0.0', plugin_id: pluginId, version })}\n`, error => { if (error) onClose() })
      })
    }, close: onClose }
  return ctx
}
