import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadManagedConnection, loadManagedStorage } from './managed-connection.js'

test('managed connection loads fresh file credentials and rejects remote or escaping inputs', () => {
  const root = mkdtempSync(join(tmpdir(), 'mknt-managed-'))
  try {
    const file = join(root, 'connection.json'), token = join(root, 'ws.token')
    const value = { schema: 1, instance_id: 'pilot', websocket_url: 'ws://127.0.0.1:23456', token_file: token }
    writeFileSync(token, 'a'.repeat(48)); writeFileSync(file, JSON.stringify(value))
    assert.deepEqual(loadManagedConnection(file), { host: '127.0.0.1', port: 23456, token: 'a'.repeat(48) })
    writeFileSync(token, 'b'.repeat(48)); assert.equal(loadManagedConnection(file).token, 'b'.repeat(48))
    for (const websocket_url of ['ws://evil.example.com:23456', 'ws://127.0.0.1:23456/?token=secret', 'http://127.0.0.1:23456']) {
      writeFileSync(file, JSON.stringify({ ...value, websocket_url })); assert.throws(() => loadManagedConnection(file))
    }
    writeFileSync(file, JSON.stringify({ ...value, token_file: join(root, '..', 'escape') })); assert.throws(() => loadManagedConnection(file))
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('managed storage resolves data and approved media but rejects traversal and symlink escapes', () => {
  const root = mkdtempSync(join(tmpdir(), 'mknt-storage-'))
  try {
    const data = join(root, 'data'), media = join(root, 'media'), file = join(root, 'connection.json')
    mkdirSync(data); mkdirSync(media)
    writeFileSync(join(data, 'config.json'), '{}'); writeFileSync(join(media, 'clip.mp4'), 'media')
    writeFileSync(join(root, 'private'), 'secret')
    writeFileSync(file, JSON.stringify({ schema: 1, data_directory: data, allowed_directories: [media] }))
    const storage = loadManagedStorage(file)
    assert.equal(storage.resolveFile('config.json'), join(data, 'config.json'))
    assert.equal(storage.resolveFile(join(media, 'clip.mp4')), join(media, 'clip.mp4'))
    assert.throws(() => storage.resolveFile('../private'), /outside/)
    try { symlinkSync(join(root, 'private'), join(data, 'escape')) } catch (error) { if (error.code !== 'EPERM') throw error }
    assert.throws(() => storage.resolveFile('escape'))
    writeFileSync(file, JSON.stringify({ schema: 1, data_directory: data, allowed_directories: [] }))
    assert.throws(() => loadManagedStorage(file).resolveFile(join(media, 'clip.mp4')), /outside/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})
