# get_level_tasks

获取 QQ 等级加速面板。

## 调用方式

```js
const panel = await api.forProtocol('android').get_level_tasks(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `client_type` | string | 否 | `android` 或 `linuxqq`，默认 `android` |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `uin` | string | QQ 号 |
| `source` | string | 可选；Linux 独立任务面板为 `linux_web` |
| `daily_totals_available` | boolean | 可选；false 表示今日汇总不可用，四项 `overall_info` 数值均为 null |
| `level_progress` | object | Linux 的实际等级进度，包含 `level`、`remaining_days`、`current_level_days`、`level_span_days` |
| `overall_info.total_days` | number 或 null | 当日总加速值，单位为十分之一天 |
| `overall_info.base_days` | number 或 null | 日常加速值，单位为十分之一天 |
| `overall_info.extra_days` | number 或 null | 额外加速值，单位为十分之一天 |
| `overall_info.vip_speed` | number 或 null | 会员加速倍数的十倍值 |
| `base_info.base_task_list` | object[] | 日常任务 |
| `extra_info.extra_task_list` | object[] | 额外任务 |
| `vip_info.vip_list` | object[] | 会员权益项目 |
| `is_freeze` | boolean | 可选；是否冻结加速 |

Linux 通过当前 Linux 会话读取任务，不要求 Android 在线。仅返回该协议实际提供的任务；今日汇总为 null 时不可按 0 处理，也不可将任务奖励相加作为总加速。

### 任务字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 任务标题，可用于执行接口 |
| `sub_title` | string | 任务说明 |
| `is_done` | boolean | 是否已完成 |
| `executable` | boolean | 是否具备执行器 |
| `speed_days` | number | 加速值，单位为十分之一天 |
| `center_task_id` | number | 任务中心 ID |
| `is_vip_task` | boolean | QQ 的会员任务标记 |

完整任务管理面板见 [get_level_task_panel](get_level_task_panel.md)。
