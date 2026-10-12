# upload_image_to_qun_album

向已有群相册上传图片。框架使用当前 Android QQ 的 Qzone 登录态创建会话并分片上传。

## 调用方式

```js
await api.upload_image_to_qun_album({ self_id: 1060221, group_id: 123456789, album_id: 'album-id', album_name: '相册名称', file: 'https://example.com/a.jpg' })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ |
| `group_id` | number | 是 | 群号 |
| `album_id` | string | 是 | 相册 ID |
| `album_name` | string | 是 | 相册名称 |
| `file` | string | 是 | HTTP(S)、`file://`、本地路径或 `base64://` 图片 |

单文件上限 100 MiB。成功返回 `photo_id` 和图片地址。

## 返回值

返回上传结果，包含 `photo_id` 和图片地址。
