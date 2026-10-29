import { createAPI, createHTTPAPI, createNativePlugin, type FrameworkEvent } from '../index.js'
const api = createAPI({ url: 'ws://localhost:3001', token: 'test', name: 'test', version: '1.0.0', author: 'test' })
void api.get_bot_list({})
void api.get_bot_info({ self_id: 10001, protocol_id: 0 })
// @ts-expect-error legacy positional arguments are intentionally unsupported
void api.get_bot_info(10001)
// @ts-expect-error explicit protocol ID required
void api.get_bot_info({ self_id: 10001 })
const http = createHTTPAPI({ url: 'http://localhost:3001', token: 'test' })
void http.get_bot_list({})
const ipc = createNativePlugin({ pluginId: 'example.test', version: '1.0.0', actions: ['get_account_delegation'] })
void ipc.api.get_account_delegation({ receipt: 'test' })
const receive = (event: FrameworkEvent) => {
  if (event.post_type === 'group_temp_message') { const group: number | undefined = event.group_id; const uid: string = event.msg.uid; void group; void uid }
  if (event.post_type === 'system_event') { const node: number = event.node_id; void node }
}
api.on('event', receive)
