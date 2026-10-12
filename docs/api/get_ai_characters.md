# get_ai_characters

获取指定群聊当前可用的 AI 声音角色。

## 调用方式

```js
const categories = await api.get_ai_characters(self_id, group_id, 1)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `chat_type` | number | 否 | 会话类型，默认 1 |

## 返回值

返回分类数组；每个分类包含可用于合成的角色 ID 和展示名称。
