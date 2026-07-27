# Bot 登录 API

本文描述插件通过 `sdk.js` 调用 Bot 登录接口时的流程。账号必须已创建，且发起登录或缓存登录时处于离线状态。

`sdk.js` 中的调用结果就是下文的业务数据，例如：

```js
const result = await api.login_account(123456789)
```

底层 WebSocket 会使用 `action_result.ok` 表示请求是否成功处理；插件正常使用 SDK 时无需处理该信封。QQ 登录结果一律看业务数据中的 `code`，不要用传输层的 `ok` 判断登录是否成功。

## 权限范围

插件只能操作**自身绑定节点**下的 Bot。`get_bot_list()` 仅返回该节点的账号；`add_account` 会将新账号添加到该节点；`update_account`、`offline_account`、`delete_account`、`login_account`、验证提交和缓存登录都只接受该节点的账号。账号不属于当前插件绑定节点时，请求会失败，插件不能通过任何参数指定或操作其他节点。

## 账号准备

登录前必须先为账号选定协议和设备指纹。两个查询 API 均不需要账号参数：

```js
const protocols = await api.get_protocol_list()
const profiles = await api.get_device_profile_list()
```

`get_protocol_list()` 返回本地 `protocol.json` 的完整数组，`protocol_id` 是所选项目的数组下标。`get_device_profile_list()` 返回完整设备指纹记录，`device_profile_id` 使用所选记录的 `id`。

使用选出的 ID 添加账号：

```js
await api.add_account(account, password, protocolId, deviceProfileId)
```

账号已存在且需要修改密码、协议或设备指纹时，账号必须先处于离线状态，再调用：

```js
await api.update_account(account, password, protocolId, deviceProfileId)
```

账号状态查询、离线和删除接口：

```js
const bots = await api.get_bot_list()
await api.offline_account(account) // 登录中时取消登录；已登录时使账号离线
await api.delete_account(account)  // 仅可删除离线账号
```

## 登录前状态处理

`login_account` 和 `cache_login` 只接受状态为 `0` 的离线账号。发起任一登录前，先从 `get_bot_list()` 找到账号并检查 `status`；如果状态不为 `0`，必须先调用离线接口，等待其完成后再登录：

```js
const bots = await api.get_bot_list()
const bot = bots.find(item => item.self_id === account)

if (bot && bot.status !== 0) {
  await api.offline_account(account)
}

const result = await api.login_account(account)
// 或：const result = await api.cache_login(account)
```

`offline_account(account)` 会取消登录中的账号或使已登录账号离线。

## 密码登录

调用：

```js
const result = await api.login_account(account)
```

服务端流程：

```text
连接 MSF
  -> NTLogin Type 0
```

返回的基础格式：

```js
{ code: Number, message: String }
```

常见 `code`：

| code | 含义 | 后续处理 |
| --- | --- | --- |
| `0` | 登录成功 | 服务端继续执行在线任务：WTLogin 令牌交换、`SsoInfoSync`、保存缓存和令牌刷新。 |
| `140022008` | 需要滑块验证 | 使用 `slider_url` 展示滑块，成功后调用 `submit_slider`。 |
| `140022007` | 需要身份验证 | 使用 `identity_url`、当前账号协议和设备指纹信息，自行调用开源验证 API 完成验证。服务端不提供身份验证提交 API。 |
| `140022010` | 需要安全验证 | 读取 `security_verify`，按可用方式继续验证。`security_url` 仅在 QQ 响应实际包含 URL 时返回。 |
| `140022013` | 账号或密码错误 | 本次登录已结束。 |

滑块响应示例：

```js
{
  code: 140022008,
  message: '需要滑块验证',
  slider_url: 'https://...'
}
```

安全验证响应示例：

