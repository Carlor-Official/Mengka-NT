# del_group_album_media

删除群相册中的图片或视频。

## 调用方式

```js
await api.del_group_album_media({ self_id: 1060221, group_id: 123456789, album_id: 'album-id', lloc: 'media-lloc' })
```

`self_id`、`group_id`、`album_id`、`lloc` 均必填。删除视频时可以填写视频 ID 或封面 `lloc`；框架会先读取媒体列表，补齐 QQ 删除协议需要的封面标识和批次 ID。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `album_id` | string | 是 | 相册 ID |
| `lloc` | string | 是 | 媒体标识，从媒体列表取得 |

## 返回值

成功返回 `null`。
