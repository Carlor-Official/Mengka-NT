# Node.js SDK

此目录提供不带版本子目录的萌卡 NT Node.js SDK：

- `sdk.js`：正向 WebSocket，由插件连接萌卡 NT。
- `reverse-sdk.js`：反向 WebSocket，由萌卡 NT 连接插件。

当前 2.0.0 正向与反向 SDK 均提供 218 个 action，只有一套当前参数契约。`system_management` 不是另一套 API，而是现有处理器之上的权限覆盖层。插件市场服务的可调用 API 和可订阅事件仍以审核并随安装冻结的权限快照为准；SDK 中存在某个方法不代表插件已经获得该权限。

## 1.9.8 系统管理接口

系统管理服务必须在框架服务设置中同时开启 `system_management`，并逐项勾选需要的 action。普通插件仍受绑定节点隔离；客户端隐藏按钮不能代替框架服务端鉴权。

```js
const context = await api.get_plugin_context()
if (!context.system_management) throw new Error('框架未授权系统管理权限')

const nodes = await api.get_node_list()
const bots = await api.get_bot_list({ all_nodes: true })

await api.add_account({
  self_id,
  password,
  protocol_id,
  device_profile_id,
  node_id: nodes[0].id,
  client_type: 'linuxqq',
})
```

系统管理完整权限包共 42 个 action：24 个框架管理专用接口，加上 18 个复用原处理器的 Bot 管理接口。

24 个管理专用 action 分为：

- 插件与节点：`get_plugin_context`、`get_node_list`、`create_node`、`update_node`、`delete_node`、`test_node_latency`
- 指纹：`create_device_profile`、`delete_device_profile`
- 账号设置与缓存：`get_account_settings`、`update_account_settings`、`clear_account_cache`、`stop_account_login`
- 身份与安全验证：`submit_account_identity_captcha`、`submit_account_identity_phone`、`confirm_account_identity_sms`、`retry_account_identity_verify`、`open_account_security_access`、`retry_account_security_verify`
- 授权租约与诊断：`get_account_access_list`、`set_account_access`、`clear_account_access`、`get_account_recent_logs`
- 账号归属验证：`create_account_recovery_qr`、`query_account_recovery_qr_status`。二维码由 Linux 原生链路生成，仅在手机 QQ 确认后返回账号，不执行登录、不保存登录票据。

18 个复用接口为：`get_bot_list`、`get_bot_info`、`get_protocol_list`、`get_device_profile_list`、`add_account`、`update_account`、`delete_account`、`login_account`、`check_cache`、`cache_login`、`submit_slider`、`get_security_verify_methods`、`get_sms`、`check_sms`、`create_login_qr`、`query_login_qr_status`、`get_level_tasks`、`execute_level_tasks`。获得对应授权后，它们只扩展到跨节点作用域，仍执行原 Bot 管理处理器。

`create_device_profile`、`stop_account_login` 是当前唯一名称；`generate_device_profile`、`offline_account` 不再注册。`add_account`、`update_account` 只接受对象参数，不再接受旧位置参数。

节点列表不会返回代理密码；更新节点时省略 `proxy_password` 表示保留，传空字符串表示清除。账号授权租约按 `(self_id, platform)` 独立，Android 与 Linux 不共享权益。

本轮补充了随机设备指纹、群成员名片、群红包、媒体 RKey、用户在线状态、小程序与 Ark 分享、带内容绑定签名的音乐 Ark、AI 语音、语音转文字、消息表情回应、输入状态、可疑好友申请、空间动态、群文件移动与重命名以及原生协议包调用方法。正向和反向 SDK 的参数顺序保持一致。

目录中尚未提供便捷方法的 API，可以使用通用调用入口：

```js
await api.call('action_name', { self_id, ...params }, { timeout: 60000 })
```

`api.callAction` 与 `api.call` 等价。调用仍会经过服务授权检查。

`send_packet` 与 30 个 QQ 宠物 API 由框架统一执行专属 Key 鉴权。插件只提交原有业务参数，框架会自动读取当前实例已固定绑定并加密保存的 Key；插件配置、action 外层和 `params` 均不接受 `access_key`：

```js
const api = createAPI({
  host: '127.0.0.1',
  port: 3001,
  token: process.env.MENGKA_PLUGIN_TOKEN,
  pluginId: 'example-plugin',
  name: 'example',
  version: '1.0.0',
  author: 'developer',
})

await api.send_packet(self_id, cmd, data, true, reserve)
```

Key 的选择、固定绑定、续期和吊销只在框架管理端完成。插件无权读取、提交、替换或记录完整 Key；绑定失效时，框架会返回稳定的专属 Key 鉴权错误。

随机设备指纹与框架前端“指纹 → 添加指纹 → 一键生成其余内容”使用同一套规则。接口不需要参数，会创建并保存一条随机命名的独立指纹记录；返回的 `id` 可以直接作为 `add_account` 的 `device_profile_id`：

```js
const profile = await api.create_device_profile()
await api.add_account({ self_id, password, protocol_id, device_profile_id: profile.id, node_id, client_type: 'android' })
```

Linux 账号登录完整使用框架管理端的原生账号链路。调用 `login_account` 并传 `client_type: 'linuxqq'` 时，框架会返回原生二维码信息；使用现有 `query_login_qr_status` 按管理端相同的 1.5 秒间隔查询，确认后由框架完成上线。二维码失效后可调用现有 `create_login_qr` 刷新，不新增平行 action。

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
