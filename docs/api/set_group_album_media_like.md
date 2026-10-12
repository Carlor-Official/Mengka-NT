# set_group_album_media_like

点赞群相册的一批上传内容或其中一项媒体。

## 调用方式

```js
await api.set_group_album_media_like({ self_id: 1060221, group_id: 123456789, album_id: 'album-id', batch_id: '1234567890', lloc: 'media-lloc' })
```

`self_id`、`group_id`、`album_id`、`batch_id` 必填；`lloc` 可选。两者都可从媒体列表响应取得。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `album_id` | string | 是 | 相册 ID |
| `batch_id` | string | 是 | 上传批次 ID |
| `lloc` | string | 否 | 指定媒体标识；省略时点赞整批内容 |

## 返回值

返回 `{ id: string, status: number }`，分别为操作标识和服务端状态。
