# get_forward_msg

获取合并转发消息的节点内容，可使用 `message_id` 或简写字段 `id`。

传入框架消息事件中的 `message_id` 时，会自动使用消息缓存中的真实发送者和合并转发资源 ID；也可以直接传入 `send_group_forward_msg` 返回的 `res_id`。

## 调用方式

```js
const result = await api.get_forward_msg({
  self_id: 123456789,
  message_id: '合并转发消息的 message_id 或 res_id'
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number \| string | 是 | 框架消息 ID 或合并转发资源 ID；兼容别名 `id` |
| `sender_uin` | number | 否 | 直接传资源 ID 时可指定原始发送者 QQ；通常无需填写 |

## 返回值

返回值：

```json
{
  "messages": [
    {
      "type": "node",
      "data": {
        "user_id": 123456789,
        "nickname": "发送者昵称",
        "content": [{ "type": "text", "data": { "text": "内容" } }],
        "time": 1787600000
      }
    }
  ]
}
```
