# upload_group_video

上传群聊 MP4 视频，并返回可直接发送的视频消息段。

## 调用

```js
const video = await api.upload_group_video(self_id, group_id, file_path)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | MP4 的后端本地路径、`file://` 或后端可访问的 HTTP(S) 地址 |

后端使用原生 Go 媒体处理读取 MP4 尺寸和时长，并提取首帧封面，无需 FFmpeg 或 Docker。容器格式或编码不受支持时返回明确错误。

## 返回值

```js
{
  type: 'video',
  data: {
    file_id: 'FILE_ID',
  },
}
```

返回段可直接传给 `send_group_msg`，并应发送到上传时指定的群聊。视频必须作为唯一消息段单独发送。

## 示例

```js
const video = await api.upload_group_video(
  123456789,
  987654321,
  'D:/videos/example.mp4',
)

await api.send_group_msg(123456789, 987654321, [video])
```

插件与萌卡NT不在同一台主机时，应传后端可访问的 HTTP(S) 地址。
