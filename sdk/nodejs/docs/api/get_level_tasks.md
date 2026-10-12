# 获取 QQ 等级加速面板

`get_level_tasks` 沿用原 action 与响应契约。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 框架已配置的 QQ 账号 |
| client_type | string | 否 | android 或 linuxqq，原始接口省略时选择 Android |

v2.5.9支持 Android 9.1.70 和 Linux 3.2.32，协议通过 `client_type` 区分。原始查询保留 QQ 面板分类与标记，完整管理面板请使用 `get_level_task_panel`。只读查询不提交任务；实际执行结果以 QQ 面板为准，不伪造完成或加速数值。

Android 9.1.70 保留 QQ 返回的非付费任务，并恢复电脑在线、直接擂台执行及 8 项会员签到。免费小说支持 QQ 当前返回的 `去看免费小说` 和附件中的 `去免费小说看任一本书`。`is_vip_task` 是 QQ 的任务标记，不能用于判定任务收费；管理面板按 `is_paid_task` 和明确的购买项目过滤。来元宝P图一次仍展示，但现有执行器仅适配 9.2.70，9.1.70 不标记为可执行。旧计划与记录保留。以 `can_execute` 为准，失败不自动重放。

## 示例

```javascript
const result = await api.forProtocol('linux').get_level_tasks(123456)
```

## 返回

保持 `uin`、`overall_info`、`base_info`、`extra_info`、`is_freeze` 等原面板字段。失败时 SDK 拒绝 Promise。

`available` 表示框架能力，`can_execute` 表示本次是否可执行；已完成任务不应被显示为不支持。
