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

const groupNoticeNames = {
  apply: '入群申请',
  mute: '群禁言',
  recall: '消息撤回',
}

api.on('group_notice', (event) => {
  const type = event.sub_type || 'unknown'
  const name = groupNoticeNames[type] || `未知群事件(${type})`
  const group = `${event.group_name || ''}(${event.group_id})`

  switch (type) {
    case 'apply':
      console.log(`[${name}] 群=${group} 申请者=${event.nickname}(${event.user_id}) 附言=${event.comment || ''} request_id=${event.request_id} request_type=${event.request_type}`)
      if (event.request_type === 22) {
        console.log(`  邀请者=${event.invitor_nickname}(${event.invitor_id})`)
      }
      break
    case 'mute':
      console.log(`[${name}] 群=${group} 操作者=${event.operator?.nickname} 目标=${event.target?.nickname} 时长=${event.body?.duration ?? 0}`)
      break
    case 'recall':
      console.log(`[${name}] 群=${group} 操作者=${event.operator?.nickname} 消息序号=${event.body?.msg_seq}`)
      break
    default:
      console.log(`[${name}] 群=${group}`, event)
      break
  }
})

api.on('friend_notice', (event) => {
  console.log(`[好友事件] user_id=${event.sender?.user_id} sub_type=${event.sub_type}`)
})

api.on('bot_offline', (event) => {
  console.log(`[Bot离线] 账号=${event.self_id} 原因=${event.err_msg || ''}`)
})

await api.connect()
