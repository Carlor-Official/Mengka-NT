import assert from 'node:assert/strict'
import { once } from 'node:events'
import net from 'node:net'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`${mode} status preserves both Unix timestamps for Android and Linux`, { timeout: 5000 }, async () => {
    const received = []
    const respond = socket => socket.on('message', raw => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') socket.send(JSON.stringify({ type: 'auth_ok' }))
      if (message.type === 'action') {
        received.push(message)
        assert.equal(message.action, 'get_status')
        socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: true,
          data: { online: true, good: true, client_type: message.params.client_type,
            stat: { packet_received: 12, packet_sent: 4, login_time: 1700000000, online_time: 1700003600 } } }))
      }
    })
    let api, socket, server
    try {
      if (mode === 'forward') {
        server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
        await once(server, 'listening')
        server.on('connection', respond)
        api = createAPI({ host: '127.0.0.1', port: server.address().port, token: 'test', name: 'credentials', version: 'dev', author: 'test' })
        await api.connect()
      } else {
        const reserve = net.createServer().listen(0, '127.0.0.1')
        await once(reserve, 'listening')
        const port = reserve.address().port
        await new Promise(resolve => reserve.close(resolve))
        api = createReverseAPI({ host: '127.0.0.1', port, token: 'test' })
        await api.listen()
        const ready = api.waitForConnection(2000)
        socket = new WebSocket(`ws://127.0.0.1:${port}/`, { headers: { Authorization: 'Bearer test' } })
        respond(socket)
        await once(socket, 'open')
        socket.send(JSON.stringify({ type: 'ready', mode: 'reverse', service: 'credentials' }))
        await ready
      }
      for (const protocol of ['android', 'linux']) {
        const result = await api.forProtocol(protocol).get_status(12345)
        assert.equal(result.stat.login_time, 1700000000)
        assert.equal(result.stat.online_time, 1700003600)
        assert.deepEqual(received.at(-1).params, { self_id: 12345, client_type: protocol === 'linux' ? 'linuxqq' : 'android' })
      }
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}


test('status time contract is documented in both reference copies and all SDK distributions', async () => {
  const [doc, copy] = await Promise.all(['../../docs/api/get_status.md', './docs/api/get_status.md'].map(path => readFile(new URL(path, import.meta.url), 'utf8')))
  assert.equal(doc, copy)
  for (const field of ['stat.login_time', 'stat.online_time', '秒级 Unix 时间戳', '不是在线时长', '`0`']) assert.ok(doc.includes(field), field)
  for (const path of ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8')
    assert.match(source, /Returns stat\.login_time and stat\.online_time as Unix seconds/)
  }
})
