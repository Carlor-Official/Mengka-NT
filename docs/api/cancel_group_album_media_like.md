# cancel_group_album_media_like

取消群相册媒体点赞。参数与 `set_group_album_media_like` 相同。

## 调用方式

```js
await api.cancel_group_album_media_like({ self_id: 1060221, group_id: 123456789, album_id: 'album-id', batch_id: '1234567890', lloc: 'media-lloc' })
```

`lloc` 为空时取消整批点赞；填写时取消指定媒体的点赞。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `album_id` | string | 是 | 相册 ID |
| `batch_id` | string | 是 | 上传批次 ID |
| `lloc` | string | 否 | 指定媒体标识；省略时取消整批点赞 |

## 返回值

返回 `{ id: string, status: number }`，分别为操作标识和服务端状态。
