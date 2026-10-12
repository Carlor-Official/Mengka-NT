# clean_stream_temp_file

清理全部未完成流和框架目录 `data/stream-temp` 中的流式传输文件，不影响其他媒体缓存。

## 调用方式

```js
await api.clean_stream_temp_file({})
```

## 参数

无。

## 返回值

成功返回 `{ cleaned: true }`。
