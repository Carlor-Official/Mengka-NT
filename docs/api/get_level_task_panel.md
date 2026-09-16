# 获取完整等级任务面板

从 v2.0.9 起提供；v2.0.8 及更早版本不包含此接口。

通过完成令牌认证的插件 WebSocket 服务调用 `get_level_task_panel`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 明确填写 android 或 linuxqq；等级加速目前只支持 android，linuxqq 返回不支持 |
| refresh | boolean | 否 | 默认 true；false 优先使用框架缓存，无有效缓存时尝试实时读取 |

v2.3.0 中，仅 task80“创建小游戏擂台并取得成绩”附加框架执行能力、完成状态及失败原因，实时和缓存读取均投影。当前 Go 直接协议模式不依赖外部 worker 安装；`available`/`executable` 控制未来自动计划，`can_execute` 控制本次执行。执行失败后仍可补挂，运行中保留并发互斥；查询不触发分数上报。QQ 完成和加速字段保持原值，新模式已在 Linux amd64 测试站通过 2082083 的标准任务验收，见[擂台契约](../arena-level-task.md)。


v2.3.1 起，擂台任务取消每日尝试次数限制。只有 QQ 刷新确认完成才显示“已完成”；执行失败返回错误原因，面板显示“待完成”，允许再次执行。擂台任务不再返回 `attempted_today`，客户端应以 `can_execute` 判断本次能否执行。正在执行时保留账号互斥，禁止并发提交；每次新执行重新核验 QQ 状态、当前登录材料和新建条件，不续传旧房间分数。SDK 和页面刷新不自动重试。


v2.3.4 起，`center_task_id=83` 且标题为“来元宝P图一次”的任务在 Android Phone/Pad 账号上附加 `available`、`executable`、`can_execute` 和执行状态。查询接口只读取或刷新任务状态，不触发元宝登录、图片上传或 P 图；任务执行接口才会完成完整流程，并在执行后由 QQ 面板刷新确认最终完成状态。框架不会自动注册尚未开通的元宝账号。

## 示例

```javascript
const result = await api.get_level_task_panel({ self_id: 123456, client_type: "android", refresh: false })
```

## 返回

返回 `{ payload, settings }`。payload 与框架网页一致：会员推广项目不返回，日常与额外任务列表不含付费任务；会员签到保留在 `member_info.member_task_list`，属于免费领取任务。settings 与 get_level_task_settings 相同。离线读取旧缓存时也会应用相同过滤；实时刷新失败返回 action 错误，不把旧缓存冒充实时结果。

普通任务同时返回 `available`。它表示框架能力，与本次执行状态分离：已完成任务保持 `available=true`、`can_execute=false`，只有 `available=false` 才表示“暂不支持”。

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
