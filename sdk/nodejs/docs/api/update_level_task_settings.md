# update_level_task_settings

保存指定账号的等级任务自动执行设置。

## 调用方式

```javascript
const result = await api.update_level_task_settings({ self_id: 123456, client_type: "android", selected_tasks: [], schedule_enabled: false, schedule_time: "04:00" })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号，必须是框架已配置账号 |
| client_type | string | 是 | 目标协议：`android` 或 `linuxqq` |
| selected_tasks | string[] | 是 | 选择的任务标题；可传 [] 清空，去空白、去重，最多 100 项 |
| schedule_enabled | boolean | 是 | 是否启用框架定时执行；false 必须原样保留 |
| schedule_time | string | 是 | 框架主机本地时间，严格 HH:mm，例如 04:00 |

## 返回值

返回保存后的 `{ selectedTasks, scheduleEnabled, scheduleTime, lastRunDate }`。这是完整设置替换，三项均必填；不修改 lastRunDate，不接受由插件指定执行日期。保存操作不执行任务，框架现有调度器使用该计划。

详见[共享等级任务管理接入](https://mknt.net/reference/level-task-management.html)。
