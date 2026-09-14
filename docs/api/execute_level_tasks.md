# 执行 QQ 等级加速任务

`execute_level_tasks` 按数组顺序执行指定的 QQ 等级加速任务；各项错误汇总返回。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 在线 Android Bot QQ 号 |
| tasks | string[] | 是 | 非空完整任务标题数组，建议从当前面板选择 |

原位置参数不变，QQ 等级仍须达到 16 级。擂台任务仅接受标题“创建小游戏擂台并取得成绩”，对应 `center_task_id=80`，当前仅方块冲刺 v6；没有新增 `game`、`score`、`time` 参数。框架在任何创建请求前持久登记当天尝试，同一账号、Android 客户端和服务器本地日期内不再重试，包括中断和重启后未知结果。

环境不可用显示“擂台执行环境未配置或不可用”。仅最终 `wx.login` 响应确证 `authorization_required` 才显示“微信未授权登录”。缺少 `ilink_buffer` 是 QQ 提供的小游戏登录凭证缺失，官方按 `FailAuthCommon` 通用失败处理，不能据此推断未授权；普通认证或网络失败同样不能推断。此扩展已在授权测试服务通过 1060221 的正式整局自然出分与等级入账验收，尚无生产发布，完整说明见[小游戏擂台等级任务](../arena-level-task.md)。

## 返回

全部执行成功时 Promise 解析为 `null`；任一任务失败时拒绝并包含任务标题和固定原因。接口成功不生成 QQ 完成或加速数值；擂台成功还须当前会话、新建、原游戏正分、正常主页退出和独立等级刷新确认完成。

```javascript
await api.forProtocol('android').execute_level_tasks(123456, ['创建小游戏擂台并取得成绩'])
```

SDK 保持 5 分钟等待；框架请求预算 4 分 45 秒，worker 4 分 15 秒。超时、断线、结果未知均不自动重放。完整面板、过滤与计划功能可使用 [execute_level_task_selection](execute_level_task_selection.md)。
