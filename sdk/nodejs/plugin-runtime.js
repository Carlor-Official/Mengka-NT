import { readFileSync, realpathSync, statSync } from 'node:fs'
import { dirname, isAbsolute } from 'node:path'
import { timingSafeEqual } from 'node:crypto'
import { loadManagedConnection, loadManagedStorage } from './managed-connection.js'

/** Server-side deployment contract. Never return this object to a browser or log it. */
export function resolvePluginRuntime(manual = {}, env = process.env) {
  const managedKeys = Object.keys(env).filter(k => k.startsWith('MENGKA_PLUGIN_') && env[k])
  if (env.MENGKA_MANAGED_V1 !== '1') {
    if (env.MENGKA_MANAGED_V1 || managedKeys.length) throw new Error('Incomplete managed environment')
    const { mode = 'forward', host = '127.0.0.1', port = 3001, token = '' } = manual
    if (!['forward', 'reverse'].includes(mode) || typeof host !== 'string' || !host.trim() || /[\s/\\?#@]/.test(host)
      || !Number.isInteger(port) || port < 1 || port > 65535 || typeof token !== 'string' || !token.trim()) throw new Error('Invalid manual WS configuration')
    return { managed: false, connection: { mode, host, port, token } }
  }
  const file = env.MENGKA_PLUGIN_CONNECTION_FILE
  const connection = loadManagedConnection(file)
  const storage = loadManagedStorage(file)
  if (!isAbsolute(env.MENGKA_PLUGIN_DATA_DIR || '') || realpathSync(env.MENGKA_PLUGIN_DATA_DIR) !== storage.dataDirectory) throw new Error('Managed data directory mismatch')
  const adminFile = env.MENGKA_PLUGIN_ADMIN_TOKEN_FILE
  if (!isAbsolute(adminFile || '') || dirname(realpathSync(adminFile)) !== dirname(realpathSync(file)) || statSync(adminFile).size > 4096) throw new Error('Invalid managed admin token file')
  const adminToken = readFileSync(adminFile, 'utf8').trim()
  const adminPort = Number(env.MENGKA_PLUGIN_ADMIN_PORT)
  const origin = new URL(env.MENGKA_PLUGIN_ADMIN_ORIGIN || '')
  if (adminToken.length < 24 || env.MENGKA_PLUGIN_ADMIN_HOST !== '127.0.0.1' || !Number.isInteger(adminPort) || adminPort < 1 || adminPort > 65535
    || !['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) throw new Error('Invalid managed admin configuration')
  const metadata = JSON.parse(readFileSync(file, 'utf8'))
  return { managed: true, instanceId: metadata.instance_id, connection: { mode: 'forward', ...connection },
    ...storage, adminHost: '127.0.0.1', adminPort, adminOrigin: origin.origin, adminToken }
}

/** Validate socket peer, gateway credential and browser origin BEFORE granting local admin. */
export function authorizeManagedRequest(runtime, req) {
  if (!runtime?.managed || !['127.0.0.1', '::ffff:127.0.0.1', '::1'].includes(req.socket?.remoteAddress)) return false
  const raw = req.headers?.['x-mengka-managed-token']
  if (typeof raw !== 'string' || !runtime.adminToken) return false
  const actual = Buffer.from(raw), expected = Buffer.from(runtime.adminToken)
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false
  const path = String(req.url || '').split('?')[0]
  const control = path === '/api/managed/health' || path === '/api/managed/control'
  if (!control && req.headers['x-mengka-managed-origin'] !== runtime.adminOrigin) return false
  const origin = req.headers.origin
  return origin === undefined || origin === runtime.adminOrigin
}

/** A reserved service identity, not a browser-supplied user or a reusable login password.
 * Persist it using a UNIQUE instance ID and a transaction/upsert; reject collisions with ordinary users.
 * Call only during managed startup or after authorizeManagedRequest succeeds.
 */
export function managedAdminPrincipal(runtime) {
  if (!runtime?.managed || !/^[a-zA-Z0-9._-]+$/.test(runtime.instanceId || '')) throw new Error('Managed runtime required')
  return Object.freeze({ subject: `framework-managed:${runtime.instanceId}`, instanceId: runtime.instanceId,
    displayName: '框架管理员', role: 'admin', source: 'framework_managed', passwordLogin: false })
}

/** Lifecycle gate: establish WS first, begin business side effects only after activate. */
export function createManagedLifecycle(runtime, { connected = () => false, configured = () => true } = {}) {
  let active = !runtime.managed
  return {
    get active() { return active },
    health() { const online = Boolean(connected()); return { ready: online, connected: online, configured: Boolean(configured()) } },
    control(action) {
      if (!runtime.managed || !['activate', 'stop'].includes(action)) throw new Error('Unsupported managed control')
      active = action === 'activate'
      return { active }
    },
  }
}
