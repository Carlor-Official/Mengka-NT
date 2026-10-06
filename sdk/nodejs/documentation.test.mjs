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
  assert.match(readme, /54 个 action/)
  assert.match(readme, /235 个 action/)
  assert.doesNotMatch(readme, /18 个复用|只返回 `management_api_version`|当前开发分支还不是|后三个方法/)
  const root = await readFile(new URL('../../README.md', import.meta.url), 'utf8')
  const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'))
  assert.ok(readme.includes('v' + pkg.version), 'SDK README must match SDK package version')
  const releasedVersion = root.match(/最新正式版本：\*\*(\d+\.\d+\.\d+)\*\*/)?.[1]
  const developmentVersion = root.match(/当前开发版本：\*\*(\d+\.\d+\.\d+)/)?.[1]
  assert.ok(releasedVersion, 'framework README must declare its latest released version')
  const currentVersion = developmentVersion ?? releasedVersion
  assert.equal(currentVersion, pkg.version, 'SDK package must match the current framework version')
  const notes = await readFile(new URL('../../release-notes/release-notes-next.md', import.meta.url), 'utf8')
  assert.ok(notes.trim().length > 0, 'declared framework version must have release notes')
  assert.ok(notes.includes('v' + currentVersion), 'release notes index must name the current version')
  if (!developmentVersion) {
    const releasedNotes = await readFile(new URL('../../release-notes/release-notes-v' + releasedVersion + '.md', import.meta.url), 'utf8')
    assert.ok(releasedNotes.includes('v' + releasedVersion), 'formal version must have its own release notes')
    assert.doesNotMatch(readme.split('\n').find(line => line.startsWith('当前 SDK 版本：')) ?? '', /待发布/)
  }
  assert.match(root, /235 个 action、54 个服务管理 API 和 26 个精确原生事件/)
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

test('status query documents all requested fields and has no execution level gate', async () => {
  const [doc, copy] = await Promise.all([
    '../../docs/api/get_level_task_status.md', './docs/api/get_level_task_status.md',
  ].map(file => readFile(new URL(file, import.meta.url), 'utf8')))
  assert.equal(doc, copy)
  for (const field of ['level', 'total_days', 'base_days', 'vip_multiplier', 'extra_days', 'active_days_baseline', 'estimated_upgrade_days', 'pending', 'completed']) assert.ok(doc.includes(field), field)
  assert.match(doc, /仅查询任务状态不要求 QQ 16 级/)
  assert.match(doc, /不会把登录天数当成累计活跃天数/)
})
