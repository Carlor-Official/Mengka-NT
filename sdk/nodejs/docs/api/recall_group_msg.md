# recall_group_msg

撤回群聊消息。

## 调用方式

```js
const result = await api.recall_group_msg(
  self_id,
  group_id,
  msg_seq,
  msg_random,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `msg_seq` | number | 是 | 消息序列号 |
| `msg_random` | number | 是 | 消息随机数 |

消息标识可来自 `send_group_msg` 返回值、群聊消息事件或撤回事件。

## 返回值

```js
{ success: true }
```
