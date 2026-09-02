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

test('正反向 SDK 保持 Linux 原生链路并同步 1.9.7 系统管理 action', async () => {
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
    for (const action of ['get_plugin_context', 'get_node_list', 'create_device_profile', 'get_account_access_list', 'set_account_access', 'get_account_recent_logs']) {
      assert.match(source, new RegExp(`\\b${action}:\\s*\\{`), `${file.pathname} missing ${action}`)
    }
    assert.match(source, /api\.forProtocol\s*=\s*value\s*=>/, `${file.pathname} missing protocol-scoped API`)
    assert.match(source, /client_type:\s*'linuxqq'/, `${file.pathname} missing Linux client selector`)
    assert.doesNotMatch(source, /create_linux_login_qr\s*:/, `${file.pathname} must not expose a parallel Linux login API`)
    assert.doesNotMatch(source, /query_linux_login_qr\s*:/, `${file.pathname} must not expose a parallel Linux polling API`)
    assert.match(source, /return \{ \.\.\.\(params \|\| \{\}\), client_type: target\.client_type \}/, `${file.pathname} must use the attachment client_type selector only`)
    assert.doesNotMatch(source, /get_login_qr\s*:/, `${file.pathname} must not expose attachment aliases`)
    assert.match(source, /get_pet_pk_power:\s*\{[^\n]*build:\s*\(self_id, pet_id\)\s*=>\s*\(\{ self_id, pet_id \}\)/, `${file.pathname} must query pet power by pet_id`)
    assert.match(source, /start_pet_activity:\s*\{[^\n]*sub_event_type = 0[^\n]*\{ self_id, activity, option_name, friend_id, sub_event_type \}/, `${file.pathname} must keep the complete activity request contract`)
  }
})
