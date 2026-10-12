# get_group_system_notifications

获取 Bot 的群聊系统通知列表。

## 调用方式

```js
const result = await api.get_group_system_notifications(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{
  notifications: [],
  total_count: 0,
}
```

通知中的 `request_id`、`request_type` 与 `request_extra` 可用于处理入群申请。
