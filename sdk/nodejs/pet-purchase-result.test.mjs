import assert from 'node:assert/strict'
import test from 'node:test'
import {once} from 'node:events'
import net from 'node:net'
import WebSocket, {WebSocketServer} from 'ws'
import {createAPI} from './sdk.js'
import {createReverseAPI} from './reverse-sdk.js'

for (const mode of ['forward', 'reverse']) {
  test(`bath purchase ${mode} preserves business results without replay`, {timeout:10000}, async () => {
    let api, server, socket
    const calls = []
    const results = [
      {submitted:true, result:1, order_id:'order-1', effect_verified:false},
      {submitted:true, result:9, order_id:'', effect_verified:false},
      {submitted:true, result:0, order_id:'', effect_verified:false},
      {submitted:true, result:0, order_id:'  order  ', effect_verified:false},
    ]
    const error = 'OIDB errorCode=1000316 message=批价商品不存在'
    const respond = (ws, raw) => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') ws.send(JSON.stringify({type:'auth_ok'}))
      if (message.type !== 'action') return
      calls.push(message)
      const data = results[calls.length - 1]
      ws.send(JSON.stringify(data
        ? {type:'action_result', id:message.id, ok:true, data}
        : {type:'action_result', id:message.id, ok:false, error}))
    }
    try {
      if (mode === 'forward') {
        server = new WebSocketServer({host:'127.0.0.1', port:0})
        await once(server, 'listening')
        server.on('connection', ws => ws.on('message', raw => respond(ws, raw)))
        api = createAPI({host:'127.0.0.1', port:server.address().port, token:'fixture', name:'fixture', version:'1', author:'fixture'})
        await api.connect()
      } else {
        const reserve = net.createServer()
        reserve.listen(0, '127.0.0.1')
        await once(reserve, 'listening')
        const port = reserve.address().port
        await new Promise(resolve => reserve.close(resolve))
        api = createReverseAPI({host:'127.0.0.1', port, token:'fixture'})
        await api.listen()
        const ready = api.waitForConnection(2000)
        socket = new WebSocket(`ws://127.0.0.1:${port}/`, {headers:{Authorization:'Bearer fixture'}})
        socket.on('message', raw => respond(socket, raw))
        await once(socket, 'open')
        socket.send(JSON.stringify({type:'ready', mode:'reverse', service:'fixture'}))
        await ready
      }
      const params = {self_id:12345, pet_id:'MTIzNDUtcGV0', item_id:'1', count:10}
      for (const expected of results) {
        assert.deepEqual(await api.forProtocol('android').buy_pet_bath_item(params), expected)
      }
      await assert.rejects(api.forProtocol('android').buy_pet_bath_item(params), /1000316/)
      assert.equal(calls.length, results.length + 1)
      for (const call of calls) {
        assert.equal(call.action, 'buy_pet_bath_item')
        assert.deepEqual(call.params, {...params, client_type:'android'})
      }
    } finally {
      socket?.terminate()
      if (mode === 'reverse') await api?.close()
      else {
        api?.disconnect()
        if (server) await new Promise(resolve => server.close(resolve))
      }
    }
  })
}
