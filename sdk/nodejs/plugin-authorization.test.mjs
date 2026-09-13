import assert from 'node:assert/strict'
import test from 'node:test'
import { once } from 'node:events'
import { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'

test('raw packet protocol failure preserves code and never replays the write', async () => {
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 }); await once(server, 'listening')
  let writes = 0
  server.on('connection', socket => socket.on('message', raw => {
    const msg = JSON.parse(String(raw))
    if (msg.type === 'auth') socket.send(JSON.stringify({ type: 'auth_ok' }))
    if (msg.type === 'action') { writes++; socket.send(JSON.stringify({ type: 'action_result', id: msg.id, ok: false, error: 'Protocol request failed', error_code: 'MSF_SEND_FAILED' })) }
  }))
  const api = createAPI({ host: '127.0.0.1', port: server.address().port, token: 'fixture-token', name: 'ordinary-plugin', version: '1', author: 'test' })
  try {
    await api.connect()
    await assert.rejects(api.send_packet(12345, 'Test.Cmd', '00'), error => error.code === 'MSF_SEND_FAILED')
    await new Promise(resolve => setTimeout(resolve, 30))
    assert.equal(writes, 1)
  } finally { api.disconnect(); await new Promise(resolve => server.close(resolve)) }
})
