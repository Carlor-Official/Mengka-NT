# 小游戏擂台等级任务

## v2.3.3 游戏授权引导

QQ 创建擂台返回 `300765` 表示“请先授权游戏”。`execute_level_tasks` 返回该提示，`get_level_tasks` 和管理面板保持待完成并提供扫码入口。该错误不等于微信未绑定。

二维码使用 QQ 返回的擂台入口地址，请用已登录目标账号的手机 QQ 扫码，选择“方块冲刺”并授权游戏。如果手机另行要求微信登录，再按提示操作。二维码本身不是微信登录码。授权后返回刷新并再次执行任务；刷新进度不验证授权。缺少入口地址时显示手动进入说明。

公开参数和响应字段保持不变；网络故障、普通创建拒绝及解析失败不触发授权提示。

v2.3.0 改为框架内的 Go 直接协议上报：不运行游戏，也不启动 Python、Node、Chrome 或外部 worker。方块冲刺 v6 每次在 1–99 中随机选择一个整数分数，对外不提供分数参数。2026-09-15 02:37，2082083 已在 Linux amd64 测试站通过一次标准 API 的 Go 直接模式验收。Windows Go 只读认证已通过，Windows 与 Linux arm64 的完整任务未实测。下面另列本次直接模式证据，并保留此前实际运行游戏的 worker 历史记录。升级注意事项见[直接协议模式升级说明](arena-direct-score-upgrade.md)。

此前 worker 模式的 2026-09-14 正式 API 验证中，2082083 的 QQ task80 已完成，执行接口正常返回且没有新建擂台或新增当日尝试记录，已完成账号的 no-op 路径通过。1060221 首轮尝试在创建前失败，记录为 `worker_failed`、`creation_sent=false`；随后独立的标准诊断查询发现当时 QQ 响应缺少 bootstrap 所需的 `ilink_buffer`，这不是对首轮初始化各步骤的直接观测。同日晚完成手机授权后，fresh bootstrap 已通过。测试中归档首轮记录，并对已核验未发送创建请求的预占记录作了一次受控修复；这不是公开 API 的自动重试能力。

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

原始 `get_level_tasks`、完整面板实时读取及缓存读取均为该任务附加以下字段。缓存中的执行诊断按当前服务器本地日期重新投影，缓存不作为新建资格依据。

| 字段 | 含义 |
| --- | --- |
| `available`、`executable` | 当前框架是否具备该任务执行能力；不取决于外部 worker 安装，不代表本次任务完成 |
| `can_execute` | 当前是否允许执行；失败历史不阻止执行，正在执行或 QQ 已完成时为 false |
| `status_text`、`execution_message` | 仅“待完成”或“已完成”，失败原因放在 execution_message 中 |

`available` 决定自动计划开关，`can_execute` 决定当前补挂按钮。QQ 的 `is_done`、成绩及加速数值只来自 QQ 刷新，不根据本地记录或上传回包补写。

## 执行结果与失败

框架取消每日尝试限制；明确失败、中断、超时或上次结果未确认均保持待完成并展示原因，允许显式再次执行。新调用先刷新 QQ 完成状态并准备当前账号凭证，取得账号互斥后更换内部执行标识，单次执行仍只发送一次创建请求。重启留下的旧执行记录不锁定当天资格，旧调用也不能写入新执行结果。

每次执行仍须满足新建条件。当前游戏已有擂台时返回具体原因，不用“再次挑战”替代新建；不会自动重发创建、续传旧分数或修改 QQ 完成状态。查询和页面刷新只读，SDK 不自动重试。

当前会话设备上下文或 bootstrap 准备失败时，原始查询和管理面板继续展示固定诊断，修复后可显式再执行。新的准备错误优先于旧执行错误，准备成功、QQ 已完成、跨日、新登录或重启会清除临时诊断。

当前模式不以 Linux worker、Python、Node、浏览器或 cgroup 安装作为前置条件；使用当前在线 Android Bot 的会话与设备上下文。这里的授权依据仅指最终 `wx.login` 响应：只有原登录响应确证 `authorization_required` 才显示“微信未授权登录”；普通认证失败、网络错误和未知响应不能解释为未授权，也不表示没有绑定微信。

缺少 `ilink_buffer` 表示未取得 QQ 提供的小游戏登录凭证，属于 bootstrap 材料缺失。QQ 官方对此返回通用 `STATE_AUTH_FAILED` / `FailAuthCommon`（code -9），不等同于最终 `wx.login` 的 `authorization_required`，也不能证明已发起或拒绝了微信授权流程。此时应说明登录凭证缺失，不能显示“微信未授权登录”。

结果未知时先查看任务面板和固定提示，不要自动重复调用执行接口。原始执行接口会返回固定错误；完整管理接口保持原错误及 `tasks/skippedTasks/payload/refreshed/refreshError` 契约。刷新不触发新一局。

## 完成条件与等待时间

