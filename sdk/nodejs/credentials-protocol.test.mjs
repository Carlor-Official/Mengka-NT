import assert from 'node:assert/strict'
import { once } from 'node:events'
import net from 'node:net'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`${mode} credentials use the existing actions and explicit protocol selector`, { timeout: 5000 }, async () => {
    const received = []
    const respond = socket => socket.on('message', raw => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') socket.send(JSON.stringify({ type: 'auth_ok' }))
      if (message.type === 'action') {
        received.push(message)
        const key = message.action === 'get_skey' ? 'skey' : 'clientkey'
        socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: true,
          data: { [key]: `${message.params.client_type || 'android'}-synthetic` } }))
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
      assert.deepEqual(await api.get_skey(12345), { skey: 'android-synthetic' })
      assert.deepEqual(received.at(-1).params, { self_id: 12345 })
      assert.deepEqual(await api.get_skey(12345, 'linux'), { skey: 'linuxqq-synthetic' })
      assert.deepEqual(await api.get_clientkey(12345, 'android'), { clientkey: 'android-synthetic' })
      assert.deepEqual(await api.get_clientkey(12345, 'linux'), { clientkey: 'linuxqq-synthetic' })
      assert.deepEqual(received.at(-1).params, { self_id: 12345, client_type: 'linuxqq' })
      assert.deepEqual(await api.forProtocol('linux').get_skey(12345), { skey: 'linuxqq-synthetic' })
      assert.throws(() => api.get_skey(12345, 'windows'), /协议/)
      assert.ok(received.every(message => !('platform' in message.params)))
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}

test('all four SDK copies expose the same credential selectors', async () => {
  for (const path of ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8')
    for (const action of ['get_skey', 'get_clientkey']) {
      const block = source.slice(source.indexOf(`  ${action}: {`)).split('\n  },')[0]
      assert.match(block, /normalizeProtocolTarget\(protocol\)/)
      assert.match(block, /timeout: 65000/)
    }
  }
})
