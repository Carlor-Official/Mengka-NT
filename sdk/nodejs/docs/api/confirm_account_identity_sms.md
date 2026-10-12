# confirm_account_identity_sms

确认指定账号的身份验证短信步骤已完成。

## 调用方式

```js
const result = await api.confirm_account_identity_sms(
  self_id,
  mobile,
  '86',
  'android'
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `mobile` | string | 是 | 已提交的手机号 |
| `area_code` | string | 否 | 国际区号，默认 `86` |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

必须与 `submit_account_identity_phone` 使用同一账号、协议、手机号和登录会话。确认结果由 QQ 服务端返回。

## 返回值

返回当前身份验证服务的响应对象；验证失败时抛出错误。后续登录参数使用本次响应中的验证结果。
