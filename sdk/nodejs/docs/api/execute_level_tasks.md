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

## Android 9.2.70 元宝任务

支持通过现有入口提交 `来元宝P图一次`，必须匹配 QQ 返回的 `center_task_id=83`，且面板 `can_execute=true`。仅 Android 9.2.70 可执行，Linux 不提供此任务。

```js
await api.forProtocol('android').execute_level_tasks(self_id, ['来元宝P图一次'])
```

任务执行时自动准备元宝材料；材料服务未就绪时停止，不更换当前 QQ 指纹、不清缓存、不重登。QQ 请求继续使用当前账号会话。需完成验证时按接口返回的官方验证页面操作。结果以 QQ task83 的 `is_done=true` 为准，生成图片或 HTTP 成功不等于加速到账。结果未知、旧暂停记录保留，不自动重复提交。

产图完成后，QQ 可能延迟记账。此时显示“等待 QQ 确认”，不视为任务成功，也不再次登录或提交图片。当前 QQ 连接保持在线时，框架每分钟只读取一次任务状态，最多持续 45 分钟；重启或该连接断开会停止后台查询，等待记录继续保留，可手动刷新任务。只有官方 task83 明确完成才结清对应的等待记录；旧的结果不明记录不会因此批量解除。
