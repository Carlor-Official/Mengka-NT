import assert from 'node:assert/strict'
import { once } from 'node:events'
import net from 'node:net'
import test from 'node:test'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`${mode} voice upload accepts MP3/Silk paths and URLs without changing the segment`, { timeout: 10000 }, async () => {
    const requests = []
    const segment = { type: 'voice', data: { file_id: 'fixture-file-id', duration: 5 } }
    let api, server, socket
    const handle = (ws, raw) => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') ws.send(JSON.stringify({ type: 'auth_ok' }))
      if (message.type !== 'action') return
      requests.push(message)
      const ok = message.params.file_path !== 'broken.silk'
      ws.send(JSON.stringify({ type: 'action_result', id: message.id, ok, ...(ok ? { data: segment } : { error: 'SILK 解码失败' }) }))
    }
    try {
      if (mode === 'forward') {
        server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
        await once(server, 'listening')
        server.on('connection', ws => ws.on('message', raw => handle(ws, raw)))
        api = createAPI({ host: '127.0.0.1', port: server.address().port, token: 'test', name: 'voice', version: 'test', author: 'test' })
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
        socket.on('message', raw => handle(socket, raw))
        await once(socket, 'open')
        socket.send(JSON.stringify({ type: 'ready', mode: 'reverse', service: 'voice' }))
        await ready
      }
      for (const client_type of ['android', 'linuxqq']) {
        for (const file_path of ['data/media-downloads/test.mp3', 'data/media-downloads/test.silk', 'https://example.test/file.silk']) {
          assert.deepEqual(await api.forProtocol(client_type).upload_group_voice(123, 456, file_path), segment)
          assert.equal(requests.at(-1).action, 'upload_group_voice')
          assert.deepEqual(requests.at(-1).params, { self_id: 123, client_type, group_id: 456, file_path })
        }
      }
      await assert.rejects(api.upload_group_voice(123, 456, 'broken.silk'), /SILK 解码失败/)
      assert.equal(requests.length, 7)
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}
