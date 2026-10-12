# send_msg

萌卡 NT 通用消息发送接口，根据 `message_type` 路由到原生私聊或群聊发送链路。

## 调用方式

```js
const result = await api.send_msg(self_id, message_type, target_id, message)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_type` | `private` \| `group` | 是 | 消息目标类型 |
| `target_id` | number | 是 | 私聊时为好友 QQ 号，群聊时为群号 |
| `message` | string \| Segment \| Segment[] | 是 | 文本、单个消息段或消息段数组 |

底层协议参数也可以直接传 `user_id` 或 `group_id`。省略 `message_type` 时只能填写其中一项，框架会自动判定目标类型。

## 返回值

```js
{ message_id: 123 }
```

## 示例

```js
await api.send_msg(123456789, 'group', 778899, [
  { type: 'text', data: { text: '群消息' } },
])
```
