# 一体化插件接入

框架将官网审核发布、系统匹配安装、进程管理和 Web 后台入口接到同一插件市场。原有正向、反向 WebSocket 继续可用，外部插件仍在“插件对接”管理。

## 使用流程

1. 在“插件 → 插件市场”找到插件。需要独立管理入口时先点击“配置”，选择 HTTP / HTTPS、域名或 IP，再一键生成；端口自动避开冲突，可在高阶设置中调整。配置完成后点击“下载”，框架按服务器系统和架构选择已审核的安装文件。HTTP 不需要证书；HTTPS 使用匹配地址的有效证书。
2. 安装任务保存在服务器，关闭页面不会取消。进度包含下载、解压、部署和启动。下载总大小已知时，进度条按真实下载量平滑推进，并显示百分比；总大小未知时显示已下载大小和循环动画，不估算百分比。系统启用“减少动态效果”时停止循环动画。
3. 切换“已安装”查看进程、WS 和配置状态。卡片提供管理插件、启动、停止、日志、数据配置、重试、取消及卸载。
4. 自动安装会生成真实的本机正向 WS 服务、端口、随机令牌和连接配置，在“插件对接”可以查看。该连接由安装实例统一启停，不单独编辑。

“待配置”是业务配置尚未完成，“WS 已连接”是通信状态，两者可以同时出现。卸载保留业务数据；市场下架不停止现有实例。配套用户系统插件可在其管理页检查并更新，需要插件自身版本支持，且候选版本已完成官网审核。更新失败时保留或恢复旧程序；升级前请备份业务数据，业务数据不会自动回退。

## 官网发布

