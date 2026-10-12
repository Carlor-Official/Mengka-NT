# get_level_task_account

获取指定账号的等级任务资料及升级进度。

## 调用方式

```javascript
const result = await api.get_level_task_account({ self_id: 123456, client_type: "android" })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 目标协议：`android` 或 `linuxqq` |

## 返回值

返回 `selfId/platform/nickname/status/level/levelTaskSupported`、`upgradeRequiredDays`、`nextLevelTotalDays`、`activeDaysAvailable`。在线且 SummaryCard 成功时返回 `activeDays` 和 `remainingUpgradeDays`；无法获取活跃天数时省略这两个字段。

详见[共享等级任务管理接入](https://mknt.net/reference/level-task-management.html)。