```js
{
  code: 140022010,
  message: '需要安全验证',
  security_url: 'https://...', // 可选
  security_verify: {
    reason: { /* QueryVerifyReason 的 QQ 原始响应 */ },
    methods: { /* QueryVerifyList 的 QQ 原始响应 */ }
  }
}
```

`security_verify.methods` 保留 QQ 的完整原始数据。插件从其中选择验证方式，并使用该方式对应的 `sign`。不要假定 `140022010` 一定带 URL。

### 身份验证所需参数

`140022007` 的身份验证由插件自行接入开源 API。先从账号所在节点的 Bot 列表中找到当前账号，再按其 ID 取得完整协议与设备指纹数据：

```js
const bots = await api.get_bot_list()
const bot = bots.find(item => item.self_id === account)

const protocols = await api.get_protocol_list()
const protocol = protocols[bot.protocol_id]

const profiles = await api.get_device_profile_list()
const deviceProfile = profiles.find(item => item.id === bot.device_profile_id)
```

`get_bot_list()` 中的 `protocol_id` 与 `device_profile_id` 分别是当前账号使用的协议和设备指纹 ID。`get_protocol_list()` 返回本地 `protocol.json` 的完整数组，协议 ID 对应数组下标；`get_device_profile_list()` 返回完整设备指纹记录，使用记录的 `id` 匹配。

将 `identity_url`、`protocol` 和 `deviceProfile` 交给所选开源验证 API。验证 API 的具体请求和结果处理由插件自行负责。

## 滑块验证

在 `login_account` 返回 `140022008` 后调用：

```js
const result = await api.submit_slider(account, ticket, randstr)
```

参数：

| 参数 | 含义 |
| --- | --- |
| `account` | QQ 号 |
| `ticket` | 滑块服务返回的 ticket |
| `randstr` | 滑块服务返回的 randstr |

服务端会保留 Type 0 返回的 cookie 和滑块 SID，插件不需要也不能传递它们。接口内部执行 NTLogin Type 1，返回格式与 `login_account` 相同；如果仍返回其他验证 `code`，按该 `code` 继续处理。

## 短信安全验证

当 `login_account` 或 `submit_slider` 返回 `140022010`，并且 `security_verify.methods` 中存在短信验证方式（通常为方式 `4`）时，流程如下：

```text
QueryVerifyList 返回的 method sign
  -> get_sms(account, methodSign)
  -> GetSMS 返回的 smsSign
  -> check_sms(account, smsSign, smsCode)
  -> CheckSMS 返回的 verify_sign
  -> 服务端 NTLogin Type 2
```

### 1. 下发短信

```js
const sms = await api.get_sms(account, methodSign)
```

成功：

```js
{ code: 0, message: '短信已下发', sign: 'smsSign' }
```

这里的 `sign` 是 GetSMS 新返回的值，不能继续使用 `methods` 里的 `methodSign` 去提交验证码。

### 2. 提交验证码

```js
const result = await api.check_sms(account, sms.sign, smsCode)
```

`check_sms` 会先执行 CheckSMS，取其返回的 `verify_sign`，再自动执行 NTLogin Type 2。插件只传 GetSMS 返回的 `sign` 和用户输入的短信验证码；无需、也不能自行传 `verify_sign`。

最终结果格式与 `login_account` 相同。`code === 0` 时服务端会启动在线任务。

## 缓存登录

先检查本地缓存是否完整：

```js
const cache = await api.check_cache(account)
// { valid: true | false }
```

仅在 `valid === true` 时调用：

```js
const result = await api.cache_login(account)
```

缓存登录服务端流程：

```text
连接 MSF
  -> SsoInfoSync
  -> 启动在线任务
```

缓存登录不走 NTLogin Type 0。成功返回：

```js
{ code: 0, message: '登录成功' }
```

缓存失效或登录失败时返回：

```js
{ code: 1, message: '...', cache_invalid: Boolean }
```

`cache_invalid === true` 表示服务端已清除该账号缓存，后续应改走 `login_account`。
