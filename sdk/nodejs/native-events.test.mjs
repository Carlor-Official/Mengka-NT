import assert from 'node:assert/strict'
import { once } from 'node:events'
import test from 'node:test'
import { WebSocketServer } from 'ws'

import { createAPI, NATIVE_EVENTS as forwardEvents } from './sdk.js'
import { NATIVE_EVENTS as reverseEvents } from './reverse-sdk.js'

const expected = [
  'group_message_received', 'private_message_received', 'message_sent',
  'friend_added', 'friend_message_recalled', 'group_message_recalled',
  'group_member_joined', 'group_member_left', 'group_admin_changed', 'group_member_muted',
  'group_file_uploaded', 'group_card_changed', 'group_name_changed', 'group_title_changed',
  'group_essence_changed', 'group_system_tip', 'message_reaction_changed', 'user_poked',
  'profile_liked', 'typing_status_changed', 'friend_request_received', 'group_request_received',
  'account_offline', 'account_online', 'system_heartbeat', 'system_lifecycle',
]

test('forward and reverse SDK expose the same native event catalog', () => {
  assert.deepEqual(forwardEvents, reverseEvents)
  for (const eventName of expected) {
    assert.ok(forwardEvents.includes(eventName), `missing ${eventName}`)
  }
})

test('native event catalog does not contain duplicate listener names', () => {
  assert.equal(new Set(forwardEvents).size, forwardEvents.length)
})

test('typing, UID-only membership and both recall sequence fields survive SDK dispatch', { timeout: 3000 }, async () => {
  const packets = [
    {post_type:'friend_notice',client_type:'linuxqq',event_type:'typing_status_changed',operator:{uid:'u_friend'},body:{state:0,from_uid:'u_friend',to_uid:'u_self'}},
    {post_type:'group_notice',event_type:'group_member_joined',group_id:12345,user_uid:'u_member'},
    {post_type:'group_notice',event_type:'group_member_left',group_id:12345,user_uid:'u_member',reason:'kicked'},
    {post_type:'friend_notice',event_type:'friend_message_recalled',operator:{user_id:10002},body:{msg_seq:7174,client_seq:40324,msg_random:3413588876,from_uid:'u_from',to_uid:'u_to',prompt_text:'试图萌混过关😉'}},
    {post_type:'group_notice',event_type:'group_file_uploaded',group_id:12345,operator:{user_id:10002},body:{file_id:'/server-file-id',file_name:'test.txt',file_size:42,busid:102,upload_time:1788801000,parent_folder_id:'/'}},
    {post_type:'group_notice',event_type:'group_title_changed',group_id:12345,target:{user_id:10002},body:{title:''}},
    {post_type:'friend_notice',event_type:'friend_added',operator:{user_id:10002,uid:'u_friend',nickname:'新好友'},body:{source:'native_push',time:1788804949}},
    {post_type:'request',event_type:'friend_request_received',user_uid:'u_friend',flag:'nt1:dV9mcmllbmQ:1788804949',requested_at:1788804949},
    {post_type:'group_notice',event_type:'group_request_received',group_id:12345,user_uid:'u_applicant',invitor_uid:'u_inviter',request_id:81,request_type:22,request_extra:3},
    {post_type:'group_notice',client_type:'linuxqq',event_type:'group_essence_changed',group_id:12345,operator:{user_id:10001},target:{user_id:10002},body:{msg_seq:42,msg_random:77,operation:'remove',time:1788806800}},
    {post_type:'friend_notice',client_type:'linuxqq',event_type:'user_poked',operator:{user_id:10001},target:{user_id:10002},body:{action:'拍了拍',suffix:''}},
    {post_type:'friend_notice',client_type:'linuxqq',event_type:'profile_liked',operator:{user_id:10002},body:{text:'赞了我的资料卡1次',count:1,count_source:'native_text'}},
    {post_type:'friend_notice',client_type:'android',event_type:'profile_liked',operator:{user_id:10002},body:{text:'unknown localized template'}},
    {post_type:'group_notice',client_type:'linuxqq',event_type:'group_member_left',group_id:12345,user_id:10001,user_uid:'u_self'},
  ].map((event,i)=>({...event,event_id:'evt_contract_'+i,category:event.post_type==='request'||event.event_type==='group_request_received'?'request':'notice',self_id:10001,client_type:event.client_type||(event.post_type==='request'?'linuxqq':'android')}))
  const server = new WebSocketServer({host:'127.0.0.1',port:0})
  await once(server,'listening')
  let auth
  server.on('connection',socket=>socket.on('message',raw=>{
    const packet=JSON.parse(String(raw));if(packet.type!=='auth')return
    auth=packet;socket.send(JSON.stringify({type:'auth_ok'}))
    for(const data of packets)socket.send(JSON.stringify({type:'event',data}))
  }))
  const api=createAPI({host:'127.0.0.1',port:server.address().port,token:'test',name:'contract',version:'dev',author:'test'})
  const received=[];let complete
  const done=new Promise(resolve=>{complete=resolve})
  for(const event_type of new Set(packets.map(p=>p.event_type)))api.on(event_type,event=>{received.push(event);if(received.length===packets.length)complete()})
  try{
    await api.connect();await done
    assert.equal(auth.permissions.friend_event,true)
    assert.equal(auth.permissions.group_event,true)
    assert.deepEqual(received,packets)
    assert.equal(received[0].body.state,0)
    assert.equal(received[1].request_id,undefined)
    assert.equal(received[2].operator_id,undefined)
    assert.equal(received[3].body.msg_seq,7174)
    assert.equal(received[3].body.client_seq,40324)
    assert.equal(received[3].body.msg_random,3413588876)
    assert.equal(received[4].body.msg_seq,undefined)
    assert.equal(received[4].body.upload_time,1788801000)
    assert.equal(received[5].body.title,'')
    assert.equal(received[5].operator,undefined)
    assert.equal(received[6].body.source,'native_push')
    assert.equal(received[6].body.time,1788804949)
    assert.equal(received[6].body.flag,undefined)
    assert.equal(received[7].user_id,undefined)
    assert.equal(received[7].flag,'nt1:dV9mcmllbmQ:1788804949')
    assert.equal(received[7].client_type,'linuxqq')
    assert.equal(auth.permissions.request,true)
    assert.equal(received[8].user_id,undefined)
    assert.equal(received[8].user_uid,'u_applicant')
    assert.equal(received[8].invitor_uid,'u_inviter')
    assert.equal(received[8].request_extra,3)
    assert.equal(received[13].self_id,received[13].user_id)
    assert.equal(received[13].reason,undefined)
    assert.equal(received[13].operator_id,undefined)
  }finally{api.disconnect();await new Promise(resolve=>server.close(resolve))}
})

