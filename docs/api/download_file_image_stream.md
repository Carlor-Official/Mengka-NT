# download_file_image_stream

安全来源和分片顺序与 [`download_file_stream`](download_file_stream.md) 相同。首个 `file_info` 额外返回图片 `width`、`height`；内容不能被识别为图片时请求失败。

## 调用方式

```js
await api.download_file_image_stream(
  { file: 'data:image/png;base64,iVBORw0KGgo...' },
  frame => console.log(frame),
)
```

该接口不接受仅有 `file_id` 的 QQ 媒体解析请求。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | string | 是 | HTTP(S) 地址、Base64 或允许读取的本地路径，规则见 `download_file_stream` |
| `chunk_size` | number | 否 | 每片字节数，默认 65536；范围 1–4194304 |

## 返回值

返回流式文件帧，顺序及字段见 [download_file_stream](download_file_stream.md#返回值)。首个 `file_info` 帧额外包含 `width` 和 `height`。
