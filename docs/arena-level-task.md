# 小游戏擂台等级任务

本次擂台任务接线处于待发布状态，正式 API 已部署至授权测试服务 `mknt.bilibilibot.com`，并已完成下述正式 worker 整局验收；尚未部署生产环境或发布新 Release。文档说明 v2.2.3 基线上的当前实现与测试结果，不代表已发布安装包具备执行环境。

2026-09-14 的正式 API 验证中，2082083 的 QQ task80 已完成，执行接口正常返回且没有新建擂台或新增当日尝试记录，已完成账号的 no-op 路径通过。1060221 首轮尝试在创建前失败，记录为 `worker_failed`、`creation_sent=false`；随后独立的标准诊断查询发现当时 QQ 响应缺少 bootstrap 所需的 `ilink_buffer`，这不是对首轮初始化各步骤的直接观测。同日晚完成手机授权后，fresh bootstrap 已通过。测试中归档首轮记录，并对已核验未发送创建请求的预占记录作了一次受控修复；这不是公开 API 的自动重试能力。

当晚 21:14–21:15，1060221 通过标准 `execute_level_tasks` 完成正式整局：执行前 task80 未完成，执行成功后原始查询与管理面板刷新均返回 `is_done=true`、`status=1`，journal 为 `completed` 且 `creation_sent=true`。原宿主记录确认实际开局、结算、返回 Home、`onHide`、请求收尾和正常退出全部完成，共 3 次原游戏输入操作；两次退出后只读快照均无残留任务 cgroup 或任务进程。本次证据来自正式 API 与 worker，自然出分及等级入账验收已通过。

仅处理 QQ 返回的 `center_task_id: 80` 且 `title: '创建小游戏擂台并取得成绩'`。当前执行范围为方块冲刺 v6；“体验任一款小游戏15s”是另一项任务。API 名称、参数和返回外壳保持不变，没有新增游戏、分数或计时参数。

## 调用与展示

```javascript
const target = { self_id: 123456, client_type: 'android' }
const panel = await api.get_level_task_panel({ ...target, refresh: true })
const task = panel.payload.extra_info.extra_task_list.find(
  row => row.center_task_id === 80 && row.title === '创建小游戏擂台并取得成绩'
)
// available 决定能否保存后续自动计划；can_execute 决定本次是否可执行。
// 以下执行应由用户明确操作或框架现有调度器触发，不能放进刷新回调。
if (task?.can_execute === true) {
  await api.execute_level_task_selection({ ...target, tasks: [task.title] })
}
```

原始 `get_level_tasks`、完整面板实时读取及缓存读取均为该任务附加以下字段。缓存中的当日尝试提示会按当前服务器日期重新投影，缓存不作为新建资格依据。

| 字段 | 含义 |
| --- | --- |
| `available`、`executable` | 当前安装能力是否可用；不代表本次任务完成 |
| `can_execute` | 当前是否允许发起一次尝试；当天已有持久记录时为 false |
| `attempted_today` | 当前账号、Android 客户端、服务器本地日期下是否已登记尝试 |
| `status_text`、`execution_message` | 框架固定状态与原因提示；页面应优先显示，不能换成泛化的“暂不支持” |

日尝试后 `available` 可继续为 true，而 `can_execute` 为 false。自动计划开关应依据安装能力，允许保留或调整次日计划；补挂按钮依据 `can_execute`。QQ 的 `is_done`、成绩及加速数值只来自真实 QQ 刷新，不根据本地尝试记录补写。

## 每日尝试与失败

框架在执行前持久登记一次尝试，并在创建请求前单独取得一次性创建许可。同一账号、Android 客户端、同一服务器本地日期的任何已登记尝试均不再重试，包括安装后失败、明确拒绝、取消、超时和重启后结果未知的记录。进程重启不会释放当天资格；次日可重新检查并尝试，仍须满足真实新建条件。

每日尝试登记前，当前会话的设备上下文或 bootstrap 准备失败，可在当前 Bot 内短期保留固定诊断，后续原始查询及管理面板刷新、缓存读取继续展示；这一阶段不登记每日尝试，修复后可显式再执行。准备成功、QQ 已完成、跨日、新登录或框架重启会清除该诊断。登记后才发生的 worker 失败仍占用当天尝试，不能仅凭未发送创建请求就重试，也不能把短期准备诊断当作清除持久记录的理由。

环境缺失、可执行文件不可用或所需进程隔离不受支持时显示“擂台执行环境未配置或不可用”。这里的授权依据仅指最终 `wx.login` 响应：只有原登录响应确证 `authorization_required` 才显示“微信未授权登录”；普通认证失败、网络错误和未知响应不能解释为未授权，也不表示没有绑定微信。

缺少 `ilink_buffer` 表示未取得 QQ 提供的小游戏登录凭证，属于 bootstrap 材料缺失。QQ 官方对此返回通用 `STATE_AUTH_FAILED` / `FailAuthCommon`（code -9），不等同于最终 `wx.login` 的 `authorization_required`，也不能证明已发起或拒绝了微信授权流程。此时应说明登录凭证缺失，不能显示“微信未授权登录”。

结果未知时先查看任务面板和固定提示，不要自动重复调用执行接口。原始执行接口会返回固定错误；完整管理接口保持原错误及 `tasks/skippedTasks/payload/refreshed/refreshError` 契约。刷新不触发新一局。

## 完成条件与等待时间

完成须同时具备当前会话、新建身份确认、原游戏实际开局与正分、原返回主页、正常退出和请求收尾，并在退出后独立执行 `0x916e → 0x9172` 刷新确认 QQ task80 完成。退出失败、清理未完成、旧会话或仅 worker 正常结束都不算本次执行成功。

SDK 等级执行调用保持 5 分钟等待上限；框架等级请求上限为 4 分 45 秒，worker 上限为 4 分 15 秒。超时不会重放请求。多个任务仍共享本次等级请求的总预算，不为每项重新开始计时。

2026-09-15 00:25–00:28，授权测试服务仅替换框架二进制为新的 v2.2.3 基线候选，SHA-256 为 `baa0a8fc209b874714d5be58c3060ef40e92c0b9680802c4f6fdb09715e07bab`；原 worker runtime 的 65 个文件及清单保持不变，未恢复旧数据库。新实例确认 1060221 当天记录为空且 task80 未完成后，仅执行一次标准 `execute_level_tasks` 并成功。随后原始查询和管理面板刷新均返回 `is_done=true`、`status=1`、`attempted_today=true`、`can_execute=false`，退出后本次任务 cgroup 已为空。这是新二进制上的独立验收。

更新前备份与执行后 live DB 的只读比对确认：该账号 2026-09-14 的完成记录全部字段未变，2026-09-15 仅新增一条 `completed` / `completed` / `creation_sent=true` 记录；原有修复审计完整内容未变、没有新增，本轮未清除每日记录或作预占修复。此次仍仅为授权测试部署，尚未部署生产环境或发布新 Release；依赖需外置准备，其他安装默认禁用，不能据此声称已在新机器从零安装验收。
