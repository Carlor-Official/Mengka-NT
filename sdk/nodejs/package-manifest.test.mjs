import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { validatePluginPackageManifest } from './package-manifest.js'

const example = JSON.parse(await readFile(new URL('./mengka-plugin.example.json', import.meta.url), 'utf8'))
test('native and managed WebUI examples carry all package-owned import fields', async () => {
  assert.equal(validatePluginPackageManifest(example), example)
  assert.equal(example.runtime.admin, false)
  const web = JSON.parse(await readFile(new URL('../plugin-web/mengka-plugin.example.json', import.meta.url), 'utf8'))
  assert.equal(validatePluginPackageManifest(web), web)
  assert.equal(web.runtime.admin, true)
})
test('missing, blank, null and wrong-type metadata cannot be replaced by user input', () => {
  for (const key of ['name', 'plugin_id', 'version', 'notes']) {
    for (const value of [undefined, null, '', '  ', 1]) {
      assert.throws(() => validatePluginPackageManifest({ ...example, [key]: value }), /缺少资料/)
    }
  }
  for (const value of [undefined, null, 'false', 0]) {
    assert.throws(() => validatePluginPackageManifest({ ...example, runtime: { ...example.runtime, admin: value } }), /缺少资料/)
  }
  assert.throws(() => validatePluginPackageManifest({ ...example, notes: undefined, description: 'not release notes' }), /版本说明\(notes\)/)
})
test('invalid identity and transport are rejected without mutating the source manifest', () => {
  for (const patch of [{ version: 'latest' }, { plugin_id: '../plugin' }, { schema: 2 }, { notes: 'a'.repeat(4001) }, { unknown: true }]) {
    assert.throws(() => validatePluginPackageManifest({ ...example, ...patch }), /资料无效/)
  }
  assert.throws(() => validatePluginPackageManifest({ ...example, runtime: { ...example.runtime, transport: 'custom' } }), /资料无效/)
  assert.equal(example.runtime.admin, false)
})
test('both SDK documentation copies require package data rather than legacy editable fields', async () => {
  for (const file of ['../../docs/managed-plugins.md', './docs/managed-plugins.md', '../../docs/native-plugins.md', '../plugin-web/README.md']) {
    const doc = await readFile(new URL(file, import.meta.url), 'utf8')
    for (const field of ['mengka-plugin.json', 'notes', 'runtime.admin', '缺少资料']) assert.ok(doc.includes(field), `${file}: ${field}`)
  }
})
