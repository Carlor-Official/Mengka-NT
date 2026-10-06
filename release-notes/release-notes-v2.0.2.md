# 萌卡 NT v2.0.2

本版本是 v2.0.1 的当前契约修正版。v2.0.1 已产生下载，因此不覆盖同版本资产，使用新版本明确区分最终构建。

## 修复内容

- 账号离线通知接口只接受和返回 `offlineEnabled`，移除遗留的 `emailEnabled` 参数及响应字段。
- 插件 WebSocket 管理 API 与 HTTP 管理 API 使用同一套当前字段，不再存在旧字段回退分支。
- 外发包重新基于最终私有源码提交构建，Windows、Linux AMD64 与 Linux ARM64 均使用 Garble 随机种子、字符串混淆、路径裁剪和符号剥离。

## 不兼容调整

- 调用 `get_account_offline_notification` 时只读取 `offlineEnabled`。
- 调用 `update_account_offline_notification` 时只提交 `offlineEnabled` 和可选的 `email`。
- 使用旧 `emailEnabled` 字段的插件必须改为 `offlineEnabled`；框架不会继续兼容旧字段。

## 升级说明

从 v2.0.1 升级前，请停止框架并完整备份安装目录中的 `data`。完整替换程序与 `public` 前端资源后重新启动。数据库无需手工迁移。

外发包仅包含混淆后的可执行文件、生产前端资源、协议清单和初始化 SQL；不包含源码、源码映射、数据库、配置、日志、密钥、开发依赖或 Git 元数据。
