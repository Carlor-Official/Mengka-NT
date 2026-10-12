# get_ai_record

使用指定 AI 声音角色合成语音并返回访问地址。

## 调用方式

```js
const url = await api.get_ai_record(self_id, group_id, character, text, 1)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `character` | string | 是 | 角色 ID |
| `text` | string | 是 | 要合成的文字 |
| `chat_type` | number | 否 | 会话类型，默认 1 |

## 返回值

合成可能需要数秒，成功返回临时语音 URL。
