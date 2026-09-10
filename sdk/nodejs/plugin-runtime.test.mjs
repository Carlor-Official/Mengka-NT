import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomBytes } from 'node:crypto'
import { createServer } from 'node:net'
import { spawn } from 'node:child_process'
import WebSocket, { WebSocketServer } from 'ws'
import { resolvePluginRuntime, authorizeManagedRequest, managedAdminPrincipal, createManagedLifecycle } from './plugin-runtime.js'
import { createPluginConnection } from './plugin-connection.js'

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'mengka-sdk-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const data = join(root, 'data'), priv = join(root, 'private'); mkdirSync(data); mkdirSync(priv)
  const ws = join(priv, 'ws.token'), admin = join(priv, 'admin.token'), file = join(priv, 'connection.json')
  writeFileSync(ws, randomBytes(32).toString('hex')); writeFileSync(admin, randomBytes(32).toString('hex'))
  const metadata = { schema: 1, instance_id: 'demo-instance', websocket_url: 'ws://127.0.0.1:3001/', token_file: ws, data_directory: data, allowed_directories: [] }
  writeFileSync(file, JSON.stringify(metadata))
  const env = { MENGKA_MANAGED_V1: '1', MENGKA_PLUGIN_CONNECTION_FILE: file, MENGKA_PLUGIN_DATA_DIR: data, MENGKA_PLUGIN_ADMIN_HOST: '127.0.0.1', MENGKA_PLUGIN_ADMIN_PORT: '3003', MENGKA_PLUGIN_ADMIN_ORIGIN: 'http://127.0.0.1:18443', MENGKA_PLUGIN_ADMIN_TOKEN_FILE: admin }
  return { env, root, file, metadata }
}
test('managed configuration and SSO trust boundary, HTTP and HTTPS', t => {
  const { env, file, metadata } = fixture(t)
  for (const origin of ['http://127.0.0.1:18443', 'https://demo.example.test']) {
    const runtime = resolvePluginRuntime({}, { ...env, MENGKA_PLUGIN_ADMIN_ORIGIN: origin })
    assert.equal(runtime.connection.mode, 'forward')
    const req = { socket: { remoteAddress: '127.0.0.1' }, url: '/admin', headers: { 'x-mengka-managed-token': runtime.adminToken, 'x-mengka-managed-origin': origin, origin } }
    assert.equal(authorizeManagedRequest(runtime, req), true)
    assert.equal(authorizeManagedRequest(runtime, { ...req, socket: { remoteAddress: '203.0.113.1' } }), false)
    for (const headers of [{}, { ...req.headers, origin: 'https://evil.example' }, { ...req.headers, 'x-mengka-managed-token': runtime.connection.token }, { ...req.headers, 'x-mengka-managed-origin': undefined }]) assert.equal(authorizeManagedRequest(runtime, { ...req, headers }), false)
    assert.equal(authorizeManagedRequest(runtime, { ...req, url: '/api/managed/health', headers: { 'x-mengka-managed-token': runtime.adminToken } }), true)
    assert.equal(authorizeManagedRequest(runtime, { ...req, url: '/api/managed/other', headers: { 'x-mengka-managed-token': runtime.adminToken } }), false)
    assert.deepEqual(managedAdminPrincipal(runtime), managedAdminPrincipal(resolvePluginRuntime({}, { ...env, MENGKA_PLUGIN_ADMIN_ORIGIN: origin })))
    assert.equal(managedAdminPrincipal(runtime).passwordLogin, false)
    const lifecycle = createManagedLifecycle(runtime)
    assert.equal(lifecycle.active, false); lifecycle.control('activate'); assert.equal(lifecycle.active, true)
    lifecycle.control('stop'); assert.equal(lifecycle.active, false)
    assert.throws(() => lifecycle.control('delete'))
  }
  assert.throws(() => resolvePluginRuntime({}, { ...env, MENGKA_MANAGED_V1: undefined }))
  assert.throws(() => resolvePluginRuntime({}, { ...env, MENGKA_PLUGIN_ADMIN_HOST: '0.0.0.0' }))
  writeFileSync(file, JSON.stringify({ ...metadata, websocket_url: 'ws://example.test:3001/' }))
  assert.throws(() => resolvePluginRuntime({}, env))
})
test('managed secret symlinks cannot escape private directory', t => {
  const f = fixture(t), outside = join(f.root, 'outside.token'), link = join(f.root, 'private', 'link.token')
  writeFileSync(outside, randomBytes(32).toString('hex'))
  try { symlinkSync(outside, link) } catch (e) { if (e.code === 'EPERM') return t.skip('Symlink privilege unavailable'); throw e }
  writeFileSync(f.file, JSON.stringify({ ...f.metadata, token_file: link }))
  assert.throws(() => resolvePluginRuntime({}, f.env))
})
const identity = { name: 'demo-plugin', version: '1.0.0', author: 'Demo Developer' }
test('unified forward connection authenticates and invokes actions', async t => {
  const token = randomBytes(32).toString('hex')
  const server = new WebSocketServer({ port: 0, host: '127.0.0.1' })
  await new Promise(r => server.once('listening', r))
  server.on('connection', socket => socket.on('message', raw => {
    const msg = JSON.parse(String(raw))
    if (msg.type === 'auth') { assert.equal(msg.token, token); socket.send(JSON.stringify({ type: 'auth_ok' })) }
    if (msg.type === 'action') socket.send(JSON.stringify({ type: 'action_result', id: msg.id, ok: true, data: { demo: true } }))
  }))
  const plugin = createPluginConnection({ ...identity, env: {}, manual: { mode: 'forward', host: '127.0.0.1', port: server.address().port, token } })
  t.after(async () => { await plugin.stop(); for (const c of server.clients) c.terminate(); await new Promise(r => server.close(r)) })
  await plugin.start(); assert.equal(plugin.connected, true)
  assert.deepEqual(await plugin.api.call('get_plugin_context'), { demo: true })
})
test('unified reverse connection rejects wrong credentials, accepts reconnect', async t => {
  const reservation = createServer().listen(0, '127.0.0.1'); await new Promise(r => reservation.once('listening', r))
  const port = reservation.address().port; await new Promise(r => reservation.close(r))
  const token = randomBytes(32).toString('hex')
  const plugin = createPluginConnection({ ...identity, env: {}, manual: { mode: 'reverse', host: '127.0.0.1', port, token } })
  t.after(() => plugin.stop()); await plugin.start()
  const bad = new WebSocket(`ws://127.0.0.1:${port}/`, { headers: { Authorization: 'Bearer invalid-demo-token' } })
  await new Promise(r => bad.once('error', r))
  for (let i = 0; i < 2; i++) {
    const client = new WebSocket(`ws://127.0.0.1:${port}/`, { headers: { Authorization: `Bearer ${token}` } })
    await new Promise(r => client.once('open', r)); client.send(JSON.stringify({ type: 'ready' }))
    await plugin.api.waitForConnection(1000); assert.equal(plugin.connected, true)
    client.on('message', raw => { const msg = JSON.parse(String(raw)); client.send(JSON.stringify({ type: 'action_result', id: msg.id, ok: true, data: i })) })
    assert.equal(await plugin.api.call('get_plugin_context'), i)
    client.close(); await new Promise(r => client.once('close', r))
  }
})

