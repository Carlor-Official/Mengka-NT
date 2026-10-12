# delete_msg

撤回一条框架近期收到或发送的消息。框架根据 `message_id` 自动选择群聊或私聊的安卓协议撤回链路。

## 调用方式

```js
await api.delete_msg(1060221, message_id)
```

消息引用默认保留 7 天；引用过期、目标消息已不可撤回或服务端拒绝时会返回明确错误。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number | 是 | 消息事件或发送接口返回的消息 ID |

## 返回值

成功返回 `null`。
