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
