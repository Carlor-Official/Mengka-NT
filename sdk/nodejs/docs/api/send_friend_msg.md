# send_friend_msg

发送好友消息。

::: tip 适用协议
Android 与 Linux QQ 均使用萌卡 NT 原生好友消息链路执行。
:::

## 调用方式

```js
const result = await api.send_friend_msg(self_id, user_id, message)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 好友 QQ 号 |
| `message` | Segment[] | 是 | 消息段数组，支持 `text`、`reply`、`image` 和 QQ 原生 `face` |

## 返回值

```js
{ success: true, message_id: 123456789, msg_seq: 123, msg_random: 456 }
```

## 示例

```js
await api.send_friend_msg(123456789, 112233445, [
  { type: 'text', data: { text: '你好 🎉 [bq190]' } },
])
```

`text` 直接支持 Unicode emoji，并会把 `[bq190]` 解析为 QQ 自带的 190 号表情。结构化写法为 `{ type: 'face', data: { kind: 'qq_face', face_id: '190' } }`。

`user_id` 必须使用 QQ 号，不接受 UID。

## 引用回复

把当前好友会话中消息事件的 `message_id` 放入 `reply` 段：

```js
await api.send_friend_msg(123456789, 112233445, [
  { type: 'reply', data: { message_id: event.message_id } },
  { type: 'text', data: { text: '好的，已经看到了。' } },
])
```

也兼容 `{ type: 'reply', data: { id: event.message_id } }`。引用消息必须属于当前好友会话，不能拿其他好友或群聊的 `message_id` 进行引用。
