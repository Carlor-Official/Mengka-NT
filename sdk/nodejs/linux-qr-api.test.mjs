import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const files = [
  new URL('./sdk.js', import.meta.url),
  new URL('./reverse-sdk.js', import.meta.url),
  new URL('../../plugin/正向WebSocket/Node.js/sdk.js', import.meta.url),
  new URL('../../plugin/反向WebSocket/Node.js/sdk.js', import.meta.url),
]

function actionNames(source) {
  const start = source.indexOf('const apiDefs = {')
  const relativeEnd = /\r?\n}\r?\n/.exec(source.slice(start))?.index ?? -1
  const end = relativeEnd < 0 ? -1 : start + relativeEnd
  assert.notEqual(start, -1, 'apiDefs start not found')
  assert.notEqual(end, -1, 'apiDefs end not found')
  return [...source.slice(start, end).matchAll(/^  ([A-Za-z0-9_]+):/gm)].map(match => match[1])
}

test('正反向 SDK 保持 Linux 原生链路并同步 1.9.8 系统管理权限包', async () => {
  const nativeSystemManagementActions = [
    'get_plugin_context', 'get_node_list', 'create_node', 'update_node', 'delete_node', 'test_node_latency',
    'create_device_profile', 'delete_device_profile', 'get_account_settings', 'update_account_settings',
    'clear_account_cache', 'stop_account_login', 'submit_account_identity_captcha',
    'submit_account_identity_phone', 'confirm_account_identity_sms', 'retry_account_identity_verify',
    'open_account_security_access', 'retry_account_security_verify', 'get_account_access_list',
    'set_account_access', 'clear_account_access', 'get_account_recent_logs',
  ]
  const delegatedSystemManagementActions = [
    'get_bot_list', 'get_bot_info', 'get_protocol_list', 'get_device_profile_list',
    'generate_device_profile', 'add_account', 'update_account', 'offline_account', 'delete_account',
    'login_account', 'check_cache', 'cache_login', 'submit_slider', 'get_security_verify_methods',
    'get_sms', 'check_sms', 'create_login_qr', 'query_login_qr_status', 'get_level_tasks',
    'execute_level_tasks',
  ]
  const systemManagementActions = [...nativeSystemManagementActions, ...delegatedSystemManagementActions]
  assert.equal(new Set(systemManagementActions).size, 42)
  let expectedActions = null
  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const actions = actionNames(source)
    assert.equal(actions.length, 218, `${file.pathname} must expose exactly 218 actions`)
    if (expectedActions == null) expectedActions = actions
    else assert.deepEqual(actions, expectedActions, `${file.pathname} action catalog differs from the canonical SDK`)
    for (const action of ['scan_qr', 'auth_qr']) {
      assert.match(source, new RegExp(`\\b${action}:\\s*\\{`), `${file.pathname} missing ${action}`)
    }
    for (const action of systemManagementActions) {
      assert.match(source, new RegExp(`\\b${action}:\\s*\\{`), `${file.pathname} missing ${action}`)
    }
    assert.match(source, /get_bot_list:\s*\{[\s\S]*?build:\s*\(options = \{\}\)\s*=>\s*\(\{ \.\.\.options \}\)/, `${file.pathname} must support all_nodes options`)
    assert.match(source, /add_account:\s*\{[\s\S]*?typeof self_id === 'object' \? \{ \.\.\.self_id \}/, `${file.pathname} must support object account parameters`)
    assert.match(source, /update_account:\s*\{[\s\S]*?typeof self_id === 'object' \? \{ \.\.\.self_id \}/, `${file.pathname} must support object account parameters`)
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
