# 插件 API 授权

`send_packet` 仅供已获准的插件版本使用。普通插件 API 无需申请此权限，用户无需填写或绑定专属 Key。

1. 开发者提交对应版本和平台的插件安装包，由管理员批准。
2. 用户从插件市场安装获准版本，并由框架启动插件。
3. 插件使用框架提供的连接配置调用 API。

升级时同步更新框架和 SDK，保留框架启动时提供的连接参数。外部手动 WS 接入仍可使用普通 API；调用 `send_packet` 需要获准版本托管运行。

```js
try {
  const responseHex = await connection.api.send_packet(selfId, command, packetHex, true)
  // 按对应协议解析 responseHex。
} catch (error) {
  if (error.code === 'PLUGIN_NOT_ALLOWED') {
    console.error('当前插件版本尚未获得 send_packet 调用权限')
  } else {
    throw error
  }
}
```

遇到 `PLUGIN_NOT_ALLOWED`，检查插件版本是否获准、是否由框架启动，以及运行状态是否正常。不要重复提交失败的发送请求。

连接示例见[SDK 快速开始](sdk-quickstart.md)，参数和返回见[send_packet](api/send_packet.md)。
