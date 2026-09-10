# Mengka NT C++ / Qt 接入 SDK

适用框架 2.1.0，Qt 6.2 及以上、C++20。B站综合插件 Windows/Linux 使用相同的两个头文件，没有复制任何插件授权密钥或业务代码。

- `mengkawebsocket.h`：手动正向或反向 WS 传输、反向令牌验证、单框架连接限制。
- `managedruntime.h`：托管连接文件读取、管理端参数验证、网关令牌与 Origin 验证。
- `demo.cpp`：通过环境变量切换手动/托管，演示 WS 握手。只有 Demo 身份，不附带真实配置。

构建：

```sh
cmake -S . -B build -DCMAKE_PREFIX_PATH=/your/Qt
cmake --build build
```

把两个头文件加入自己的 CMake target，并启用 AUTOMOC：

```cmake
set(CMAKE_AUTOMOC ON)
target_sources(my_plugin PRIVATE mengkawebsocket.h managedruntime.h)
target_link_libraries(my_plugin PRIVATE Qt6::Core Qt6::Network Qt6::WebSockets)
```

手动模式填写 `DEMO_WS_MODE=forward` 或 `reverse`，`DEMO_WS_HOST`、`DEMO_WS_PORT`、`DEMO_WS_TOKEN`。正向插件发 `auth` 等待 `auth_ok`；反向框架使用 Bearer 服务令牌连接插件，然后发送 `ready`。业务 action/event 格式完全相同。端口冲突直接报错；反向监听端在连接中断后继续等待框架重连。收到控制帧 ping 时 Qt 自动响应 pong。

托管模式通过框架注入的 `MENGKA_MANAGED_V1=1` 识别，调用 `loadManagedConnection()`。只接受 schema=1、loopback WS 和私有目录内的令牌文件；读取失败必须终止，不能使用旧配置。托管目前采用正向 WS。

## 管理员免登

管理服务器绑定 `loadManagedAdmin()` 返回的本机地址和端口。每次请求先验证：

```cpp
const auto admin = Mengka::loadManagedAdmin();
if (!admin.valid) return startupFailure();
// headers 的名称转换为小写；peer 必须取真实 socket，不能使用 X-Forwarded-For。
if (!Mengka::gatewayCredential(headers, peer, admin.token)
    || !Mengka::gatewayOrigin(headers, path, admin.origin)) {
    return httpForbidden();
}
// 验证成功后为当前请求映射本地管理员；不要向浏览器返回 admin.token。
return serveAsFrameworkAdministrator();
```

框架拥有登录会话和一次性 SSO 票据；插件不需要框架私钥，不生成 SSO 票据。管理令牌与 WS 令牌分离。HTTP/IP 和 HTTPS/域名入口均支持，插件内部管理监听始终是 loopback。

有用户数据库的插件可按受信任的 `instance_id` 事务创建专用管理员，唯一键避免重启重复创建，禁止普通账户名称碰撞后提权，禁止该主体密码登录。没有用户数据库的插件可像 B站综合插件一样，只对验证通过的当前请求授予管理权限。手动部署继续使用插件原有的管理员初始化及登录，不能凭 WS 连通就免登。

必须实现 `/api/managed/health` 和 `/api/managed/control`，激活后才开始业务任务、stop 后停止任务。完整生命周期、数据目录、Node.js 可运行管理端示例见 [双模式接入指南](../nodejs/docs/dual-mode-sdk.md)。目录白名单是合作式插件约束，不是原生进程沙箱。