完成须同时具备当前会话、新房身份与初始空分确认、分数上传各层成功、本人列表和同房唯一擂主的本次随机分数独立读回、退出协议确认，并在退出后独立执行 `0x916e → 0x9172` 刷新确认 QQ task80 完成。仅上传成功、仅看到正分、退出失败或旧会话回包均不算本次执行成功。Go 协议模式不产生实际开局、返回 Home 或 `onHide` 的本地游戏观测，不把这些旧模式标志伪置为 true。协议计时使用本次真实经过的时间与服务端上下文，不改写时钟或声称实际游玩时长。

SDK 等级执行调用保持 5 分钟等待上限；框架等级请求上限为 4 分 45 秒，当前模式不再使用独立 worker 的 4 分 15 秒预算。超时不会重放请求。多个任务仍共享本次等级请求的总预算，不为每项重新开始计时。

## 2026-09-15 Go 直接协议模式测试验收

北京时间 02:37，授权测试服务仅替换为 v2.2.3 基线上的 Go 直接模式二进制，SHA-256 为 `f07b19ba38e6f57dea7e0e3ba6e39c7193395dbc58acce6f6513849fec906dd3`，服务 PID 为 `589746`。2082083 执行前 task80 未完成且当天没有 journal，随后只调用一次标准 `execute_level_tasks`；调用成功后，独立原始 `get_level_tasks` 与管理面板刷新均返回 `is_done=true`、`status=1`、`attempted_today=true`、`can_execute=false`。journal 从空变为唯一 `completed` / `completed` / `creation_sent=true`，验收脚本没有直接写数据库。

此前测试站以 11 分样本验证上传各层成功、同新房本人分数读回及退出协议确认，依据绑定该二进制的 Go 控制器成功门槛；v2.3.0 将每次分数改为 1–99 随机整数，并使用同一个值完成写入和独立读回核对；安全 API 报告未另行保存原始房间分数回包。QQ task80 完成则由独立 `0x916e → 0x9172` 刷新确认，不能只依据上传回包。任务直接走协议，不运行游戏，不产生或伪置实际开局、Home、`onHide` 标志。

执行前后 PID 与二进制 SHA 相同，原 worker 工作目录条目及名称摘要不变；前后快照及每 100ms 采样均未发现任务 cgroup、已识别游戏进程或新增 worker 工作目录。该采样结果不扩展为对任意短命或脱离观察范围进程的保证。

证据为 `direct-score-20260915/deployment.json`、`verify-direct-api-2082083-execute-20260915-023731.json` 与 Windows 只读认证报告 `go-readcheck-2082083.json`。Windows 报告只确认 Go 登录、v6 属性和 `wx.login`，其中 `score_writes=0`、`game_executions=0`；完整标准任务只在 Linux amd64 测试站实际通过，未实测 Windows 或 Linux arm64 整项任务。本轮没有新 Release 或生产发布。

## 此前实际游戏模式的验收记录

2026-09-15 00:25–00:28，授权测试服务仅替换框架二进制为新的 v2.2.3 基线候选，SHA-256 为 `baa0a8fc209b874714d5be58c3060ef40e92c0b9680802c4f6fdb09715e07bab`；原 worker runtime 的 65 个文件及清单保持不变，未恢复旧数据库。新实例确认 1060221 当天记录为空且 task80 未完成后，仅执行一次标准 `execute_level_tasks` 并成功。随后原始查询和管理面板刷新均返回 `is_done=true`、`status=1`、`attempted_today=true`、`can_execute=false`，退出后本次任务 cgroup 已为空。这是新二进制上的独立验收。

更新前备份与执行后 live DB 的只读比对确认：该账号 2026-09-14 的完成记录全部字段未变，2026-09-15 仅新增一条 `completed` / `completed` / `creation_sent=true` 记录；原有修复审计完整内容未变、没有新增，本轮未清除每日记录或作预占修复。此次仍仅为授权测试部署，尚未部署生产环境或发布新 Release。当时的 worker 模式需外置依赖且其他安装默认禁用，并未在新机器从零安装验收；这些旧模式限制与成功记录独立于本文另列的 Go 直接协议模式验收。

## v2.3.1 失败保持待完成

v2.3.1 起，擂台任务取消每日尝试次数限制。只有 QQ 刷新确认完成才显示“已完成”；执行失败返回错误原因，面板显示“待完成”，允许再次执行。擂台任务不再返回 `attempted_today`，客户端应以 `can_execute` 判断本次能否执行。正在执行时保留账号互斥，禁止并发提交；每次新执行重新核验 QQ 状态、当前登录材料和新建条件，不续传旧房间分数。SDK 和页面刷新不自动重试。

升级时同步更新框架与前端；旧客户端不得再按擂台的 attempted_today 字段阻止执行。原有记录无需人工清除，下一次执行会创建新的内部执行标识，旧调用不能修改新结果。内部记录仅用于诊断和防并发，不再充当每日执行配额。本节取代 v2.3.0 的每日限制，以下历史验收数据中的旧字段仅记录当时结果。会员等其他任务规则不变。
