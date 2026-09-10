# 同一个插件支持手动接入与市场安装

适用框架：**2.1.0**。示例全部使用 Demo 名称及保留示例地址，令牌和密码在运行时填写或生成。不要把实际配置、签名私钥、支付密钥、浏览器 Cookie 打包到 SDK。

## 选择接入方式

| 部署方式 | WS 连接方向 | 配置来源 | 插件管理员 |
| --- | --- | --- | --- |
| 手动部署，正向 WS | 插件连接框架监听端 | 用户在插件填写框架 IP、端口、服务令牌 | 插件自己的初始化与登录 |
| 手动部署，反向 WS | 框架连接插件监听端 | 用户在插件填写本机监听 IP、空闲端口、令牌，并在框架「插件对接」添加对应反向端 | 插件自己的初始化与登录 |
| 插件市场自动安装 | 当前契约为正向 WS，地址由框架分配 | 每次启动重新读取框架私有连接文件 | 从框架「管理插件」进入后自动映射管理员 |

同一份程序通过 `MENGKA_MANAGED_V1=1` 识别市场托管，托管配置优先于已保存的手动配置。托管参数损坏时停止启动，不能回退到旧令牌或开放免登录页面。手动接入本身不授予插件管理员身份。

## Node.js：统一连接入口

下载 SDK 后运行 `npm install`。直接导入 `plugin-connection.js`，业务 API 仍是现有的 233 个 action，无需切换两套业务代码。

```javascript
import { createPluginConnection } from './plugin-connection.js'

const plugin = createPluginConnection({
  name: 'demo-plugin', version: '1.0.0', author: 'Demo Developer',
  manual: {
    mode: process.env.DEMO_WS_MODE || 'forward',
    host: process.env.DEMO_WS_HOST || '127.0.0.1',
    port: Number(process.env.DEMO_WS_PORT || 3001),
    token: process.env.DEMO_WS_TOKEN,
  },
})
plugin.api.on('group_message_received', event => {
  // 在此接入业务；不在示例中自动发送消息或批准请求。
})
await plugin.start()
// 反向 start 表示监听成功；connected=true 后才调用 API。
if (plugin.connected) console.log(await plugin.api.call('get_plugin_context'))
// 停机时 await plugin.stop()
```

正向连接断线后每 5 秒重新尝试；初次失败会抛出错误，但仍继续重试，程序可 catch 后保持运行。反向模式持续监听，由框架重连。请求断线后报错，不重放可能产生副作用的操作。端口占用时返回监听错误，不能擅自改端口造成框架连接到错误地址。

低层入口 `createAPI` / `createReverseAPI` 继续保留。需要专门的业务契约验证、队列或授权逻辑时，可单独使用 `resolvePluginRuntime()` 获取连接配置，再交给自己的客户端。

## 免登初始化：框架 SSO 与插件本地管理员

流程：框架验证已登录管理员 → 签发一次性访问票据 → 插件网关兑换票据、建立访问会话 → 网关转发到本机插件管理端 → SDK 验证请求 → 插件创建或读取专用本地管理员。

**插件不解析框架登录 Cookie、不持有框架 SSO 签名私钥，也不自行生成访问票据。** SDK 读取的是每个插件实例专用的管理令牌。WS 服务令牌与管理令牌用途不同，不能混用。

```javascript
import { authorizeManagedRequest, managedAdminPrincipal } from './plugin-runtime.js'

// Express 示例：挂载到只监听 runtime.adminHost/runtime.adminPort 的管理服务器。
adminApp.use((req, res, next) => {
  if (!authorizeManagedRequest(runtime, req)) return res.status(403).end()
  req.administrator = managedAdminPrincipal(runtime)
  next()
})
```

SDK 同时检查真实 socket 来源为 loopback、管理令牌恒定时间匹配、网关来源及浏览器 Origin。只有 `/api/managed/health`、`/api/managed/control` 的内部调用免检网关来源头，仍必须验证 loopback 和管理令牌。不能信任 `X-Forwarded-For`、前端传入的用户名、角色或任意 `X-Mengka-*` 头。

