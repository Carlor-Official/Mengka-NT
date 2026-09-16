# 执行等级任务并刷新面板

从 v2.0.9 起提供；v2.0.8 及更早版本不包含此接口。

通过完成令牌认证的插件 WebSocket 服务调用 `execute_level_task_selection`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 明确填写 android 或 linuxqq；等级加速目前只支持 android，linuxqq 返回不支持 |
| tasks | string[] | 否 | 显式任务标题数组；省略或 [] 使用框架已选任务，若没有可执行已选项则补挂当前全部可执行未完成任务 |
| yuanbao_verification_completed | boolean | 否 | 仅当管理员已经完成当前元宝官方验证时传 true；框架会在内存中消费该账号当前短期验证上下文并重试一次。普通执行和定时计划必须省略 |

v2.3.0 的擂台扩展中，task80“创建小游戏擂台并取得成绩”由 Go 直接协议上报方块冲刺 v6 的 1–99 随机整数分数，不运行游戏，不依赖外部 worker 安装；没有分数、游戏或计时参数。失败返回原因并保持待完成，SDK 不自动重试；仅最终 `wx.login` 确证 `authorization_required` 才提示“微信未授权登录”。只有同房本人分数读回、退出协议确认及独立 `0x916e → 0x9172` 确认完成才算成功。SDK 保持 5 分钟，框架等级请求总预算 4 分 45 秒。Linux amd64 测试站通过 2082083 的一次标准任务验收；Windows 与 Linux arm64 的完整任务未实测，见[擂台契约](../arena-level-task.md)。


task83“来元宝P图一次”的普通执行仍不需要额外参数。框架从目标 QQ 当前登录态取得官方 OpenSDK 授权并交换元宝会话，使用元宝临时上传凭证提交一张框架生成的无个人信息合成图。请求使用元宝图片原子能力，并在三种官方图片路由间做有界回退；只有 SSE 明确拒绝时才切换，且必须收到真实图片结果事件才算 P 图成功。目标 QQ 必须已在官方元宝 App 完成登录注册并激活图片能力；框架不会自动注册、把第三方会话写入配置或数据库，或把普通文本对话当作任务完成。安全校验需要管理员打开腾讯元宝官方验证页完成一次人工验证；框架会在等级加速页面展示入口，并把同一入口私聊发送给当前 QQ 自身，收件人不可由调用方修改。同一短期验证入口只私聊一次；验证未确认期间，普通执行和定时计划只返回现有验证状态，不会重复登录元宝或生成新入口。QQ 内置浏览器可能拦截腾讯滑块资源，手机端管理页不再嵌套验证 iframe，而是提供复制链接与系统浏览器打开入口；私聊消息也会提示改用 Chrome、Safari 或系统浏览器。官方页完成后可能关闭或显示空白，此时由用户点击继续按钮，管理页面用 `yuanbao_verification_completed:true` 显式消费当前内存验证上下文并把同一个 `safeVerifyCode` 带回元宝登录一次。`qq_message_sent` 表示私聊是否发送成功，失败不影响前端入口。挑战、QQ access token 和成功会话只在框架进程内短期保存，均不写入配置或数据库。执行后本接口按原逻辑刷新面板，最终以 QQ 返回的 `is_done` 为准；网络、HTTP、纯文本或 SSE 结果不明确时不自动重试。

task64“去看免费小说”不增加公开参数。QQ 当前阅读协议不接收客户端指定的时长；框架以两秒间隔保持同一阅读 session，等待服务端返回当日阅读时长达到 180 秒后调用阅读器等级任务结算接口，再刷新面板。一次调用约需三分钟，超时、断线或结果未知时不自动重放。

其余 QQ 基础/额外加速项目也沿用本接口按面板标题执行；调用方不应为单个项目另建插件 action。任务是否可执行以面板 executable/can_execute 为准。


v2.3.1 起，擂台任务取消每日尝试次数限制。只有 QQ 刷新确认完成才显示“已完成”；执行失败返回错误原因，面板显示“待完成”，允许再次执行。擂台任务不再返回 `attempted_today`，客户端应以 `can_execute` 判断本次能否执行。正在执行时保留账号互斥，禁止并发提交；每次新执行重新核验 QQ 状态、当前登录材料和新建条件，不续传旧房间分数。SDK 和页面刷新不自动重试。

## 示例

```javascript
const result = await api.execute_level_task_selection({ self_id: 123456, client_type: "android", tasks: ["完成视频任务获得加速时长"] })

const yuanbao = await api.execute_level_task_selection({ self_id: 123456, client_type: "android", tasks: ["来元宝P图一次"] })
if (!yuanbao.refreshed) console.warn(yuanbao.refreshError)

// 仅在用户已完成当前官方验证后，由一次明确操作发起；不得后台循环调用。
const continuedYuanbao = await api.execute_level_task_selection({
  self_id: 123456,
  client_type: "android",
  tasks: ["来元宝P图一次"],
  yuanbao_verification_completed: true
})

const novel = await api.execute_level_task_selection({ self_id: 123456, client_type: "android", tasks: ["去看免费小说"] })
if (!novel.refreshed) console.warn(novel.refreshError)
```

## 返回

返回 `{ tasks, skippedTasks, payload, refreshed, refreshError }`。tasks 是实际提交执行的标题，skippedTasks 是显式请求中被过滤的标题，payload 是完成后的面板。付费任务不会出现在面板中；旧设置或显式请求仍携带其标题时会进入 `skippedTasks`，不会执行。已完成、协议不可执行及不支持的任务同样过滤。若执行成功但刷新失败，refreshed=false，保留执行前面板并返回 refreshError；请刷新面板，禁止据此自动重新执行。执行本身失败返回原 action 错误，不自动重试。

以上返回值是 WebSocket `action_result.data`；失败为 `ok:false` 和 `error`。SDK 自动解包 data 并在失败时拒绝 Promise。

详见[共享等级任务管理接入](../level-task-management.md)。


## v2.1.0：电脑 QQ 在线

`电脑QQ在线` 已支持手动补挂和框架定时计划。目标仍传在线安卓账号的 `self_id` 和 `client_type: 'android'`；框架使用同 QQ 安卓会话授权 Linux 免扫登录。已有 Linux 在线会话直接复用；离线时优先使用该账号的登录缓存，仅在没有缓存或明确失效时重新授权，网络或签名临时失败不会自动重新授权。已有 Linux 账号的节点、设备身份和模板保持不变；没有 Linux 账号时，沿用安卓账号的登录节点和设备模板创建 Linux 账号，设备身份与票据仍按账号和协议独立保存，不额外生成设备模板。

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
