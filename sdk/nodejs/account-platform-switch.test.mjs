import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('all four SDK copies retain current and target platform selectors without changing result contract', async () => {
  for (const path of ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8')
    const definition = source.match(/\n  update_account: \{([\s\S]*?)\n  \},/)[1]
    assert.match(definition, /resultData: false/)
    const build = new Function(`return (${definition.match(/build: (.*),/)[1]})`)()
    for (const [from, to] of [['android', 'linuxqq'], ['linuxqq', 'android']]) {
      const params = { self_id: 998881, password: 'fixture', client_type: from, target_client_type: to, protocol_id: to === 'android' ? 1 : 4, device_profile_id: 1 }
      assert.deepEqual(build(params), params)
      assert.equal('node_id' in build(params), false)
    }
  }
})
