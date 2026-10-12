# retry_account_security_verify

在安全验证完成后使用验证参数重试登录。

## 调用方式

```js
const result = await api.retry_account_security_verify({
  self_id,
  client_type: 'android',
  login_type: 2,
  extra: { verify_sign }
})
```

该接口与 `retry_account_identity_verify` 使用同一重试契约，仅用于不同的前端验证阶段。成功返回 Bot 信息；业务失败返回 `code`、`message` 与 `extra_info`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `client_type` | string | 否 | `android` 或 `linuxqq`，默认 `android` |
| `login_type` | number | 是 | 当前验证流程返回的登录类型 |
| `extra` | object | 是 | 当前验证会话返回的参数 |

## 返回值

成功返回 `code: 0`、`message` 及 Bot 信息；验证未通过时返回 `code`、`message`、`extra_info`。传输或权限错误会抛出异常。
