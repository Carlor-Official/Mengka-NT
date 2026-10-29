<div align="center">
  <img src="mengka-nt-logo.png" width="256" alt="萌卡NT" />

  <p>
    <a href="https://github.com/Carlor-Official/Mengka-NT/releases/latest"><img src="https://img.shields.io/badge/下载-GitHub%20Releases-7C5CFC?style=flat-square" alt="GitHub Releases" /></a>
    <img src="https://img.shields.io/badge/平台-Windows%20%7C%20Linux-2684FF?style=flat-square" alt="Windows 与 Linux" />
    <img src="https://img.shields.io/badge/架构-AMD64%20%7C%20ARM64-7C5CFC?style=flat-square" alt="AMD64 与 ARM64" />
    <img src="https://img.shields.io/badge/管理-WebUI-F59E0B?style=flat-square" alt="WebUI 管理" />
    <img src="https://img.shields.io/badge/插件-IPC%20%7C%20HTTP%20%7C%20WebSocket-00ADD8?style=flat-square" alt="插件接入" />
  </p>

  <p><strong>萌卡NT</strong></p>
  <p>Mengka NT</p>
  <p>面向 QQ NT 协议的跨平台机器人框架</p>
  <p>多账号与多节点 · 可视化 WebUI · 插件扩展 · Windows / Linux</p>

  <p>
    <a href="https://github.com/Carlor-Official/Mengka-NT/releases/latest">下载最新版</a>
    · <a href="https://mengka.net/nt/">项目官网</a>
    · <a href="https://mengka.net/nt/guide/getting-started.html">部署指南</a>
    · <a href="https://mengka.net/nt/api/">API 文档</a>
    · <a href="https://github.com/Carlor-Official/Mengka-NT/issues">问题反馈</a>
  </p>
</div>

---

## 项目简介

萌卡NT（Mengka NT）是一套面向 QQ NT 协议的机器人框架，将账号、设备指纹、连接节点、插件服务和运行状态集中到浏览器中管理。

框架支持 Windows 与 Linux，可管理多个 QQ 账号，并分别选择 Android 手机、平板或 Linux 协议。每个账号实例保留自己的设备指纹、节点和登录状态。

首次使用通过注册卡完成初始化；已有部署可通过迁移保留 UID 和授权权益。完成后使用本地管理员账号登录，初始化入口自动锁定。

