# get_security_verify_methods

查询正在登录的 Bot 当前安全验证原因和可用验证方式。

## 调用方式

```js
const self_id = 123456789 // 正在登录的 Bot QQ 号
const result = await api.get_security_verify_methods(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |

## 返回值

```js
{
  reason: {
    prompt: '当前账号需要安全验证',
  },
  methods: {
    prompt: '请选择验证方式',
    verify_list: [4, 10],
    sms_phone: {
      sign: 'SMS_SIGN',
    },
  },
}
```

- `reason` 是 `QueryVerifyReason` 的原始结构化响应。
- `methods` 是 `QueryVerifyList` 的原始结构化响应，包含当前可用的短信、扫码或其他验证方式。

常见状态：

| `methods.verify_list` 包含值 | 含义 | 后续操作 |
| --- | --- | --- |
| `4` | 支持接收短信（服务端下发验证码） | 用 `methods.sms_phone.sign` 调用 `get_sms`，`verify_type` 传 `4` |
| `3` | 支持发送短信（用户用密保手机发送） | 用 `methods.sms_phone.sign` 调用 `get_sms`，`verify_type` 传 `3` |
| `10` | 支持扫码验证 | 调用 `create_login_qr` 创建二维码，再调用 `query_login_qr_status` 查询状态 |
| 包含多个值 | 同时支持多种验证方式 | 选择任意一种可用方式 |
| 不包含 `3`、`4`、`10` | 需要其他验证方式 | 使用 `login_account` 返回的 `security_url` 完成验证 |

`3` 和 `4` 共用 `methods.sms_phone.sign`，区别只在调用 `get_sms` / `check_sms` 时传的 `verify_type`。可用类型以 `verify_list` 为准，不要写死。

`reason.prompt` 或 `methods.prompt` 是当前验证原因或提示文案。QQ 返回的其他字段会按原始结构保留。

返回结构与 [`login_account`](login_account.md) 的 `security_verify` 字段一致。

完整流程见[Bot 登录流程](https://mknt.net/reference/login-flow.html)。
