import assert from 'node:assert/strict'
import test from 'node:test'
import { once } from 'node:events'
import net from 'node:net'
import WebSocket, { WebSocketServer } from 'ws'
import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'

const event={post_type:'group_notice',category:'notice',event_type:'message_reaction_changed',self_id:12345,client_type:'android',group_id:67890,operator:{uid:'u_uncached',user_id:0},body:{msg_seq:31,emoji_id:'76',count:0,operation:'remove'}}

test('explicit group_event permission is sent before late reaction listener registration', {timeout:3000}, async()=>{
 const server=new WebSocketServer({host:'127.0.0.1',port:0});await once(server,'listening');let socket,auth
 server.on('connection',s=>{socket=s;s.on('message',raw=>{const p=JSON.parse(String(raw));if(p.type==='auth'){auth=p;s.send(JSON.stringify({type:'auth_ok'}))}})})
 const api=createAPI({host:'127.0.0.1',port:server.address().port,token:'test',name:'test',version:'1',author:'test',permissions:{group_event:true,friend_event:false,unknown:true}})
 try{
  await api.connect();assert.equal(auth.permissions.group_event,true);assert.equal(auth.permissions.friend_event,false);assert.equal(auth.permissions.group_message,false);assert.equal(auth.permissions.unknown,undefined)
  const received=new Promise(resolve=>api.on('message_reaction_changed',resolve));socket.send(JSON.stringify({type:'event',data:event}));assert.deepEqual(await received,event)
 }finally{api.disconnect();await new Promise(resolve=>server.close(resolve))}
})

test('forward summary card preserves avatar_only and the existing positional call', {timeout:3000},async()=>{
 const server=new WebSocketServer({host:'127.0.0.1',port:0});await once(server,'listening');const seen=[]
 server.on('connection',s=>s.on('message',raw=>{const p=JSON.parse(String(raw));if(p.type==='auth')s.send(JSON.stringify({type:'auth_ok'}));if(p.type==='action'){seen.push(p);s.send(JSON.stringify({type:'action_result',id:p.id,ok:true,data:{uin:67890,avatar_url:'https://example.test/avatar.jpg'}}))}}))
 const api=createAPI({host:'127.0.0.1',port:server.address().port,token:'test',name:'test',version:'1',author:'test'})
 try{
  await api.connect();const result=await api.forProtocol('android').get_summary_card(12345,67890,{avatar_only:true});assert.equal(result.avatar_url,'https://example.test/avatar.jpg');assert.deepEqual(seen[0].params,{self_id:12345,target_uin:67890,avatar_only:true,client_type:'android'})
  await api.get_summary_card(12345,67890);assert.deepEqual(seen[1].params,{self_id:12345,target_uin:67890});assert.equal(seen[0].action,'get_summary_card')
 }finally{api.disconnect();await new Promise(resolve=>server.close(resolve))}
})

test('reverse summary avatar option and zero-count reaction survive transport', {timeout:3000},async()=>{
 const reserve=net.createServer();reserve.listen(0,'127.0.0.1');await once(reserve,'listening');const port=reserve.address().port;await new Promise(resolve=>reserve.close(resolve))
 const api=createReverseAPI({host:'127.0.0.1',port,token:'test'});const received=new Promise(resolve=>api.on('message_reaction_changed',resolve));let socket
 try{
  await api.listen();const ready=api.waitForConnection(1000);socket=new WebSocket(`ws://127.0.0.1:${port}`,{headers:{Authorization:'Bearer test'}});await once(socket,'open');socket.send(JSON.stringify({type:'ready'}));await ready
  socket.on('message',raw=>{const p=JSON.parse(String(raw));assert.equal(p.action,'get_summary_card');assert.deepEqual(p.params,{self_id:12345,target_uin:67890,avatar_only:true,client_type:'linuxqq'});socket.send(JSON.stringify({type:'action_result',id:p.id,ok:true,data:{uin:67890,avatar_url:'https://example.test/avatar.jpg'}}))})
  const result=await api.forProtocol('linuxqq').get_summary_card(12345,67890,{avatar_only:true});assert.equal(result.uin,67890)
  const expected={...event,client_type:'linuxqq'};socket.send(JSON.stringify({type:'event',data:expected}));assert.deepEqual(await received,expected)
 }finally{socket?.terminate();await api.close()}
})
