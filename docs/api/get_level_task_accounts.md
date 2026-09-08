# 获取等级加速账号列表

从 v2.0.9 起提供；v2.0.8 及更早版本不包含此接口。

通过完成令牌认证的插件 WebSocket 服务调用 `get_level_task_accounts`。

## 参数

无参数，发送空对象 `{}`。

## 示例

```javascript
const result = await api.get_level_task_accounts({})
```

## 返回

返回数组，每项包含 `selfId`、`platform`、`nickname`、`status`、`level`、`levelTaskSupported`。Linux 账号仍列出，但 `levelTaskSupported=false`。此接口不查询 QQ 在线协议。

以上返回值是 WebSocket `action_result.data`；失败为 `ok:false` 和 `error`。SDK 自动解包 data 并在失败时拒绝 Promise。

详见[共享等级任务管理接入](../level-task-management.md)。