任意已登录官网用户可从 [发布插件](https://mknt.net/uc/plugin-publish) 提交资料，无需开发者身份。只提供一体化部署：填写名称、唯一 ID、版本、简介、Logo、最低框架版本、更新日志及各系统下载地址，选择安装文件，补充接入模式、监听端口和 Web 后台信息。

安装与配置说明、数据与目录说明为选填。发布时不下载整包，不验证指纹，不要求填写 JSON、SHA-256、签名文件或包内声明。支持 Windows AMD64、Linux AMD64 和 Linux ARM64 的 ZIP / tar.gz 成品包。

新提交的内部描述为 schema 2。框架安装时自动寻找 Windows EXE、Linux ELF 或 shell 启动文件，优先匹配插件 ID、名称及 start/run/main/app；候选不唯一时明确报错。如果已有根目录 `mengka-managed.json`，可以读取其中 runtime 的入口、参数及管理能力，不核对该文件中的身份、版本或指纹。

旧 schema 1 的已审核记录和安装实例保持原有完整性校验，不直接改写历史审核。旧版市场发布资料已下架保留，需要作者补齐新版资料重新审核；不提供旧表单回退。

提交会冻结本次资料与文章快照。审核通过后官网签署发布记录，框架验证目录签名后才允许安装。上游 Release 或草稿变化不能覆盖已审核版本。单包上限 512 MiB，解压上限 2 GiB / 30000 文件；链接、路径穿越和不安全入口会被拒绝。插件本身需要的运行依赖应随包提供。

## 自动连接与数据

成品包可以不带专用声明，但要自动接入框架，程序必须读取框架传入的运行配置。没有适配的程序部署后仍需在自身后台配置 WS。

| 环境变量 | 用途 |
| --- | --- |
| `MENGKA_MANAGED_V1` | 值为 `1`，表示一体化运行 |
| `MENGKA_PLUGIN_CONNECTION_FILE` | 本次启动的私有连接配置文件 |
| `MENGKA_PLUGIN_DATA_DIR` | 持久化业务数据目录 |
| `MENGKA_PLUGIN_ADMIN_HOST` / `MENGKA_PLUGIN_ADMIN_PORT` | 管理 HTTP 服务的回环监听地址和端口 |
| `MENGKA_PLUGIN_ADMIN_TOKEN_FILE` | 内部管理认证令牌文件 |
| `MENGKA_PLUGIN_ADMIN_ORIGIN` | 浏览器访问插件后台的独立 HTTPS 来源 |

连接文件仍为 schema 1，包含 `instance_id`、`websocket_url`、`token_file`、`data_directory` 和 `allowed_directories`。它与发布描述的 schema 是不同契约。每次进程启动重新读取，不能将令牌发给浏览器、记录到日志或固定保存。

Node.js 可直接使用随 SDK 分发的助手：

```javascript
import { loadManagedConnection, loadManagedStorage } from './managed-connection.js'

const connection = loadManagedConnection()
const storage = loadManagedStorage()
// connection.host / port / token 交给原有正向 WS SDK。
// storage.dataDirectory 用于配置、数据库等持久化数据。
// storage.resolveFile(path) 仅返回允许目录内真实存在的文件。
```

停止插件后，“数据配置”允许更换存储目录并声明额外目录。新存储目录必须尚不存在、父目录已存在；框架复制旧数据后切换，原目录保留。额外目录每行一项，最多 32 项，必须存在；保存采用 revision 防止并发覆盖。插件自行保存的绝对路径需在迁移后核对。

托管插件将可变数据写入框架提供的数据目录；其他目录的访问以运行环境和配置为准。

## 管理端适配

管理服务按框架指定的回环地址监听，验证内部 `X-Mengka-Managed-Token`；网关提供 `X-Mengka-Managed-Origin`。不要将管理令牌或 WS Token 放进浏览器。

普通 schema 2 包不强制健康接口；框架可以按进程与 WS 状态管理。需要精确业务就绪及启停控制的插件可提供可选 runtime 声明：

```json
{
  "runtime": {
    "entry": "bin/my-plugin",
    "args": ["--data", "{data}", "--connection", "{connection}"],
    "health_path": "/api/managed/health",
    "admin": true
  }
}
```

健康接口返回 `{ "ready": true, "configured": false }`：ready 表示技术就绪，configured 表示必填业务配置完整。适配该健康接口的插件还应处理 `/api/managed/control` 的 activate / stop 请求。未激活时只允许初始化读取 action，业务动作和事件受运行生命周期约束；外部 WS 服务保持原有契约。

心跳使用 WS 标准 Ping/Pong，不能等待框架回复自定义 JSON ping。任务失败或连接中不应伪装成已运行。

## 部署框架的管理员：配置插件后台网关

框架默认信任正式官网公钥，使用官网 `/apis/api.mknt.net/v1alpha1/managed-plugin-catalog` 与 `/apis/api.mknt.net/v1alpha1/plugin-market-v3`，普通用户无需配置官网签名密钥。

Web 后台需要独立 HTTPS 来源。推荐为每个实例配置独立子域名：

```ini
[Service]
Environment="MENGKA_PLUGIN_GATEWAY_TEMPLATE=https://{instance}.plugins.example.com"
Environment="MENGKA_PLUGIN_GATEWAY_LISTEN=127.0.0.1:17879"
KillMode=mixed
TimeoutStopSec=45
```

域名 DNS 和泛域名证书准备好后，将该来源反向代理到回环网关。Nginx 示例放在实际 HTTPS server 中：

```nginx
location / {
    proxy_pass http://127.0.0.1:17879;
    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    access_log off;
}
```

没有泛域名时，可设置 `MENGKA_PLUGIN_GATEWAY_ORIGINS_FILE`，指向插件内部 ID 到独立 HTTPS 地址的映射文件。每个插件必须使用不同域名或端口，不能共用框架来源；实际内部 ID 以安装记录为准。此文件由服务器管理员配置，不属于开发者发布表单。

网关签发短期一次性票据，兑换 Secure、HttpOnly、Host-only Cookie，绑定当前框架管理员会话。进入后的管理会话跟随当前设备的框架长期登录，不再绑定 15 分钟访问令牌，也不设额外 8 小时超时。框架刷新令牌时插件入口继续有效，Cookie 按框架登录期限保留；退出框架、撤销该设备会话或官网授权失效后同步拒绝访问。首次打开仍需框架签发一次性入口票据，不向插件或浏览器暴露框架刷新令牌。框架登录真正过期后，重新登录框架并打开插件后台。内部控制路径不向浏览器开放。主站代理也应保留完整 Host 并覆盖 X-Forwarded-Proto。HTTP / HTTPS、IP / 域名及多层代理的说明见[框架访问与反向代理](framework-access.md)。

## 管理 HTTP API

路径前缀 `/api/v1/plugins/managed`，要求框架管理员会话及正确 Origin，返回标准 `{ code, message, data }`。这些管理 HTTP 路由不是 Node SDK 的新增 WS action。

| 方法与路径 | 说明 |
| --- | --- |
| GET `/` | 实例和网关状态 |
| GET `/catalog` | 官网审核目录和本机匹配项 |
| POST `/install` | `{ plugin_id, version, sha256 }`；schema 2 的 sha256 为 `""`，选择必须匹配当前审核版本 |
| POST `/:id/action` | `{ action }`：start、stop、retry、cancel、uninstall |
| POST `/:id/open` | 一次性管理端 URL |
| GET `/:id/logs` | 脱敏运行日志 |
| POST `/:id/storage` | `{ data_directory, allowed_directories, revision }`；停止后提交异步配置任务 |

备份框架 data、外置插件数据目录、网关配置和原版程序。升级或回滚前停止服务，不覆盖运行中的 SQLite 文件。

## GitHub 下载节点与安装状态

框架插件安装复用在线更新的 GitHub 节点列表和并发检测实现：直连、gh-proxy.com、ghproxy.net。每个节点使用两次最多 64 KiB 的实际压缩包探测，按有效响应速度排序；下载失败、文件大小或已有摘要不符时，切换下一节点。总探测时间上限 13 秒，可取消。只对 GitHub Releases 安装文件使用这些节点，其他下载站点直接连接，不把任意地址交给 GitHub 代理。

卡片显示当前下载节点和切换进度。程序部署前显示“安装中”或“安装失败”，失败后可“重试安装”；已有程序启动失败时显示“重试启动”。新上架插件进入市场时重新读取官网资料，使用作者外显名称、Logo 和一句话介绍，不把更新日志作为简介。


### 直接粘贴 HTTPS 证书

在“插件访问设置”选择 HTTPS 后，可直接填写“私钥（KEY）”和“证书（PEM 格式）”，无需填写服务器文件路径。将宝塔或证书服务商给出的完整内容（包含 BEGIN / END 行）分别粘贴到对应输入框；证书使用包含中间证书的完整证书链，私钥必须未加密。点击“保存证书并配置”后，框架校验配对、域名或 IP、有效期及证书链，通过后保存并生效。

两项同时留空会沿用原有有效证书或自动识别站点证书。替换框架直接监听的 HTTPS 证书时，重新粘贴两项即可，已有插件地址保持不变；反向代理负责 HTTPS 的入口仍在反向代理端更新证书。私钥不会回显，保存成功或关闭窗口后输入内容清空。校验或保存失败不替换现有配置。

## 托管插件运行方式

从 v2.2.0 起，Windows 和 Linux 托管插件均作为普通子进程运行，继承框架当前运行用户的权限。不再创建插件专属 UID/GID，不使用 AppContainer、命名空间或隔离代理进程，也不安装 useradd、setpriv、bubblewrap 等依赖。普通用户可以运行框架及插件，只需对实际程序、数据和日志目录具有所需权限。

框架继续提供安装、更新、启动、停止、日志及插件 Web 管理入口。子进程管理会在插件停止时回收进程；WS 服务仍校验令牌。官网插件上架和安装包完整性检查保持原流程。

`allowed_directories` 作为 SDK 存储助手的目录配置继续提供，不是操作系统沙箱。插件可访问哪些宿主资源，由框架运行用户的实际权限决定。

### 旧版升级与数据

同步替换框架主程序与前端，并更新 SDK。已由旧版提交迁移的 `/var/lib/mengka-managed/<安装标识>` 继续作为实际运行目录；新安装使用配置中的托管目录。升级不再次搬迁数据，不删除旧系统用户或修改宝塔/systemd 的运行用户。

备份包含框架 data、实际托管目录、自定义业务目录及网关配置。若自行从 root/管理员切换为普通用户，应同时赋予该用户对这些实际目录的所需权限；目录不可访问时会明确报错，不会悄悄使用过期副本。旧版未完成的迁移不继续自动迁移，以数据库已提交的目录为准。

保留了待启动意图的旧环境准备任务会按普通进程启动；用户主动停止的插件保持停止。其他失败可以在插件卡片点击重试。

## send_packet 插件接入

`send_packet` 已开放给通过服务令牌认证的正向、反向及托管插件。无需提交白名单审批，也无需用户配置专属 Key。直接调用 `api.send_packet(selfId, command, packetHex, true)`；参数和返回见[接口文档](api/send_packet.md)。
