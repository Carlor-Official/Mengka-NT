# send_group_forward_msg

上传文本合并转发消息并返回可发送的合并转发消息段。

## 调用方式

```js
const result = await api.send_group_forward_msg(
  self_id,
  group_id,
  messages,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群聊 ID |
| `messages` | object[] | 是 | 合并转发节点数组 |
NapCat 标准节点结构：

```js
{
  type: 'node',
  data: {
    user_id: 123456789,
    nickname: '示例用户',
    time: 1710000000,
    content: [{ type: 'text', data: { text: '内容' } }],
  },
}
```

也支持以下扁平节点格式：

```js
{
  user_id: 123456789,
  nickname: '示例用户',
  time: 1710000000,
  message: [{ type: 'text', data: { text: '内容' } }],
}
```

`time` 使用 Unix 秒。非 `text` 消息段会被忽略。

节点也可以填写 `data.id`，引用框架近 7 天消息缓存中的
`message_id`。对应消息必须仍在缓存且包含可转发的消息段。

## 返回值

```js
{
  success: true,
  res_id: 'RESOURCE_ID',
  message: [{ type: 'ark', data: {} }],
  uploaded_messages: 1,
  discarded_messages: 0,
  discarded_segments: 0,
}
```

## 示例

```js
const forward = await api.send_group_forward_msg(self_id, group_id, messages)
await api.send_group_msg(self_id, group_id, forward.message)
```

当前实现的该 action 只负责上传合并转发内容并生成消息段，不会直接发送；参数中不存在 `upload_only`。需要发送时，把返回的 `message` 交给 `send_group_msg`。
