# download_file_record_stream

流式读取安全来源中的语音文件。参数和分片顺序与 [`download_file_stream`](download_file_stream.md) 相同。

可选 `out_format` 为 `wav` 或 `mp3`。WAV 支持原生 MP3 / SILK 解码；MP3 输出仅接受原始 MP3。其他格式返回明确错误。

## 调用方式

```js
await api.download_file_record_stream(
  { file: 'https://example.com/voice.mp3', out_format: 'mp3' },
  frame => console.log(frame),
)
```

该接口不通过 `file_id` 查询 QQ 文件或媒体服务。

省略 `out_format` 时下载原文件；转换支持 MP3 / SILK 到 WAV，MP3 输出仅接受原始 MP3。不调用 FFmpeg 或 Docker。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | string | 是 | HTTP(S) 地址、Base64 或允许读取的本地路径，规则见 `download_file_stream` |
| `chunk_size` | number | 否 | 每片字节数，默认 65536；范围 1–4194304 |
| `out_format` | string | 否 | `wav` 或 `mp3`；省略时返回原文件 |

## 返回值

返回流式文件帧，顺序及字段见 [download_file_stream](download_file_stream.md#返回值)。
