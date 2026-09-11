# 发送原始协议包

- action：`send_packet`
- 使用条件：当前插件版本已获准，并由框架托管运行。

```js
const responseHex = await api.send_packet(selfId, command, packetHex, true, reserveHex)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已登录的机器人 QQ 号 |
| `cmd` | string | 是 | 协议命令名称 |
| `data` | string | 是 | 请求内容，偶数长度十六进制字符串 |
| `rsp` | boolean | 否 | 是否等待响应，默认 true |
| `reserve` | string | 否 | 扩展内容，十六进制字符串，默认空 |
| `client_type` | string | 通用调用必填 | android 或 linuxqq；SDK 方法默认 android，可用 forProtocol 切换 |

通用调用示例：

```js
const responseHex = await api.call('send_packet', {
  self_id: selfId,
  client_type: 'android',
  cmd: command,
  data: packetHex,
  rsp: true,
})
```

`command` 和 `packetHex` 使用插件功能实际需要的协议与内容。

## 返回

`rsp=true` 返回响应内容的十六进制字符串；`rsp=false` 提交后返回 null。响应仍需按对应协议解析。

无调用权限时抛出错误，`error.code` 为 `PLUGIN_NOT_ALLOWED`。参数无效、账号离线、协议错误或超时也会使调用失败。结果未知时先核对业务状态，不要自动重发。

连接方式见[SDK 快速开始](../sdk-quickstart.md)。
