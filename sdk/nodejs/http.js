import { actionMethods, validate, result, timeoutValue, SDKError } from './common.js'

export function createHTTPAPI(options = {}) {
  const base = new URL(options.url)
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) throw new TypeError('Use an http/https URL without credentials or query token')
  if (typeof options.token !== 'string' || !options.token) throw new TypeError('token is required')
  const api = { async call(action, params = {}, callOptions = {}) {
    const value = validate(action, params, 'http')
    const timeoutMs = timeoutValue(callOptions.timeoutMs)
    const controller = new AbortController()
    if (callOptions.signal?.aborted) throw new SDKError('Request aborted', { code: 'ABORTED', uncertain: false })
    const abort = () => controller.abort()
    callOptions.signal?.addEventListener('abort', abort, { once: true })
    const timer = setTimeout(abort, timeoutMs)
    try {
      const response = await fetch(new URL(`api/${action}`, base.href.endsWith('/') ? base : `${base.href}/`), { method: 'POST', redirect: 'error', headers: { Authorization: `Bearer ${options.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(value), signal: controller.signal })
      const body = await response.json()
      if (!response.ok && body.ok === true) throw new SDKError(`HTTP ${response.status}`, { httpStatus: response.status })
      try { return result(body) } catch (error) { error.httpStatus = response.status; throw error }
    } catch (error) {
      if (error instanceof SDKError) throw error
      throw new SDKError(controller.signal.aborted ? 'Stopped waiting; request may have executed' : 'HTTP request failed; request may have executed', { code: controller.signal.aborted ? 'ABORTED' : 'TRANSPORT', uncertain: true })
    } finally { clearTimeout(timer); callOptions.signal?.removeEventListener('abort', abort) }
  } }
  return actionMethods(api, api.call)
}
