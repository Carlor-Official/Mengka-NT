# get_sms

请求短信安全验证。

短信验证有两种类型，由 `verify_type` 指定，两者共用 `get_sms` / `check_sms`：

| `verify_type` | 名称 | 说明 |
| --- | --- | --- |
| `4` | 接收短信 | 服务端向密保手机下发验证码，用户把收到的验证码交回 |
| `3` | 发送短信 | 用户用密保手机把指定内容发送到指定号码，服务端回查是否收到 |

可用类型由 [`get_security_verify_methods`](get_security_verify_methods.md) 的 `methods.verify_list` 决定，不要写死。

## 调用方式

```js
const self_id = 123456789 // 正在登录的 Bot QQ 号

// 接收短信
const result = await api.get_sms(self_id, 4, sign)

// 发送短信
const result = await api.get_sms(self_id, 3, sign)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `verify_type` | number | 是 | 短信验证类型，`4` 接收短信，`3` 发送短信 |
| `sign` | string | 是 | `security_verify.methods.sms_phone.sign` |

`verify_type` 必填，且只接受 `3` 或 `4`，缺失或取值不合法会直接报错。

## 返回值

返回 `GetSMS` 的服务端原始响应，不作包装。

`verify_type` 为 `4`：

```js
{
  result: { state: 1, code: 1 },
  sign: 'NEW_SMS_SIGN',
  masked_phone: '166******00',
  country_code: '86',
}
```

`verify_type` 为 `3`：

```js
{
  result: { state: 1, code: 1 },
  sign: 'NEW_SMS_SIGN',
  sms: '验证QQ',
  send_to: '10690700511',
  masked_phone: '166******00',
  country_code: '86',
}
```

| 字段 | 说明 |
| --- | --- |
| `result.state` | `1` 为成功，其他值为失败，失败时 `result.prompt` 是原因 |
| `sign` | 新的 sign，提交时必须用这个，不能沿用请求时传入的那个 |
| `sms` | 仅 `verify_type` 为 `3`：需要用户发送的短信内容 |
| `send_to` | 仅 `verify_type` 为 `3`：短信的接收号码 |
| `masked_phone` | 打码后的密保手机号，用于提示用户 |

`verify_type` 为 `3` 时，需要引导用户**用 `masked_phone` 对应的密保手机**把 `sms` 的内容原样发送到 `send_to`，发送后再调用 [`check_sms`](check_sms.md) 回查。

QQ 返回的其他字段会按原始结构保留。

完整流程见[Bot 登录流程](https://mknt.net/reference/login-flow.html)。
