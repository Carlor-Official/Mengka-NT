# set_msg_emoji_like

为群消息添加或取消指定表情回应。

## 调用方式

```js
await api.set_msg_emoji_like(self_id, message_id, emoji_id, true)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number | 是 | 框架缓存中的群消息 ID |
| `emoji_id` | string | 是 | QQ 表情回应 ID |
| `set` | boolean | 否 | `true` 添加，`false` 取消 |

仅支持群消息。

## 返回值

成功返回 `null`。
