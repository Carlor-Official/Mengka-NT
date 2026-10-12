# get_msg

读取框架当前进程已观察到的 OneBot 消息数据，不请求 QQ 历史消息。

## 调用方式

```js
const message = await api.get_msg(self_id, message_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number | 是 | 消息事件中的 `message_id`；兼容传近期 `msg.seq` |

## 返回值

返回 `message_type`、`message_id`、`message_seq`、发送者、标准消息段、原始文本，以及群消息可用的 `group_id`。

缓存按账号严格隔离，保留 7 天且每账号最多 4096 条；它是进程内缓存，框架重启后不会保留。不存在、已过期或重启前的消息会直接返回缓存未命中，不会自动拉取 QQ 历史记录。
