import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const files = [
  new URL('./sdk.js', import.meta.url),
  new URL('./reverse-sdk.js', import.meta.url),
  new URL('../../plugin/正向WebSocket/Node.js/sdk.js', import.meta.url),
  new URL('../../plugin/反向WebSocket/Node.js/sdk.js', import.meta.url),
]

test('正反向 SDK 保持附件的协议选择与扫码授权边界', async () => {
  for (const file of files) {
    const source = await readFile(file, 'utf8')
    for (const action of ['scan_qr', 'auth_qr']) {
      assert.match(source, new RegExp(`\\b${action}:\\s*\\{`), `${file.pathname} missing ${action}`)
    }
    assert.match(source, /api\.forProtocol\s*=\s*value\s*=>/, `${file.pathname} missing protocol-scoped API`)
    assert.match(source, /client_type:\s*'linuxqq'/, `${file.pathname} missing Linux client selector`)
    assert.doesNotMatch(source, /create_linux_login_qr\s*:/, `${file.pathname} must not expose a parallel Linux login API`)
    assert.doesNotMatch(source, /query_linux_login_qr\s*:/, `${file.pathname} must not expose a parallel Linux polling API`)
    assert.match(source, /return \{ \.\.\.\(params \|\| \{\}\), client_type: target\.client_type \}/, `${file.pathname} must use the attachment client_type selector only`)
    assert.doesNotMatch(source, /get_login_qr\s*:/, `${file.pathname} must not expose attachment aliases`)
  }
})
