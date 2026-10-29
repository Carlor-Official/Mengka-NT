import { createServer } from 'node:http'
import { timingSafeEqual } from 'node:crypto'
import { WebSocketServer } from 'ws'
import { Session, SDKError, identity, timeoutValue } from './common.js'

export function createReverseAPI(options = {}) {
  const info = identity(options)
  if (typeof options.token !== 'string' || !options.token) throw new TypeError('token is required')
  const api = new Session('ws'); let server; let wss; let peer
  const tokenOK = header => { const expected = Buffer.from(`Bearer ${options.token}`); const actual = Buffer.from(header || ''); return expected.length === actual.length && timingSafeEqual(expected, actual) }
  api.listen = () => new Promise((resolve, reject) => {
    if (server) { reject(new Error('Already listening')); return }
    server = createServer((_req, res) => { res.writeHead(404); res.end() })
    wss = new WebSocketServer({ noServer: true, maxPayload: 16 * 1024 * 1024 })
    server.on('upgrade', (req, socket, head) => {
      if (req.url !== (options.path || '/') || !tokenOK(req.headers.authorization) || peer) { socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n'); return }
      wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws))
    })
    wss.on('connection', ws => {
      peer = ws; let identified = false
      const timer = setTimeout(() => ws.terminate(), timeoutValue(options.handshakeTimeoutMs || 10000))
      api.sender = (message, callback) => ws.send(JSON.stringify(message), callback)
      ws.on('message', raw => {
        try {
          const message = JSON.parse(raw.toString())
          if (message.type === 'ready' && !identified) { identified = true; ws.send(JSON.stringify({ type: 'plugin_info', ...info })); return }
          if (message.type === 'plugin_info_ok' && identified && !api.ready) { clearTimeout(timer); api.ready = true; api.notify('ready'); return }
          if (api.ready) api.receive(message)
        } catch { ws.terminate() }
      })
      ws.on('error', () => ws.terminate())
      ws.on('close', () => { clearTimeout(timer); if (peer === ws) { peer = null; api.disconnect() } })
    })
    server.once('error', reject)
    server.listen(options.port ?? 3002, options.host || '127.0.0.1', () => resolve(api))
  })
  api.address = () => server?.address()
  api.close = () => new Promise(resolve => { api.disconnect(); peer?.terminate(); wss?.close(); if (server) server.close(() => { server = null; resolve() }); else resolve() })
  return api
}
