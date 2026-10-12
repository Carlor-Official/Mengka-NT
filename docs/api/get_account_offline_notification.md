# get_account_offline_notification

读取指定 QQ 与协议的离线邮件通知设置。

## 调用方式

```js
const preference = await api.get_account_offline_notification(self_id, 'linux')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

## 返回值

```js
{
  selfId: 106606,
  platform: 'linux',
  offlineEnabled: true,
  email: 'notice@example.com',
  defaultEmail: '106606@qq.com',
  effectiveEmail: 'notice@example.com'
}
```

`email` 为用户保存的值；留空时 `effectiveEmail` 使用 `defaultEmail`。Android 与 Linux 设置相互独立。
