import { createAPI } from './sdk.js'

const api = createAPI({
  host: '110.42.57.220',
  port: 3001,
  token: 'qbti3ic8bledriaf',
  name: 'red-packet-grabber',
  version: '1.0.0',
  author: 'test',
})

function elapsedMilliseconds(startedAt) {
  return Number(process.hrtime.bigint() - startedAt) / 1e6
}

function currentTimestamp() {
  const now = new Date()
  const pad = (value, length = 2) => String(value).padStart(length, '0')

  return [
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`,
  ].join(' ')
}

async function grabRedPacket(event, redPacket) {
  const startedAt = process.hrtime.bigint()
  const context = `账号=${event.self_id} 群=${event.group_id}`

  try {
    const result = api.grab_red_packet(
      event.self_id,
      event.group_id,
      event.sender.user_id,
      redPacket.data,
    )
    console.log(`[${currentTimestamp()}] [红包] 已发起领取 ${context}`)

    await result
    console.log(
      `[${currentTimestamp()}] [红包] 领取成功 ${context}，用时 ${elapsedMilliseconds(startedAt).toFixed(2)} ms`,
    )
  } catch (error) {
    console.error(
      `[${currentTimestamp()}] [红包] 领取失败 ${context}，用时 ${elapsedMilliseconds(startedAt).toFixed(2)} ms：${error.message}`,
    )
  }
}

api.on('group_message', event => {
  for (const segment of event.message ?? []) {
    if (segment.type === 'red_packet') {
      void grabRedPacket(event, segment)
    }
  }
})

await api.connect()
