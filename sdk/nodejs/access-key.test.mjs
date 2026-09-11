import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { WebSocketServer } from 'ws'

import { createAPI } from './sdk.js'

async function withForwardServer(run) {
  const received = []
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
  await once(server, 'listening')
  server.on('connection', socket => {
    socket.on('message', raw => {
      const message = JSON.parse(String(raw))
      received.push(message)
      if (message.type === 'auth') socket.send(JSON.stringify({ type: 'auth_ok' }))
      if (message.type === 'action') {
        socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: true, data: 'aabb' }))
      }
    })
  })
  const port = server.address().port
  try {
    await run({ port, received })
  } finally {
    await new Promise(resolve => server.close(resolve))
  }
}

function createClient(port, extra = {}) {
  return createAPI({
    host: '127.0.0.1',
    port,
    token: 'plugin-token',
    name: 'access-key-test',
    version: '1.0.0',
    author: 'test',
    ...extra,
  })
}

test('send_packet never accepts a plugin-provided dedicated key', async () => {
  await withForwardServer(async ({ port, received }) => {
    const api = createClient(port, { sendPacketKey: 'mksp_legacy.secret' })
    await api.connect()
    const result = await api.callAction('send_packet', {
      self_id: 123456,
      cmd: 'Test.Command',
      data: 'aabb',
      rsp: true,
      reserve: 'ccdd',
    }, { accessKey: 'mksp_legacy.secret' })
    assert.equal(result, 'aabb')
    const action = received.find(item => item.type === 'action')
    assert.equal(Object.hasOwn(action, 'access_key'), false)
    assert.deepEqual(action.params, {
      self_id: 123456,
      cmd: 'Test.Command',
      data: 'aabb',
      rsp: true,
      reserve: 'ccdd',
    })
    assert.equal(Object.hasOwn(action.params, 'access_key'), false)
    api.disconnect()
  })
})

test('send_packet leaves plugin session authorization to the framework', async () => {
  await withForwardServer(async ({ port, received }) => {
    const api = createClient(port)
    await api.connect()
    await api.send_packet(123456, 'Test.Command', 'aabb')
    const action = received.find(item => item.type === 'action')
    assert.equal(Object.hasOwn(action, 'access_key'), false)
    assert.deepEqual(action.params, {
      self_id: 123456,
      cmd: 'Test.Command',
      data: 'aabb',
      rsp: true,
    })
    api.disconnect()
  })
})

test('the SDK exposes no dedicated-key setter', async () => {
  await withForwardServer(async ({ port, received }) => {
    const api = createClient(port)
    assert.equal(Object.hasOwn(api, 'setSendPacketKey'), false)
    await api.connect()
    await api.send_packet(123456, 'Test.Command', 'aabb', false)
    const action = received.find(item => item.type === 'action')
    assert.equal(Object.hasOwn(action, 'access_key'), false)
    assert.equal(action.params.rsp, false)
    api.disconnect()
  })
})

test('send_friend_request preserves target, text and explicit protocol on the wire', async () => {
  await withForwardServer(async ({ port, received }) => {
    const api = createClient(port)
    await api.connect()
    try {
      await api.send_friend_request(1060221, 2082083, '测试申请', '测试好友')
      await api.forProtocol('linux').send_friend_request(2082083, 1060221)
      const actions = received.filter(item => item.type === 'action')
      assert.equal(actions.length, 2)
      assert.ok(actions.every(item => item.action === 'send_friend_request'))
      assert.deepEqual(actions[0].params, { self_id: 1060221, client_type: 'android', user_id: 2082083, message: '测试申请', remark: '测试好友' })
      assert.deepEqual(actions[1].params, { self_id: 2082083, client_type: 'linuxqq', user_id: 1060221, message: '', remark: '' })
    } finally {
      api.disconnect()
    }
  })
})

test('send_group_join_request keeps explicit protocol and has no automatic retry', async () => {
  await withForwardServer(async ({port,received}) => {
    const api=createClient(port)
    await api.connect()
    try {
      await api.send_group_join_request(1060221,305977791,'申请说明')
      await api.forProtocol('linuxqq').send_group_join_request(2082083,260573935)
      const actions=received.filter(item=>item.type==='action')
      assert.equal(actions.length,2)
      assert.ok(actions.every(item=>item.action==='send_group_join_request'))
      assert.deepEqual(actions[0].params,{self_id:1060221,client_type:'android',group_id:305977791,message:'申请说明'})
      assert.deepEqual(actions[1].params,{self_id:2082083,client_type:'linuxqq',group_id:260573935,message:''})
    } finally { api.disconnect() }
  })
})

test('reverse SDK also leaves dedicated-key ownership to the framework', async () => {
  const source = await readFile(new URL('./reverse-sdk.js', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /sendPacketKey|setSendPacketKey|options\.accessKey|message\.access_key/)
})
