import test from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { PassThrough } from 'node:stream'
import { createServer } from 'node:http'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI, createReverseAPI, createHTTPAPI, createNativePlugin, API_ACTIONS } from '../index.js'
import { Session } from '../common.js'
import { API_CONTRACTS } from '../contracts.js'

const identity = { name: 'sdk-test', version: '1.0.0', author: 'test', token: 'test-token', permissions: { system_event: true, bot_online: true } }
test('send_packet contract requires command and hex payload while preserving real response shapes', async () => {
  const contract = API_CONTRACTS.send_packet
  for (const name of ['self_id', 'protocol_id', 'cmd', 'data']) assert.equal(contract.params.find(param => param.name === name)?.required, true)
  assert.equal(contract.params.find(param => param.name === 'rsp')?.required, false)
  const api = new Session('ws'); api.ready = true
  api.sender = request => api.receive({ type: 'action_result', id: request.id, ok: true, data: request.params.rsp === false ? { submitted: true } : '0801' })
  const request = { self_id: 10001, protocol_id: 0, cmd: 'Example.Service.Command', data: '0801' }
  assert.equal(await api.send_packet(request), '0801')
  assert.deepEqual(await api.call('send_packet', { ...request, rsp: false }), { submitted: true })
  // Runtime authority is still the framework, never a local SDK tier guess.
  api.sender = request => api.receive({ type: 'action_result', id: request.id, ok: false, status: 'restricted', code: 'TIER_CAPABILITY_FORBIDDEN', error: '当前 Free 权益不支持此功能' })
  await assert.rejects(api.send_packet(request), error => error.code === 'TIER_CAPABILITY_FORBIDDEN' && error.response.status === 'restricted')
})
test('all current actions have object helpers, zero IDs preserved and legacy selectors rejected', async () => {
  assert.equal(API_ACTIONS.length, 278)
  const api = new Session('ws'); api.ready = true
  api.sender = message => { assert.equal(message.params.protocol_id, 0); api.receive({ type: 'action_result', id: message.id, ok: true, data: message.params }) }
  for (const action of API_ACTIONS) assert.equal(typeof api[action], 'function')
  assert.deepEqual(await api.get_bot_info({ self_id: 10001, protocol_id: 0 }), { self_id: 10001, protocol_id: 0 })
  await assert.rejects(api.get_bot_info({ self_id: 10001, client_type: 'android' }), /client_type/)
  for (const selector of ['node_id', 'nodeId', 'node']) await assert.rejects(api.get_bot_info({ self_id: 10001, protocol_id: 0, [selector]: 1 }), /Node selectors/)
  for (const selector of ['proxy', 'proxyEnabled', 'proxy_enabled', 'proxyType', 'proxy_type', 'proxy_url', 'proxyUrl', 'proxyHost', 'proxyPort', 'proxyUsername', 'proxyPassword', 'proxy_host', 'proxy_port', 'proxy_username', 'proxy_password']) await assert.rejects(api.get_bot_info({ self_id: 10001, protocol_id: 0, [selector]: '' }), /Proxy routing/)
  assert.equal(API_ACTIONS.includes('get_node_list'), false)
  assert.equal(api.get_node_list, undefined)
  await assert.rejects(api.call('get_node_list', {}), /Unknown action/)
  await assert.rejects(api.get_bot_info(10001), /object/)
  await assert.rejects(api.get_bot_info({ protocol_id: 9007199254740992 }), /safe integer/)
  await assert.rejects(api.set_account_delegation({}), /managed IPC/)
})
test('NT continuation and group reaction preserve zero, false and null without implicit retries', async () => {
  const api = new Session('ws'); api.ready = true
  const calls = []
  api.sender = request => {
    calls.push(request)
    api.receive({ type: 'action_result', id: request.id, ok: true, data: request.action === 'ntlogin_retry_security_verify' ? { code: 1, message: '继续验证', next: 'security' } : { success: true } })
  }
  const result = await api.ntlogin_retry_security_verify({ self_id: 10001, protocol_id: 0 })
  assert.equal(result.next, 'security')
  assert.equal(calls.length, 1)
  assert.deepEqual(calls[0].params, { self_id: 10001, protocol_id: 0 })
  const params = { self_id: 10001, protocol_id: 0, group_id: 12345, msg_seq: 123, emoji_id: '76', is_add: false, emoji_type: null }
  assert.deepEqual(await api.set_group_msg_reaction(params), { success: true })
  assert.deepEqual(calls[1].params, params)
  assert.equal(calls.length, 2)
  assert.equal(API_CONTRACTS.set_msg_emoji_like.params.find(param => param.name === 'emoji_id').required, true)
})
test('security access preserves unsigned expiry strings and legacy numeric deadlines without coercion', async () => {
  const api = new Session('ws'); api.ready = true
  let expected = { token: 'test-only-opaque-qq-ticket', expiresAt: '18446744073709551615' }
  api.sender = request => api.receive({ type: 'action_result', id: request.id, ok: true, data: expected })
  const params = { self_id: 10001, protocol_id: 0, type: 'getToken' }
  assert.deepEqual(await api.open_account_security_access(params), expected)
  expected = { token: 'test-only-opaque-qq-ticket', expiresAt: 123 }
  assert.deepEqual(await api.call('open_account_security_access', params), expected)
  expected = { code: 1, message: '验证失败', next: 'failed' }
  assert.deepEqual(await api.open_account_security_access(params), expected)
})
test('SDK contracts preserve reviewed scopes and actual nested payloads without literal dotted keys', async () => {
  for (const action of API_ACTIONS.filter(action => API_CONTRACTS[action].transport !== 'ipc')) assert.ok(API_CONTRACTS[action].applicableProtocols?.trim(), action)
  assert.match(API_CONTRACTS.send_packet.usageConditions, /32 级/)
  assert.match(API_CONTRACTS.qqpet_operation.usageConditions, /不额外限制 QQ 等级/)
  assert.doesNotMatch(API_CONTRACTS.qqpet_operation.usageConditions, /48.*16/)
  const api = new Session('ws'); api.ready = true
  api.sender = request => api.receive({ type: 'action_result', id: request.id, ok: true, data: request.params })
  const params = { self_id: 10001, protocol_id: 0, group_id: 98765, sender_id: 20002, red_packet: { listid: 'sample', authkey: 'sample-key', channel: 1 } }
  assert.deepEqual(await api.grab_red_packet(params), params)
  assert.equal(Object.keys(API_CONTRACTS).some(action => /telegram/i.test(action)), false)
})
test('timeouts, abort and disconnect never replay; restrictions and unknown event fields preserved', async () => {
  const api = new Session('ws'); api.ready = true; let writes = 0
  api.sender = () => writes++
  await assert.rejects(api.get_bot_list({}, { timeoutMs: 5 }), e => e.uncertain && e.code === 'TIMEOUT')
  assert.equal(writes, 1)
  const pending = api.get_bot_list({}); api.disconnect(); await assert.rejects(pending, e => e.uncertain)
  assert.equal(writes, 2)
  api.ready = true
  const controller = new AbortController()
  const aborting = api.get_bot_list({}, { signal: controller.signal })
  controller.abort()
  await assert.rejects(aborting, e => e.uncertain && e.code === 'ABORTED')
  assert.equal(writes, 3); assert.equal(api.pending.size, 0)
  await assert.rejects(api.get_bot_list({}, { signal: controller.signal }), e => e.uncertain === false && e.code === 'ABORTED')
  assert.equal(writes, 3)
  api.ready = true; api.sender = m => api.receive({ type: 'action_result', id: m.id, ok: false, status: 'restricted', code: 'qq_level', requiredLevel: 16, currentLevel: 12, error: 'restricted' })
  await assert.rejects(api.get_bot_list({}), e => e.requiredLevel === 16 && e.currentLevel === 12 && e.response.status === 'restricted')
  let received
  api.on('event', () => { throw new Error('user callback') }); api.on('event', e => received = e)
  const event = { post_type: 'group_message', protocol_id: 0, msg: { uid: '99999999999999999999' }, novel_field: true }
  api.receive({ type: 'event', data: event }); assert.deepEqual(received, event); assert.equal(api.ready, true)
})
test('forward WebSocket authenticates and correlates responses', async t => {
  const wss = new WebSocketServer({ port: 0, host: '127.0.0.1' }); await once(wss, 'listening')
  t.after(() => { for (const ws of wss.clients) ws.terminate(); wss.close() })
  wss.on('connection', ws => ws.on('message', raw => { const m = JSON.parse(raw); if (m.type === 'auth') { assert.equal(m.permissions.bot_online, true); ws.send('{"type":"auth_ok"}') } else ws.send(JSON.stringify({ type: 'action_result', id: m.id, ok: true, data: [] })) }))
  const api = createAPI({ ...identity, url: `ws://127.0.0.1:${wss.address().port}/` }); t.after(() => api.close())
  await api.connect(); assert.deepEqual(await api.get_bot_list({}), [])
})
test('closing and immediately reconnecting cannot let an old socket reject new requests', async t => {
  const wss = new WebSocketServer({ port: 0, host: '127.0.0.1' }); await once(wss, 'listening')
  t.after(() => { for (const ws of wss.clients) ws.terminate(); wss.close() })
  wss.on('connection', ws => ws.on('message', raw => { const m = JSON.parse(raw); if (m.type === 'auth') ws.send('{"type":"auth_ok"}'); else setTimeout(() => { if (ws.readyState === 1) ws.send(JSON.stringify({ type: 'action_result', id: m.id, ok: true, data: 'new-connection' })) }, 10) }))
  const api = createAPI({ ...identity, url: `ws://127.0.0.1:${wss.address().port}/` }); t.after(() => api.close())
  await api.connect(); api.close(); await api.connect()
  assert.equal(await api.get_bot_list({}), 'new-connection')
  const connecting = api.connect(); await connecting
  assert.equal(api.ready, true)
})
test('reverse WebSocket authenticates before ready, supports framework reconnect without replay', async t => {
  const api = createReverseAPI({ ...identity, port: 0 }); await api.listen(); t.after(() => api.close())
  const url = `ws://127.0.0.1:${api.address().port}/`
  const ws = new WebSocket(url, { headers: { Authorization: 'Bearer test-token' } }); t.after(() => ws.terminate()); await once(ws, 'open')
  const ready = once(api, 'ready')
  ws.on('message', raw => { const m = JSON.parse(raw); if (m.type === 'plugin_info') ws.send('{"type":"plugin_info_ok"}'); else ws.send(JSON.stringify({ type: 'action_result', id: m.id, ok: true, data: 42 })) })
  ws.send('{"type":"ready","mode":"reverse"}'); await ready
  assert.equal(await api.get_plugin_context({}), 42)
  const rejected = new WebSocket(url, { headers: { Authorization: 'Bearer wrong' } }); await once(rejected, 'error')
  assert.equal(api.ready, true)
})
test('HTTP uses direct params and authorization; redirects are not followed', async t => {
  let count = 0
  const server = createServer((req, res) => { count++; assert.equal(req.headers.authorization, 'Bearer test-token'); if (req.url.endsWith('get_bot_list')) { res.writeHead(302, { Location: '/stolen' }); res.end() } else { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ ok: false, error: 'restricted', status: 'restricted', requiredLevel: 16 })) } })
  server.listen(0, '127.0.0.1'); await once(server, 'listening'); t.after(() => server.close())
  const api = createHTTPAPI({ url: `http://127.0.0.1:${server.address().port}/`, token: identity.token })
  await assert.rejects(api.get_bot_list({}), e => e.uncertain)
  assert.equal(count, 1)
  await assert.rejects(api.get_plugin_context({}), e => e.requiredLevel === 16)
})
test('IPC exact hello, fragmented ready, manifest guard and event identity', async () => {
  const input = new PassThrough(), output = new PassThrough(); let writes = ''
  output.on('data', b => { writes += b.toString() })
  const ctx = createNativePlugin({ pluginId: 'sdk-test', version: '1.0.0', actions: ['get_plugin_context'], input, output })
  const started = ctx.start()
  const hello = JSON.parse(writes.trim()); assert.equal(hello.framework_api, '3.0.0'); assert.equal(hello.api_version, '1')
  const ready = JSON.stringify({ type: 'ready', transport: 'native-ipc-v1', api_version: '1', framework_api: '3.0.0', plugin_id: 'sdk-test' }) + '\n'
  input.write(ready.slice(0, 9)); input.write(ready.slice(9)); await started
  await assert.rejects(ctx.api.get_bot_list({}), /not declared/)
  const pending = ctx.api.get_plugin_context({}); const action = JSON.parse(writes.trim().split('\n').at(-1))
  input.write(JSON.stringify({ type: 'action_result', id: 'wrong-request-id', ok: true, data: 'wrong' }) + '\n')
  assert.equal(ctx.api.pending.has(action.id), true)
  input.write(JSON.stringify({ type: 'action_result', id: action.id, ok: true, data: { scope: 'framework' } }) + '\n')
  assert.deepEqual(await pending, { scope: 'framework' }); ctx.close(); input.destroy(); output.destroy()
})
test('IPC handshake identity failure rejects start and releases input listeners', async () => {
  const input = new PassThrough(), output = new PassThrough()
  const ctx = createNativePlugin({ pluginId: 'sdk-test', version: '1.0.0', actions: [], input, output })
  const started = ctx.start()
  input.write('{"type":"ready","transport":"native-ipc-v1","api_version":"1","framework_api":"2.0","plugin_id":"sdk-test"}\n')
  await assert.rejects(started, /identity mismatch/)
  assert.equal(input.listenerCount('data'), 0); assert.equal(ctx.api.ready, false)
  input.destroy(); output.destroy()
})
test('IPC cannot start after close or process another buffered ready after listener closes', async () => {
  const input = new PassThrough(), output = new PassThrough()
  const closed = createNativePlugin({ pluginId: 'sdk-test', version: '1.0.0', actions: [], input, output })
  closed.close(); await assert.rejects(closed.start(), /closed/); assert.equal(input.listenerCount('data'), 0)
  const ctx = createNativePlugin({ pluginId: 'sdk-test', version: '1.0.0', actions: [], input, output })
  ctx.on('ready', () => ctx.close()); const started = ctx.start()
  const ready = JSON.stringify({ type: 'ready', transport: 'native-ipc-v1', api_version: '1', framework_api: '3.0.0', plugin_id: 'sdk-test' }) + '\n'
  input.write(ready + ready); await started
  assert.equal('nodeId' in ctx, false); assert.equal(ctx.api.ready, false); assert.equal(input.listenerCount('data'), 0)
  input.destroy(); output.destroy()
})

