# Node.js SDK

此目录提供不带版本子目录的萌卡 NT Node.js SDK：

- `sdk.js`：正向 WebSocket，由插件连接萌卡 NT。
- `reverse-sdk.js`：反向 WebSocket，由萌卡 NT 连接插件。

当前 SDK 已与萌卡 NT 1.8.2 的 198 个公开 API 同步。插件市场服务的可调用 API 和可订阅事件以开发者在萌卡 NT 官网勾选、审核并随安装冻结的权限快照为准；SDK 中存在某个方法不代表插件已经获得该权限。

本轮补充了随机设备指纹、群成员名片、群红包、媒体 RKey、用户在线状态、小程序与 Ark 分享、带内容绑定签名的音乐 Ark、AI 语音、语音转文字、消息表情回应、输入状态、可疑好友申请、空间动态、群文件移动与重命名以及原生协议包调用方法。正向和反向 SDK 的参数顺序保持一致。

目录中尚未提供便捷方法的 API，可以使用通用调用入口：

```js
await api.call('action_name', { self_id, ...params }, { timeout: 60000 })
```

`api.callAction` 与 `api.call` 等价。调用仍会经过服务授权检查。

`send_packet` 除原有参数外还必须在 action 外层携带算法系统签发的专属 Key。推荐通过 SDK 配置注入，Key 不会进入 `params`，因此 `self_id/cmd/data/rsp/reserve` 契约保持不变：

```js
const api = createAPI({
  host: '127.0.0.1',
  port: 3001,
  token: process.env.MENGKA_PLUGIN_TOKEN,
  pluginId: 'example-plugin',
  // 专属 Key 由框架管理端固定绑定，插件通常无需配置。
  // sendPacketKey 仅保留给旧版 envelope 兼容，且必须与框架绑定值一致。
  sendPacketKey: process.env.MENGKA_SEND_PACKET_KEY || '',
  name: 'example',
  version: '1.0.0',
  author: 'developer',
})

await api.send_packet(self_id, cmd, data, true, reserve)
```

运行中轮换 Key 可以调用 `api.setSendPacketKey(newKey)`。通用入口也可以对单次调用传入 `{ accessKey }`。不要把专属 Key 写入源码、URL、业务日志或错误信息。

随机设备指纹与框架前端“指纹 → 添加指纹 → 一键生成其余内容”使用同一套规则。接口不需要参数，会创建并保存一条随机命名的独立指纹记录；返回的 `id` 可以直接作为 `add_account` 的 `device_profile_id`：

```js
const profile = await api.generate_device_profile()
await api.add_account(self_id, password, protocol_id, profile.id)
```

Linux 账号使用萌卡 NT 原生 WTLogin 扫码登录；创建接口在账号不存在时会自动加入当前节点，查询接口在手机确认后自动完成登录：

```js
const qr = await api.create_linux_login_qr(self_id, linux_protocol_id, profile.id)
// 展示 qr.image（PNG data URL）或用 qr.url 生成二维码
const state = await api.query_linux_login_qr(self_id)
```

在线 Android Bot 也可以扫描并授权另一个登录二维码：

```js
await api.scan_qr(android_self_id, qr_url_or_k)
await api.auth_qr(android_self_id, qr_url_or_k, false)
```

红包接口会保留规范的 `red_packet` 嵌套对象，并兼容尚未更新的框架版本。第 4 个参数既可以传消息段的 `data`，也可以传完整的 `red_packet` 消息段：

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const info = await api.get_red_packet_info(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket,
)
const result = await api.grab_red_packet(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket,
  info.pre_grap_token,
)
```

安装依赖：

```bash
npm install
```

正向模式：

```js
import { createAPI } from './sdk.js'
```

反向模式：

```js
import { createReverseAPI } from './reverse-sdk.js'
```

群聊和私聊原生引用回复直接复用现有发送 API。`message_id` 使用消息事件或发送接口返回的值：

```js
await api.send_group_msg(self_id, group_id, [
  { type: 'reply', data: { message_id: event.message_id } },
  { type: 'text', data: { text: '引用回复正文' } },
])

await api.send_friend_msg(self_id, user_id, [
  { type: 'reply', data: { message_id: event.message_id } },
  { type: 'text', data: { text: '引用回复正文' } },
])
```

群成员无需互为好友也可以通过来源群发起临时会话：

```js
await api.send_group_temp_msg(self_id, group_id, user_id, [
  { type: 'text', data: { text: '你好，这是群临时会话。' } },
])
```

发送群红包支持 `lucky`、`normal`、`exclusive`、`voice` 和 `command` 五种类型。金额单位为分，支付密码只应在本次调用中传入：

```js
await api.send_group_red_packet(
  self_id,
  group_id,
  'normal',
  100,
  2,
  payment_password,
  '恭喜发财',
)
```

可运行示例位于仓库的 `plugin/正向WebSocket/Node.js` 和 `plugin/反向WebSocket/Node.js`。