`managedAdminPrincipal()` 返回稳定的实例级主体 `framework-managed:<instance_id>`，不代表具体的官网作者或个人用户。你的数据库应以 subject/instance_id 为唯一键，在事务中创建或读取本地管理员；若名称已被普通用户占用，报错而不是提升该用户权限。禁止为这个主体启用密码登录。重启保留同一管理员和数据；卸载重装产生新的实例 ID 时创建新主体。

B站插件没有额外用户数据库，通过验证后将当前请求作为管理会话；用户系统有用户数据库，映射为 `framework_managed` 管理员。两者都保留手动部署时独立的账号密码初始化。

## 可运行示例

完整例子位于 [`examples/dual-mode/server.mjs`](../examples/dual-mode/server.mjs)。它同时演示双向 WS、手动管理员认证、托管管理员落盘、重复启动、健康检查、激活和停止。示例手动管理端仅监听本机，使用 HTTP Basic；正式产品可替换为自己的密码哈希与 Session 登录，远程代理时使用 TLS。

PowerShell 手动正向运行（将占位文字替换为框架签发的服务令牌和自行设置的密码）：

```powershell
$env:DEMO_WS_MODE = 'forward'
$env:DEMO_WS_HOST = '127.0.0.1'
$env:DEMO_WS_PORT = '3001'
$env:DEMO_WS_TOKEN = 'REPLACE_WITH_SERVICE_TOKEN'
$env:DEMO_ADMIN_PASSWORD = 'REPLACE_WITH_YOUR_OWN_PASSWORD'
node examples/dual-mode/server.mjs
```

打开 `http://127.0.0.1:8088/`，用户名 `demo`。示例不会给陌生请求自动创建管理员。

改成手动反向时设置 `DEMO_WS_MODE=reverse`、`DEMO_WS_PORT=3002`。同机监听 `127.0.0.1`；跨机器接入时可配置本机网卡 IP，并在防火墙放行该端口。框架「插件对接 → 反向 WS」填写插件可访问的 WS 地址和相同令牌。框架在升级握手中发送 `Authorization: Bearer <服务令牌>`，建立后发送 `ready`。

市场启动时无需上面的手动变量。框架注入：

| 环境变量 | 含义 |
| --- | --- |
| `MENGKA_MANAGED_V1` | 固定为 `1` |
| `MENGKA_PLUGIN_CONNECTION_FILE` | 私有连接 JSON 的绝对路径，SDK 读取，开发者不用在发布表单填写 JSON |
| `MENGKA_PLUGIN_DATA_DIR` | 数据目录，与连接文件一致 |
| `MENGKA_PLUGIN_ADMIN_HOST` / `PORT` | 管理端仅监听 `127.0.0.1` 及分配端口 |
| `MENGKA_PLUGIN_ADMIN_TOKEN_FILE` | 每实例管理令牌文件绝对路径 |
| `MENGKA_PLUGIN_ADMIN_ORIGIN` | 外部管理入口，支持 HTTP/IP 或 HTTPS/域名 |

连接文件 schema=1，包含 `instance_id`、`websocket_url`、`token_file`、`data_directory`、`allowed_directories`。这些文件由框架生成并限制访问。只能在服务端内存中读取令牌，不回传浏览器、不写入普通配置、不记录请求凭据。

健康检查 `GET /api/managed/health` 返回 `{ready, connected, configured}`。先建立 WS，收到 `POST /api/managed/control` 的 `{"action":"activate"}` 后再启动定时任务；`stop` 时停止业务任务，继续响应管理与健康检查。`createManagedLifecycle()` 提供状态门，实际定时器应由你的插件按状态启动或停止。

市场发布仍在官网填写名称、版本、系统/架构下载地址、启动文件和 Web 后台信息，提交审核后上架。将 Node 示例打包成目标系统可运行程序，不能把 `.mjs` 直接当成无需运行时的二进制包。

## C++ / Qt

发行仓库 [`sdk/cpp`](https://github.com/Carlor-Official/Mengka-NT/tree/main/sdk/cpp) 提供可独立引用的双向 WS 传输和托管请求校验，B站综合插件直接使用相同文件。详见其 README。C++ 示例同样不包含插件授权算法、支付配置、发布签名私钥或图片托管密钥。
