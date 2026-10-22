# get_level_task_panel

获取等级任务、执行状态及自动执行设置。

## 调用方式

```js
const result = await api.get_level_task_panel({
  self_id, client_type: 'android', refresh: true,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `client_type` | string | 是 | 目标协议：`android` 或 `linuxqq` |
| `refresh` | boolean | 否 | 默认 true；false 时优先使用缓存 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `payload` | object | 面板数据，基础字段见 [get_level_tasks](get_level_tasks.md#返回值) |
| `payload.daily_totals_available` | boolean | 可选；false 表示汇总未知，`overall_info` 数值为 null，任务列表仍可用 |
| `payload.member_info.member_task_list` | object[] | Android 会员签到任务 |
| `settings` | object | 自动执行设置，字段见 [get_level_task_settings](get_level_task_settings.md#返回值) |

Linux 只使用当前 Linux 账号会话。任务数量及执行能力按当前协议返回；执行前检查 `can_execute`。

### 管理任务字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 任务标题，可用于执行接口 |
| `sub_title` | string | 任务说明 |
| `is_done` | boolean | 是否已完成 |
| `executable` | boolean | 是否具备执行器 |
| `speed_days` | number | 加速值，单位为十分之一天 |
| `center_task_id` | number | 任务中心 ID |
| `is_vip_task` | boolean | QQ 的会员任务标记 |
| `available` | boolean | 当前协议是否支持该任务 |
| `can_execute` | boolean | 当前是否允许执行 |
| `is_paid_task` | boolean | 是否为付费任务 |
| `status_text` | string | 任务状态说明 |
| `execution_message` | string | 最近一次执行结果或错误说明 |

## 错误说明

账号不存在、协议不支持或实时刷新失败时抛出错误。

## Android 9.2.70 元宝任务

现有等级任务入口支持 `来元宝P图一次`（`center_task_id=83`），仅 Android 9.2.70 可执行；Linux 不提供此任务。按 `available`、`can_execute` 和持久暂停状态判断是否能提交。查询本身不触发元宝授权或生成图片；执行成功必须由 QQ 返回 `is_done=true` 确认，结果不明不得自动重放。执行前需要可用的元宝网关与材料设备。

### 元宝生命周期状态（v2.7.8 起）

元宝任务仍使用 `center_task_id=83`。任务对象新增可选字段：

| 字段 | 说明 |
| --- | --- |
| `yuanbao_state` | `idle`、`verification`、`running`、`awaiting_qq`、`stopped`、`canceled`、`expired` 或 `completed` |
| `yuanbao_started_at` | 当前阶段开始时间，Unix 毫秒；可显示顺计时，不代表完成百分比 |
| `yuanbao_verification_available` | 是否有仍有效、可重新打开的当前验证入口 |
| `yuanbao_failure` | 已停止任务的安全诊断：`stage`、`kind`、`http`、可选 `code` 和 `reason`；不包含票据、响应原文或验证链接 |
| `yuanbao_stopped_at` | 已记录的停止时间，Unix 毫秒 |

`verification` 表示等待官方验证；`running` 表示执行器仍在运行；`awaiting_qq` 表示图片任务已完成但 QQ 尚未确认。`stopped` 不表示后台仍在执行，不能继续显示运行进度或自动重放。只有 QQ 返回 `is_done=true` 才能显示已完成。

管理前端通过已有管理员认证下的 `GET /api/v1/level-tasks/accounts/:self_id/tasks/yuanbao-verification?platform=android` 读取同一次验证入口，返回 `state`、`verification_id` 和可选 `verification`。关闭弹窗不取消验证，也不延长有效期。`POST` 同路径加 `/cancel`，提交当前 `verification_id`，仅取消尚未提交图片任务的当前验证；不会取消正在续接的请求，也不会清除运行结果不明的保留记录。这两个入口仅供框架管理页面使用，不新增插件 action。

## 终止恢复（v2.7.9 起）

已结束且没有活跃执行器的任务自动恢复 `yuanbao_state=idle`、`status_text=待完成`、`can_execute=true`（以任务可用且 QQ 未完成为前提），阶段时间清零、旧验证入口释放。升级遗留记录在启动或读取面板时处理。失败原因仍保留在账号日志，不再用永久暂停锁阻止用户重新操作。

有效验证、执行中和活跃的 QQ 确认查询不提前释放。停止查询后只释放操作状态，不伪造 QQ 完成结果；用户再次执行时先读取 QQ，已完成则跳过，未完成才开始新的一次任务。自动清理不发起登录、验证或图片请求，后台计划不自动重放失败任务。
