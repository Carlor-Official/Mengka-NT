# check_sms

提交短信安全验证，并继续登录。

`verify_type` 需要与 [`get_sms`](get_sms.md) 时一致：

| `verify_type` | 名称 | 提交内容 |
| --- | --- | --- |
| `4` | 接收短信 | 提交用户收到的验证码 `code` |
| `3` | 发送短信 | 不提交 `code`，回查服务端是否已收到用户发出的短信 |

## 调用方式

```js
const self_id = 123456789 // 正在登录的 Bot QQ 号

// 接收短信：提交用户收到的验证码
const result = await api.check_sms(self_id, 4, sms.sign, code)

// 发送短信：用户发完短信后回查，不需要 code
const result = await api.check_sms(self_id, 3, sms.sign)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `verify_type` | number | 是 | 短信验证类型，`4` 接收短信，`3` 发送短信 |
| `sign` | string | 是 | `get_sms` **新返回**的 sign |
| `code` | string | 视类型 | `verify_type` 为 `4` 时必填；为 `3` 时不需要传 |

`verify_type` 必填，且只接受 `3` 或 `4`，缺失或取值不合法会直接报错。

## 返回值

**校验通过**：服务端会自动继续 NTLogin Type 2，返回结构与 [`login_account`](login_account.md) 一致。

**校验未通过**：返回 `CheckSMS` 的服务端原始响应，不作包装。登录会话保留，可以用同一个 `sign` 重试。

```js
{
  result: {
    state: 2,
    code: 3,
    prompt: '未收到短信，原因可能是：未使用密保手机发送；短信内容不正确；运营商不稳定。',
  },
}
```

判断方式：出现 `result.state` 字段即为未通过，`result.prompt` 是可直接展示给用户的原因。

::: warning verify_type 为 3 时需要留出发送时间
用户发出短信后，服务端可能要几秒才能收到。此时 `result.state` 为 `2`、`result.code` 为 `3`，含义是「尚未收到」而非「验证失败」，属于可重试状态，应提示用户确认已用密保手机发送后再调用一次。
:::

完整流程见[Bot 登录流程](https://mknt.net/reference/login-flow.html)。
