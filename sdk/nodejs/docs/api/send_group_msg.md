# send_group_msg

发送群聊消息。

## 调用方式

```js
const result = await api.send_group_msg(self_id, group_id, message)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群聊 ID |
| `message` | Segment[] | 是 | 消息段数组 |

支持 `text`、`reply`、`at`、`image`、`voice`、`video` 和 `face` 等群聊消息段，详见[消息段](https://mknt.net/reference/message-segments.html)。

`video` 必须作为消息数组中的唯一消息段单独发送。

## 返回值

```js
{
  success: true,
  message_id: 123456789,
  msg_seq: 123,
  msg_random: 456,
}
```

`message_id` 可直接用于后续引用回复；`msg_seq` 与 `msg_random` 可用于 [`recall_group_msg`](recall_group_msg.md)。

## 示例

```js
await api.send_group_msg(123456789, 987654321, [
  { type: 'text', data: { text: '你好 🎉 [bq190]' } },
  { type: 'at', data: { uin: '112233445' } },
])
```

`text` 直接支持 Unicode emoji，并会把 `[bq190]` 解析为 QQ 自带的 190 号表情。需要精确控制表情消息段时，也可以使用 `{ type: 'face', data: { kind: 'qq_face', face_id: '190' } }`。

## 引用回复

把收到的群消息事件或本接口返回的 `message_id` 放入 `reply` 段，即可发送 QQ 原生引用回复：

```js
await api.send_group_msg(123456789, 987654321, [
  { type: 'reply', data: { message_id: event.message_id } },
  { type: 'text', data: { text: '已收到，我来处理。' } },
])
```

兼容 OneBot 写法 `{ type: 'reply', data: { id: event.message_id } }`。引用消息必须属于当前群，一条消息只能包含一个 `reply` 段，且引用段后至少需要一个正文消息段。消息缓存过期后应重新从消息事件或历史消息接口获取 `message_id`。
