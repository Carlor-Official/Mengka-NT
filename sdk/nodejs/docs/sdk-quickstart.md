# Node.js SDK 快速开始

适用版本：**v2.1.5**。下载完整 Node.js SDK 目录，安装依赖：

```sh
npm install
```

在 SDK 目录创建 `example.mjs`：

```js
import { createPluginConnection } from './plugin-connection.js'

const connection = createPluginConnection({
  name: 'example-plugin',
  version: '1.0.0',
  author: 'Developer',
  manual: {
    mode: 'forward',
    host: process.env.MENGKA_WS_HOST || '127.0.0.1',
    port: Number(process.env.MENGKA_WS_PORT || 3001),
    token: process.env.MENGKA_SERVICE_TOKEN || '',
  },
})

connection.api.on('group_message_received', event => {
  // 在这里处理群消息事件。
})

try {
  await connection.start()
  if (connection.connected) {
    const context = await connection.api.call('get_plugin_context')
    console.log(context.available_actions)
  }
} catch (error) {
  console.error('连接失败：', error.message)
}

process.once('SIGINT', async () => { await connection.stop(); process.exit(0) })
process.once('SIGTERM', async () => { await connection.stop(); process.exit(0) })
```

手动接入时，在框架“插件对接”创建正向 WS 服务，把地址、端口与服务令牌通过环境变量提供给插件。需要反向 WS 时，将 `manual.mode` 改为 `reverse`，配置插件监听地址和端口，并在框架配置对应连接；反向 `start()` 成功表示监听成功，`connected=true` 后才能调用 API。

市场托管时，框架会提供连接配置，SDK 自动优先使用它。不要覆盖、复制或固定保存这些启动参数。普通原有 WS 插件可以继续使用对应连接方式。

## 调用 API

```js
const accounts = await connection.api.get_bot_list()
const profile = await connection.api.forProtocol('android').get_pet_profile({ self_id: 123456 })
```

账号接口使用 `self_id` 和明确的协议：`android` 或 `linuxqq`。宠物接口只支持 Android，且使用对象参数。通用调用可使用 `api.call(action, params)`，返回值为接口的业务数据，失败时抛出错误。

需要 `send_packet` 的插件先申请对应版本权限，并通过框架托管运行；不需要用户 Key。详见[插件 API 授权](plugin-api-authorization.md)及[send_packet](api/send_packet.md)。

完整方法、事件和服务管理接口见 SDK README；带管理页面的插件可参考[一体化插件接入](managed-plugins.md)与 SDK 中的 `examples/dual-mode/server.mjs`。

本地媒体文件请放在插件允许的数据目录或框架共享媒体目录，并使用结构化消息参数。目录外文件、跨目录链接和硬链接会被拒绝；远程图片或文件可使用 HTTP/HTTPS 地址。
