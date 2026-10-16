# execute_level_tasks

按数组顺序执行等级任务。

## 调用方式

```js
const result = await api.forProtocol('android').execute_level_tasks(self_id, ['去看免费小说'])
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `client_type` | string | 否 | `android` 或 `linuxqq`，默认 `android` |
| `tasks` | string[] | 是 | 从 `get_level_task_panel` 中选择 `can_execute=true` 的任务标题，不可为空 |

## 返回值

全部执行成功时返回 `null`。

## 错误说明

- 目标账号需在线且 QQ 等级满足框架账号类型要求（free 至少 48 级，plus 至少 16 级，pro 无框架等级限制）。
- 单项失败后继续下一项，批次结束后汇总返回错误；整体取消或请求超时会停止后续执行。
- 批次报错时，其他任务可能已经完成；重试前查询任务面板。
- SDK 等待上限为五分钟；服务端整次请求预算为四分四十五秒。
