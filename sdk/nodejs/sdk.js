import WebSocket from 'ws'
import { Session, SDKError, identity, timeoutValue } from './common.js'

export function createAPI(options = {}) {
  const info = identity(options)
  if (typeof options.token !== 'string' || !options.token) throw new TypeError('token is required')
  const url = new URL(options.url || `ws://${options.host || '127.0.0.1'}:${options.port || 3001}/`)
  if (!['ws:', 'wss:'].includes(url.protocol) || url.username || url.password || url.search) throw new TypeError('Use a ws/wss URL without credentials or query token')
  const api = new Session('ws'); let ws; let connecting; let generation = 0
  api.connect = () => {
    if (api.ready) return Promise.resolve(api)
    if (connecting) return connecting
    const epoch = ++generation
    connecting = new Promise((resolve, reject) => {
      let settled = false
      const socket = new WebSocket(url, { maxPayload: 16 * 1024 * 1024 })
      ws = socket
      const current = () => generation === epoch && ws === socket
      const fail = error => { if (!settled) { settled = true; clearTimeout(timer); reject(error) }; if (current()) api.disconnect(error); socket.terminate() }
      const timer = setTimeout(() => fail(new SDKError('Authentication timed out', { code: 'TIMEOUT' })), timeoutValue(options.handshakeTimeoutMs || 10000))
      api.sender = (message, callback) => { if (!current()) throw new SDKError('Connection replaced'); socket.send(JSON.stringify(message), callback) }
      socket.on('open', () => { if (current()) socket.send(JSON.stringify({ type: 'auth', token: options.token, ...info })); else socket.terminate() })
      socket.on('message', raw => {
        if (!current()) return
        try {
          const message = JSON.parse(raw.toString())
          if (!api.ready) {
            if (message.type !== 'auth_ok') throw new SDKError(message.message || 'Authentication failed', { code: 'AUTH_FAILED' })
            settled = true; clearTimeout(timer); api.ready = true; resolve(api); api.notify('ready'); return
          }
          api.receive(message)
        } catch (error) { fail(error) }
      })
      socket.on('error', () => fail(new SDKError('WebSocket connection failed', { code: 'TRANSPORT' })))
      socket.on('close', () => { clearTimeout(timer); if (!settled) { settled = true; reject(new SDKError('Connection closed before authentication')) }; if (current()) { api.disconnect(); connecting = null; ws = null } })
    })
    return connecting
  }
  api.close = () => { generation++; api.disconnect(); ws?.terminate(); ws = null; connecting = null }
  return api
}
