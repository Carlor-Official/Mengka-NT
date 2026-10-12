# submit_account_identity_captcha

向指定账号的身份验证流程提交滑块结果。

## 调用方式

```js
const result = await api.submit_account_identity_captcha(
  self_id,
  ticket,
  randstr,
  'android'
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `ticket` | string | 是 | 滑块验证票据 |
| `randstr` | string | 是 | 滑块随机串 |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

`ticket` 与 `randstr` 必须来自当前账号同一次验证会话。过期或跨会话复用会被拒绝。

## 返回值

返回当前身份验证响应对象。其中 `phoneNum` 为绑定手机号的脱敏值，`areaCode` 为区号；字段缺省时按当前验证流程处理。
