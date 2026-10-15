# 萌卡 NT v1.5.10

## 更新

本版本重点收紧 Windows Docker/WSL 配套运行环境的目录边界，避免框架文件被写入 `C:` 盘或其他框架目录之外的位置。

- 框架工作目录固定为程序所在目录，`data`、`logs`、`cache`、`plugins`、`runtime` 等相对路径不再受启动终端当前目录影响。
- Windows Docker/WSL 配套文件统一存放在框架目录下的 `runtime/docker`，安装状态也保存在该目录内。
- Docker 安装器拒绝绝对路径、`..`、环境变量以及符号链接/目录联接造成的目录越界。
- 检测到旧版框架目录外的 `MengkaDocker` 环境时会停止操作并给出迁移提示，不会自动删除或移动用户现有数据。
- 首次初始化说明与当前 Web 两步安装流程同步：先确认使用协议，再使用萌卡 NT 官网个人令牌完成管理员绑定。
- 公开 SDK 能力基线更新至 v1.5.10；本次没有新增或删除 API，仍为 85 个 action 与 5 类事件。

## 升级说明

1. 停止旧版框架并备份框架目录。
2. 解压对应平台安装包并覆盖程序文件，保留原有业务数据目录。
3. Windows 用户如曾使用旧版目录外的 `MengkaDocker`，请先按页面提示卸载旧环境，再由框架重新安装到 `runtime/docker`。
4. Windows 的 WSL、VirtualMachinePlatform 与系统虚拟化功能仍由 Windows 管理；若出现 HCS/虚拟化未启用提示，需要在 BIOS 和 Windows 功能中启用虚拟化并重启系统。

## 验证

- Go 全量测试与 `go vet` 通过。
- 前端 45 项测试与生产构建通过。
- 开发文档生产构建通过。
- Windows amd64、Linux amd64、Linux arm64 三端包完成架构、版本、权限与敏感文件审计。
- Windows 安装包内的 Docker 安装器已实测拒绝框架目录外路径。

## 下载校验

| 文件 | SHA-256 |
| --- | --- |
| `mengka-nt-v1.5.10-windows-amd64.zip` | `AFCE8B62777417CF5F12357FBD3623DBB26F7581AE52055A6BDBAA46236B9393` |
| `mengka-nt-v1.5.10-linux-amd64.tar.gz` | `84D8C54CB3B8FB2CB5E2AEBCCBD40BF466AEB0BA271B5898F816E7BF351878AA` |
| `mengka-nt-v1.5.10-linux-arm64.tar.gz` | `3B5F76567E83418626D164B25FF5E2A85B7960CC7A78270FE7C73D794ACDD8CC` |

本仓库发布内容仅包含萌卡 NT 框架前后端运行包，不包含 QSign APK、算法服务或其他项目的变更。
