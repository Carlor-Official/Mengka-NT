import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { NATIVE_EVENTS } from './sdk.js'
import { NATIVE_EVENTS as REVERSE_EVENTS } from './reverse-sdk.js'

test('published SDK reference covers the current native event and management contract', async () => {
  const readme = await readFile(new URL('./README.md', import.meta.url), 'utf8')
  const categories = new Set(['group_message', 'friend_message', 'request', 'group_notice', 'friend_notice', 'system_event', 'bot_offline'])
  assert.deepEqual(REVERSE_EVENTS, NATIVE_EVENTS)
  assert.equal(NATIVE_EVENTS.length, 33)
  const precise = NATIVE_EVENTS.filter(name => !categories.has(name))
  assert.equal(precise.length, 26)
  for (const name of precise) assert.ok(readme.includes('`' + name + '`'), name)
  for (const field of ['service_id', 'service_name', 'admin_base_url', 'management_api_version', 'available_actions']) {
    assert.ok(readme.includes('`' + field + '`'), field)
  }
  assert.match(readme, /20 个复用接口/)
  assert.match(readme, /53 个 action/)
  assert.match(readme, /233 个 action/)
  assert.doesNotMatch(readme, /18 个复用|只返回 `management_api_version`|当前开发分支还不是|后三个方法/)
  const root = await readFile(new URL('../../README.md', import.meta.url), 'utf8')
  const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'))
  assert.ok(root.includes('当前版本：**' + pkg.version + '**'))
  assert.match(root, /233 个 action、53 个服务管理 API 和 26 个精确原生事件/)
})

test('downloadable example SDK files match the canonical current copies', async () => {
  for (const [canonical, example] of [
    ['./sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js'],
    ['./reverse-sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js'],
  ]) {
    const [a, b] = await Promise.all([canonical, example].map(file => readFile(new URL(file, import.meta.url))))
    assert.deepEqual(a, b, example)
  }
})
