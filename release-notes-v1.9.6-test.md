# 萌卡 NT 1.9.6 测试 SDK

本测试版为独立用户系统插件增加 22 个受控系统管理 action，正向 SDK、反向 SDK与两份插件示例同步为 218 个 action。

- 增加节点、设备指纹、账号设置、登录验证、授权租约与诊断接口。
- `get_bot_list({ all_nodes: true })` 可由获授权的系统管理服务读取全节点账号，并返回节点与协议字段。
- `add_account`、`update_account` 新增对象参数形式，同时保留旧位置参数。
- Android 与 Linux QQ 按 `client_type` 独立分流；Linux 二维码和缓存登录仍调用框架现有原生链路。
- 管理接口要求服务启用 `system_management`，且 action 必须存在于该服务的允许清单。

本目录仅用于本地候选验证，不代表官网或生产版本已更新。
