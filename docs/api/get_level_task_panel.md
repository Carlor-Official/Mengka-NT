# 获取完整等级任务面板

`get_level_task_panel` 沿用原 action 与响应契约。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 框架已配置的 QQ 账号 |
| client_type | string | 是 | android 或 linuxqq，原始接口省略时选择 Android |
| refresh | boolean | 否 | 默认 true；false 优先读取缓存 |

v2.5.9支持 Android 9.1.70 和 Linux 3.2.32，协议通过 `client_type` 区分。只读查询不提交任务；实际执行结果以 QQ 面板为准，不伪造完成或加速数值。

任务执行器已更新，免费小说标题为 `去免费小说看任一本书`。电脑 QQ 在线、创建小游戏擂台并取得成绩、来元宝P图一次及独立会员签到执行器已停用。旧计划与记录保留，缓存不重新启用旧任务。新任务以 `can_execute` 为准，失败不自动重放。

## 示例

```javascript
const result = await api.get_level_task_panel({ self_id: 123456, client_type: 'linuxqq', refresh: false })
```

## 返回

返回 `{ payload, settings }`。不返回旧版本合成的 `member_info`；旧执行记录仍保留。实时刷新失败返回错误，不将缓存冒充实时结果。

`available` 表示框架能力，`can_execute` 表示本次是否可执行；已完成任务不应被显示为不支持。
