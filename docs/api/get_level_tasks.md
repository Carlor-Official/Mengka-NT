# 获取 QQ 等级加速面板

`get_level_tasks` 刷新并返回当前 Android Bot 的 QQ 等级加速面板；调用不执行游戏。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 在线 Bot QQ 号 |

SDK 使用 `api.forProtocol('android').get_level_tasks(self_id)`；原位置参数不变。仅 `center_task_id=80` 且标题为“创建小游戏擂台并取得成绩”的任务增加 `available/executable`、`can_execute`、`attempted_today`、`status_text/execution_message`。框架能力决定未来自动计划，不再以外部 worker 安装为前置；当天尝试决定本次能否执行，固定提示优先显示。查询只刷新，不触发分数上报；执行时由 Go 直接协议为方块冲刺 v6 上报 1–99 随机整数分数。


v2.3.1 起，仅终态为 failed、creation_sent=false、原因为 creation_not_confirmed 或 metadata_failed、且当天未使用过恢复机会的记录，允许一次受控重试。再次执行前重新核验当前 QQ 面板与登录材料，在同一事务内完整归档旧记录并更换 attempt_id；已发出的创建、执行中、中断、未知结果及已恢复一次的记录不重放。attempted_today 仍如实为 true，本次能否执行以 can_execute 为准；客户端不自动重试。

## 返回

保持原面板对象外壳：`uin`、`overall_info`、`vip_info`、`base_info`、`extra_info`、`is_freeze` 等。QQ 的 `is_done`、成绩及加速数值不由本地记录生成。失败时 SDK 拒绝 Promise。

```javascript
const panel = await api.forProtocol('android').get_level_tasks(123456)
const tasks = panel.extra_info?.extra_task_list || []
```

v2.3.0 的擂台扩展使用 Go 模式直接协议上报方块冲刺 v6 的 1–99 随机整数分数，已在 Linux amd64 测试站通过 2082083 的标准任务验收；无新增分数、游戏或计时参数。每日尝试门槛与授权提示见[小游戏擂台等级任务](../arena-level-task.md)。
