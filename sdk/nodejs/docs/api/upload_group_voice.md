# upload_group_voice

上传群聊语音，并返回可直接发送的语音消息段。

v2.5.15 修复 Android 9.1.70 上传通道初始化时错误强制索取签名的问题。调用参数、返回语音段和 MP3 输入要求不变；上传失败会指出是在申请语音凭据还是获取上传通道阶段。

## 调用

```js
const voice = await api.upload_group_voice(self_id, group_id, file_path)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群聊 ID |
| `file_path` | string | 是 | 后端本地路径、`file://` 或后端可访问的 HTTP(S) 音频地址 |

后端使用原生 Go MP3 解码器，将音频转换为单声道 24kHz PCM，再按 20ms 分包编码为 Silk，并以同一份样本生成波形、时长和上传摘要。无需 FFmpeg、Docker 或外部解码进程；当前上传音频输入支持 MP3，未实现的格式明确返回错误。

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

插件与萌卡NT不在同一台主机时，应传后端可访问的 HTTP(S) 地址。
