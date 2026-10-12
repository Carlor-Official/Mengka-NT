# get_group_album_media_list

分页获取指定群相册中的图片和视频。

## 调用方式

```js
const result = await api.get_group_album_media_list({ self_id: 1060221, group_id: 123456789, album_id: 'album-id', attach_info: '' })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ |
| `group_id` | number | 是 | 群号 |
| `album_id` | string | 是 | 相册 ID |
| `attach_info` | string | 否 | 上一页的 `next_attach_info` |

## 返回值

返回 `media_list` 和前后页游标。媒体项保留 `lloc`、`batch_id`、上传者、上传时间及图片/视频地址，供评论、点赞和删除接口使用。
