import { createAPI } from '../index.js'
const api = createAPI({ url: process.env.MENGKA_WS_URL || 'ws://127.0.0.1:3001/', token: process.env.MENGKA_SERVICE_TOKEN, name: 'sdk-example', version: '1.0.0', author: 'developer', permissions: { group_message: true } })
api.on('event', event => console.error(event.post_type))
await api.connect()
try { console.error(await api.get_bot_list({})) } finally { api.close() }
