import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('all public SDK copies document server-owned level gates without adding caller parameters', async () => {
  const actions = ['send_packet', 'send_friend_request', 'send_group_join_request', 'execute_level_tasks']
  for (const file of ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    for (const action of actions) {
      assert.ok(source.includes(`// v2.5.3: QQ >= 16; server-owned runtime level, unknown fails closed; no automatic retry.\n  ${action}: {`), `${file}:${action}`)
      const block = source.slice(source.indexOf(`  ${action}: {`)).split('\n  },')[0]
      assert.doesNotMatch(block, /qq_level|minimum_level|access_key/)
    }
  }
  for (const action of actions) {
    const a = await readFile(new URL(`../../docs/api/${action}.md`, import.meta.url), 'utf8')
    const b = await readFile(new URL(`./docs/api/${action}.md`, import.meta.url), 'utf8')
    assert.equal(a, b)
    assert.match(a, /16 级/)
  }
})
