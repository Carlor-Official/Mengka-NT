import { createAPI, createHTTPAPI, createNativePlugin, type FrameworkEvent } from '../index.js'
const api = createAPI({ url: 'ws://localhost:3001', token: 'test', name: 'test', version: '1.0.0', author: 'test' })
void api.get_bot_list({})
void api.get_bot_info({ self_id: 10001, protocol_id: 0 })
void api.ntlogin_retry_security_verify({ self_id: 10001, protocol_id: 0 })
api.open_account_security_access({ self_id: 10001, protocol_id: 0, type: 'getToken' }).then(result => {
  if ('token' in result) {
    const expiresAt: number | string = result.expiresAt
    // @ts-expect-error new Linux expiry cannot be assumed numeric
    const numericExpiry: number = result.expiresAt
    void expiresAt; void numericExpiry
  } else { const failed: 'failed' = result.next; void failed }
})
api.call('open_account_security_access', { self_id: 10001, protocol_id: 0, type: 'getToken' }).then(result => {
  if ('token' in result) { const token: string = result.token; void token }
})
void api.set_group_msg_reaction({ self_id: 10001, protocol_id: 0, group_id: 12345, msg_seq: 123, emoji_id: '76', is_add: false, emoji_type: null })
// @ts-expect-error native sequence reaction requires explicit add/remove
void api.set_group_msg_reaction({ self_id: 10001, protocol_id: 0, group_id: 12345, msg_seq: 123, emoji_id: '76' })
// @ts-expect-error nullable numeric type does not accept string
void api.set_group_msg_reaction({ self_id: 10001, protocol_id: 0, group_id: 12345, msg_seq: 123, emoji_id: '76', is_add: false, emoji_type: '1' })
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
