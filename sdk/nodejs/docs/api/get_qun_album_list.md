# get_qun_album_list

分页获取群相册列表。接口直接调用 QQ Android 的 `QunAlbum.trpc` 服务，不依赖 PC QQ。

## 调用方式

```js
const result = await api.get_qun_album_list({ self_id: 1060221, group_id: 123456789, attach_info: '' })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ |
| `group_id` | number | 是 | 群号 |
| `attach_info` | string | 否 | 上一页返回的游标，第一页留空 |

## 返回值

返回 `album_list`、`attach_info` 和 `has_more`。相册项包含 ID、名称、说明、上传数量、时间、创建者和封面信息。