test('IPC identity remains bound to trusted connection file after node removal', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'mengka-single-node-sdk-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const connectionFile = join(directory, 'connection.json')
  await writeFile(connectionFile, JSON.stringify({ schema: 1, transport: 'native-ipc-v1', framework_api: '3.0.0', instance_id: 'trusted-instance', data_directory: directory }))
  const valid = { type: 'ready', transport: 'native-ipc-v1', api_version: '1', framework_api: '3.0.0', plugin_id: 'sdk-test', instance_id: 'trusted-instance' }
  for (const changed of [{ plugin_id: 'other-plugin' }, { instance_id: 'untrusted-instance' }, { instance_id: undefined }, { transport: 'other' }, { api_version: '2' }, { framework_api: '2.0.0' }]) {
    const input = new PassThrough(), output = new PassThrough()
    const ctx = createNativePlugin({ pluginId: 'sdk-test', version: '1.0.0', actions: [], connectionFile, input, output })
    const started = ctx.start()
    input.write(JSON.stringify({ ...valid, ...changed }) + '\n')
    await assert.rejects(started, /identity mismatch/)
    assert.equal(ctx.api.ready, false); assert.equal(input.listenerCount('data'), 0)
    input.destroy(); output.destroy()
  }
  const input = new PassThrough(), output = new PassThrough()
  const ctx = createNativePlugin({ pluginId: 'sdk-test', version: '1.0.0', actions: ['get_plugin_context'], connectionFile, input, output })
  const started = ctx.start(); input.write(JSON.stringify(valid) + '\n'); await started
  assert.equal(ctx.instanceId, 'trusted-instance'); assert.equal('nodeId' in ctx, false)
  await assert.rejects(ctx.api.get_bot_list({}), /not declared/)
  ctx.close(); input.destroy(); output.destroy()
})