test('runnable managed demo initializes administrator, gates lifecycle, and preserves identity across restart', { timeout: 15000 }, async t => {
  const f = fixture(t)
  const framework = new WebSocketServer({ port: 0, host: '127.0.0.1' })
  await new Promise(r => framework.once('listening', r))
  framework.on('connection', ws => ws.on('message', raw => { if (JSON.parse(String(raw)).type === 'auth') ws.send(JSON.stringify({ type: 'auth_ok' })) }))
  t.after(async () => { for (const ws of framework.clients) ws.terminate(); await new Promise(r => framework.close(r)) })
  const reservation = createServer().listen(0, '127.0.0.1'); await new Promise(r => reservation.once('listening', r))
  const port = reservation.address().port; await new Promise(r => reservation.close(r))
  writeFileSync(f.file, JSON.stringify({ ...f.metadata, websocket_url: `ws://127.0.0.1:${framework.address().port}/` }))
  const env = { ...process.env, ...f.env, MENGKA_PLUGIN_ADMIN_PORT: String(port) }
  const runtime = resolvePluginRuntime({}, env)
  const headers = { 'X-Mengka-Managed-Token': runtime.adminToken, 'X-Mengka-Managed-Origin': runtime.adminOrigin, 'Content-Type': 'application/json' }
  const call = (path, body, extra = headers) => fetch(`http://127.0.0.1:${port}${path}`, { headers: extra, method: body ? 'POST' : 'GET', ...(body ? { body: JSON.stringify(body) } : {}) })
  let child, prior
  async function stop() { if (child?.exitCode === null && child.signalCode === null) { const done = new Promise(r => child.once('exit', r)); child.kill(); await done } }
  t.after(stop)
  for (let cycle = 0; cycle < 2; cycle++) {
    child = spawn(process.execPath, ['examples/dual-mode/server.mjs'], { cwd: import.meta.dirname, env, stdio: 'ignore', windowsHide: true })
    let ready = false
    for (let attempt = 0; attempt < 100; attempt++) {
      try { ready = (await (await call('/api/managed/health')).json()).ready; if (ready) break } catch {}
      await new Promise(r => setTimeout(r, 25))
    }
    assert.equal(ready, true)
    assert.equal((await call('/api/admin/me', undefined, {})).status, 401)
    assert.equal((await call('/api/admin/me')).status, 503)
    assert.equal((await call('/api/managed/control', { action: 'activate' })).status, 200)
    const me = await (await call('/api/admin/me')).json()
    assert.equal(me.administrator.passwordLogin, false)
    if (prior) assert.deepEqual(me.administrator, prior)
    prior = me.administrator
    assert.equal((await call('/api/admin/me', undefined, { ...headers, Origin: 'https://evil.example' })).status, 401)
    assert.equal((await call('/api/managed/control', { action: 'stop' })).status, 200)
    assert.equal((await call('/api/admin/me')).status, 503)
    await stop()
  }
})
