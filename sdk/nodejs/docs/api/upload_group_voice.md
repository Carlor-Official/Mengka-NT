# upload_group_voice

上传群聊语音，并返回可直接发送的语音消息段。

## 调用方式

```js
const voice = await api.upload_group_voice(self_id, group_id, file_path)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | 插件允许目录内的本地 MP3 路径、`file://` 或后端可访问的 HTTP(S) MP3 地址 |

输入格式为 MP3。框架自动转换为 Silk，并生成时长和波形。

## 返回值

```js
{
  type: 'voice',
  data: {
    file_id: 'FILE_ID',
    duration: 5,
  },
}
```

返回段只能发送到上传时指定的群。

## 示例

```js
const voice = await api.upload_group_voice(
  123456789,
  987654321,
  'D:/voices/example.mp3',
)

await api.send_group_msg(123456789, 987654321, [voice])
```

本地路径指框架所在机器，且必须位于插件授权目录或允许的媒体目录（如 `data/media-downloads`）。远程插件可传后端可访问的 HTTP(S) MP3 地址。
