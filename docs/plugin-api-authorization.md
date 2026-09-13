# 插件 API 使用说明

从 v2.2.0 起，框架已将 `send_packet` 开放为普通 API。通过服务令牌认证的正向、反向 WebSocket 插件均可调用，不要求托管运行、平台白名单、插件版本审批、框架实例绑定或用户专属 Key。

```js
const responseHex = await connection.api.send_packet(selfId, command, packetHex, true)
```

托管插件直接使用框架提供的 `MENGKA_PLUGIN_CONNECTION_FILE`，外部插件使用服务配置中的地址和令牌。不要在浏览器或公开源码中暴露服务令牌。

## 升级

同步更新框架主程序、前端和 SDK 后生效。旧框架仍按其原有规则工作，不会因为更新 SDK 自动获得新行为。算法系统已移除白名单管理，旧授权接口返回已停用；历史 Key 和调用日志保留查阅。

托管插件以框架当前用户作为普通子进程运行，不再使用 Linux 独立 UID/GID、Windows AppContainer 或专用 IPC 通道。框架不会为插件创建系统用户、安装隔离依赖或要求专门的管理员身份。现有程序、数据、更新、日志和启停管理继续使用原流程。

连接示例见[SDK 快速开始](sdk-quickstart.md)，完整参数见[send_packet](api/send_packet.md)。
