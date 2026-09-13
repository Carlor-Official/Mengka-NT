import assert from 'node:assert/strict'
import { once } from 'node:events'
import net from 'node:net'
import test from 'node:test'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`${mode} public send_packet preserves parameters, responses and one-shot failures`, { timeout: 10000 }, async () => {
    const received = []
    let api, server, socket
    const handle = (ws, raw) => {
      const msg = JSON.parse(String(raw))
      if (msg.type === 'auth') ws.send(JSON.stringify({ type: 'auth_ok' }))
      if (msg.type !== 'action') return
      received.push(msg)
      const ok = msg.params.cmd !== 'Test.Failure'
      ws.send(JSON.stringify({ type: 'action_result', id: msg.id, ok, ...(ok ? { data: msg.params.rsp ? 'deadbeef' : null } : { error: 'protocol failed', error_code: 'MSF_ERROR' }) }))
    }
    try {
      if (mode === 'forward') {
        server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
        await once(server, 'listening')
        server.on('connection', ws => ws.on('message', raw => handle(ws, raw)))
        api = createAPI({ host: '127.0.0.1', port: server.address().port, token: 'ordinary-token', name: 'ordinary', version: '1', author: 'test' })
        await api.connect()
      } else {
        const reserve = net.createServer()
        reserve.listen(0, '127.0.0.1'); await once(reserve, 'listening')
        const port = reserve.address().port; await new Promise(resolve => reserve.close(resolve))
        api = createReverseAPI({ host: '127.0.0.1', port, token: 'ordinary-token' })
        await api.listen()
        const ready = api.waitForConnection(2000)
        socket = new WebSocket(`ws://127.0.0.1:${port}/`, { headers: { Authorization: 'Bearer ordinary-token' } })
        socket.on('message', raw => handle(socket, raw))
        await once(socket, 'open')
        socket.send(JSON.stringify({ type: 'ready', mode: 'reverse', service: 'test' }))
        await ready
      }
      assert.equal(await api.send_packet(12345, 'Test.Public', '00', true, 'aabb'), 'deadbeef')
      assert.equal(await api.forProtocol('linuxqq').send_packet(12345, 'Test.Public', '00', false), null)
      await assert.rejects(api.send_packet(12345, 'Test.Failure', '00'), err => err.code === 'MSF_ERROR')
      await new Promise(resolve => setTimeout(resolve, 25))
      assert.equal(received.length, 3, 'side-effecting calls must not be replayed')
      assert.deepEqual(received[0].params, { self_id: 12345, cmd: 'Test.Public', data: '00', rsp: true, reserve: 'aabb' })
      assert.equal(received[1].params.client_type, 'linuxqq')
      for (const msg of received) {
        assert.equal(msg.action, 'send_packet')
        assert.equal('access_key' in msg || 'access_key' in msg.params, false)
      }
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}
