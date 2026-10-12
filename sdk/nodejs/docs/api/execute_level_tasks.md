# 执行 QQ 等级任务

`execute_level_tasks` 沿用原 action 与响应契约。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 框架已配置的 QQ 账号 |
| client_type | string | 否 | android 或 linuxqq，原始接口省略时选择 Android |
| tasks | string[] | 是 | 非空任务标题数组；重试前先刷新核对 |

v2.5.9支持 Android 9.1.70 和 Linux 3.2.32，协议通过 `client_type` 区分。只读查询不提交任务；实际执行结果以 QQ 面板为准，不伪造完成或加速数值。

任务执行器已更新，免费小说标题为 `去免费小说看任一本书`。电脑 QQ 在线、创建小游戏擂台并取得成绩、来元宝P图一次及独立会员签到执行器已停用。旧计划与记录保留，旧任务进入跳过列表；缓存不重新启用任务。新任务以 `can_execute` 为准，失败不自动重放。

## 示例

```javascript
const result = await api.forProtocol('linux').execute_level_tasks(123456, ['去免费小说看任一本书'])
```

## 返回

全部执行成功时 Promise 解析为 `null`；任一任务失败时拒绝。后端校验 QQ 16 级门槛，等级未知或不足时拒绝，不接受客户端指定等级。SDK 保持五分钟等待，框架请求总预算四分四十五秒。完整管理流程及执行后刷新使用 `execute_level_task_selection`。

`available` 表示框架能力，`can_execute` 表示本次是否可执行；已完成任务不应被显示为不支持。
