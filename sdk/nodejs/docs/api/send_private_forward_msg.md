# send_private_forward_msg

创建文本合并转发消息并发送给指定好友，使用当前账号的原生发送链路。

## 调用方式

```js
const result = await api.forProtocol('android').send_private_forward_msg({
  self_id,
  user_id,
  messages,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 接收合并转发的好友 QQ 号 |
| `messages` | object[] | 是 | 合并转发节点数组 |
| `upload_only` | boolean | 否 | 只上传并返回 Ark 消息段，不发送给好友 |

标准节点示例：

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

`content` 也可以直接填写字符串。节点使用 `data.id` 时，会引用框架
近期缓存的 `message_id`。合并转发正文支持 `text`
消息段，其余消息段会计入返回值中的 `discarded_segments`。

## 返回值

```js
{
  success: true,
  message_id: 'MESSAGE_REFERENCE',
  res_id: 'RESOURCE_ID',
  forward_id: 'RESOURCE_ID',
  uploaded_messages: 1,
  discarded_messages: 0,
  discarded_segments: 0,
}
```
