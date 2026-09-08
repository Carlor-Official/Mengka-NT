# 执行等级任务并刷新面板

从 v2.0.9 起提供；v2.0.8 及更早版本不包含此接口。

通过完成令牌认证的插件 WebSocket 服务调用 `execute_level_task_selection`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 明确填写 android 或 linuxqq；等级加速目前只支持 android，linuxqq 返回不支持 |
| tasks | string[] | 否 | 显式任务标题数组；省略或 [] 使用框架已选任务，若没有可执行已选项则补挂当前全部可执行未完成任务 |

## 示例

```javascript
const result = await api.execute_level_task_selection({ self_id: 123456, client_type: "android", tasks: ["完成视频任务获得加速时长"] })
```

## 返回

返回 `{ tasks, skippedTasks, payload, refreshed, refreshError }`。tasks 是实际提交执行的标题，skippedTasks 是显式请求中被过滤的标题，payload 是完成后的面板。已完成、付费、协议不可执行及不支持的任务均过滤。若执行成功但刷新失败，refreshed=false，保留执行前面板并返回 refreshError；请刷新面板，禁止据此自动重新执行。执行本身失败返回原 action 错误，不自动重试。

以上返回值是 WebSocket `action_result.data`；失败为 `ok:false` 和 `error`。SDK 自动解包 data 并在失败时拒绝 Promise。

详见[共享等级任务管理接入](../level-task-management.md)。
