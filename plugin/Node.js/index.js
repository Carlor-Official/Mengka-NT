import { createAPI } from './sdk.js'

const api = createAPI({
  host:    '127.0.0.1', //  插件服务地址
  port:    3001,        //  插件服务端口
  token:   'wmb6ks7bh2gnr3c5',          //  插件服务令牌
  name:    'test',          //  插件名
  version: '1.0.0',     //  插件版本
  author:  'test',      //  插件作者
})

api.on('group_message', (event) => {
  console.log(`[群聊消息] 群=${event.group_id} 用户=${event.sender?.user_id} alt=${event.alt_message || ''}`)
  event.message?.forEach(seg => {
    if (seg.type !== 'text') console.log(`  [${seg.type}] ${JSON.stringify(seg.data)}`)
  })
})

api.on('friend_message', (event) => {
  console.log(`[好友消息] 用户=${event.sender?.user_id} alt=${event.alt_message || ''}`)
  event.message?.forEach(seg => {
    if (seg.type !== 'text') console.log(`  [${seg.type}] ${JSON.stringify(seg.data)}`)
  })
})

api.on('group_notice', (event) => {
  console.log(`[群聊事件] 群=${event.group_id} sub_type=${event.sub_type} operator=${event.operator?.nickname} target=${event.target?.nickname}`)
})

api.on('friend_notice', (event) => {
  console.log(`[好友事件] user_id=${event.sender?.user_id} sub_type=${event.sub_type}`)
})

api.on('bot_offline', (event) => {
  console.log(`[Bot离线] 账号=${event.self_id} 原因=${event.err_msg || ''}`)
})

await api.connect()