本仓库用于发布完整安装包和更新说明。部署与接口文档请访问[官网](https://mengka.net/nt/)。

## 核心能力

| 模块 | 能力 |
| --- | --- |
| 账号管理 | 添加、编辑、登录与下线，查看在线状态、会话和账号日志 |
| 协议与设备 | 按账号选择协议，随机生成或管理设备指纹 |
| 节点连接 | 配置连接节点与代理，按节点分配账号和插件服务 |
| 消息能力 | 群聊与私聊消息、图片、语音、视频、合并转发、引用与撤回 |
| 好友与群管理 | 查询联系人、处理申请与邀请，管理群成员、公告、文件和相册 |
| 等级任务 | 查看任务与加速进度，手动执行或设置自动计划 |
| 插件扩展 | 导入本地 IPC 插件，或通过 HTTP、正向及反向 WebSocket 接入外部服务 |
| 可视化管理 | 浏览器管理后台、移动端适配、主题设置与在线 API 调试 |

具体接口的协议支持范围与调用条件见 [API 文档](https://mengka.net/nt/api/)。

## 平台支持

| 平台 | 安装包 | 启动文件 | 架构 |
| --- | --- | --- | --- |
| Windows | ZIP | `mengka.exe` | AMD64 / x86_64 |
| Linux | TAR.GZ | `mengka` | AMD64 / x86_64 |
| Linux | TAR.GZ | `mengka` | ARM64 / aarch64 |

## 快速开始

### 1. 下载与解压

从 [GitHub Releases](https://github.com/Carlor-Official/Mengka-NT/releases/latest) 下载对应系统的安装包和 `SHA256SUMS.txt`，核对校验值后完整解压到独立目录。

### 2. 启动框架

<details open>
<summary><strong>Windows</strong></summary>

在解压目录运行：

```powershell
.\mengka.exe
```

</details>

<details>
<summary><strong>Linux</strong></summary>

在解压目录执行：

```bash
chmod +x ./mengka
./mengka
```

需要后台常驻运行时，按[Linux 部署指南](https://mengka.net/nt/deploy/linux.html)配置服务。

</details>

### 3. 完成初始化

1. 打开终端显示的初始化地址，并使用启动时生成的访问码。
2. 输入注册卡，阅读并确认使用协议与隐私说明。
3. 设置管理员账号和密码。
4. 完成后进入框架首页，使用管理员账号登录。

已有部署需要换机时，可在原部署发起迁移并在新部署中完成确认；无法访问原部署时，联系管理员核验后恢复。迁移完成后旧部署失效，账号数据和插件数据需另行备份、搬迁。

### 4. 添加 QQ

在账号列表选择“添加账号”，填写 QQ 信息并选择平台、协议、节点和设备指纹。发起登录后，根据提示完成滑块、短信或其他验证。

## WebUI

- **概览**：查看运行状态、账号和消息统计。
- **账号列表**：管理账号、查看会话与日志，进入等级任务。
- **设备指纹**：生成和管理设备配置。
- **服务节点**：维护连接节点和代理设置。
- **插件服务**：配置外部服务，导入和管理本地插件。
- **API 调试**：填写参数、预览请求并查看响应。
- **框架配置**：管理框架名称、运行设置与授权信息。

## 插件开发

外部插件可通过 HTTP 或 WebSocket 调用接口；本地可执行插件使用 IPC 接入，在框架中安装、启停、配置并查看日志。

插件服务绑定节点，账号接口使用 `self_id + protocol_id` 选择实例。IPC 插件需在清单中声明所需接口和事件权限。

接入说明：[插件开发入门](https://mengka.net/nt/reference/plugin-development.html) · [通信协议](https://mengka.net/nt/reference/protocol.html) · [插件导入](https://mengka.net/nt/reference/managed-plugins.html)

### Node.js SDK

SDK 支持 HTTP、正向与反向 WebSocket、托管 IPC，使用对象参数调用 API，并保留框架原生事件字段。

从 [GitHub Releases](https://github.com/Carlor-Official/Mengka-NT/releases/latest) 下载独立 SDK 附件及校验文件。安装、使用示例与接口迁移说明见 [Node.js SDK 文档](https://mengka.net/nt/development/nodejs-sdk.html)。

需要 Node.js 22 或更高版本。本地 IPC 插件还需打包为对应操作系统的可执行安装包；SDK 源码压缩包不能直接导入框架。

## 数据与更新

- 运行数据保存在安装目录中的 `data`，更新前请停止框架并备份数据与插件目录。
- 在线更新按可用版本提示执行；手动更新时，程序与 `public` 静态资源需配套替换。
- 安装包不包含用户账号、运行数据库、日志或私钥。
- 管理员密码、插件令牌和登录缓存请妥善保管，不要公开分享。

## 常见问题

<details>
<summary><strong>管理页面无法打开</strong></summary>

确认框架已启动，并使用终端显示的地址和端口。远程部署时检查防火墙与反向代理配置；代理需支持 WebSocket。

</details>

<details>
<summary><strong>账号登录失败</strong></summary>

检查账号协议、设备指纹和节点配置，根据页面提示完成验证。查看账号日志确认失败原因，避免反复提交验证码。

</details>

<details>
<summary><strong>插件无法连接或看不到账号</strong></summary>

检查连接方式、地址、令牌及插件运行状态，并确认服务绑定的节点包含目标账号。IPC 插件还需声明对应接口和事件权限。

</details>

## 下载与反馈

- 安装包：[GitHub Releases](https://github.com/Carlor-Official/Mengka-NT/releases/latest)
- Node.js SDK：[下载入口](https://github.com/Carlor-Official/Mengka-NT/releases/latest) · [接入文档](https://mengka.net/nt/development/nodejs-sdk.html)
- 使用与开发：[官网文档](https://mengka.net/nt/guide/) · [API 参考](https://mengka.net/nt/api/)
- Bug 与建议：[提交 Issue](https://github.com/Carlor-Official/Mengka-NT/issues)
