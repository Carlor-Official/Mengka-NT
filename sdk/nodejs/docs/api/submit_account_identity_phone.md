# submit_account_identity_phone

向指定账号的身份验证流程提交手机号并请求下一步短信验证。

## 调用方式

```js
const result = await api.submit_account_identity_phone(
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
| `mobile` | string | 是 | 手机号 |
| `area_code` | string | 否 | 国际区号，默认 `86` |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

`area_code` 默认 `86`。手机号属于敏感信息，不应写入 URL、前端持久缓存或业务日志。

## 返回值

返回请求短信验证后的响应对象；验证失败时抛出错误。
