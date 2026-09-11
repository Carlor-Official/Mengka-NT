# 插件共享等级任务管理接入

此能力从 v2.0.9 起提供。v2.0.8 及更早安装包不包含这些管理接口；请先将框架前后端及 SDK 升级到 v2.0.9，或更新版本，再接入插件。

## 新增 API

- [获取等级加速账号列表](api/get_level_task_accounts.md)：`get_level_task_accounts`
- [获取账号等级进度](api/get_level_task_account.md)：`get_level_task_account`
- [获取完整等级任务面板](api/get_level_task_panel.md)：`get_level_task_panel`
- [读取等级任务计划](api/get_level_task_settings.md)：`get_level_task_settings`
- [保存等级任务计划](api/update_level_task_settings.md)：`update_level_task_settings`
- [执行等级任务并刷新面板](api/execute_level_task_selection.md)：`execute_level_task_selection`

## 能力与权限

连接插件服务并完成原有令牌认证后，调用 `get_plugin_context`，检查 `level_task_management_api_version === 1` 且 `available_actions` 包含上述六项；原 `management_api_version` 仍为 1。能力不足时明确提示升级，不能静默回退插件自己的任务表。

这些接口沿用框架现有可信服务管理权限，不新增已移除的 system_management / allowed_actions 配置。服务令牌只能保存在插件后端；浏览器不得拿到令牌或直接调用任意管理 action。插件仍负责每次请求的账号归属、登录身份、套餐及管理员权限校验。`get_level_task_accounts` 包含框架所有账号，普通用户响应必须由插件后端过滤。

`self_id` 必须是框架已配置账号，`client_type` 明确传 `android` 或 `linuxqq`；等级加速当前仅 Android 可用。未配置账号、错误平台及非法参数返回失败，不串到同 QQ 的另一平台。

## 用户插件适配映射

| 插件现有页面操作 | 新框架调用 |
| --- | --- |
| 账号列表 | 先从插件确认归属，再过滤 get_level_task_accounts |
| 单账号等级进度 | get_level_task_account |
| GET tasks?refresh=0/1 | get_level_task_panel，refresh 转为布尔值 |
| 读取开关和执行时间 | get_level_task_settings，或 panel.settings |
| 保存 selectedTasks/scheduleEnabled/scheduleTime | update_level_task_settings，转换为 selected_tasks/schedule_enabled/schedule_time |
| 补挂执行 | execute_level_task_selection，完整返回 tasks/skippedTasks/payload/refreshed/refreshError |

```javascript
const target = { self_id: 123456, client_type: 'android' }
const panel = await api.get_level_task_panel({ ...target, refresh: false })
await api.update_level_task_settings({
  ...target, selected_tasks: ['完成视频任务获得加速时长'],
  schedule_enabled: true, schedule_time: '04:00'
})
// 仅用户明确点击“补挂”时执行，不要放在刷新或计算属性中。
const result = await api.execute_level_task_selection({
  ...target, tasks: ['完成视频任务获得加速时长']
})
if (!result.refreshed) console.warn(result.refreshError)
```

保存计划不立即执行。框架主机本地时间为调度依据：到点且当天尚未成功执行的计划会被检查；错过设定分钟后仍可补执行。`lastRunDate` 只由框架调度器写入，修改设置不重置它。任务执行前会重新取状态并过滤不可执行项目，网页、插件和调度器按账号串行执行。

## 迁移边界

1. 插件停止自己的等级任务定时器，删除“新计划写到插件 level_schedules 并由插件执行”的调用路径。其他账号、套餐等定时业务保留。
2. 以框架 `level_task_settings` 和 `level_task_cache` 为唯一数据源。已有框架计划必须保留；插件旧计划不得自动覆盖。需要迁移时让管理员对比并明确选择，再逐账号调用保存 API。
3. 普通用户只可读写自己拥有且当前有权限的账号。所有操作在插件服务器检查权限，不能只在菜单隐藏。
4. 显式传 tasks 时只执行交集；不要为了“重试”传空数组，因为空数组采用框架自动补挂规则。请求超时或断线不证明任务未执行，SDK 不重放；先刷新后人工确认。
5. 执行成功但刷新失败时，显示 refreshError，不把旧 payload 当作新进度，也不要自动重新执行。实时读取失败保持明确错误；refresh=false 可以读取已有缓存。

