# fetch_ptt_text

识别框架近期收到并缓存的群语音文字。

## 调用方式

```js
const result = await api.fetch_ptt_text(self_id, message_id, 0)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number | 是 | 群语音事件中的框架消息 ID |
| `format` | number | 否 | 语音格式提示，通常填 0 |

## 返回值

成功返回 `{ text }`。消息引用或语音元数据过期后无法再次识别。
