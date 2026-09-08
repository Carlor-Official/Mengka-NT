import assert from 'node:assert/strict'
import {once} from 'node:events'
import test from 'node:test'
import {WebSocketServer} from 'ws'
import {createAPI} from './sdk.js'

test('event operations retain false and route by explicit account protocol', {timeout:5000}, async()=>{
  const server=new WebSocketServer({host:'127.0.0.1',port:0})
  await once(server,'listening')
  const seen=[]
  server.on('connection',socket=>socket.on('message',raw=>{
    const p=JSON.parse(String(raw))
    if(p.type==='auth')socket.send(JSON.stringify({type:'auth_ok'}))
    if(p.type==='action'){
      seen.push(p)
      socket.send(JSON.stringify({type:'action_result',id:p.id,ok:true,data:{success:true}}))
    }
  }))
  const api=createAPI({host:'127.0.0.1',port:server.address().port,token:'test',name:'event-operations',version:'dev',author:'test'})
  try{
    await api.connect()
    for(const protocol of ['android','linuxqq']){
      const scoped=api.forProtocol(protocol)
      await scoped.set_group_name({self_id:12345,group_id:54321,group_name:'测试群'})
      await scoped.set_group_essence({self_id:12345,group_id:54321,message_id:100,enabled:false})
      await scoped.send_poke({self_id:12345,user_id:67890})
    }
    assert.equal(seen.length,6)
    for(let i=0;i<seen.length;i++){
      assert.equal(seen[i].params.client_type,i<3?'android':'linuxqq')
      assert.equal(seen[i].params.self_id,12345)
      assert.equal(seen[i].params.node_id,undefined)
    }
    assert.equal(seen[1].params.enabled,false)
    assert.equal(seen[4].params.enabled,false)
    assert.equal(seen[2].params.group_id,undefined)
    const flag='nt1:dV9mcmllbmQ:1788804949'
    await api.forProtocol('linuxqq').set_friend_add_request(12345,flag,false,'')
    assert.equal(seen[6].action,'set_friend_add_request')
    assert.deepEqual(seen[6].params,{self_id:12345,client_type:'linuxqq',flag,approve:false,remark:''})
    await api.forProtocol('linuxqq').like_summary_card(12345,67890,2)
    assert.equal(seen[7].action,'like_summary_card')
    assert.deepEqual(seen[7].params,{self_id:12345,client_type:'linuxqq',target_uin:67890,like_count:2})
    await api.forProtocol('linuxqq').get_pskey(12345,'qun.qq.com')
    assert.deepEqual(seen[8].params,{self_id:12345,client_type:'linuxqq',domain:'qun.qq.com'})
    for(const protocol of ['android','linuxqq'])for(const reject of [false,true]){
      await api.forProtocol(protocol).kick_group_member(12345,54321,67890,reject)
      assert.equal(seen.at(-1).action,'kick_group_member')
      assert.deepEqual(seen.at(-1).params,{self_id:12345,client_type:protocol,group_id:54321,user_id:67890,reject_add_request:reject})
    }
    for(const protocol of ['android','linuxqq']){
      await api.forProtocol(protocol).leave_group({self_id:12345,group_id:54321})
      assert.equal(seen.at(-1).action,'leave_group')
      assert.deepEqual(seen.at(-1).params,{self_id:12345,client_type:protocol,group_id:54321})
    }
  }finally{api.disconnect();await new Promise(resolve=>server.close(resolve))}
})
