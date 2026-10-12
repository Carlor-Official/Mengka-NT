# test_download_stream

发送 10 个 `data_chunk` 测试帧，随后返回 `data_complete`，用于检查插件的流式帧消费逻辑。

## 调用方式

```js
await api.test_download_stream({ error: false })
```

传 `error: true` 时，10 个测试帧发送完毕后返回失败响应。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `error` | boolean | 否 | 默认 false；true 时在测试帧发送完毕后返回错误 |

## 返回值

通过回调接收 10 个 `data_chunk` 测试帧，成功结束时 Promise 返回 `data_complete`。`error=true` 时 Promise 在发送测试帧后拒绝。
