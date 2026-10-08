import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('all four SDK copies preserve explicit autoUpdate true and false in settings payloads', async () => {
  const paths = ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']
  for (const path of paths) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8')
    const builder = source.match(/update_account_settings: \{ wait: true, build: (.*?) \},/)[1]
    const build = new Function(`return (${builder})`)()
    for (const enabled of [true, false]) {
      assert.deepEqual(build({ autoUpdate: enabled }), { autoUpdate: enabled })
    }
    assert.deepEqual(build({}), {})
  }
})
