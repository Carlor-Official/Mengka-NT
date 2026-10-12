# send_group_ai_record

合成并直接向指定群聊发送 AI 语音。

## 调用方式

```js
await api.send_group_ai_record(self_id, group_id, character, text, 1)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Android Bot QQ 号 |
| `group_id` | number | 是 | 目标群号 |
| `character` | string | 是 | [`get_ai_characters`](get_ai_characters.md) 返回的角色 ID |
| `text` | string | 是 | 要合成并发送的文字 |
| `chat_type` | number | 否 | 会话类型，默认 `1` |

参数规则与 [get_ai_record](get_ai_record.md) 相同。成功表示 QQ 已接受发送流程，返回 `{ message_id: 0 }`。

## 返回值

成功返回 `{ message_id: 0 }`。
