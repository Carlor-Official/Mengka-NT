# translate_en2zh

使用 QQ Android 的批量翻译服务，将英文文本翻译为中文。

## 调用方式

```json
{
  "action": "translate_en2zh",
  "params": {
    "self_id": 1060221,
    "words": ["hello", "world"]
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行翻译的在线 Bot QQ 号 |
| `words` | string[] | 是 | 英文文本列表，每次最多 50 项 |

## 返回值

```js
{
  words: ["你好", "世界"],
}
```

返回列表与请求列表顺序一致；如果 QQ 服务器返回数量不匹配，框架会直接返回错误，不会用空文本补齐。
