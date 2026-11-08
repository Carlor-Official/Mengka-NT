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

SDK 保留普通 API 和仅托管 IPC 可用的账号委托 API 方法及参数类型，已移除的方法会在发送请求前返回 `API_REMOVED`。接口参数类型见 `contracts.d.ts`；返回值保持框架原样，具体字段请查 [API 文档](https://mengka.net/nt/api/)。账号范围、权益、等级及文件权限由框架检查，SDK 不绕过检查。

QQ 宠物通过 `qqpet_operation` 调用文档中的 30 项业务操作，`catalog` 用于查询操作目录。其余宠物底层接口以及已移除的好友申请、群申请、群临时消息与文件上传接口不可调用。具名方法和 `call()` 遵守相同规则；错误包含 `code: 'API_REMOVED'`、`status: 'removed'`、`action` 和 `uncertain: false`。

自定义发包、等级加速、第三方扫码授权及红包领取/领取材料接口：Free 不可调用；Plus 每次调用核对对应 QQ 最新等级（至少 32 级）；Pro 不设这项等级门槛。含红包消息段的事件也按此规则控制推送。自框架 3.0.7 起，其他 API（包括 QQ 宠物和独立农场）不额外限制 QQ 等级，仍需满足账号在线、当前授权及接口业务条件。SDK 不根据本地角色、账号列表里的缓存等级或自行延时来授予权限，接口与事件仍由框架校验；仅更新 SDK 不会改变旧框架的权益规则。

自身扫码登录与第三方扫码授权分别校验：支持此规则的框架中，`get_login_qr`、`query_login_qr`、登录安全验证二维码及 `login_account` 的 Linux 无密码扫码分支，Free 禁止调用，Plus / Pro 不设 QQ 等级前置条件；仍须通过 VM 实时权益检查。`scan_qr` / `auth_qr` 等第三方扫码授权继续要求 Plus 每次通过 VM 核验所选在线 QQ 的最新等级至少 32 级；Free 仍禁用，Pro 无此等级门槛。仅更新 SDK 不会改变旧框架权益，账号页正常登录及其他安全校验保持。

`login_account` 对 Linux 账号使用已保存的密码登录；未保存密码而转为获取登录二维码时，遵守上述自身扫码登录权益。常规密码登录及框架管理员账号页的正常扫码流程保持各自原有规则。

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
plugin.logger.info('可用接口', context.available_actions)
// 数据保存在 plugin.dataPath；程序结束时调用 plugin.close()。
```

`pluginId`、`version` 和 `actions` 必须与安装包 `mengka-plugin.json` 对应。插件安装清单使用 schema 3，根层 `framework_api` 为 `"3.0.0"`，`runtime.transport` 为 `"native-ipc-v1"`，`runtime.api_version` 为 `"1"`。它们是协议标识，不随框架补丁版本改动。hello 的 `api_version` 同样为 `"1"`。

框架通过 `MENGKA_PLUGIN_CONNECTION_FILE` 传入插件实例和数据目录。SDK 将握手中的实例标识与该文件核对。stdout 专用于 IPC JSON 行协议，日志请使用 `plugin.logger`（stderr）。当前协议只有握手、事件与请求结果，没有旧 SDK 的配置快照热更或 activate/stop 控制帧。进程停止以管道关闭为准。

Linux 框架的 IPC 导入仍需要 Docker，先检查并准备环境，再按 Docker Engine 的目标架构打包 `linux/amd64` 或 `linux/arm64` 可执行入口与运行依赖。自 3.0.7 起，Windows 框架直接运行 Windows amd64 PE 可执行入口（通常是 `.exe`），不需要 Docker。Windows 原生插件使用框架运行账号的权限，不具备同等容器文件系统隔离，只导入可信插件。源码 SDK 不包含 Node 可执行程序，不能直接以 `.js` 文件作为入口，也不能依赖宿主机的 Node。业务数据统一写入 `plugin.dataPath`；Linux 容器使用持久化 `/data` 和只读 `/plugin`，Windows 使用框架分配的实际目录。外部 HTTP / WebSocket 接入不需要 Docker；参见 [插件导入文档](https://mengka.net/nt/reference/managed-plugins.html)。

## 事件

`api.on('event', handler)` 接收全部获授权事件，也可按原生 `post_type` 订阅。详细类型见 `events.d.ts`，不转换为旧事件别名。

事件权限为 `group_message`、`friend_message`、`group_event`、`friend_event`、`bot_online`、`bot_offline`、`system_event`。群临时消息使用 `friend_message` 权限。系统事件是连接级别，没有 QQ 账号身份。`msg.uid`、好友申请 `request_id` 是十进制字符串，请勿转成 Number。

## 登录安全验证与消息回应

在网页完成当前 NT 登录的安全验证后，使用同一账号和协议继续登录；读取返回的 `next`，只有 `done` 才表示登录完成。

```js
const login = await api.ntlogin_retry_security_verify({ self_id: 123456789, protocol_id: 0 })
console.error(login.next)
```

有原生群消息序号时使用 `set_group_msg_reaction`；`is_add: false` 表示取消回应。`msg_seq` 不能用框架的 `message_id` 代替；只有框架消息编号时仍使用 `set_msg_emoji_like`。

```js
await api.set_group_msg_reaction({
  self_id: 123456789, protocol_id: 0, group_id: 987654321,
  msg_seq: 100, emoji_id: '76', is_add: false,
})
```

参数与返回值见 [NT 安全验证继续登录](https://mengka.net/nt/api/ntlogin_retry_security_verify.html)和[群消息表情回应](https://mengka.net/nt/api/set_group_msg_reaction.html)。

## QQ 农场登录码

支持双协议取码的框架版本可为 Android 和 Linux QQ 账号获取登录码。使用账号实际的 `protocol_id`；这是协议配置 ID，`0` 有效，不是固定的平台枚举。旧框架若返回不支持，请升级框架，SDK 不会切换账号或自动回退到另一协议。

`get_qq_classic_farm_code` 和通用 `call` 均返回 `{ code: string }`。`code` 是临时登录凭据，不是业务状态码；不要写入日志、错误上报或公开分享。该接口不会自动登录游戏，也不表示等级任务已完成。

```js
async function loginFarm(api, selfId, protocolId, loginWithCode) {
  const { code } = await api.get_qq_classic_farm_code({
    self_id: selfId, protocol_id: protocolId,
  })
  await loginWithCode(code) // 插件自己的农场登录实现；不打印登录码。
}
```

参数、适用协议和错误说明见 [QQ 农场登录码](https://mengka.net/nt/api/get_qq_classic_farm_code.html)。
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

