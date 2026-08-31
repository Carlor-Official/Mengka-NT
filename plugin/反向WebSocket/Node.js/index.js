import { createReverseAPI } from './sdk.js'

const api = createReverseAPI({
  host: '0.0.0.0',
  port: 3002,
  path: '/',
  token: '在管理后台填写相同的服务令牌',
  sendPacketKey: process.env.MENGKA_SEND_PACKET_KEY || '',
})

api.on('group_message', event => {
  console.log(`[群聊消息] 群=${event.group_id} 用户=${event.sender?.user_id} ${event.alt_message || ''}`)
})

api.on('friend_message', event => {
  console.log(`[好友消息] 用户=${event.sender?.user_id} ${event.alt_message || ''}`)
})

api.on('group_notice', event => {
  console.log(`[群事件] 类型=${event.sub_type || 'unknown'} 群=${event.group_id}`, event)
})

api.on('friend_notice', event => {
  console.log(`[好友事件] 类型=${event.sub_type || 'unknown'}`, event)
})

api.on('bot_offline', event => {
  console.log(`[Bot离线] 账号=${event.self_id} 原因=${event.err_msg || ''}`)
})

await api.listen()
const connection = await api.waitForConnection()
console.log(`萌卡NT 已接入，服务=${connection.service}，节点=${connection.node_id}`)
