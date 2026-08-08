import { createAPI } from './sdk.js'

const api = createAPI({
  host: process.env.MOE_PLUGIN_HOST || '127.0.0.1',
  port: Number(process.env.MOE_PLUGIN_PORT || 3001),
  token: 'aukjpjvlghmnu4h5',
  name: 'red-packet-pregrab',
  version: '1.0.0',
  author: 'mengka-nt',
})

async function preGrabRedPacket(event, redPacket) {
  const result = await api.get_red_packet_info(
    event.self_id,
    event.group_id,
    event.sender?.user_id,
    redPacket.data,
  )
  console.log('[红包预领取结果]', JSON.stringify({
    self_id: event.self_id,
    group_id: event.group_id,
    listid: redPacket.data?.listid || '',
    result,
  }))
}

api.on('group_message', event => {
  const redPackets = Array.isArray(event.message)
    ? event.message.filter(segment => segment?.type === 'red_packet')
    : []

  for (const redPacket of redPackets) {
    void preGrabRedPacket(event, redPacket).catch(error => {
      console.error(
        `[红包预领取失败] 账号=${event.self_id} 群=${event.group_id} ` +
        `listid=${redPacket.data?.listid || ''}: ${error.message || error}`,
      )
    })
  }
})

await api.connect()
console.log('红包预领取插件已连接')
