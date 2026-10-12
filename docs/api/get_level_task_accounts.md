# get_level_task_accounts

列出支持等级任务管理的账号。

## 调用方式

```javascript
const result = await api.get_level_task_accounts({})
```

## 参数

无。

## 返回值

返回账号数组，每项包含：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `selfId` | number | QQ 号 |
| `platform` | string | android 或 linux |
| `nickname` | string | 昵称 |
| `status` | number | 0 离线、1 在线、2 登录中 |
| `level` | number | QQ 等级 |
| `levelTaskSupported` | boolean | 是否支持等级任务 |


详见[共享等级任务管理接入](https://mknt.net/reference/level-task-management.html)。
