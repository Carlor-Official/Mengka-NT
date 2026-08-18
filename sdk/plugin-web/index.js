const host = typeof window !== 'undefined' ? window.__MENGKA_PLUGIN_HOST__ || null : null

export function getPluginHost() {
  return host
}

export function isFrameworkHosted() {
  return Boolean(host?.embedded && host?.basePath)
}

export function resolvePluginPath(path = '/') {
  const value = String(path || '/')
  if (!isFrameworkHosted() || !value.startsWith('/')) return value
  return `${String(host.basePath).replace(/\/$/, '')}${value}`
}

export function pluginFetch(path, options) {
  return fetch(resolvePluginPath(path), {
    credentials: 'same-origin',
    ...options
  })
}

function notifyHost(type, payload = {}) {
  if (!isFrameworkHosted() || typeof window === 'undefined' || window.parent === window) return
  window.parent.postMessage({ source: 'mengka-plugin-web', version: 1, type, ...payload }, window.location.origin)
}

export function ready() {
  notifyHost('ready')
}

export function setTitle(title) {
  notifyHost('title', { title: String(title || '').slice(0, 80) })
}

export default {
  getPluginHost,
  isFrameworkHosted,
  resolvePluginPath,
  pluginFetch,
  ready,
  setTitle
}
