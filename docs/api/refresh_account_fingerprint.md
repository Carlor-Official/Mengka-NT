# refresh_account_fingerprint

为明确指定的离线 QQ 账号及当前具体协议重新生成设备指纹。此操作会清除该账号当前协议的登录缓存，成功后须重新登录；不会自动登录。

## 调用方式

```js
const account = await api.refresh_account_fingerprint({
  self_id: 123456789,
  client_type: 'android',
  protocol_id: 0,
  confirm: true,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 12 位 QQ 号 |
| `client_type` | string | 是 | 当前账号平台：`android` 或 `linuxqq`；不得省略 |
| `protocol_id` | number | 是 | 账号当前保存的具体协议 ID，从账号信息获取；不得只按平台推测 |
| `confirm` | boolean | 是 | 用户确认更换设备及清除登录缓存后传 `true` |

账号在线、登录中、正在使用会话，或 `protocol_id` 已变化时会拒绝操作。成功只更新目标账号当前协议的指纹，不更改密码、节点或其他账号的指纹。请先展示确认提示，不要自动设置确认或循环调用。

## 返回值

返回刷新后的框架账号对象，包含 `selfId`、`platform`、`protocolId`、`deviceProfileId` 等字段。可重新调用 `get_bot_info` 或 `get_account_management_context` 更新插件页面。账号信息可能包含敏感字段，请勿写入日志。
