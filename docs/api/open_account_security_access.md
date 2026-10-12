# open_account_security_access

为指定账号调用底层 `SsoSecureAccess` 安全验证能力。

## 调用方式

```js
const result = await api.open_account_security_access({
  self_id,
  client_type: 'android',
  type: 'QueryVerifyList',
  data: {}
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `client_type` | string | 否 | `android` 或 `linuxqq` |
| `type` | string | 是 | 当前登录流程支持的安全验证类型 |
| `data` | object | 否 | 该验证类型要求的业务参数 |

不要允许普通用户任意填写 `type` 或原始 `data`；管理插件应按已知验证步骤生成表单并校验输入。

## 返回值

返回安全验证响应对象，具体字段由 `type` 指定的验证操作决定。
