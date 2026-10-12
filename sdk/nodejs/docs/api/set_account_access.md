# set_account_access

创建或更新当前插件服务对指定 QQ 与协议的授权租约。

## 调用方式

```js
const lease = await api.set_account_access({
  self_id,
  client_type: 'linuxqq',
  owner_id: 'plugin-user-42',
  enabled: true,
  expires_at: '2026-10-01T00:00:00+08:00',
  metadata: { source: 'order', order_id: 'M202609030001' }
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `client_type` | string | 否 | `android` 或 `linuxqq`，默认 `android` |
| `owner_id` | string | 否 | 插件侧用户标识 |
| `enabled` | boolean | 否 | 是否启用，默认 true |
| `expires_at` | string | 否 | 到期时间；省略时无期限 |
| `metadata` | object | 否 | 业务附加信息 |

## 返回值

返回保存后的授权租约，字段与 [get_account_access_list](get_account_access_list.md#返回值) 的列表项一致。

## 规则

- 框架中必须已经存在相同 `self_id` 与协议的账号。
- `enabled` 省略时为 `true`；`expires_at` 可省略表示无到期时间。
- 时间支持 RFC 3339、`YYYY-MM-DD HH:mm:ss` 和 `YYYY-MM-DDTHH:mm:ss`。
- 租约被停用或过期后，框架会阻止重新登录并停止已接管账号；未创建过任何插件租约的普通框架账号不受影响。
- `metadata` 只放追踪标识，不要保存令牌、密码或支付密钥。
