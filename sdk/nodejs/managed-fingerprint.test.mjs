import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const sdkFiles = ['./sdk.js', './reverse-sdk.js', '../../plugin/正向WebSocket/Node.js/sdk.js', '../../plugin/反向WebSocket/Node.js/sdk.js']

test('all SDK transports require explicit fingerprint rotation parameters without inventing confirmation', async () => {
  for (const path of sdkFiles) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8')
    assert.doesNotMatch(source, /^  (create_device_profile|delete_device_profile|generate_device_profile):/gm)
    const definition = source.match(/^  refresh_account_fingerprint: \{([^\n]+)\},/m)?.[1]
    assert.ok(definition, path)
    const build = new Function(`return (${definition.match(/build: (.*) /)[1]})`)()
    const params = { self_id: 106606, client_type: 'linuxqq', protocol_id: 4, confirm: true }
    assert.deepEqual(build(params), params)
    assert.deepEqual(build({ ...params, confirm: false }), { ...params, confirm: false })
    assert.deepEqual(build(), {})
  }
})

test('current reference copies document managed ownership and migration without a custom assignment field', async () => {
  for (const name of ['add_account', 'update_account', 'get_device_profile_list', 'refresh_account_fingerprint', 'get_account_management_context']) {
    const [main, bundled] = await Promise.all([`../../docs/api/${name}.md`, `./docs/api/${name}.md`].map(path => readFile(new URL(path, import.meta.url), 'utf8')))
    assert.equal(main, bundled, name)
    assert.doesNotMatch(main, /\| `device_profile_id` \| number \| 是/)
  }
  const migration = await readFile(new URL('./docs/managed-fingerprints.md', import.meta.url), 'utf8')
  assert.match(migration, /confirm: true/)
  assert.match(migration, /不要批量刷新/)
})
