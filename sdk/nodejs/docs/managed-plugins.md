# 本地插件导入与托管运行

萌卡 NT v2.4.0 起不再读取官网插件清单，也不提供远程下载或在线更新。管理员从可信来源取得插件成品包后，在“插件 → 插件导入”手动上传。原有正向、反向 WebSocket 继续在“插件对接”中管理。

## 用户使用流程

1. 打开“插件 → 插件导入”，选择 ZIP、TAR.GZ 或 TGZ 成品包，并确认安装包来自可信来源。
2. 框架根据插件包声明匹配当前系统与架构，将原始上传包保存到框架预留的插件目录并创建管理卡片。
3. 卡片展示名称、版本、作者、运行状态和连接摘要；完整安装信息、文件摘要及路径收进“更多”详情。
4. 卡片保留启动、停止、日志、数据配置、管理后台、卸载和失败重试。
5. 上传同一插件的更高版本时沿用现有实例、数据目录和回滚流程；相同版本或降级包会被拒绝。

插件导入页面只展示当前实例已经上传的插件。框架不会请求官网目录，也不会自动查找、下载或安装插件。上传更高版本时，如新增 Action、事件权限、Web 管理端或切换传输方式，第一次上传会停在权限核对页；管理员确认差异后才可再次提交，框架不会自动批准或自动重试。卸载默认保留业务数据；升级前仍应单独备份插件数据。

## 安装包要求

- 支持 Windows AMD64、Linux AMD64 和 Linux ARM64 的成品包。
- 上传上限、解压上限、路径穿越、符号链接和不安全启动入口继续由框架校验。
- 导入时必须确认安装包来自可信来源；安装后框架记录完整程序文件指纹，每次启动前复核。目录内容变化时先“卸载并保留数据”，再重新上传安装包。
- 插件本身需要的运行依赖应随包提供。
- 只上传来源可信、版本明确且与当前系统架构匹配的文件。
- 插件令牌、管理员密码、签名私钥、Cookie 和生产配置不得打包进成品包。
- 插件进程以框架进程所属用户的系统权限运行；`data_directory` 和 `allowed_directories` 是框架接口与约定边界，不是操作系统沙箱。

## 自动连接与数据

导入后的托管插件会收到框架生成的运行配置。原生 `native-ipc-v1` 插件使用匿名进程管道，不再创建 WebSocket 地址和服务令牌；旧版托管插件继续使用下列连接文件：

| 环境变量 | 用途 |
| --- | --- |
| `MENGKA_MANAGED_V1` | 值为 `1`，表示由框架托管运行 |
| `MENGKA_PLUGIN_CONNECTION_FILE` | 本次启动的私有连接配置文件 |
| `MENGKA_PLUGIN_DATA_DIR` | 持久化业务数据目录 |
| `MENGKA_PLUGIN_ADMIN_HOST` / `MENGKA_PLUGIN_ADMIN_PORT` | 管理 HTTP 服务的回环监听地址和端口 |
| `MENGKA_PLUGIN_ADMIN_TOKEN_FILE` | 内部管理认证令牌文件 |
| `MENGKA_PLUGIN_ADMIN_ORIGIN` | 浏览器访问插件后台的独立来源 |

连接文件始终包含 `transport`、`instance_id`、`data_directory` 和 `allowed_directories`；旧版 WebSocket 传输另含 `websocket_url` 与 `token_file`。插件每次启动重新读取，不得把令牌发给浏览器、写入日志或固定保存。原生插件格式和 SDK 见[原生插件协议](../../../docs/native-plugins.md)。

Node.js 插件可直接使用 SDK 助手：

```javascript
import { loadManagedConnection, loadManagedStorage } from './managed-connection.js'

const connection = loadManagedConnection()
const storage = loadManagedStorage()
```

托管插件应将可变数据写入框架提供的数据目录。停止插件后，可以在“数据配置”中迁移存储目录或声明额外目录；保存采用 revision 防止并发覆盖。

## 管理后台与 SSO

插件管理服务只监听框架指定的回环地址，并验证内部 `X-Mengka-Managed-Token`。框架网关签发一次性入口票据并映射当前本地管理员会话；浏览器和插件均不会获得框架刷新令牌。

管理后台需要独立来源时，可配置：

```ini
[Service]
Environment="MENGKA_PLUGIN_GATEWAY_TEMPLATE=https://{instance}.plugins.example.com"
Environment="MENGKA_PLUGIN_GATEWAY_LISTEN=127.0.0.1:17879"
```

反向代理必须保留 Host、`X-Forwarded-Proto` 和 WebSocket Upgrade。没有泛域名时，可使用 `MENGKA_PLUGIN_GATEWAY_ORIGINS_FILE` 为每个实例映射独立来源。

## 本地管理 API

路径前缀 `/api/v1/plugins/managed`，要求本地管理员会话及正确 Origin：

| 方法与路径 | 说明 |
| --- | --- |
| GET `/` | 本地导入实例和网关状态 |
| POST `/import` | 上传并校验本地插件成品包；multipart 必须包含 `trusted_source_ack=true` |
| POST `/:id/action` | start、stop、retry、cancel、uninstall |
| POST `/:id/open` | 获取一次性管理端入口 |
| GET `/:id/logs` | 读取脱敏运行日志 |
| POST `/:id/storage` | 停止后提交数据目录配置任务 |
| GET `/:id/config` | 读取原生插件 Schema、非敏感值、修订号与敏感字段设置状态 |
| POST `/:id/config` | 按修订号保存加密配置并热更新原生插件 |

旧版 `/api/v1/plugins/market`、`/api/v1/plugins/managed/catalog` 和 `/api/v1/plugins/managed/install` 已移除，不提供兼容回退。

## 备份与升级

备份框架 `data`、预留插件目录、外置业务数据目录及网关配置。升级或回滚前停止框架，不要复制运行中的 SQLite 文件，也不要用空目录覆盖现有数据。
