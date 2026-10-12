# get_plugin_context

读取当前插件服务的管理 API 上下文，适合在管理端启动时确认连接目标与契约版本。

当前 `management_api_version` 为 `1`，`available_actions` 共 54 项，包含共享等级任务管理接口和只读状态接口 `get_level_task_status`；`level_task_management_api_version` 仍为 `1`。插件必须检查所需 action 是否在列表中，不能仅因版本字段为 1 就假定全部能力存在。该列表是管理能力子集，不是全部公开 action。

## 调用方式

```js
const context = await api.get_plugin_context()
```

## 参数

无。

## 返回值

```js
{
  service_id: 1,
  service_name: 'mengka-user-system',
  management_api_version: 1,
  level_task_management_api_version: 1,
  available_actions: ['get_plugin_context', 'get_account_management_context', 'get_node_list'],
  admin_base_url: 'http://127.0.0.1:7891'
}
```

`available_actions` 列出服务可调用的接口。账号接口通过 `self_id` 和 `client_type` 选择目标会话。
