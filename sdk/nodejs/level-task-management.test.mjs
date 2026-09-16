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
    const arenaTask = { center_task_id: 80, title: '创建小游戏擂台并取得成绩', available: true,
      executable: true, can_execute: true, status_text: '待完成',
      execution_message: '微信未授权登录', is_done: false, speed_days: 0, finished_accelerate_days: 0 }
    const panelPayload = { marker: 'shared cache', extra_info: { extra_task_list: [arenaTask] } }
    const respond = socket => socket.on('message', raw => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') socket.send(JSON.stringify({ type: 'auth_ok' }))
      if (message.type === 'action') {
        received.push(message)
        if (message.action === 'execute_level_tasks') {
          socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: false, error: '微信未授权登录' }))
          return
        }
        const data = message.action === 'get_level_tasks' ? panelPayload : { payload: panelPayload, settings: { scheduleEnabled: false }, tasks: ['签到'], skippedTasks: ['unsupported'], refreshed: true }
        socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: true, data }))
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
      const result = await api.execute_level_task_selection({ ...target, tasks: ['电脑QQ在线', '来元宝P图一次', 'QQ会员公众号签到', 'unsupported'] })
      await api.execute_level_task_selection({ ...target, tasks: ['来元宝P图一次'], yuanbao_verification_completed: true })
      await api.set_friend_remark({ ...target, user_id: 654321, remark: ' 中文备注 ' })
      await api.set_friend_remark({ ...target, user_id: 654321, remark: '' })
      assert.equal(result.payload.marker, 'shared cache')
      assert.equal(result.refreshed, true)
      assert.deepEqual(result.skippedTasks, ['unsupported'])
      assert.deepEqual(received.map(({ action, params }) => ({ action, params })), [
        { action: 'get_level_task_accounts', params: {} },
        { action: 'get_level_task_account', params: target },
        { action: 'get_level_task_settings', params: target },
        { action: 'update_level_task_settings', params: settings },
        { action: 'get_level_task_panel', params: { ...target, refresh: false } },
        { action: 'execute_level_task_selection', params: { ...target, tasks: ['电脑QQ在线', '来元宝P图一次', 'QQ会员公众号签到', 'unsupported'] } },
        { action: 'execute_level_task_selection', params: { ...target, tasks: ['来元宝P图一次'], yuanbao_verification_completed: true } },
        { action: 'set_friend_remark', params: { ...target, user_id: 654321, remark: ' 中文备注 ' } },
        { action: 'set_friend_remark', params: { ...target, user_id: 654321, remark: '' } },
      ])
      const scoped = api.forProtocol('android')
      const rawPanel = await scoped.get_level_tasks(target.self_id)
      const cached = await api.get_level_task_panel({ ...target, refresh: false })
      const fresh = await api.get_level_task_panel({ ...target, refresh: true })
      for (const payload of [rawPanel, cached.payload, fresh.payload]) {
        assert.deepEqual(payload.extra_info.extra_task_list, [arenaTask], 'pending failure must preserve capability and original QQ values')
      }
      await assert.rejects(scoped.execute_level_tasks(target.self_id, [arenaTask.title]), error => String(error).includes('微信未授权登录'))
      await new Promise(resolve => setTimeout(resolve, 20))
      const attempts = received.filter(message => message.action === 'execute_level_tasks')
      assert.equal(attempts.length, 1, 'fixed failure must not trigger an SDK retry')
      assert.deepEqual(attempts[0].params, { self_id: target.self_id, client_type: 'android', tasks: [arenaTask.title] })
      assert.deepEqual(received.at(-4).params, { self_id: target.self_id, client_type: 'android' })
      Object.assign(arenaTask, { can_execute: true, status_text: '待完成', execution_message: '擂台创建结果未确认' })
      const recoveryRaw = await scoped.get_level_tasks(target.self_id)
      const recoveryPanel = await api.get_level_task_panel({ ...target, refresh: false })
      for (const payload of [recoveryRaw, recoveryPanel.payload]) {
        assert.deepEqual(payload.extra_info.extra_task_list, [arenaTask], 'SDK must preserve pending status and the latest failure reason')
      }
      assert.equal(received.filter(message => message.action === 'execute_level_tasks').length, 1, 'recovery display must not execute automatically')
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

test('Yuanbao photo task remains a title-only level API contract', async () => {
  const docs = await readFile(new URL('../../docs/api/execute_level_tasks.md', import.meta.url), 'utf8')
  const managementDocs = await readFile(new URL('../../docs/api/execute_level_task_selection.md', import.meta.url), 'utf8')
  assert.match(docs, /来元宝P图一次/)
  assert.match(docs, /center_task_id=83/)
  assert.match(docs, /不写入配置或数据库/)
  assert.match(docs, /不会自动注册|不代替用户注册/)
  assert.match(managementDocs, /yuanbao_verification_completed/)
  assert.match(managementDocs, /不会重复登录元宝或生成新入口/)
  for (const file of ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.match(source, /execute_level_tasks:\s*\{\s*wait: true,\s*timeout: 5 \* 60 \* 1000,\s*build: \(self_id, tasks\) => \(\{ self_id, tasks \}\)/)
  }
})

test('arena extension keeps positional raw parameters and five minute SDK limits in every distribution', async () => {
  const files = ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']
  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.match(source, /get_level_tasks:\s*\{\s*wait: true,\s*build: \(self_id\) => \(\{ self_id \}\)/)
    assert.match(source, /execute_level_tasks:\s*\{\s*wait: true,\s*timeout: 5 \* 60 \* 1000,\s*build: \(self_id, tasks\) => \(\{ self_id, tasks \}\)/)
    assert.match(source, /execute_level_task_selection: \{ wait: true, timeout: 5 \* 60 \* 1000,/)
    assert.match(source, /Go直接协议上报1–99随机整数分数/)
    assert.doesNotMatch(source, /task80附加安装能力/)
  }
  const docs = await readFile(new URL('../../docs/arena-level-task.md', import.meta.url), 'utf8')
  for (const field of ['available', 'executable', 'can_execute', 'status_text', 'execution_message']) assert.ok(docs.includes('`' + field + '`'), field)
  assert.match(docs, /服务器本地日期/)
  assert.match(docs, /取消每日尝试次数限制/)
  assert.match(docs, /不再返回 `attempted_today`/)
  assert.match(docs, /只有原登录响应确证 `authorization_required` 才显示“微信未授权登录”/)
  assert.match(docs, /4 分 45 秒/)
  assert.match(docs, /不再使用独立 worker 的 4 分 15 秒预算/)
  assert.match(docs, /1–99 随机整数/)
  assert.match(docs, /每次在 1–99 中随机选择一个整数分数/)
  assert.doesNotMatch(docs, /固定上报 11 分/)
  assert.match(docs, /不运行游戏/)
  assert.match(docs, /0x916e → 0x9172/)
  assert.match(docs, /Linux amd64 测试站通过一次标准 API 的 Go 直接模式验收/)
  assert.match(docs, /Windows 与 Linux arm64 的完整任务未实测/)
  assert.match(docs, /尚未部署/)
  const upgrade = await readFile(new URL('../../docs/arena-direct-score-upgrade.md', import.meta.url), 'utf8')
  assert.match(upgrade, /保留现有数据库与每日 journal/)
  assert.match(upgrade, /无需为此任务安装 Python、Node、Chrome/)
  assert.match(upgrade, /既有已启用计划可能按原调度器执行/)
  assert.match(upgrade, /不增加公开 `score`、`game`、`time` 参数/)
})
