# send_friend_request

向指定 QQ 主动提交好友申请，不是同意已收到的申请。

Linux 账号需要已解析目标用户的 UID；无法解析时返回错误。

使用条件：账号在线且 QQ 等级至少 48 级。等级由服务端账号状态核验；未知或不足时返回错误。

## 调用方式

```js
const result = await api.forProtocol('android').send_friend_request(
  1060221, 2082083, '你好，请通过好友申请', '新朋友'
)
```

直接通过 WebSocket 调用时：

```json
{
  "type": "action",
  "id": "friend-request-1",
  "action": "send_friend_request",
  "params": {
    "self_id": 1060221,
    "client_type": "android",
    "user_id": 2082083,
    "message": "你好，请通过好友申请",
    "remark": "新朋友"
  }
}
```

## 参数

以下为 SDK 的四个位置参数。WebSocket 请求另须在 `params` 内提供协议选择器 `client_type`：只接受 `android` 或 `linuxqq`。SDK 默认明确发送 `android`，协议作用域会覆盖此值；它不是第五个位置参数。

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 发起申请的在线账号 |
| `user_id` | number | 是 | 目标 QQ，不能与发起账号相同 |
| `message` | string | 否 | 申请说明，默认空字符串，UTF-8 最多 127 字节，不允许空字符 |
| `remark` | string | 否 | 好友备注，默认空字符串，UTF-8 最多 127 字节，不允许空字符 |

框架负责账号路由、签名和登录票据。调用方不传原生数据包或节点绑定字段。调用前需要已认证的服务连接及指定协议在线账号。

## 返回值

| 字段 | 说明 |
| --- | --- |
| `status` | `submitted`、`policy_rejected`、`rejected` 或 `verification_required` |
| `submitted` | 仅表示原生接口是否确认提交；不表示已经成为好友或对方已收到事件 |
| `user_id` | 目标 QQ |
| `policy` | 原生目标好友验证策略值 |
| `result` | 业务结果码 |
| `error_code` | 原生业务错误码 |
| `message` | 原生错误说明（可能为空） |

示意成功数据：

```json
{"status":"submitted","submitted":true,"user_id":2082083,"result":0,"error_code":0,"message":""}
```

`verification_required` 不会绕过验证码或账号风控，也不返回内部验证票据。参数错误、网络超时、签名失败、响应缺少业务结果或账号不匹配均返回 action 错误。超时代表结果未知，不能按发送失败立即重试。同一协议账号对同一目标在 30 秒内禁止重复提交。

当前支持原生无需验证（策略 0）及发送申请说明（策略 1）。问题答案验证或未知策略返回 `verification_required`，不会把申请说明当作问题答案提交。策略 0 的单向添加不保证接收方也建立关系，仍须回读确认。

策略 0 不产生待审批申请，不能等待 `friend_request_received` 或使用它不存在的 `flag`。原生 `friend_added` 按实际发生关系变化的账号分别投递；只有发起方新增关系时，不应要求接收方也收到新增事件。

## 建议搭配

接收方订阅 `friend_request_received` 并声明 `request` 权限；只能使用真实事件携带的 `flag` 调用 [处理好友申请](set_friend_add_request.md)。提交返回值不会生成 `flag` 或模拟接收事件。最后通过 [获取好友列表](get_friend_list.md) 确认双方关系。可疑好友列表不是普通好友申请的完整列表。
