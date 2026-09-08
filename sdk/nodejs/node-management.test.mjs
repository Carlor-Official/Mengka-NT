import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import net from 'node:net'
import test from 'node:test'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`${mode} node APIs preserve false, proxy fields and password omission`, { timeout: 5000 }, async () => {
    const received = []
    const respond = socket => socket.on('message', raw => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') socket.send(JSON.stringify({ type: 'auth_ok' }))
      if (message.type === 'action') {
        received.push(message)
        socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: true, data: { id: 2 } }))
      }
    })
    let api, socket, server
    try {
      if (mode === 'forward') {
        server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
        await once(server, 'listening')
        server.on('connection', respond)
        api = createAPI({ host: '127.0.0.1', port: server.address().port, token: 'test', name: 'nodes', version: 'dev', author: 'test' })
        await api.connect()
      } else {
        const reserve = net.createServer()
        reserve.listen(0, '127.0.0.1')
        await once(reserve, 'listening')
        const port = reserve.address().port
        await new Promise(resolve => reserve.close(resolve))
        api = createReverseAPI({ host: '127.0.0.1', port, token: 'test' })
        await api.listen()
        const ready = api.waitForConnection(2000)
        socket = new WebSocket(`ws://127.0.0.1:${port}/`, { headers: { Authorization: 'Bearer test' } })
        respond(socket)
        await once(socket, 'open')
        socket.send(JSON.stringify({ type: 'ready', mode: 'reverse', service: 'nodes' }))
        await ready
      }
      const direct = { name: '直连节点', enabled: true, proxy_enabled: false }
      const update = { id: 2, name: '直连节点', enabled: false, proxy_enabled: false, proxy_type: 'socks5', port: 1080, host: 'proxy.example.com', proxy_username: 'user' }
      await api.create_node(direct)
      await api.update_node(update)
      await api.update_node({ ...update, proxy_password: '' })
      assert.deepEqual(received.map(({ action, params }) => ({ action, params })), [
        { action: 'create_node', params: direct },
        { action: 'update_node', params: update },
        { action: 'update_node', params: { ...update, proxy_password: '' } },
      ])
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}

test('all four SDK distributions share the node action contract', async () => {
  const files = ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']
  const contracts = await Promise.all(files.map(async file => {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    return ['create_node', 'update_node'].map(action => {
      const definition = source.match(new RegExp(`^  ${action}:.*$`, 'm'))?.[0]
      assert.ok(definition, `${file} missing ${action}`)
      return definition
    })
  }))
  for (const contract of contracts) assert.deepEqual(contract, contracts[0])
})
