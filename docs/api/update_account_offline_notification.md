# update_account_offline_notification

更新指定 QQ 与协议的离线邮件通知设置。

## 调用方式

```js
const preference = await api.update_account_offline_notification(
  self_id,
  { offlineEnabled: true, email: 'notice@example.com' },
  'android',
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `options.offlineEnabled` | boolean | 否 | 是否发送离线邮件 |
| `options.email` | string | 否 | 通知邮箱；留空使用 `QQ@qq.com` |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

## 返回值

返回结构与 `get_account_offline_notification` 相同。非空邮箱必须是完整地址；Android 与 Linux 设置相互独立。
