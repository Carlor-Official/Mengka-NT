import { createNativePlugin } from '../index.js'
const plugin = createNativePlugin({ pluginId: 'sdk.example', version: '1.0.0', actions: ['get_plugin_context'] })
plugin.on('event', event => plugin.logger.info(event.post_type))
await plugin.start()
plugin.logger.info(await plugin.api.get_plugin_context({}))
plugin.close()
