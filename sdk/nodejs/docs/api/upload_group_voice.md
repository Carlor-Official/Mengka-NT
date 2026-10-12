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
| `file_path` | string | 是 | 插件允许目录内的本地 MP3 / Silk 路径、`file://` 或后端可访问的 HTTP(S) 音频地址 |

支持 MP3 和 SILK_V3（标准或腾讯文件头），按文件内容识别格式。MP3 自动转换为 Silk；Silk 保留原有压缩数据，不重复编码。时长和波形自动生成。

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

`duration` 为整数秒。返回段只能发送到上传时指定的群。

## 示例

```js
const voice = await api.upload_group_voice(
  123456789,
  987654321,
  'data/media-downloads/example.silk',
)

await api.send_group_msg(123456789, 987654321, [voice])
```

本地路径指框架所在机器，且必须位于插件授权目录或允许的媒体目录（如 `data/media-downloads`）。远程插件可传后端可访问的 HTTP(S) MP3 或 Silk 地址。
