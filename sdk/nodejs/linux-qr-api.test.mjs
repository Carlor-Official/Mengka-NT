import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const files = [
  new URL('./sdk.js', import.meta.url),
  new URL('./reverse-sdk.js', import.meta.url),
  new URL('../../plugin/正向WebSocket/Node.js/sdk.js', import.meta.url),
  new URL('../../plugin/反向WebSocket/Node.js/sdk.js', import.meta.url),
]

test('正反向 SDK 同步 Linux 登录和扫码授权原生 API', async () => {
  for (const file of files) {
    const source = await readFile(file, 'utf8')
    for (const action of ['create_linux_login_qr', 'query_linux_login_qr', 'scan_qr', 'auth_qr']) {
      assert.match(source, new RegExp(`\\b${action}:\\s*\\{`), `${file.pathname} missing ${action}`)
    }
    assert.doesNotMatch(source, /get_login_qr\s*:/, `${file.pathname} must not expose attachment aliases`)
  }
})
