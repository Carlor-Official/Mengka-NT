# 账号指纹管理迁移

框架改为按 QQ 号和具体登录协议自动管理独立设备指纹。

- `add_account`、`update_account` 不再接受调用方指定非零 `device_profile_id`。新增账号自动生成；同一具体协议的普通编辑保留原指纹。
- 账号新增/编辑拒绝非空 `token`，不接受外部登录缓存导入。
- `create_device_profile`、`delete_device_profile` 已从能力列表与 SDK 删除，不提供旧名称或替代兼容入口。
- `get_device_profile_list` 和 `get_account_management_context().device_profiles` 仅用于只读展示和诊断，不能作为账号指纹选择器。
- 主动更换指纹使用 `refresh_account_fingerprint`，必须明确提交 `self_id`、`client_type`、当前 `protocol_id` 和 `confirm: true`。账号须离线，刷新成功后重新登录。
- 插件应移除独立指纹管理页面，在账号编辑页提供带确认的刷新按钮，并检查 `get_plugin_context().available_actions` 是否包含该能力。

此变更不要求清空账号或 data 目录。升级过程中不要批量刷新用户指纹；仅在用户明确选择刷新时调用新接口。

升级保留全部旧账号的登录身份和缓存，即使旧账号共用指纹，也不会自动拆分或要求重新登录。旧账号仅在用户手动确认“刷新指纹”时更换为独立指纹并清理对应协议的登录缓存；其他账号和协议不受影响。新添加的账号及首次切换到的新协议自动生成独立指纹；普通编辑、重启和切回已有协议均复用该协议原来的身份。
