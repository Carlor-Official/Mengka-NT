# execute_level_task_selection

执行选定等级任务并返回刷新后的面板。

## 调用方式

```js
const result = await api.execute_level_task_selection({ self_id, client_type: 'android', tasks: ['去看免费小说'] })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `client_type` | string | 是 | 目标协议：`android` 或 `linuxqq` |
| `tasks` | string[] | 否 | 从 `get_level_task_panel` 中选择 `can_execute=true` 的任务标题；省略或空数组时，按已选计划或未完成任务筛选 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `tasks` | string[] | 本次执行的任务标题 |
| `skippedTasks` | string[] | 已完成、不支持或付费等被跳过的标题 |
| `payload` | object | 执行后的等级任务面板 |
| `refreshed` | boolean | 执行后是否刷新成功 |
| `refreshError` | string | 刷新失败原因；成功时为空字符串 |

## 错误说明

- 目标账号需在线且 QQ 等级满足框架账号类型要求（free 至少 48 级，plus 至少 16 级）。
- 单项失败后继续下一项，批次结束后汇总返回错误；整体取消或请求超时会停止后续执行。
- 批次报错时，其他任务可能已经完成；重试前查询任务面板。
- SDK 等待上限为五分钟；服务端整次请求预算为四分四十五秒。
