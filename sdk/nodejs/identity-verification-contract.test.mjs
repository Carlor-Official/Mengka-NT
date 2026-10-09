import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PassThrough } from 'node:stream'
import test from 'node:test'
import { createNativePlugin } from './native-plugin.js'

test('verification responses preserve explicit completion and new challenges through native IPC', async () => {
  const input = new PassThrough(), output = new PassThrough()
  const plugin = createNativePlugin({ pluginId: 'verification-fixture', version: '1.0.0', actions: ['retry_account_identity_verify', 'retry_account_security_verify'], events: [], input, output, allowMissingManagedStorage: true })
  let result
  output.on('data', raw => {
    const request = JSON.parse(raw.toString())
    if (request.type === 'hello') input.write(JSON.stringify({ type: 'ready', transport: 'native-ipc-v1', api_version: '1' }) + '\n')
    if (request.type === 'action') input.write(JSON.stringify({ type: 'action_result', id: request.id, ok: true, data: result }) + '\n')
  })
  try {
    await plugin.start()
    for (const action of ['retry_account_identity_verify', 'retry_account_security_verify']) {
      for (const response of [{ code: 0, self_id: 900001, status: 1, message: '登录成功' }, { code: 140022007, identity_url: 'https://accounts.qq.com/test', extra_info: '身份验证' }, { code: 140022008, slider_url: 'https://accounts.qq.com/slider' }, { code: 140022010, security_url: 'https://accounts.qq.com/security', security_verify: { verify_list: [3] } }, { code: 4001, message: '上线失败' }]) {
        result = response
        assert.deepEqual(await plugin.ctx.actions.call(action, { self_id: 900001, client_type: 'android', login_type: 0, extra: {} }), response)
      }
    }
  } finally { plugin.close() }
})

test('all SDK copies reserve transport time for framework verification', async () => {
  for (const file of ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    for (const action of ['submit_account_identity_captcha', 'submit_account_identity_phone', 'confirm_account_identity_sms', 'retry_account_identity_verify', 'retry_account_security_verify']) {
      assert.match(source, new RegExp(action + ': \\{ wait: true, timeout: 45 \\* 1000,'))
    }
  }
  assert.equal(await readFile(new URL('../../docs/account-identity-verification.md', import.meta.url), 'utf8'), await readFile(new URL('./docs/account-identity-verification.md', import.meta.url), 'utf8'))
})
