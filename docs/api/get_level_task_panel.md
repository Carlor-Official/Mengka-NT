# 获取完整等级任务面板

从 v2.0.9 起提供；v2.0.8 及更早版本不包含此接口。

通过完成令牌认证的插件 WebSocket 服务调用 `get_level_task_panel`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 明确填写 android 或 linuxqq；等级加速目前只支持 android，linuxqq 返回不支持 |
| refresh | boolean | 否 | 默认 true；false 优先使用框架缓存，无有效缓存时尝试实时读取 |

## 示例

```javascript
const result = await api.get_level_task_panel({ self_id: 123456, client_type: "android", refresh: false })
```

## 返回

返回 `{ payload, settings }`。payload 与框架网页一致，包含 `can_execute` / `is_paid_task` 标记；settings 与 get_level_task_settings 相同。离线可读取已有缓存；实时刷新失败返回 action 错误，不把旧缓存冒充实时结果。

以上返回值是 WebSocket `action_result.data`；失败为 `ok:false` 和 `error`。SDK 自动解包 data 并在失败时拒绝 Promise。

详见[共享等级任务管理接入](../level-task-management.md)。
