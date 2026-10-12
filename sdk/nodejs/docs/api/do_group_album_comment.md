# do_group_album_comment

评论群相册中的指定媒体。

## 调用方式

```js
await api.do_group_album_comment({ self_id: 1060221, group_id: 123456789, album_id: 'album-id', lloc: 'media-lloc', content: '评论内容' })
```

`self_id`、`group_id`、`album_id`、`lloc`、`content` 均必填。`lloc` 从 `get_group_album_media_list` 的图片或视频封面信息中取得。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `album_id` | string | 是 | 相册 ID |
| `lloc` | string | 是 | 媒体标识，从媒体列表取得 |
| `content` | string | 是 | 评论内容 |

## 返回值

返回 `{ id: string, uin: string, content: string, time: number, client_key: string }`，包含评论标识、评论者 QQ、内容、时间和客户端标识。
