<div align="center">
  <img src="mengka-nt-logo.png" width="256" alt="萌卡 NT" />

  <p>
    <a href="https://github.com/Carlor-Official/Mengka-NT/releases/latest"><img src="https://img.shields.io/badge/下载-GitHub%20Releases-7C5CFC?style=flat-square" alt="GitHub Releases" /></a>
    <img src="https://img.shields.io/badge/平台-Windows%20%7C%20Linux-2684FF?style=flat-square" alt="Windows 与 Linux" />
    <img src="https://img.shields.io/badge/架构-AMD64%20%7C%20ARM64-00A884?style=flat-square" alt="AMD64 与 ARM64" />
    <img src="https://img.shields.io/badge/管理-WebUI-F59E0B?style=flat-square" alt="WebUI 管理" />
    <img src="https://img.shields.io/badge/插件-Node.js%20%7C%20WebUI%20SDK-00ADD8?style=flat-square" alt="Node.js 与 WebUI 插件 SDK" />
  </p>

  <p><strong>萌卡 NT</strong></p>
  <p>Mengka NT</p>
  <p>面向 QQ NT 协议的跨平台机器人框架</p>
  <p>多账号与多节点 · 可视化 WebUI · 插件 WebSocket · Windows / Linux</p>

  <p>
    <a href="https://github.com/Carlor-Official/Mengka-NT/releases/latest">下载最新版</a>
    · <a href="https://github.com/Carlor-Official/Mengka-NT/releases">版本记录</a>
    · <a href="https://github.com/Carlor-Official/Mengka-NT/issues">问题反馈</a>
    · <a href="sdk/nodejs">Node.js SDK</a>
    · <a href="sdk/plugin-web">WebUI SDK</a>
  </p>
</div>

---

## 项目简介

萌卡 NT（Mengka NT）是一套面向 QQ NT 协议的机器人框架。它将账号、设备指纹、连接节点、插件服务和运行状态集中到 Web 管理界面，并通过插件 WebSocket 与 Node.js SDK 向外提供消息、联系人、群管理及扩展业务能力。

框架适用于 Windows 与 Linux，可同时管理多个 QQ 账号，并为每个账号保留独立的协议、设备、节点和登录状态。首次启动会进入浏览器中的两步初始化页面，阅读使用协议后使用萌卡 NT 官网个人令牌完成管理员绑定；初始化完成后安装入口会自动锁定。

> 本仓库是萌卡 NT 的官方版本发布与插件 SDK 文档入口，不提供框架核心业务源码，也不包含运行配置、账号数据、数据库或密钥。

## 核心能力

| 模块 | 能力 |
| --- | --- |
| 账号管理 | 多 QQ 账号统一管理，支持密码登录、缓存登录、滑块与短信安全验证流程 |
| 协议与设备 | 独立选择 QQ 协议和设备指纹，集中维护设备环境信息 |
| 节点连接 | 多节点配置，支持按节点分配账号以及 HTTP / SOCKS5 代理 |
| 消息能力 | 群聊与私聊消息收发，支持图片、语音、视频、转发消息及消息撤回等常用操作 |
| 联系人与群 | 好友、群和群成员列表查询，入群申请与邀请处理，管理员、禁言和群签到等管理能力 |
| QQ 空间与任务 | 提供空间动态发布、点赞、浏览上报以及部分 QQ 服务任务的插件接口 |
| 插件系统 | 正向或反向 WebSocket 插件服务，按节点绑定机器人，提供 Node.js SDK、插件 WebUI SDK 与统一 action 结果 |
| 可视化管理 | 概览、账号、指纹、节点、插件、容器、令牌、日志与消息面板 |

当前 1.9.9 SDK 提供 218 个 action，只有一套当前契约。`system_management` 是权限覆盖层：完整权限包由 24 个框架管理专用 action 和 18 个复用现有处理器的 Bot 管理 action 组成。新增扫码找回接口仅返回手机 QQ 明确确认后的账号，不完成登录或保存票据。QQ 宠物 API 仍为普通公开接口，专属 Key 仅用于 `send_packet`。管理能力同时受服务总开关与允许清单校验，不会自动授予普通插件。

