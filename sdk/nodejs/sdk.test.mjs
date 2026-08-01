import assert from 'node:assert/strict'
import test from 'node:test'
import { WebSocketServer } from 'ws'

import { createAPI } from './sdk.js'

const expectedActions = [
  'add_account',
  'approve_group_apply',
  'approve_group_invite',
  'cache_login',
  'check_cache',
  'check_sms',
  'create_login_qr',
  'delete_account',
  'delete_friend',
  'execute_level_tasks',
  'get_bot_info',
  'get_bot_list',
  'get_clientkey',
  'get_device_profile_list',
  'get_friend_list',
  'get_group_forward_msg',
  'get_group_list',
  'get_group_member_list',
  'get_group_system_notifications',
  'get_level_tasks',
  'get_protocol_list',
  'get_pskey',
  'get_qzone_friend_feeds',
  'get_security_verify_methods',
  'get_skey',
  'get_sms',
  'get_summary_card',
  'get_user_agent',
  'group_sign',
  'kick_group_member',
  'like_qzone_feed',
  'like_summary_card',
  'login_account',
  'offline_account',
  'publish_qzone_feed',
  'query_login_qr_status',
  'recall_group_msg',
  'reject_group_apply',
  'send_friend_msg',
  'send_group_forward_msg',
  'send_group_msg',
  'set_group_admin',
  'set_group_mute',
  'set_group_mute_all',
  'set_group_special_title',
  'submit_slider',
  'unlike_qzone_feed',
  'update_account',
  'upload_group_image',
  'upload_group_video',
  'upload_group_voice',
]

test('exports exactly the actions registered by the current server', () => {
  const api = createAPI({ token: 'test', name: 'test', version: '1', author: 'test' })
  const actions = Object.keys(api).filter(name => !['on', 'connect', 'disconnect'].includes(name)).sort()
  assert.deepEqual(actions, expectedActions)
})

test('serializes current account, security and moderation parameters', async t => {
  const received = []
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
  await new Promise(resolve => server.once('listening', resolve))

  server.on('connection', socket => {
    socket.on('message', raw => {
      const message = JSON.parse(raw.toString())
      if (message.type === 'auth') {
        socket.send(JSON.stringify({ type: 'auth_ok' }))
        return
      }
      if (message.type !== 'action') return
      received.push(message)
      socket.send(JSON.stringify({ type: 'action_result', id: message.id, ok: true, data: null }))
    })
  })

  const port = server.address().port
  const api = createAPI({ host: '127.0.0.1', port, token: 'test', name: 'test', version: '1', author: 'test' })
  await api.connect()
  t.after(() => {
    api.disconnect()
    return new Promise(resolve => server.close(resolve))
  })

  await api.add_account(123456789, 'password', 2, 3)
  await api.get_bot_info(123456789)
  await api.get_user_agent(123456789)
  await api.get_security_verify_methods(123456789)
  await api.create_login_qr(123456789)
  await api.query_login_qr_status(123456789, 'guarantee-token')
  await api.get_sms(123456789, 4, 'method-sign')
  await api.check_sms(123456789, 4, 'sms-sign', '123456')
  await api.check_sms(123456789, 3, 'send-sign')
  await api.set_group_special_title(123456789, 10001, 20002, 'title')
  await api.kick_group_member(123456789, 10001, 20002, true)

  assert.deepEqual(received.map(({ action, params }) => ({ action, params })), [
    { action: 'add_account', params: { self_id: 123456789, password: 'password', protocol_id: 2, device_profile_id: 3 } },
    { action: 'get_bot_info', params: { self_id: 123456789 } },
    { action: 'get_user_agent', params: { self_id: 123456789 } },
    { action: 'get_security_verify_methods', params: { self_id: 123456789 } },
    { action: 'create_login_qr', params: { self_id: 123456789 } },
    { action: 'query_login_qr_status', params: { self_id: 123456789, guarantee_token: 'guarantee-token' } },
    { action: 'get_sms', params: { self_id: 123456789, verify_type: 4, sign: 'method-sign' } },
    { action: 'check_sms', params: { self_id: 123456789, verify_type: 4, sign: 'sms-sign', code: '123456' } },
    { action: 'check_sms', params: { self_id: 123456789, verify_type: 3, sign: 'send-sign' } },
    { action: 'set_group_special_title', params: { self_id: 123456789, group_id: 10001, user_id: 20002, title: 'title' } },
    { action: 'kick_group_member', params: { self_id: 123456789, group_id: 10001, user_id: 20002, reject_add_request: true } },
  ])
})
