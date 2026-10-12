# clear_account_access

清除当前插件服务对指定 QQ 与协议的授权租约。

## 调用方式

```js
const result = await api.clear_account_access({
  self_id,
  client_type: 'linuxqq'
})
// { cleared: true }
```

只删除当前服务的对应租约，不影响其他服务。清除和设置“已停用租约”的业务语义不同：若要明确禁止已接管账号登录，应使用 `set_account_access({ enabled: false })`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `client_type` | string | 否 | `android` 或 `linuxqq`，默认 `android` |

## 返回值

成功返回 `{ cleared: true }`。