test('account_online declares system permission and reaches exact and broad listeners', async () => {
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
  await once(server, 'listening')
  let auth
  server.on('connection', socket => socket.on('message', raw => {
    const packet = JSON.parse(String(raw))
    if (packet.type !== 'auth') return
    auth = packet
    socket.send(JSON.stringify({ type: 'auth_ok' }))
    socket.send(JSON.stringify({type:'event',data:{post_type:'system_event',event_type:'account_online',category:'system',event_id:'evt_online',self_id:106606,client_type:'linuxqq',node_id:3,status:'online'}}))
  }))
  const api = createAPI({host:'127.0.0.1',port:server.address().port,token:'test',name:'online-test',version:'dev',author:'test'})
  const delivered = []
  let done
  const received = new Promise(resolve => { done = resolve })
  api.on('system_event', event => delivered.push(['system', event]))
  api.on('account_online', event => { delivered.push(['online', event]); done() })
  try {
    await api.connect()
    await received
    assert.equal(auth.permissions.system_event, true)
    assert.equal(delivered.length, 2)
    assert.equal(delivered[0][1], delivered[1][1])
    assert.equal(delivered[1][1].client_type, 'linuxqq')
    assert.equal(delivered[1][1].node_id, 3)
  } finally {
    api.disconnect()
    await new Promise(resolve => server.close(resolve))
  }
})

test('account_offline declares offline permission and preserves the transition identity', {timeout:3000}, async () => {
  const server=new WebSocketServer({host:'127.0.0.1',port:0})
  await once(server,'listening')
  const event={post_type:'bot_offline',event_type:'account_offline',category:'system',self_id:1060221,client_type:'linuxqq',event_id:'evt_offline_contract',occurred_at:1788808000000,offline_reason:'active',err_msg:'主动停止'}
  let auth
  server.on('connection',socket=>socket.on('message',raw=>{
    const packet=JSON.parse(String(raw));if(packet.type!=='auth')return
    auth=packet;socket.send(JSON.stringify({type:'auth_ok'}));socket.send(JSON.stringify({type:'event',data:event}))
  }))
  const api=createAPI({host:'127.0.0.1',port:server.address().port,token:'test',name:'offline-test',version:'dev',author:'test'})
  let complete
  const received=new Promise(resolve=>{complete=resolve})
  api.on('account_offline',complete)
  try{await api.connect();assert.deepEqual(await received,event);assert.equal(auth.permissions.bot_offline,true)}
  finally{api.disconnect();await new Promise(resolve=>server.close(resolve))}
})

test('request events reach both broad and precise listeners', async () => {
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
  await once(server, 'listening')
  let socket
  server.on('connection', connected => {
    socket = connected
    connected.on('message', raw => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') connected.send(JSON.stringify({ type: 'auth_ok' }))
    })
  })
  const api = createAPI({
    host: '127.0.0.1',
    port: server.address().port,
    token: 'native-event-test',
    name: 'native-event-test',
    version: '2.0.4',
    author: 'test',
  })
  const delivered = []
  api.on('request', event => delivered.push(['request', event.event_id]))
  api.on('group_request_received', event => delivered.push(['group_request_received', event.event_id]))
  try {
    await api.connect()
    socket.send(JSON.stringify({
      type: 'event',
      data: {
        post_type: 'group_notice',
        category: 'request',
        event_type: 'group_request_received',
        event_id: 'evt_test',
      },
    }))
    await new Promise(resolve => setTimeout(resolve, 25))
    assert.deepEqual(delivered, [
      ['request', 'evt_test'],
      ['group_request_received', 'evt_test'],
    ])
  } finally {
    api.disconnect()
    await new Promise(resolve => server.close(resolve))
  }
})
