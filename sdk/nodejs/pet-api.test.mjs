import assert from 'node:assert/strict'
import test from 'node:test'
import { once } from 'node:events'
import { WebSocketServer } from 'ws'
import { readFile } from 'node:fs/promises'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

const contract = JSON.parse(await readFile(new URL('./pet-api-contract.json', import.meta.url), 'utf8'))
test('contributed pet API definitions are available in both SDK modes and use object-only parameters', () => {
  assert.equal(contract.length, 30)
  for (const api of [createAPI({token:'test',name:'test',version:'1',author:'test'}), createReverseAPI({token:'test'})]) {
    for (const action of contract.map(x => x.action)) {
      assert.equal(typeof api[action], 'function', action)
      assert.equal(typeof api.forProtocol('android')[action], 'function', action)
      assert.throws(() => api[action](12345), /对象参数/)
    }
  }
})
test('new pet wire calls preserve explicit target IDs and fail without replay on unknown result', async () => {
  const server = new WebSocketServer({host:'127.0.0.1',port:0})
  await once(server,'listening')
  const calls=[]
  server.on('connection',socket => socket.on('message',data => {
    const message=JSON.parse(String(data))
    if(message.type==='auth') socket.send(JSON.stringify({type:'auth_ok'}))
    if(message.type==='action') { calls.push(message); socket.send(JSON.stringify({type:'action_result',id:message.id,ok:false,error:'pet_result_unknown'})) }
  }))
  const api=createAPI({host:'127.0.0.1',port:server.address().port,token:'test',name:'test',version:'1',author:'test'})
  try {
    await api.connect()
    const params={self_id:12345,pet_id:'target-pet',friend_uin:'67890'}
    await assert.rejects(api.forProtocol('android').feed_friend_pet(params), /pet_result_unknown/)
    assert.equal(calls.length,1)
    assert.deepEqual(calls[0].params,{...params,client_type:'android'})
    assert.equal('access_key' in calls[0],false)
    assert.equal('friend_id' in calls[0].params,false)
  } finally { api.disconnect(); await new Promise(resolve => server.close(resolve)) }
})
test('every contributed API document credits 星空花海 and describes the new contract', async () => {
  for (const {action,fields} of contract) {
    const root = new URL(import.meta.url).pathname.includes('/sdk/nodejs/') ? '../../docs/api/' : './docs/api/'
    const doc = await readFile(new URL(root+action+'.md',import.meta.url),'utf8')
    assert.ok(doc.includes('**API 开源贡献者：星空花海**'),action)
    assert.ok(doc.includes('对象参数'),action)
    for(const field of fields) assert.ok(doc.includes('`'+field.name+'`'),action+':'+field.name)
  }
})

test('pet supplement keeps 30 actions and publishes explicit optional fields and activity semantics', () => {
  const fields = action => new Map(contract.find(item => item.action === action).fields.map(field => [field.name, field]))
  for (const action of ['feed_pet', 'feed_friend_pet']) {
    assert.equal(fields(action).get('food_id').required, false)
    assert.equal(fields(action).get('feed_type').required, false)
  }
  for (const action of ['bathe_pet', 'bathe_friend_pet']) assert.equal(fields(action).get('count').required, false)
  assert.equal(fields('get_pet_activity_options').has('cursor'), false)
  assert.ok(fields('get_pet_activity_options').get('friend_pet_id').description.includes('adventure'))
  assert.ok(fields('visit_friend_pet').get('pet_id').description.includes('目标好友'))
  for (const action of ['get_pet_pk_friends', 'get_pet_pk_strangers']) assert.equal(fields(action).get('cursor').required, false)
  assert.equal(contract.find(item => item.action === 'settle_pet_pk').commands, 'storySettle')
})

test('pet supplement parameters survive SDK transport unchanged', async () => {
  const server = new WebSocketServer({host:'127.0.0.1', port:0})
  await once(server, 'listening')
  const calls = []
  server.on('connection', socket => socket.on('message', data => {
    const message = JSON.parse(String(data))
    if (message.type === 'auth') socket.send(JSON.stringify({type:'auth_ok'}))
    if (message.type === 'action') {
      calls.push(message)
      const data = message.action === 'get_pet_pk_status'
        ? {status_known:true, finished:message.params.story_id === '6900_finished', raw_body_hex:message.params.story_id === '6900_finished' ? '' : '0a0178'}
        : {submitted:true, effect_verified:false}
      socket.send(JSON.stringify({type:'action_result', id:message.id, ok:true, data}))
    }
  }))
  const api = createAPI({host:'127.0.0.1', port:server.address().port, token:'test', name:'test', version:'1', author:'test'})
  try {
    await api.connect()
    const cases = [
      ['feed_friend_pet', {self_id:12345, pet_id:'Njc4OTAtcGV0', friend_uin:'67890', food_id:'3', feed_type:1001}],
      ['bathe_pet', {self_id:12345, pet_id:'MTIzNDUtcGV0', item_id:'1', count:4}],
      ['settle_pet_pk', {self_id:12345, pet_id:'MTIzNDUtcGV0', story_id:'6900_task'}],
      ['get_pet_pk_status', {self_id:12345, pet_id:'MTIzNDUtcGV0', story_id:'6900_finished'}],
      ['get_pet_pk_status', {self_id:12345, pet_id:'MTIzNDUtcGV0', story_id:'6900_running'}],
      ['start_pet_activity', {self_id:12345, pet_id:'MTIzNDUtcGV0', activity:'adventure', option_name:'探索', sub_event_type:0, friend_uin:'67890', friend_pet_id:'Njc4OTAtcGV0'}],
    ]
    for (const [action, params] of cases) {
      const result = await api.forProtocol('android')[action](params)
      if (action === 'get_pet_pk_status') {
        assert.equal(result.status_known, true)
        assert.equal(result.finished, params.story_id === '6900_finished')
      }
      assert.deepEqual(calls.at(-1).params, {...params, client_type:'android'})
      assert.equal(calls.at(-1).action, action)
    }
    assert.equal(calls.length, cases.length)
  } finally {
    api.disconnect()
    await new Promise(resolve => server.close(resolve))
  }
})
