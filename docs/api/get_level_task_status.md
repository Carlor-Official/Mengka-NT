# 查询等级任务状态

v2.5.3 新增。通过已完成服务令牌认证的插件 WebSocket 调用 `get_level_task_status`，网页「调试」使用同一接口。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 框架已配置的 QQ 账号 |
| client_type | string | 是 | android；等级加速暂不支持 linuxqq |
| refresh | boolean | 否 | 默认 true，实时查询；false 优先读取缓存，无有效缓存时尝试实时查询 |

```javascript
const status = await api.get_level_task_status({
  self_id: 123456, client_type: 'android', refresh: true
})
```

HTTP 管理端对应 `GET /api/v1/level-tasks/accounts/:self_id/tasks/status?platform=android`，沿用管理员认证；`refresh=0` 优先读缓存。插件 SDK 继续使用服务令牌，不增加其他密钥或设备选择参数。

## 返回

WebSocket 成功返回 `action_result.data`（SDK 自动解包），HTTP 成功返回既有 `{code, data, message}` 包装。失败沿用现有错误契约，不以旧缓存冒充实时结果。

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
| refresh_requested | boolean | 本次是否请求实时查询；false 不代表缓存一定存在 |
| tasks | array | 日常、额外、会员免费任务的状态列表 |

天数和会员倍数均已从 QQ 面板的十分位数值换算，无需调用方再次除以 10。总加速天数直接取 QQ 面板汇总，不由任务列表自行相加。未知等级的两项进度返回 null；不会把登录天数当成累计活跃天数。预计升级口径与页面一致，是已含加速的活跃天数差，不再除以今日加速倍数，也不承诺实际日历日期。

每项任务包含 `title`、`task_id`、`center_task_id`、`category`（base / extra / member）、`status`（pending / completed）、`status_text`（待完成 / 已完成）、`is_done`、`available`、`can_execute`。未支持的任务仍可返回待完成状态，`available=false`，不是错误宣称已完成。已完成任务 `can_execute=false`；未知等级或低于 16 级也不可执行。

仅查询任务状态不要求 QQ 16 级，不发起登录、元宝授权、安全验证续接或任务执行，不自动重试。缓存查询返回缓存中的既有结果；需要最新结果请使用默认实时查询，账号需在线。

原 `get_level_tasks` 和 `get_level_task_panel` 的返回结构不变。
