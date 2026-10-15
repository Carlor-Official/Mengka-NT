# get_level_task_settings

获取指定账号的等级任务自动执行设置。

## 调用方式

```javascript
const result = await api.get_level_task_settings({ self_id: 123456, client_type: "android" })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 明确填写 android 或 linuxqq；支持 Android 9.2.70 与 Linux 3.2.32 |

## 返回值

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `selectedTasks` | string[] | 已选择的任务标题，默认 [] |
| `scheduleEnabled` | boolean | 是否启用自动执行，默认 false |
| `scheduleTime` | string | 每日执行时间，24 小时 HH:mm，默认 04:00 |
| `lastRunDate` | string | 最近自动执行日期，只读；未执行时为空字符串 |

详见[共享等级任务管理接入](https://mknt.net/reference/level-task-management.html)。
