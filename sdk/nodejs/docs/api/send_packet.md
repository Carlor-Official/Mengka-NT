# 发送原始协议包

- action：`send_packet`
- 使用条件：已认证的正向或反向 WebSocket 服务，目标账号在线。托管和外部插件均可调用，无需白名单或专属 Key。

```js
const responseHex = await api.send_packet(selfId, command, packetHex, true, reserveHex)
// Linux QQ 账号
const linuxResponse = await api.forProtocol('linuxqq').send_packet(selfId, command, packetHex)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已登录的机器人 QQ 号 |
| `cmd` | string | 是 | SSO 协议命令名称 |
| `data` | string | 是 | 请求体，偶数长度十六进制，解码后最大 4 MiB |
| `rsp` | boolean | 否 | 是否等待响应，默认 true |
| `reserve` | string | 否 | 自定义 reserve 十六进制，最大 4 MiB；省略时框架生成标准 reserve |
| `client_type` | string | 通用调用必填 | android 或 linuxqq；SDK 方法默认 android，可用 forProtocol 切换 |

```js
const responseHex = await api.call('send_packet', {
  self_id: selfId,
  client_type: 'android',
  cmd: command,
  data: packetHex,
  rsp: true,
})
```

`command` 和 `packetHex` 使用插件业务实际需要的协议与内容。

## 返回与错误

`rsp=true` 返回响应体的小写十六进制字符串；`rsp=false` 提交后返回 null。响应仍需按对应协议解析。

无效参数、账号离线、协议错误或超时会使调用失败。结果未知时先核对业务状态，不要自动重发。接口不再申请插件授权、读取专属 Key 或请求算法白名单服务；服务令牌认证、参数校验和账号路由继续生效。

基础连接见[SDK 快速开始](../sdk-quickstart.md)。
