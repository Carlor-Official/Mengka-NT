# 获取 QQ 等级加速面板

`get_level_tasks` 刷新并返回当前 Android Bot 的 QQ 等级加速面板；调用不执行游戏。

普通任务的 `available` 表示当前框架是否支持该任务，`can_execute` 表示本次是否仍可执行。任务当天已经完成时，`available` 仍为 `true`，而 `can_execute` 为 `false`；客户端应显示“已完成”，不能显示成“暂不支持”。`available=false` 才表示当前框架不支持该任务。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 在线 Bot QQ 号 |

SDK 使用 `api.forProtocol('android').get_level_tasks(self_id)`；原位置参数不变。仅 `center_task_id=80` 且标题为“创建小游戏擂台并取得成绩”的任务增加 `available/executable`、`can_execute`、`status_text/execution_message`。框架能力决定未来自动计划，不再以外部 worker 安装为前置；当前完成状态和执行互斥决定本次能否执行，失败原因单独显示。查询只刷新，不触发分数上报；执行时由 Go 直接协议为方块冲刺 v6 上报 1–99 随机整数分数。


v2.3.4 起，`center_task_id=83` 且标题为“来元宝P图一次”的任务也附加框架执行能力。只有 Android Phone/Pad 协议账号会显示为可执行；本查询仍只刷新面板，不会登录元宝、上传图片或执行 P 图。实际执行由等级任务执行接口完成，且不会自动注册新的元宝账号。

v2.3.1 起，擂台任务取消每日尝试次数限制。只有 QQ 刷新确认完成才显示“已完成”；执行失败返回错误原因，面板显示“待完成”，允许再次执行。擂台任务不再返回 `attempted_today`，客户端应以 `can_execute` 判断本次能否执行。正在执行时保留账号互斥，禁止并发提交；每次新执行重新核验 QQ 状态、当前登录材料和新建条件，不续传旧房间分数。SDK 和页面刷新不自动重试。

## 返回

保持原面板对象外壳：`uin`、`overall_info`、`vip_info`、`base_info`、`extra_info`、`is_freeze` 等。QQ 的 `is_done`、成绩及加速数值不由本地记录生成。失败时 SDK 拒绝 Promise。

```javascript
const panel = await api.forProtocol('android').get_level_tasks(123456)
const tasks = panel.extra_info?.extra_task_list || []
```

v2.3.0 的擂台扩展使用 Go 模式直接协议上报方块冲刺 v6 的 1–99 随机整数分数，已在 Linux amd64 测试站通过 2082083 的标准任务验收；无新增分数、游戏或计时参数。每日尝试门槛与授权提示见[小游戏擂台等级任务](../arena-level-task.md)。
