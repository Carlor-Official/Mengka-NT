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
  const type = event.sub_type || 'unknown'
  const group = `${event.group_name || ''}(${event.group_id})`

  switch (type) {
    case 'apply':
      console.log(`[入群申请] 群=${group} 申请者=${event.nickname}(${event.user_id}) 附言=${event.comment || ''} request_id=${event.request_id} request_type=${event.request_type}`)
      if (event.request_type === 22) {
        console.log(`  邀请者=${event.invitor_nickname}(${event.invitor_id})`)
      }
      if (event.handler_id) {
        console.log(`  处理人=${event.handler_nickname}(${event.handler_id})`)
      }
      break
    case 'increase':
      console.log(`[成员进群] 群=${group} 新成员=${event.nickname}(${event.user_id})`)
      if (event.invitor_id) {
        console.log(`  邀请者=${event.invitor_nickname}(${event.invitor_id})`)
      }
      if (event.handler_id) {
        console.log(`  处理人=${event.handler_nickname}(${event.handler_id})`)
      }
      break
    case 'decrease':
      if (event.request_type === 6) {
        console.log(`[成员退群] 群=${group} 操作者=${event.operator_nickname}(${event.operator_id}) 被移出成员=${event.nickname}(${event.user_id})`)
      } else {
        console.log(`[成员退群] 群=${group} 主动退群成员=${event.nickname}(${event.user_id})`)
      }
      break
    case 'mute':
      console.log(`[群禁言] 群=${group} 操作者=${event.operator?.nickname} 目标=${event.target?.nickname} 时长=${event.body?.duration ?? 0}`)
      break
    case 'recall':
      console.log(`[消息撤回] 群=${group} 操作者=${event.operator?.nickname} 消息序号=${event.body?.msg_seq}`)
      break
    default:
      console.log(`[未知群事件(${type})] 群=${group}`, event)
      break
  }
})

api.on('friend_notice', (event) => {
  switch (event.sub_type) {
    case 'group_invite':
      console.log(`[群邀请] 邀请人=${event.operator?.nickname}(${event.operator?.user_id}) 群号=${event.body?.group_id}`)
      break
    case 'like':
      console.log(`[好友点赞] 好友=${event.operator?.nickname}(${event.operator?.user_id}) 内容=${event.body?.text || ''} 次数=${event.body?.count || 0}`)
      break
    default:
      console.log(`[未知好友事件(${event.sub_type || 'unknown'})]`, event)
      break
  }
})

api.on('bot_offline', (event) => {
  console.log(`[Bot离线] 账号=${event.self_id} 原因=${event.err_msg || ''}`)
})

await api.connect()
