# forward_friend_single_msg

将一条缓存消息的标准消息段重新发送给指定好友。

## 调用方式

```js
await api.forward_friend_single_msg(1060221, message_id, 106606)
```

这是普通消息重发，不会生成 QQ 的合并转发卡片。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number | 是 | 来源消息 ID |
| `user_id` | number | 是 | 目标好友 QQ 号 |

## 返回值

成功返回空对象 `{}`。
