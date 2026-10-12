# query_account_recovery_qr_status

查询账号归属验证二维码状态。扫码并在手机 QQ 确认后，只返回已验证的 QQ 号。

## 调用方式

```js
const result = await api.query_account_recovery_qr_status(recovery.recovery_token)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `recovery_token` | string | 是 | `create_account_recovery_qr` 返回的临时会话令牌 |

## 返回值

```js
// 等待扫码或确认
{ state: 'waiting_for_scan', verified: false }

// 手机 QQ 已确认
{ state: 'confirmed', verified: true, self_id: 106606 }
```

当 `verified` 为 `true` 时，插件可将框架中该 `self_id` 的全部协议账号数据归属给当前用户。不应只归属某一条 Android 或 Linux 记录。过期、取消或无效会话不得归属账号。
