import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import net from 'node:net'
import test from 'node:test'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

test('pet directory contract exposes optional numeric mode only for strangers', async () => {
  const contract = JSON.parse(await readFile(new URL('./pet-api-contract.json', import.meta.url), 'utf8'))
  const fields = action => contract.find(item => item.action === action).fields
  const mode = fields('get_pet_pk_strangers').find(field => field.name === 'mode')
  assert.equal(mode.type, 'number')
  assert.equal(mode.required, false)
  assert.match(mode.description, /默认 4/)
  assert.equal(fields('get_pet_pk_friends').some(field => field.name === 'mode'), false)
})

for (const mode of ['forward', 'reverse']) {
  test(`${mode} pet options and extended profile survive transport unchanged`, { timeout: 10000 }, async () => {
    const requests = []
    const profile = {power:120, personality_attributes:[{name:'聪明', value:12.5}], personality_attribute_count:4,
      career:{name:'学生', open_url:'https://example.com/career', icon_url:''}, pk_power:{dominant_type:2, power:121}, source:'profile'}
    let api, server, socket
    const handle = (ws, raw) => {
      const msg = JSON.parse(String(raw))
      if (msg.type === 'auth') ws.send(JSON.stringify({type:'auth_ok'}))
      if (msg.type !== 'action') return
      requests.push(msg)
      ws.send(JSON.stringify({type:'action_result', id:msg.id, ok:true, data:msg.action === 'get_pet_profile' ? profile : {}}))
    }
    try {
      if (mode === 'forward') {
        server = new WebSocketServer({host:'127.0.0.1', port:0})
        await once(server, 'listening')
        server.on('connection', ws => ws.on('message', raw => handle(ws, raw)))
        api = createAPI({host:'127.0.0.1', port:server.address().port, token:'test', name:'test', version:'1', author:'test'})
        await api.connect()
      } else {
        const reserve = net.createServer()
        reserve.listen(0, '127.0.0.1'); await once(reserve, 'listening')
        const port = reserve.address().port; await new Promise(resolve => reserve.close(resolve))
        api = createReverseAPI({host:'127.0.0.1', port, token:'test'})
        await api.listen()
        const ready = api.waitForConnection(2000)
        socket = new WebSocket(`ws://127.0.0.1:${port}/`, {headers:{Authorization:'Bearer test'}})
        socket.on('message', raw => handle(socket, raw))
        await once(socket, 'open')
        socket.send(JSON.stringify({type:'ready', mode:'reverse', service:'test'})); await ready
      }
      const scoped = api.forProtocol('android')
      const cases = [
        ['get_pet_pk_strangers', {}], ['get_pet_pk_strangers', {mode:0}], ['get_pet_pk_strangers', {mode:6, cursor:'next'}],
        ['get_pet_interaction_messages', {}], ['get_pet_interaction_messages', {limit:0}], ['get_pet_interaction_messages', {limit:1000}],
        ['get_pet_profile', {}],
      ]
      for (const [action, extras] of cases) {
        const result = await scoped[action]({self_id:12345, ...extras})
        assert.deepEqual(requests.at(-1).params, {self_id:12345, ...extras, client_type:'android'})
        assert.equal(requests.at(-1).action, action)
        if (action === 'get_pet_profile') assert.deepEqual(result, profile)
      }
      assert.equal(requests.length, cases.length)
    } finally {
      socket?.terminate()
      if (mode === 'forward') api?.disconnect()
      else await api?.close()
      if (server) await new Promise(resolve => server.close(resolve))
    }
  })
}
