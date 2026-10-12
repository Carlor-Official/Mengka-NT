# send_group_temp_msg

通过共同群聊向群成员发送 QQ 原生临时会话消息。目标 QQ 不需要与发送账号建立好友关系。

## 调用方式

```js
const result = await api.send_group_temp_msg(self_id, group_id, user_id, message)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 临时会话的来源群号 |
| `user_id` | number | 是 | 来源群内的目标成员 QQ 号 |
| `message` | Segment[] | 是 | 消息段数组，支持 `text`、`reply`、`image` 和 QQ 原生 `face` |

框架会在发送前从 QQ 服务器读取群成员列表，确认发送账号和目标 QQ 都在该群中。`group_id` 会写入 Android QQ 的临时会话协议路由，不会降级成普通好友私聊。

如果群设置禁止普通成员发起临时会话，普通成员调用会直接返回权限错误；群主和管理员仍可正常发送。

## 返回值

```js
{
  success: true,
  message_id: 123456789,
  msg_seq: 123,
  msg_random: 456,
  message_type: 'private',
  sub_type: 'group',
  group_id: 987654321
}
```

## 示例

```js
await api.send_group_temp_msg(123456789, 987654321, 112233445, [
  { type: 'text', data: { text: '你好，我从群成员列表联系你。' } },
])
```

收到的临时会话事件仍属于私聊消息，但会额外携带 `sub_type: 'group'` 和来源 `group_id`。

## 引用回复

临时会话支持 QQ 原生引用回复。被引用消息必须来自同一来源群与同一目标成员：

```js
await api.send_group_temp_msg(self_id, group_id, user_id, [
  { type: 'reply', data: { message_id: event.message_id } },
  { type: 'text', data: { text: '收到。' } },
])
```

该能力只通过萌卡原生 `send_group_temp_msg` 开放，不注册 OneBot 私聊兼容入口。
