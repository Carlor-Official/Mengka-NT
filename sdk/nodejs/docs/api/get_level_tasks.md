# 获取 QQ 等级加速面板

`get_level_tasks` 沿用原 action 与响应契约。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 框架已配置的 QQ 账号 |
| client_type | string | 否 | android 或 linuxqq，原始接口省略时选择 Android |

v2.5.9支持 Android 9.1.70 和 Linux 3.2.32，协议通过 `client_type` 区分。只读查询不提交任务；实际执行结果以 QQ 面板为准，不伪造完成或加速数值。

任务执行器已更新，免费小说标题为 `去免费小说看任一本书`。电脑 QQ 在线、创建小游戏擂台并取得成绩、来元宝P图一次及独立会员签到执行器已停用。旧计划与记录保留，旧任务进入跳过列表；缓存不重新启用任务。新任务以 `can_execute` 为准，失败不自动重放。

## 示例

```javascript
const result = await api.forProtocol('linux').get_level_tasks(123456)
```

## 返回

保持 `uin`、`overall_info`、`base_info`、`extra_info`、`is_freeze` 等原面板字段。失败时 SDK 拒绝 Promise。

`available` 表示框架能力，`can_execute` 表示本次是否可执行；已完成任务不应被显示为不支持。
