# download_file_record_stream

流式读取安全来源中的语音文件。参数和分片顺序与 [`download_file_stream`](/api/download_file_stream.html) 相同。

可选 `out_format` 为 `wav` 或 `mp3`。WAV 支持原生 MP3 / SILK 解码；MP3 输出仅接受原始 MP3。其他格式返回明确错误。

```js
await api.download_file_record_stream(
  { file: 'https://example.com/voice.ogg', out_format: 'mp3' },
  frame => console.log(frame),
)
```

该接口不通过 `file_id` 查询 QQ 文件或媒体服务。

原生媒体版本中，省略 `out_format` 时下载原文件；转换支持 MP3 / SILK 到 WAV，MP3 输出仅接受原始 MP3。不调用 FFmpeg 或 Docker。
