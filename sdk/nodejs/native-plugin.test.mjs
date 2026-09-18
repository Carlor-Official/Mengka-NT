import assert from 'node:assert/strict'
import { PassThrough } from 'node:stream'
import test from 'node:test'
import { createNativePlugin } from './native-plugin.js'

const tick = () => new Promise(resolve => setImmediate(resolve))

test('native plugin performs hello, event delivery and an action without WebSocket', async () => {
  const fromFramework = new PassThrough()
  const toFramework = new PassThrough()
  let written = ''
  toFramework.on('data', chunk => { written += chunk })
  const plugin = createNativePlugin({
    pluginId: 'native-fixture', version: '1.0.0', actions: ['get_bot_list'], events: ['system_event'],
    input: fromFramework, output: toFramework, allowMissingManagedStorage: true,
  })
  const events = []
  plugin.ctx.events.on('system_heartbeat', event => events.push(event.status))
  const started = plugin.start()
  await tick()
  assert.match(written, /"type":"hello"/)
  fromFramework.write(`${JSON.stringify({ type: 'ready', transport: 'native-ipc-v1', api_version: '1', config_revision: 2, config: { enabled: true, nested: { mode: 'safe' } } })}\n`)
  await started
  assert.deepEqual(plugin.ctx.config.get(), { enabled: true, nested: { mode: 'safe' } })
  assert.equal(Object.isFrozen(plugin.ctx.config.get().nested), true)
	assert.equal(plugin.ctx.config.revision, 2)
	const configs = []
	plugin.ctx.config.onChange((value, revision) => configs.push([value, revision]))
	fromFramework.write(`${JSON.stringify({ type: 'config', revision: 3, data: { enabled: false } })}\n`)
	await tick()
	assert.deepEqual(configs, [[{ enabled: false }, 3]])
	assert.deepEqual(plugin.ctx.config.get(), { enabled: false })
  fromFramework.write(`${JSON.stringify({ type: 'event', data: { event_type: 'system_heartbeat', status: 'alive' } })}\n`)
  await tick()
  assert.deepEqual(events, ['alive'])

  const resultPromise = plugin.ctx.actions.call('get_bot_list', {})
  await tick()
  const request = written.trim().split('\n').map(JSON.parse).find(message => message.type === 'action')
  fromFramework.write(`${JSON.stringify({ type: 'action_result', id: request.id, ok: true, data: [123] })}\n`)
  assert.deepEqual(await resultPromise, [123])
  plugin.close()
})

test('native plugin rejects undeclared actions before sending', async () => {
  const plugin = createNativePlugin({
    pluginId: 'native-fixture', version: '1.0.0', actions: [], events: [],
    input: new PassThrough(), output: new PassThrough(), allowMissingManagedStorage: true,
  })
  await assert.rejects(plugin.ctx.actions.call('send_msg', {}), /not declared/)
  plugin.close()
})
