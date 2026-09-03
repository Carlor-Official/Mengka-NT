# 萌卡 NT v1.9.8

本版本修复系统管理插件的账号登录衔接，使插件端与框架账号页使用同一套缓存与协议分流链路。

## 核心更新

- `login_account` 现在按账号协议分流：Android 保持原密码登录，Linux 进入框架原生二维码登录管理器。
- Linux 插件登录复用框架的登录占用、MSF 连接、二维码生成、扫码查询、手机确认和最终上线流程，不复制或改写协议状态机。
- 现有 `query_login_qr_status` 支持查询 Linux 原生二维码状态，确认后由框架调用原生完成登录流程。
- 现有 `create_login_qr` 继续用于 Linux 账号登录；新增 `create_account_recovery_qr`、`query_account_recovery_qr_status` 两个独立的归属验证 action，只验证手机 QQ 确认结果，不执行登录或保存票据。SDK 现为 218 个 action。
- 插件可在首次登录前依次调用 `check_cache` 与 `cache_login`；仅当缓存明确失效时再进入 Android 密码登录或 Linux 二维码登录。
- `stop_account_login` 统一停止登录中或已在线账号的当前会话，避免前端直接切换状态而遗留登录任务。
- 普通插件节点隔离、系统管理服务权限清单、Android 登录与 Linux 断线恢复逻辑保持不变。
- 修复插件管理端全页 SSO 跳转遇到访问令牌过期时直接显示 `login expired` 的问题；框架会在受保护的认证路径中续签会话，无法续签时回到登录页。
- 插件 SSO 仍以框架管理员账号为唯一身份来源，并继续走框架已有的官网验证逻辑；插件不直接访问萌卡官网用户系统。
- 系统管理授权包同步加入账号归属扫码验证接口，框架服务设置中的开关会自动保存完整 42 项权限清单。
- Android ID、GUID、QIMEI 改为账号级设备身份，按 `(self_id, platform)` 独立保存；设备指纹模板不再保存或返回这三个字段。Android ID 在账号首次连接前使用系统安全随机源生成 16 位十六进制字符串，QIMEI 失败重试不会更换 Android ID。
- SDK 和框架只保留当前契约：移除 `generate_device_profile`、`offline_account`，分别改用 `create_device_profile`、`stop_account_login`；`add_account`、`update_account` 只接受对象参数。
- 插件市场只接受当前 Halo 发布注解或“插件发布信息”表格，不再解析 `mengka-plugin/v1` JSON 代码块；事件权限必须显式声明，框架不再根据 action 猜测权限。
- 协议文件只接受 `subappid`，不再识别 `magic`、`subAppId`、`sub_appid` 等旧字段；`autoLogin` 未配置时按关闭处理，旧等级任务标题不再映射到新任务。
- 删除运行时 `ALTER TABLE`、旧 Docker 安装参数和旧市场源等自动迁移/推断分支。结构或字段不符合 1.9.8 时直接报错，避免以隐藏兜底继续运行。

## 升级说明

本次数据库结构不兼容旧版本。升级前先停止框架并完整备份原目录中的 `data`，将旧 `data/config.db` 移出运行目录；确认进程已经停止后，一并移出可能存在的 `data/config.db-wal`、`data/config.db-shm`。替换程序和 `public` 前端资源后启动 1.9.8，由框架创建全新数据库，再重新创建指纹、节点、插件服务和账号。不要把旧数据库放回新版本目录。

插件调用需要同步调整：删除指纹请求或响应中的 `androidId`、`guid`、`qimei`；将 `generate_device_profile` 改为 `create_device_profile`，将 `offline_account` 改为 `stop_account_login`；把 `add_account(self_id, password, protocol_id, device_profile_id)` 与同格式的更新调用改成对象参数。

插件市场文章需要迁移到 Halo 的 `mknt.net/plugin-*` 发布注解，或使用“插件发布信息”表格；无论是否订阅事件，都要显式声明事件权限（空权限使用 `mknt.net/plugin-permissions-declared=true`，表格填写“订阅事件：无”）。自定义 `data/protocol.json` 必须删除 `magic` 等旧字段并提供数值 `subappid`。配置文件应显式写入 `app.autoLogin`。

外发包不包含数据库、管理员配置、日志、源码、密钥或 Git 元数据。
