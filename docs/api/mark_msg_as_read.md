# mark_msg_as_read

标记一条消息已读。框架根据消息引用自动选择群聊序号或私聊时间游标。

## 调用方式

```js
await api.mark_msg_as_read(1060221, message_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number | 是 | 群聊或私聊消息 ID |

## 返回值

成功返回空对象 `{}`。
