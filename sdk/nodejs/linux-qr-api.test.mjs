import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const files = [
  new URL('./sdk.js', import.meta.url),
  new URL('./reverse-sdk.js', import.meta.url),
  new URL('../../plugin/正向WebSocket/Node.js/sdk.js', import.meta.url),
  new URL('../../plugin/反向WebSocket/Node.js/sdk.js', import.meta.url),
].filter(file => existsSync(file))

function actionNames(source) {
  const start = source.indexOf('const apiDefs = {')
  const relativeEnd = /\r?\n}\r?\n/.exec(source.slice(start))?.index ?? -1
  const end = relativeEnd < 0 ? -1 : start + relativeEnd
  assert.notEqual(start, -1, 'apiDefs start not found')
  assert.notEqual(end, -1, 'apiDefs end not found')
  return [...source.slice(start, end).matchAll(/^  ([A-Za-z0-9_]+):/gm)].map(match => match[1])
}

test('正反向 SDK 保持 Linux 原生链路并同步 2.0 服务管理 API', async () => {
  const nativeManagementActions = [
    'get_plugin_context', 'get_node_list', 'create_node', 'update_node', 'delete_node', 'test_node_latency',
    'create_device_profile', 'delete_device_profile', 'get_account_settings', 'update_account_settings',
    'clear_account_cache', 'stop_account_login', 'submit_account_identity_captcha',
    'submit_account_identity_phone', 'confirm_account_identity_sms', 'retry_account_identity_verify',
    'open_account_security_access', 'retry_account_security_verify', 'get_account_access_list',
    'set_account_access', 'clear_account_access', 'get_account_recent_logs',
    'create_account_recovery_qr', 'query_account_recovery_qr_status',
    'get_account_management_context', 'get_account_offline_notification', 'update_account_offline_notification',
  ]
  const delegatedManagementActions = [
    'get_bot_list', 'get_bot_info', 'get_protocol_list', 'get_device_profile_list',
    'add_account', 'update_account', 'delete_account',
    'login_account', 'check_cache', 'cache_login', 'submit_slider', 'get_security_verify_methods',
    'get_sms', 'check_sms', 'create_login_qr', 'query_login_qr_status', 'get_level_tasks',
    'execute_level_tasks', 'get_summary_card', 'get_user_agent',
  ]
  const managementActions = [...nativeManagementActions, ...delegatedManagementActions]
  assert.equal(new Set(managementActions).size, 47)
  let expectedActions = null
  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const actions = actionNames(source)
    assert.equal(actions.length, 221, `${file.pathname} must expose exactly 221 actions`)
    if (expectedActions == null) expectedActions = actions
    else assert.deepEqual(actions, expectedActions, `${file.pathname} action catalog differs from the canonical SDK`)
    for (const action of ['scan_qr', 'auth_qr']) {
      assert.match(source, new RegExp(`\\b${action}:\\s*\\{`), `${file.pathname} missing ${action}`)
    }
    for (const action of managementActions) {
      assert.match(source, new RegExp(`\\b${action}:\\s*\\{`), `${file.pathname} missing ${action}`)
    }
    assert.match(source, /get_bot_list:\s*\{[\s\S]*?build:\s*\(\.\.\.args\)[\s\S]*?args\.length !== 0[\s\S]*?return \{\}/, `${file.pathname} must enforce the instance-wide no-argument contract`)
    assert.match(source, /add_account:\s*\{[\s\S]*?build:\s*\(options = \{\}\)\s*=>\s*\(\{ \.\.\.options \}\)/, `${file.pathname} must use object-only account parameters`)
    assert.match(source, /update_account:\s*\{[\s\S]*?build:\s*\(options = \{\}\)\s*=>\s*\(\{ \.\.\.options \}\)/, `${file.pathname} must use object-only account parameters`)
    assert.doesNotMatch(source, /^  (generate_device_profile|offline_account):/gm, `${file.pathname} must not expose removed aliases`)
    assert.match(source, /api\.forProtocol\s*=\s*value\s*=>/, `${file.pathname} missing protocol-scoped API`)
    assert.match(source, /client_type:\s*'linuxqq'/, `${file.pathname} missing Linux client selector`)
    assert.doesNotMatch(source, /create_linux_login_qr\s*:/, `${file.pathname} must not expose a parallel Linux login API`)
    assert.doesNotMatch(source, /query_linux_login_qr\s*:/, `${file.pathname} must not expose a parallel Linux polling API`)
    assert.match(source, /Linux[^\n]*原生二维码信息/, `${file.pathname} must document protocol-aware login_account`)
    assert.match(source, /Linux 可省略 guarantee_token/, `${file.pathname} must document native Linux QR polling`)
    assert.match(source, /return \{ \.\.\.\(params \|\| \{\}\), client_type: target\.client_type \}/, `${file.pathname} must use the attachment client_type selector only`)
    assert.doesNotMatch(source, /get_login_qr\s*:/, `${file.pathname} must not expose attachment aliases`)
    assert.match(source, /get_pet_pk_power:\s*\{[^\n]*build:\s*\(self_id, pet_id\)\s*=>\s*\(\{ self_id, pet_id \}\)/, `${file.pathname} must query pet power by pet_id`)
    assert.match(source, /get_pet_vitals:\s*\{[^\n]*build:\s*\(self_id, pet_id\)\s*=>\s*\(\{ self_id, pet_id \}\)/, `${file.pathname} must query pet vitals by pet_id`)
    assert.match(source, /start_pet_activity:\s*\{[^\n]*sub_event_type = 0[^\n]*\{ self_id, activity, option_name, friend_id, sub_event_type \}/, `${file.pathname} must keep the complete activity request contract`)
  }
})

test('反向 SDK 不再读取或暴露插件服务节点', async () => {
  for (const file of [
    new URL('./reverse-sdk.js', import.meta.url),
    new URL('../../plugin/反向WebSocket/Node.js/sdk.js', import.meta.url),
  ].filter(file => existsSync(file))) {
    const source = await readFile(file, 'utf8')
    assert.doesNotMatch(source, /x-mengka-node-id/i, `${file.pathname} still reads the removed node header`)
    assert.doesNotMatch(source, /connectionInfo\.node_id/, `${file.pathname} still exposes a service node`)
  }
})
