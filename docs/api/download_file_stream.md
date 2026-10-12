# download_file_stream

以 `action_stream` 分片帧下载文件。该接口只读取明确传入的安全来源，不查询 QQ 群文件、私聊文件或媒体服务。

## 调用方式

```js
const frames = []
const complete = await api.download_file_stream(
  { file: 'https://example.com/file.bin', chunk_size: 65536 },
  frame => frames.push(frame),
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | string | 是 | 公开 HTTP(S)、`base64://`、Data URL，或框架 `data/plugin-downloads`、`data/stream-temp` 内文件 |
| `chunk_size` | number | 否 | 分片原始字节数，默认 65536，范围 1 到 4194304 |

`file_id` 不受支持。只传 `file_id` 会直接失败，框架不会回退调用 QQ 文件接口。文件总大小上限为 128 MiB；HTTP(S) 下载禁止本机、内网、保留网段和带凭据 URL。

## 返回值

第一帧为 `data_type=file_info`，随后为一个或多个 Base64 `file_chunk`；Promise 最终返回 `data_type=file_complete`、总分片数和总字节数。
