import assert from 'node:assert/strict'
import {once} from 'node:events'
import net from 'node:net'
import test from 'node:test'
import WebSocket from 'ws'
import {createReverseAPI} from './reverse-sdk.js'

// Transport fixtures only: this does not certify QQ produced these events.
const names = [
  'group_message_received', 'private_message_received', 'message_sent',
  'friend_added', 'friend_message_recalled', 'group_message_recalled',
  'group_member_joined', 'group_member_left', 'group_admin_changed', 'group_member_muted',
  'group_file_uploaded', 'group_card_changed', 'group_name_changed', 'group_title_changed',
  'group_essence_changed', 'group_system_tip', 'message_reaction_changed', 'user_poked',
  'profile_liked', 'typing_status_changed', 'friend_request_received', 'group_request_received',
  'account_offline', 'account_online', 'system_heartbeat', 'system_lifecycle',
]

test('reverse reconnect preserves all 26 listeners and rejects interrupted actions without replay', {timeout:10000}, async () => {
  const reserve=net.createServer();reserve.listen(0,'127.0.0.1');await once(reserve,'listening')
  const port=reserve.address().port;await new Promise(resolve=>reserve.close(resolve))
  const api=createReverseAPI({host:'127.0.0.1',port,token:'transport-test-only'})
  const received=[],sent=[],actions=[];let socket
  for(const name of names)api.on(name,event=>received.push(event))
  const waitUntil=async predicate=>{
    for(let i=0;i<200;i++){if(predicate())return;await new Promise(resolve=>setTimeout(resolve,5))}
    assert.fail('transport fixture not delivered')
  }
  async function connect(generation){
    const ready=api.waitForConnection(2000)
    socket=new WebSocket(`ws://127.0.0.1:${port}/`,{headers:{Authorization:'Bearer transport-test-only'}})
    socket.on('message',raw=>actions.push(JSON.parse(String(raw))))
    await once(socket,'open')
    socket.send(JSON.stringify({type:'ready',mode:'reverse',service:'fixture',generation}))
    assert.equal((await ready).generation,generation);assert.equal(api.connected,true)
    for(const [index,event_type] of names.entries()){
      const data={event_type,event_id:`fixture-${generation}-${index}`,self_id:10001,client_type:index%2?'linuxqq':'android',body:{state:0,enabled:false,text:'',uid:'u_test'}}
      sent.push(data);socket.send(JSON.stringify({type:'event',data}))
    }
    await waitUntil(()=>received.length>=sent.length);assert.deepEqual(received,sent)
  }
  try{
    await api.listen();await connect(1)
    const interrupted=api.callAction('get_bot_list')
    const rejected=assert.rejects(interrupted,/连接断开/)
    await waitUntil(()=>actions.length===1)
    socket.terminate();await rejected;assert.equal(api.connected,false)
    await assert.rejects(api.callAction('get_bot_list'),/尚未建立/)
    await connect(2)
    assert.equal(actions.length,1,'old actions must not be replayed on reconnect')
    const closing=api.callAction('get_plugin_context')
    const closed=assert.rejects(closing,/服务已关闭/)
    await waitUntil(()=>actions.length===2);await api.close();await closed
    await api.listen();await connect(3)
    assert.equal(actions.length,2,'closing actions must not be replayed on reopen')
    assert.equal(received.length,78);assert.deepEqual(received,sent)
  } finally {socket?.terminate();await api.close()}
})
