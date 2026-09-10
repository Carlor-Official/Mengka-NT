import { createAPI } from './sdk.js'
import { createReverseAPI } from './reverse-sdk.js'
import { resolvePluginRuntime } from './plugin-runtime.js'

/** One start/stop interface for managed forward WS and standalone forward/reverse WS. */
export function createPluginConnection({ runtime, manual, env, ...identity } = {}) {
  runtime ||= resolvePluginRuntime(manual, env)
  const reverse = runtime.connection.mode === 'reverse'
  const api = reverse ? createReverseAPI({ ...identity, ...runtime.connection }) : createAPI({ ...identity, ...runtime.connection })
  let stopped = true, timer, connecting = false
  async function connectForward() {
    if (stopped || connecting || api.connected) return
    connecting = true
    try { await api.connect() } finally { connecting = false }
  }
  return {
    api, runtime,
    get connected() { return api.connected },
    async start() {
      if (!stopped) return
      stopped = false
      if (reverse) {
        try { await api.listen() } catch (error) { stopped = true; throw error }
      } else {
        timer = setInterval(() => { void connectForward().catch(() => {}) }, 5000)
        // Keep retrying after startup failure; caller still receives the first error.
        await connectForward()
      }
    },
    async stop() { stopped = true; clearInterval(timer); if (reverse) await api.close(); else api.disconnect() },
  }
}
