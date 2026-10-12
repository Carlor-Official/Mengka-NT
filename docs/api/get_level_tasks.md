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
| `overall_info.total_days` | number | 当日总加速值，单位为十分之一天 |
| `overall_info.base_days` | number | 日常加速值，单位为十分之一天 |
| `overall_info.extra_days` | number | 额外加速值，单位为十分之一天 |
| `overall_info.vip_speed` | number | 会员加速倍数的十倍值 |
| `base_info.base_task_list` | object[] | 日常任务 |
| `extra_info.extra_task_list` | object[] | 额外任务 |
| `vip_info.vip_list` | object[] | 会员权益项目 |
| `is_freeze` | boolean | 是否冻结加速 |

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
