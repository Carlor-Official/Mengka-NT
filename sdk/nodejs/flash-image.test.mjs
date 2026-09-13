import assert from 'node:assert/strict'
import { once } from 'node:events'
import net from 'node:net'
import test from 'node:test'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`${mode} flash image request preserves message identity and upstream errors without replay`, { timeout: 10000 }, async () => {
    const requests = []
    let api, server, socket
    const handle = (ws, raw) => {
      const msg = JSON.parse(String(raw))
      if (msg.type === 'auth') ws.send(JSON.stringify({ type: 'auth_ok' }))
      if (msg.type !== 'action') return
      requests.push(msg)
      const ok = msg.params.message_id !== 999
      ws.send(JSON.stringify({ type: 'action_result', id: msg.id, ok, ...(ok ? { data: { message_id: msg.params.message_id, index: msg.params.index, url: 'https://gchat.qpic.cn/fixture' } } : { error: 'flash_image_url_unavailable' }) }))
    }
    try {
      if (mode === 'forward') {
        server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
        await once(server, 'listening')
        server.on('connection', ws => ws.on('message', raw => handle(ws, raw)))
        api = createAPI({ host: '127.0.0.1', port: server.address().port, token: 'test-token', name: 'test', version: '1', author: 'test' })
        await api.connect()
      } else {
        const reserve = net.createServer()
        reserve.listen(0, '127.0.0.1'); await once(reserve, 'listening')
        const port = reserve.address().port; await new Promise(resolve => reserve.close(resolve))
        api = createReverseAPI({ host: '127.0.0.1', port, token: 'test-token' })
        await api.listen()
        const ready = api.waitForConnection(2000)
        socket = new WebSocket(`ws://127.0.0.1:${port}/`, { headers: { Authorization: 'Bearer test-token' } })
        socket.on('message', raw => handle(socket, raw))
        await once(socket, 'open')
        socket.send(JSON.stringify({ type: 'ready', mode: 'reverse', service: 'test' })); await ready
      }
      const scoped = api.forProtocol('linuxqq')
      assert.equal(requests.length, 0, 'creating a protocol scope must not fetch a flash image')
      assert.equal((await api.get_flash_image(123, 456)).message_id, 456)
      assert.equal((await scoped.get_flash_image(123, 789, 1)).index, 1)
      await assert.rejects(api.get_flash_image(123, 999), /flash_image_url_unavailable/)
      await new Promise(resolve => setTimeout(resolve, 25))
      assert.equal(requests.length, 3)
      assert.deepEqual(requests[0].params, { self_id: 123, client_type: 'android', message_id: 456, index: 0 })
      assert.equal(requests[1].params.client_type, 'linuxqq')
      for (const request of requests) assert.equal(request.action, 'get_flash_image')
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}
