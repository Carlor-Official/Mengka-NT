# get_level_task_status

获取等级加速汇总及任务状态。查询无等级限制；实时查询要求账号在线。

## 调用方式

```javascript
const status = await api.get_level_task_status({
  self_id: 123456, client_type: 'android', refresh: true
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 框架已配置的 QQ 账号 |
| client_type | string | 是 | android 或 linuxqq；支持 Android 9.1.70 与 Linux 3.2.32 |
| refresh | boolean | 否 | 默认 true，实时查询；false 优先读取缓存，无有效缓存时尝试实时查询 |

## 返回值

返回以下对象：

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| self_id / client_type | number / string | 账号与协议 |
| level | number | 当前 QQ 等级，未同步时为 0 |
| total_days | number | 今日总加速天数 |
| base_days | number | 日常任务天数 |
| vip_multiplier | number | 会员加速倍数 |
| extra_days | number | 额外任务天数，不包含独立会员成长任务 |
| active_days_baseline | number 或 null | 当前等级基线的活跃天数：level² + 4 × level |
| estimated_upgrade_days | number 或 null | 从当前等级基线至下一级的加速活跃天数差：2 × level + 5 |
| progress_basis | string | 固定 level_baseline，明确是等级基线估算 |
| refresh_requested | boolean | 本次是否请求实时查询 |
| tasks | array | 日常、额外、会员免费任务的状态列表 |

天数和会员倍数均已从 QQ 面板的十分位数值换算，无需调用方再次除以 10。总加速天数直接取 QQ 面板汇总，不由任务列表自行相加。未知等级的两项进度返回 null；预计升级口径与页面一致，是已含加速的活跃天数差，单位为活跃天数。

### tasks 列表项

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 任务标题 |
| `task_id` | string | 任务标识 |
| `center_task_id` | number | 任务中心 ID |
| `category` | string | `base`、`extra` 或 `member` |
| `status` | string | `pending` 或 `completed` |
| `status_text` | string | 待完成或已完成 |
| `is_done` | boolean | 是否完成 |
| `available` | boolean | 当前协议是否支持 |
| `can_execute` | boolean | 当前是否可执行 |