系统管理服务可使用 `get_plugin_context` 检查授权上下文，以 `get_bot_list({ all_nodes: true })` 读取全节点账号，并通过 `add_account({...})` / `update_account({...})` 的对象参数指定 `node_id` 与 `client_type`。设备指纹创建和账号停止只使用 `create_device_profile`、`stop_account_login`；旧的 `generate_device_profile`、`offline_account` 已移除。完整权限清单、调用示例和安全边界见 [Node.js SDK 文档](sdk/nodejs/README.md#198-系统管理接口) 与 [官网 API 文档](https://mknt.net/api/)。

## 平台支持

| 平台 | 外发包 | 启动文件 | 架构 |
| --- | --- | --- | --- |
| Windows | `mengka-nt-v*-windows-amd64.zip` | `mengka-nt.exe` | AMD64 / x86_64 |
| Linux | `mengka-nt-v*-linux-amd64.tar.gz` | `mengka-nt` | AMD64 / x86_64 |
| Linux | `mengka-nt-v*-linux-arm64.tar.gz` | `mengka-nt` | ARM64 / AArch64 |

不同平台和架构的程序不能混用。请只从本仓库 [Releases](https://github.com/Carlor-Official/Mengka-NT/releases) 下载正式外发包。

## 快速开始

### 1. 下载与解压

进入 [GitHub Releases](https://github.com/Carlor-Official/Mengka-NT/releases/latest)，根据服务器系统和 CPU 架构下载对应压缩包，并完整解压到独立目录。

升级已有安装前，请先停止框架并备份程序目录中的 `data` 目录。不要用新包中的空目录覆盖已有运行数据。

### 2. 启动框架

<details open>
<summary><strong>Windows AMD64</strong></summary>

在解压目录运行：

```powershell
.\mengka-nt.exe
```

需要查看协议调试信息时使用：

```powershell
.\mengka-nt.exe -debug
```

</details>

<details>
<summary><strong>Linux AMD64 / ARM64</strong></summary>

在解压目录执行：

```bash
chmod +x ./mengka-nt
./mengka-nt
```

需要查看协议调试信息时使用：

```bash
./mengka-nt -debug
```

建议使用 systemd 或其他进程管理器保持框架运行，并在公网部署时通过 Nginx 配置 HTTPS 反向代理。

</details>

### 3. 首次初始化

第一次运行时，框架会先启动 Web 安装页面：

1. 使用浏览器打开终端显示的框架地址；
2. 阅读并同意萌卡 NT 使用协议；
3. 填写 Web 服务监听地址和端口；
4. 前往[萌卡 NT 官网个人令牌页面](https://mknt.net/uc/profile?tab=pat)创建并填写个人令牌；
5. 框架验证令牌后，以官网用户信息完成管理员绑定并进入管理后台。

初始化完成后安装入口会锁定，再次访问安装地址会返回 404。管理员身份以萌卡 NT 官网账号为准，不会在框架本地额外生成一套独立管理员密码。

将服务暴露到公网前，请配置 HTTPS、限制后台访问来源，并使用高强度管理员密码。

### 4. 添加并登录 QQ

进入 WebUI 后依次完成：

1. 在“节点”中检查或添加连接节点，需要时配置代理；
2. 在“指纹”中准备账号使用的设备指纹；
3. 在“账号”中添加 QQ，选择协议、设备指纹和所属节点；
4. 发起登录，根据返回状态完成滑块、短信或其他安全验证；
5. 登录成功后，在账号页查看在线状态、消息统计、会话和运行日志。

## WebUI

萌卡 NT 将常用管理能力集中到浏览器界面：

- **概览**：查看框架、系统资源、账号与消息运行状态；
- **账号**：添加、登录、离线和管理 QQ，查看等级、消息统计、会话与账号日志；
- **消息面板**：浏览群聊和私聊会话，并进行消息交互；
- **指纹**：创建和维护账号设备指纹；
- **节点**：维护连接节点、账号分配和代理配置；
- **插件**：创建插件服务、选择连接模式、绑定节点并管理令牌；
- **容器**：查看和管理框架使用的容器运行环境；
- **设置**：管理应用配置、访问令牌和版本信息。

## 插件 SDK

仓库在 [`sdk/nodejs`](sdk/nodejs) 提供不带版本子目录的 Node.js 插件 SDK，支持连接插件 WebSocket、接收机器人事件并调用框架 action；[`sdk/plugin-web`](sdk/plugin-web) 提供插件网页后台接入 SDK，用于将插件自带的管理页面安全嵌入框架 WebUI。

### 安装

直接使用 [`sdk/nodejs/sdk.js`](sdk/nodejs/sdk.js)（正向 WebSocket）或 [`sdk/nodejs/reverse-sdk.js`](sdk/nodejs/reverse-sdk.js)（反向 WebSocket）。可运行示例仍位于 [正向 WebSocket 示例](plugin/正向WebSocket/Node.js) 和 [反向 WebSocket 示例](plugin/反向WebSocket/Node.js)。进入所选目录后执行：

```bash
npm install
```

### 连接示例

```js
import { createAPI } from './sdk.js'

const api = createAPI({
  host: '127.0.0.1',
  port: 3001,
  token: process.env.MENGKA_PLUGIN_TOKEN,
  name: 'example-plugin',
  version: '1.0.0',
  author: 'your-name',
})

await api.connect()
```

不要将插件令牌直接写入源码或提交到公开仓库。完整接口和登录流程见 [萌卡 NT 开发文档](https://docs.mknt.net/)。

插件提供网页后台时，请参考 [WebUI SDK 接入说明](sdk/plugin-web/README.md) 和可选运行描述示例，使用框架分配的本地端口、挂载路径与令牌文件，不要把管理令牌写入前端代码或 URL。安装包不需要权限清单；API 与事件权限只以官网审核快照为准。

## 安全与数据

- 外发包不包含用户账号、运行配置、数据库、日志或私钥；
- 管理后台、应用接口与插件服务使用各自的身份凭据，请分别保存；
- 插件只能访问自身绑定节点下的机器人，不能通过参数跨节点操作账号；
- `data` 目录包含框架运行数据，迁移或升级前必须单独备份；
- 调试日志可能包含命令和错误上下文，排查完成后不建议长期启用 `-debug`；
- 不要公开分享配置文件、数据库、插件令牌、Cookie 或登录缓存。

## 常见问题

<details>
<summary><strong>WebUI 无法打开</strong></summary>

先确认终端已经显示“服务端已启动”，再检查初始化时选择的监听地址和端口。远程服务器还需要放行防火墙或安全组端口；使用反向代理时，请同时检查 Host、WebSocket 和 HTTPS 配置。

</details>

<details>
<summary><strong>账号一直离线或登录失败</strong></summary>

确认账号选择了有效的协议、设备指纹和连接节点。根据账号日志中的错误码完成滑块、短信或其他安全验证；缓存失效时请改用密码登录重新生成缓存。

</details>

<details>
<summary><strong>插件连接不上框架</strong></summary>

检查插件服务的连接模式、监听地址、端口、令牌和节点绑定。插件与框架不在同一台机器时，还需要检查防火墙、安全组和反向代理是否允许 WebSocket 升级。

</details>

<details>
<summary><strong>升级后数据是否会丢失</strong></summary>

正常升级只替换程序与静态资源，不应删除原有 `data` 目录。升级前仍建议完整备份该目录，并确认新版本启动正常后再删除备份。

</details>

## 版本与反馈

- 最新版本：[GitHub Releases](https://github.com/Carlor-Official/Mengka-NT/releases/latest)
- 历史版本：[版本记录](https://github.com/Carlor-Official/Mengka-NT/releases)
- Bug 与建议：[提交 Issue](https://github.com/Carlor-Official/Mengka-NT/issues)
- 插件开发：[Node.js SDK](sdk/nodejs) · [WebUI SDK](sdk/plugin-web) · [开发文档](https://mknt.net/api/)

本仓库当前不提供框架核心业务源码或开源许可。请仅从本仓库 Release 获取正式外发包。
