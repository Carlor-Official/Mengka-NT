# upload_friend_image

上传好友聊天图片，并返回可直接传给 `send_friend_msg` 的图片消息段。

## 调用方式

```js
const image = await api.upload_friend_image(
  self_id,
  user_id,
  file_path,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 目标好友 QQ 号 |
| `file_path` | string | 是 | 后端可访问的本地路径、`file://` 或 HTTP(S) 地址 |
文件名由后端根据图片 MD5 自动生成，图片类型由后端设置为 `1000`。

## 返回值

```js
{ type: 'image', data: { file_id: 'FILE_ID' } }
```

## 示例

```js
const image = await api.upload_friend_image(
  3879548525,
  106030,
  'D:/Pictures/3840x2160.jpg',
)

await api.send_friend_msg(3879548525, 106030, [image])
```
