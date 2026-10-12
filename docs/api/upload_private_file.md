# upload_private_file

将本地文件或可下载的 HTTP(S) 文件发送给指定 QQ 好友。框架使用 QQ Android 的离线文件通道，依次完成签名申请、Highway 上传和私聊文件消息下发。

## 调用方式

```js
const result = await api.upload_private_file({
  self_id: 2082083,
  user_id: 1060221,
  file: 'D:/Mengka-NT/files/report.txt',
  name: 'report.txt',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `user_id` | number | 是 | 接收文件的好友 QQ 号；也兼容 `target_uin` |
| `file` | string | 是 | 框架所在机器的本地文件路径、`file://` 地址或 HTTP(S) 下载地址；也兼容 `file_path` |
| `name` | string | 是 | 好友侧显示的文件名；也兼容 `file_name` |

## 返回值

成功时返回：

```json
{
  "success": true,
  "file_id": "文件 UUID",
  "file_name": "report.txt",
  "file_size": 128,
  "message_id": 4399468640647658,
  "msg_seq": 7117,
  "client_seq": 10321
}
```

`file_id` 会缓存文件校验信息，可继续交给 `get_private_file_url` 获取下载地址；`message_id` 使用框架统一消息引用，可用于消息查询等后续操作。

::: warning 路径与好友关系
正向 WebSocket 调用时，本地路径指框架所在机器，不是插件所在机器。目标 QQ 必须能被当前账号解析为有效好友；文件大小、上传频率和风险控制仍以 QQ 服务端返回为准。
:::
