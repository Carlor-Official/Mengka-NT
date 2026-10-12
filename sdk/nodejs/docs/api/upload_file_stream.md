# upload_file_stream

按 `stream_id` 分片上传文件。新流必须填写 `total_chunks`，每个分片填写 Base64 `chunk_data` 与从 0 开始的 `chunk_index`。分片可乱序，重复提交相同分片不会重复计数。

## 调用方式

```js
await api.upload_file_stream({
  stream_id: 'job-1', total_chunks: 2, chunk_index: 0,
  chunk_data: 'SGVsbG8g', file_size: 11, filename: 'hello.txt'
})
await api.upload_file_stream({ stream_id: 'job-1', chunk_index: 1, chunk_data: 'V29ybGQ=' })
const result = await api.upload_file_stream({ stream_id: 'job-1', is_complete: true })
```

可选 `expected_sha256` 用于完整性校验，`verify_only` 查询状态，`reset` 清理未完成流。`file_retention` 单位毫秒，默认 5 分钟，填 0 表示不自动删除完成文件。未完成流 10 分钟无活动会自动回收，所有文件均限定在框架目录的 `data/stream-temp`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `stream_id` | string | 是 | 上传流标识 |
| `total_chunks` | number | 新流必填 | 分片总数，范围 1–65536 |
| `chunk_index` | number | 上传分片时必填 | 从 0 开始的分片序号 |
| `chunk_data` | string | 上传分片时必填 | 分片 Base64，解码后不超过 4 MiB |
| `file_size` | number | 否 | 完整文件字节数 |
| `filename` | string | 否 | 文件名 |
| `expected_sha256` | string | 否 | 完整文件的 SHA-256，64 位十六进制 |
| `is_complete` | boolean | 否 | true 时合并分片 |
| `verify_only` | boolean | 否 | true 时仅查询流状态 |
| `reset` | boolean | 否 | true 时清理未完成流 |
| `file_retention` | number | 否 | 完成文件保留毫秒数，默认 300000；0 表示不自动删除 |

## 返回值

分片接收或状态查询返回 `{ type: "stream", stream_id, status: "file_created", received_chunks, total_chunks }`。合并成功返回 `{ type: "response", stream_id, status: "file_complete", received_chunks, total_chunks, file_path, file_size }`。重置返回 `{ stream_id, status: "stream_reset" }`。
