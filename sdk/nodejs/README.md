# 萌卡 NT Node.js SDK

用于当前萌卡 NT 插件接口的 JavaScript / TypeScript 客户端，支持正向 WebSocket、反向 WebSocket、HTTP 和框架托管 IPC。Node.js 22 或更高版本。

下载 [最新 SDK ZIP](https://github.com/Carlor-Official/Mengka-NT/raw/refs/heads/main/sdk/releases/mengka-nt-node-sdk.zip)，或查看 [SDK 源码](https://github.com/Carlor-Official/Mengka-NT/tree/main/sdk/nodejs)。接入说明见 [官网文档](https://mengka.net/nt/development/nodejs-sdk.html)，下载校验见 [SHA256](https://github.com/Carlor-Official/Mengka-NT/raw/refs/heads/main/sdk/releases/mengka-nt-node-sdk.zip.sha256)。

## 安装

下载 SDK 独立 ZIP 并解压，在目录执行 `npm ci --omit=dev`。将该目录作为项目中的本地依赖，或直接从 `index.js` 导入。

## WebSocket

```js
import { createAPI } from './index.js'

const api = createAPI({
  url: 'ws://127.0.0.1:3001/',
  token: process.env.MENGKA_SERVICE_TOKEN,
  name: 'example', version: '1.0.0', author: 'developer',
  permissions: { group_message: true, friend_message: true, system_event: true },
})
api.on('event', event => {
  // 原样保留 post_type / sub_type 和事件字段。
  if (event.post_type === 'group_message') console.error(event.msg.uid)
})
await api.connect()
const accounts = await api.get_bot_list({})
console.error(accounts)
api.close()
```

所有 API 使用对象参数：`api.action_name(params, options)` 或 `api.call(action, params, options)`。账号接口按 `self_id` 和 `protocol_id` 定位；协议 ID 0 有效，须读取框架实际返回的 ID。旧位置参数、`client_type`、`forProtocol` 不再支持。

SDK 保留普通 API 和仅托管 IPC 可用的账号委托 API 方法及参数类型，已移除的方法会在发送请求前返回 `API_REMOVED`。接口参数类型见 `contracts.d.ts`；返回值保持框架原样，具体字段请查 [API 文档](https://mengka.net/nt/api/)。节点作用域、权益、等级及文件权限由框架检查，SDK 不绕过检查。

QQ 宠物通过 `qqpet_operation` 调用文档中的 30 项业务操作，`catalog` 用于查询操作目录。其余宠物底层接口以及已移除的好友申请、群申请、群临时消息与文件上传接口不可调用。具名方法和 `call()` 遵守相同规则；错误包含 `code: 'API_REMOVED'`、`status: 'removed'`、`action` 和 `uncertain: false`。

## 反向 WebSocket

```js
import { createReverseAPI } from './index.js'
const api = createReverseAPI({
  host: '127.0.0.1', port: 3002, path: '/', token: process.env.MENGKA_SERVICE_TOKEN,
  name: 'example', version: '1.0.0', author: 'developer',
  permissions: { group_message: true },
})
api.on('ready', async () => {
  try { console.error(await api.get_plugin_context({})) } catch (error) { console.error(error.message) }
})
api.on('event', event => console.error(event.post_type))
await api.listen()
```

将框架反向服务地址指向此监听端口，并设置相同令牌。SDK 验证 Authorization Bearer 后等待框架 `ready`，发送 `plugin_info`，收到确认后才允许请求。一个 SDK 实例接入一个框架连接；已有连接时拒绝新连接挤占。断开后由框架重新连接，不重放请求。

## HTTP

```js
import { createHTTPAPI } from './index.js'
const api = createHTTPAPI({ url: 'http://127.0.0.1:3003/', token: process.env.MENGKA_SERVICE_TOKEN })
console.error(await api.get_bot_list({}))
```

HTTP 请求使用 `POST /api/{action}` 和 JSON 参数对象，令牌放在 Authorization 请求头，不放 URL。HTTP 客户端不接收事件，也不跟随重定向。

## 托管 IPC

```js
import { createNativePlugin } from './index.js'
const plugin = createNativePlugin({ pluginId: 'example.plugin', version: '1.0.0', actions: ['get_plugin_context'] })
plugin.on('event', event => plugin.logger.info(event.post_type))
await plugin.start()
const context = await plugin.api.get_plugin_context({})
plugin.logger.info('节点', context.node_id)
// 数据保存在 plugin.dataPath；程序结束时调用 plugin.close()。
```

`pluginId`、`version` 和 `actions` 必须与安装包 `mengka-plugin.json` 对应。插件安装清单使用 schema 3，根层 `framework_api` 为 `"3.0.0"`，`runtime.transport` 为 `"native-ipc-v1"`，`runtime.api_version` 为 `"1"`。它们是协议标识，不随框架补丁版本改动。hello 的 `api_version` 同样为 `"1"`。

框架通过 `MENGKA_PLUGIN_CONNECTION_FILE` 传入实例、节点和数据目录。stdout 专用于 IPC JSON 行协议，日志请使用 `plugin.logger`（stderr）。当前协议只有握手、事件与请求结果，没有旧 SDK 的配置快照热更或 activate/stop 控制帧。进程停止以管道关闭为准。

源码 SDK 不包含 Node 可执行程序。框架运行插件时不会继承系统 Node 搜索路径，导入插件包需要按平台携带可执行入口与所需运行时；参见 [插件导入文档](https://mengka.net/nt/reference/managed-plugins.html)。

## 事件

`api.on('event', handler)` 接收全部获授权事件，也可按原生 `post_type` 订阅。详细类型见 `events.d.ts`，不转换为旧事件别名。

事件权限为 `group_message`、`friend_message`、`group_event`、`friend_event`、`bot_online`、`bot_offline`、`system_event`。群临时消息使用 `friend_message` 权限。系统事件是连接级别，没有 QQ 账号身份。`msg.uid`、好友申请 `request_id` 是十进制字符串，请勿转成 Number。

## 错误与重试

```js
try {
  await api.call('get_bot_info', { self_id: 123456789, protocol_id: 0 }, { timeoutMs: 30000 })
} catch (error) {
  console.error(error.message)
  // error.response 保留业务返回；等级限制含 requiredLevel/currentLevel。
  // error.uncertain=true 时操作可能已执行，应查询实际结果后人工决定是否重试。
}
```

默认等待 30 秒。`timeoutMs` 和 `AbortSignal` 只停止等待，不能撤销已发送的操作。超时、断线、网络失败均不会自动重发。正向连接由调用方显式再次 `connect()`；反向连接由框架重连。长等级任务可显式设置 `{ timeoutMs: 15 * 60 * 1000 }`，不要在超时后直接重复执行。

## 示例

`examples-v3` 包含正向 WebSocket、HTTP 与托管 IPC 示例。先按示例配置服务地址、令牌及插件清单，再运行对应入口。SDK 附件不包含框架服务端或 Node.js 运行时。
