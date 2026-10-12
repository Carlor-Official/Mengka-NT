# login_account

对指定协议的离线账号发起密码登录。框架会在该账号自己的登录节点上执行。

## 调用方式

```js
const self_id = 123456789 // 要登录的 Bot QQ 号
const result = await api.login_account(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已创建且离线的 Bot QQ 号 |

## 返回值

```js
{ code: Number, message: String }
```

验证状态可能额外包含 `slider_url`、`identity_url`、`security_url` 或 `security_verify`。

常见状态：

| `code` | 含义 |
| --- | --- |
| `0` | 登录成功 |
| `140022008` | 需要滑块验证 |
| `140022007` | 需要身份验证 |
| `140022010` | 需要安全验证，查询<a class="security-method-link" href="/api/get_security_verify_methods">安全验证方式</a> |
| `140022013` | 账号或密码错误 |

完整处理顺序见[Bot 登录流程](https://mknt.net/reference/login-flow.html)。