原 `get_level_tasks` 与 `execute_level_tasks` 原始协议契约保持不变，新的完整面板接口使用独立 action 名。框架网页现在也调用同一业务服务，因此无需维护插件侧付费标记、进度推算或计划数据库副本。

## v2.0.9 接口验收范围

覆盖真实本地 WS 认证与 HTTP 的双向设置/缓存一致性、离线读取与实时刷新失败、平台隔离、只读执行日期、付费/完成/协议不可执行过滤、执行后刷新失败不重放、框架本地时间与跨日调度，以及正反向 Node SDK 参数和响应。v2.0.9 此项接口验收未调用真实 QQ 账号任务；用户插件本身的适配与计划迁移仍由插件开发任务完成。


## v2.1.0：电脑 QQ 在线

`电脑QQ在线` 已支持手动补挂和框架定时计划。目标仍传在线安卓账号的 `self_id` 和 `client_type: 'android'`；框架使用同 QQ 安卓会话授权 Linux 免扫登录。已有 Linux 在线会话直接复用，已有账号的节点和设备不被覆盖；没有 Linux 账号时，框架生成独立设备配置并沿用安卓账号的登录节点创建 Linux 账号。

登录成功只表示开始或继续累计电脑在线时长，不会将任务强行标记完成。加速与完成状态以 QQ 返回的任务面板为准。安卓离线、授权拒绝、二维码过期或登录失败都会返回错误；请查看账号状态和日志，必要时从账号页人工扫码完成验证。框架已有等级门槛、任务过滤和计划执行规则继续生效。

```javascript
const result = await api.execute_level_task_selection({
  self_id: 123456, client_type: 'android', tasks: ['电脑QQ在线']
})
// refreshed=false 时说明执行后的面板刷新失败，不要自动重放任务。
if (!result.refreshed) console.warn(result.refreshError)
```


## v2.1.0：会员签到

等级任务页面在“额外任务”后新增“会员签到”。会员成长值单独展示，不并入 QQ 加速天数；每项任务都有独立自动执行开关，默认关闭，保存后与现有计划共用框架调度器。

| 任务 | 说明 |
| --- | --- |
| QQ会员公众号签到 | 使用本账号会员登录态执行活动 |
| QQ大会员官网签到 | 完成签到后提交会员任务 |
| 分享QQ大会员官网 | 活动接收者为本账号，完成后提交会员任务 |
| QQ大会员师徒打卡 | 需满足对应会员与师徒活动条件，业务拒绝如实显示 |
| 浏览QQ空间访客页面 | 访问本账号访客页面并提交任务 |
| QQ大会员空间专属点赞 | 发布仅自己可见、24 小时后自动删除的说说，再执行大会员特效点赞 |
| QQ音乐绿钻每日签到 | 使用本账号音乐登录态调用会员接口，实际成长值以音乐会员页面为准 |
| 黄钻每日打卡 | 完成官网打卡后领取成长值；签到和领取分别校验业务结果 |

共享面板新增 `payload.member_info.member_task_list`。每项包含 `title`、`category: 'membership'`、`membership_group`、`available`、`can_execute`、`is_done`、`status_text`、`execution_message` 和 `attempted_today`。不要把会员任务计入 QQ 加速天数。

```javascript
const panel = await api.get_level_task_panel({
  self_id: 123456, client_type: 'android', refresh: false
})
const rows = panel.payload?.member_info?.member_task_list || []

// 手动执行明确选择的一项。
const result = await api.execute_level_task_selection({
  self_id: 123456, client_type: 'android', tasks: ['QQ会员公众号签到']
})
if (result.refreshed === false) console.warn(result.refreshError)
```

`update_level_task_settings.selected_tasks` 使用相同任务名称保存自动计划。设置操作会替换选中列表，请先读取旧设置再修改，避免覆盖已有等级任务。未选择会员任务的旧计划不会自动开启新项目。

执行记录保存在框架数据库。当天成功的项目不会重放；中断、超时或结果不明确时显示“待核对”，当天停止自动重试。多步骤任务保留已完成步骤，避免重复发说说。明确失败可核对原因后手动执行；定时计划同一天不反复尝试。接口执行成功不承诺固定成长值到账。

黄钻每日打卡默认关闭，与其他会员签到共用框架调度及执行记录；签到成功后保留领取阶段，结果不明确时当天不会自动重放。已下线的 QQ会员每日签到、超级会员成长储值奖励不再返回到任务列表，旧配置中的这两项不会执行。黄钻官网其他任务可能轮换，未验证的个性装扮任务不作为已支持项展示。
