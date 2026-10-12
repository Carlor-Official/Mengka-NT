# send_private_msg

向指定好友发送消息。

## 调用方式

```js
const result = await api.forProtocol('android').send_private_msg({ self_id, user_id, message })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 接收消息的好友 QQ 号 |
| `message` | string \| object \| array | 是 | 文本、单个消息段或消息段数组 |

## 返回值

成功返回 `{ message_id: number }`，可用于查询、回复或撤回；该接口不返回 `success`、`msg_seq` 或 `msg_random`，不要套用 `send_friend_msg` 的返回结构。调用失败通过 action 错误返回。非好友群临时会话请使用独立的 [`send_group_temp_msg`](send_group_temp_msg.md)，不要把群成员 QQ 号直接当作好友调用。
