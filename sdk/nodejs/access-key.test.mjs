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

test('get_pet_pk_power sends the requested self or friend pet_id', async () => {
  await withForwardServer(async ({ port, received }) => {
    const api = createClient(port)
    await api.connect()
    await api.get_pet_pk_power(123456, 'friend-pet-456')
    const action = received.find(item => item.type === 'action')
    assert.equal(action.action, 'get_pet_pk_power')
    assert.deepEqual(action.params, {
      self_id: 123456,
      pet_id: 'friend-pet-456',
    })
    api.disconnect()
  })
})

test('get_pet_vitals sends the requested self or friend pet_id', async () => {
  await withForwardServer(async ({ port, received }) => {
    const api = createClient(port)
    await api.connect()
    await api.get_pet_vitals(123456, 'friend-pet-456')
    const action = received.find(item => item.type === 'action')
    assert.equal(action.action, 'get_pet_vitals')
    assert.deepEqual(action.params, {
      self_id: 123456,
      pet_id: 'friend-pet-456',
    })
    api.disconnect()
  })
})

test('send_packet uses the framework-bound key when the plugin does not carry one', async () => {
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

test('reverse SDK also leaves dedicated-key ownership to the framework', async () => {
  const source = await readFile(new URL('./reverse-sdk.js', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /sendPacketKey|setSendPacketKey|options\.accessKey|message\.access_key/)
})
