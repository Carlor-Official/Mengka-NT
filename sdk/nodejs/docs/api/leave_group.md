# leave_group

当前账号主动退出群聊。

## 调用方式

```js
await api.forProtocol('android').leave_group({ self_id: 1060221, group_id: 305977791 })
// Linux 会话使用 api.forProtocol('linuxqq')，不会借用 Android 会话。
```

```json
{
  "action": "leave_group",
  "params": { "self_id": 1060221, "client_type": "android", "group_id": 305977791 }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前在线账号 QQ |
| `client_type` | string | 是 | `android` 或 `linuxqq` |
| `group_id` | number | 是 | 群号，1 至 4294967295 |

框架根据账号及协议选择实际运行节点，不传 `node_id`。操作前重新查询成员身份，仅允许普通成员和管理员退出；群主及无法确认的成员身份会被拒绝。本接口不提供解散群能力，群主需先完成所有权转让。

## 返回值

```json
{ "group_id": 305977791, "submitted": true, "status": "submitted" }
```

该返回仅表示服务器确认请求，不证明成员变化事件已经送达。通过 `get_group_member_list` 回读成员关系，并监听真实原生通知产生的 `group_member_left`。包含明确原因的主动退群通知返回 `reason: "left"`；退群账号自己的简略通知可能只有群号，此时省略 `reason` 和操作者字段，不得根据字段缺失推断主动退出或被移除。API 不根据请求成功合成事件。

群主调用返回 `GROUP_OWNER_CANNOT_LEAVE`。网络超时返回 `GROUP_LEAVE_RESULT_UNKNOWN`，必须先查询群成员状态，不自动重试。业务拒绝保留服务器错误码；空响应、格式错误或缺少明确状态均不视作成功。
