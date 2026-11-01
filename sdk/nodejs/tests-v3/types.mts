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
  if (event.post_type === 'system_event') { const time: number = event.time; void time }
}
api.on('event', receive)
// @ts-expect-error service node APIs are no longer part of the framework
void api.get_node_list({})
// @ts-expect-error accounts are selected without service node parameters
void api.get_bot_info({ self_id: 10001, protocol_id: 0, node_id: 1 })
// @ts-expect-error IPC context no longer exposes node IDs
void ipc.nodeId

void api.send_packet({ self_id: 10001, protocol_id: 0, cmd: 'Example.Service.Command', data: '0801' })
void api.call('send_packet', { self_id: 10001, protocol_id: 0, cmd: 'Example.Service.Command', data: '0801', rsp: false })
// @ts-expect-error send_packet requires the actual SSO command
void api.send_packet({ self_id: 10001, protocol_id: 0, data: '0801' })
// @ts-expect-error generic call has the same required payload contract
void api.call('send_packet', { self_id: 10001, protocol_id: 0, cmd: 'Example.Service.Command' })
