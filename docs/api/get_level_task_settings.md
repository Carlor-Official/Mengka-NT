# 读取等级任务计划

从 v2.0.9 起提供；v2.0.8 及更早版本不包含此接口。

通过完成令牌认证的插件 WebSocket 服务调用 `get_level_task_settings`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 明确填写 android 或 linuxqq；等级加速目前只支持 android，linuxqq 返回不支持 |

## 示例

```javascript
const result = await api.get_level_task_settings({ self_id: 123456, client_type: "android" })
```

## 返回

返回 `{ selectedTasks, scheduleEnabled, scheduleTime, lastRunDate }`。未保存时默认为 `[] / false / "04:00" / ""`。从框架 SQLite 读取，离线也可用。lastRunDate 是框架调度器记录的执行日期，只读。

以上返回值是 WebSocket `action_result.data`；失败为 `ok:false` 和 `error`。SDK 自动解包 data 并在失败时拒绝 Promise。

详见[共享等级任务管理接入](../level-task-management.md)。
