# kick_group_member

将指定成员移出群聊，可同时拒绝该成员后续的加群申请。

## 调用方式

```js
const result = await api.kick_group_member(
  self_id,
  group_id,
  user_id,
  reject_add_request,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 被移出成员的 QQ 号 |
| `reject_add_request` | boolean | 是 | `true` 表示同时拒绝该成员后续的加群申请 |

## 返回值

```js
{
  success: true,
}
```

## 协议与结果校验

Linux 账号要求目标成员 UID 可从群成员列表解析。

响应必须通过原生命令、群号、目标 UID 和逐成员结果校验；空响应、目标不匹配或服务端拒绝不会当作成功。若网络中断或响应无法确认，先查询群成员列表，不要自动重复移除。API 成功与 `group_member_left` 实际收到是两项不同检查；本接口不合成退出事件。

::: tip 适用协议
Android 与 Linux QQ 均使用萌卡 NT 账号会话执行；调用前应确认 Bot 在目标群内具备移出成员权限。
:::
