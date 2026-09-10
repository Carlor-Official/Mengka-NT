import { createServer } from 'node:http'
import { timingSafeEqual } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createPluginConnection } from '../../plugin-connection.js'
import { authorizeManagedRequest, managedAdminPrincipal, createManagedLifecycle } from '../../plugin-runtime.js'

const plugin = createPluginConnection({ name: 'demo-plugin', version: '1.0.0', author: 'Demo Developer',
  manual: { mode: process.env.DEMO_WS_MODE || 'forward', host: process.env.DEMO_WS_HOST || '127.0.0.1', port: Number(process.env.DEMO_WS_PORT || 3001), token: process.env.DEMO_WS_TOKEN } })
const { runtime } = plugin
const lifecycle = createManagedLifecycle(runtime, { connected: () => plugin.connected })
const password = process.env.DEMO_ADMIN_PASSWORD || ''
if (!runtime.managed && password.length < 12) throw new Error('Set DEMO_ADMIN_PASSWORD (at least 12 characters)')

// Production databases should enforce UNIQUE(subject) in a transaction.
// This single-process demo uses exclusive creation, checks collisions, and never creates a password for the managed identity.
let administrator
if (runtime.managed) {
  const principal = managedAdminPrincipal(runtime)
  mkdirSync(runtime.dataDirectory, { recursive: true })
  const file = join(runtime.dataDirectory, 'demo-administrator.json')
  try { writeFileSync(file, JSON.stringify(principal), { flag: 'wx', mode: 0o600 }) } catch (error) { if (error.code !== 'EEXIST') throw error }
  administrator = JSON.parse(readFileSync(file, 'utf8'))
  if (JSON.stringify(administrator) !== JSON.stringify(principal)) throw new Error('Managed administrator identity conflict')
}
function manualAuth(req) {
  const expected = Buffer.from('Basic ' + Buffer.from(`demo:${password}`).toString('base64'))
  const actual = Buffer.from(req.headers.authorization || '')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}
const server = createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  const reply = (code, body) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(body)) }
  if (!(runtime.managed ? authorizeManagedRequest(runtime, req) : manualAuth(req))) {
    if (!runtime.managed) res.setHeader('WWW-Authenticate', 'Basic realm="Demo plugin"')
    return reply(401, { error: runtime.managed ? 'Open this plugin from the framework' : 'Administrator login required' })
  }
  const path = new URL(req.url, 'http://localhost').pathname
  if (runtime.managed && path === '/api/managed/health' && req.method === 'GET') return reply(200, lifecycle.health())
  if (runtime.managed && path === '/api/managed/control' && req.method === 'POST') {
    let body = ''
    try {
      for await (const chunk of req) { body += chunk; if (body.length > 4096) return reply(413, { error: 'Body too large' }) }
      return reply(200, lifecycle.control(JSON.parse(body).action))
    } catch { return reply(400, { error: 'Invalid control request' }) }
  }
  if (!lifecycle.active) return reply(503, { error: 'Plugin has not been activated' })
  if (req.method === 'GET' && (path === '/' || path === '/api/admin/me')) return reply(200, {
    administrator: administrator || { displayName: 'Demo Administrator', role: 'admin' },
    managed: runtime.managed, connected: plugin.connected,
  })
  reply(404, { error: 'Not found' })
})
server.requestTimeout = 10000
server.listen(runtime.managed ? runtime.adminPort : Number(process.env.DEMO_ADMIN_PORT || 8088), '127.0.0.1')
server.on('error', error => { console.error('Admin listener failed:', error.code); void plugin.stop(); process.exitCode = 1 })
await plugin.start().catch(() => console.error('Framework not connected yet; retrying automatically'))
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await plugin.stop(); server.close() })
