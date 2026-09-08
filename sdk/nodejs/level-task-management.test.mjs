import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import net from 'node:net'
import test from 'node:test'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`${mode} level management APIs preserve explicit protocol, false, empty selections and full response`, { timeout: 5000 }, async () => {
    const received = []
    const respond = socket => socket.on('message', raw => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') socket.send(JSON.stringify({ type: 'auth_ok' }))
      if (message.type === 'action') {
        received.push(message)
        socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: true, data: { payload: { marker: 'shared cache' }, settings: { scheduleEnabled: false }, tasks: ['签到'], skippedTasks: ['unsupported'], refreshed: true } }))
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
      const target = { self_id: 123456, client_type: 'android' }
      const settings = { ...target, selected_tasks: [], schedule_enabled: false, schedule_time: '06:30' }
      await api.get_level_task_accounts()
      await api.get_level_task_account(target)
      await api.get_level_task_settings(target)
      await api.update_level_task_settings(settings)
      await api.get_level_task_panel({ ...target, refresh: false })
      const result = await api.execute_level_task_selection({ ...target, tasks: ['签到', 'unsupported'] })
      assert.equal(result.payload.marker, 'shared cache')
      assert.equal(result.refreshed, true)
      assert.deepEqual(result.skippedTasks, ['unsupported'])
      assert.deepEqual(received.map(({ action, params }) => ({ action, params })), [
        { action: 'get_level_task_accounts', params: {} },
        { action: 'get_level_task_account', params: target },
        { action: 'get_level_task_settings', params: target },
        { action: 'update_level_task_settings', params: settings },
        { action: 'get_level_task_panel', params: { ...target, refresh: false } },
        { action: 'execute_level_task_selection', params: { ...target, tasks: ['签到', 'unsupported'] } },
      ])
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}

test('all four SDK distributions share the six level management contracts', async () => {
  const files = ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']
  const contracts = await Promise.all(files.map(async file => {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    return ['get_level_task_accounts', 'get_level_task_account', 'get_level_task_settings', 'update_level_task_settings', 'get_level_task_panel', 'execute_level_task_selection'].map(action => {
      const definition = source.match(new RegExp(`^  ${action}:.*$`, 'm'))?.[0]
      assert.ok(definition, `${file} missing ${action}`)
      return definition
    })
  }))
  for (const contract of contracts) assert.deepEqual(contract, contracts[0])
})
