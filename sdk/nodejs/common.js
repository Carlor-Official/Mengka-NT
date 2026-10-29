import { randomUUID } from 'node:crypto'
import { EventEmitter } from 'node:events'
import { API_CONTRACTS } from './contracts.js'

export const API_ACTIONS = Object.freeze(Object.keys(API_CONTRACTS))
export const EVENT_PERMISSIONS = Object.freeze(['group_message', 'friend_message', 'group_event', 'friend_event', 'bot_online', 'bot_offline', 'system_event'])
export class SDKError extends Error {
  constructor(message, details = {}) { super(message); this.name = 'SDKError'; Object.assign(this, details) }
}
export function permissions(value = {}) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError('permissions must be an object')
  for (const key of Object.keys(value)) if (!EVENT_PERMISSIONS.includes(key) || typeof value[key] !== 'boolean') throw new TypeError(`Invalid event permission: ${key}`)
  return { ...value }
}
export function identity(options) {
  for (const key of ['name', 'version', 'author']) if (typeof options[key] !== 'string' || !options[key].trim()) throw new TypeError(`${key} is required`)
  return { name: options.name, version: options.version, author: options.author, permissions: permissions(options.permissions) }
}
export function validate(action, params, transport) {
  if (!Object.hasOwn(API_CONTRACTS, action)) throw new TypeError(`Unknown action: ${action}`)
  const contract = API_CONTRACTS[action]
  const removed = () => new SDKError('该 API 已移除，暂不支持调用', { code: 'API_REMOVED', status: 'removed', action, uncertain: false })
  if (contract.removed) throw removed()
  if (!params || typeof params !== 'object' || Array.isArray(params)) throw new TypeError('API params must be an object; positional arguments are not supported')
  const value = JSON.parse(JSON.stringify(params))
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError('API params must serialize to an object')
  if (contract.allowedOperations && !contract.allowedOperations.includes(value.operation)) throw removed()
  if (Object.hasOwn(value, 'client_type')) throw new TypeError('client_type is no longer supported; use protocol_id')
  if (API_CONTRACTS[action].transport === 'ipc' && transport !== 'ipc') throw new TypeError(`${action} is only available to managed IPC plugins`)
  for (const key of ['self_id', 'protocol_id', 'node_id']) if (Object.hasOwn(value, key) && (!Number.isSafeInteger(value[key]) || value[key] < 0)) throw new TypeError(`${key} must be a non-negative safe integer`)
  return value
}
export function actionMethods(target, call) {
  for (const action of API_ACTIONS) Object.defineProperty(target, action, { value: (params = {}, options = {}) => call(action, params, options), enumerable: true })
  return target
}
export function timeoutValue(value = 30000) {
  if (!Number.isSafeInteger(value) || value <= 0 || value > 2147483647) throw new TypeError('timeoutMs must be a positive integer')
  return value
}
export function result(message) {
  if (message.ok === true) return message.data
  throw new SDKError(message.error || 'Action failed', { response: message, code: message.code, status: message.status, requiredLevel: message.requiredLevel, currentLevel: message.currentLevel, errCode: message.errCode })
}
export class Session extends EventEmitter {
  constructor(transport) { super(); this.transport = transport; this.ready = false; this.pending = new Map(); this.sender = null; actionMethods(this, (...args) => this.call(...args)) }
  notify(name, value) {
    for (const listener of this.rawListeners(name)) {
      try { Promise.resolve(listener.call(this, value)).catch(() => {}) } catch { /* User handlers do not own the transport lifetime. */ }
    }
  }
  call(action, params = {}, options = {}) {
    let value, timeoutMs
    try { value = validate(action, params, this.transport); timeoutMs = timeoutValue(options.timeoutMs); if (!this.ready) throw new SDKError('Connection is not ready'); if (options.signal?.aborted) throw new SDKError('Request aborted', { code: 'ABORTED', uncertain: false }) } catch (e) { return Promise.reject(e) }
    const id = randomUUID()
    return new Promise((resolve, reject) => {
      const finish = (error, data) => { const p = this.pending.get(id); if (!p) return; clearTimeout(p.timer); options.signal?.removeEventListener('abort', p.abort); this.pending.delete(id); error ? reject(error) : resolve(data) }
      const abort = () => finish(new SDKError('Stopped waiting; request may have executed', { code: 'ABORTED', uncertain: true }))
      const timer = setTimeout(() => finish(new SDKError('Action timed out; check actual state before retrying', { code: 'TIMEOUT', uncertain: true })), timeoutMs)
      this.pending.set(id, { finish, timer, abort }); options.signal?.addEventListener('abort', abort, { once: true })
      try { this.sender({ type: 'action', id, action, params: value }, error => { if (error) finish(new SDKError('Transport write failed; request may have executed', { code: 'TRANSPORT', uncertain: true })) }) } catch { finish(new SDKError('Transport write failed; request may have executed', { code: 'TRANSPORT', uncertain: true })) }
    })
  }
  receive(message) {
    if (!message || typeof message !== 'object') throw new SDKError('Invalid response envelope')
    if (message.type === 'action_result') {
      const p = this.pending.get(message.id); if (!p) return
      try { p.finish(null, result(message)) } catch (error) { p.finish(error) }
    } else if (message.type === 'event' && message.data && typeof message.data === 'object') {
      this.notify('event', message.data)
      if (typeof message.data.post_type === 'string' && message.data.post_type !== 'event') this.notify(message.data.post_type, message.data)
    }
  }
  disconnect(error = new SDKError('Connection closed; pending requests were not replayed', { code: 'DISCONNECTED', uncertain: true })) {
    this.ready = false
    for (const p of [...this.pending.values()]) p.finish(error)
    this.notify('disconnected', error)
  }
}
