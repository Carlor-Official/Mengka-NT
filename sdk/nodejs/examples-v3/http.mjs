import { createHTTPAPI } from '../index.js'
const api = createHTTPAPI({ url: process.env.MENGKA_HTTP_URL || 'http://127.0.0.1:3003/', token: process.env.MENGKA_SERVICE_TOKEN })
console.error(await api.get_bot_list({}))
