# 表情回应事件接入

`message_reaction_changed` 已在框架的原生群通知解析与 WebSocket 推送中注册，属于 `group_event`。三个查询/设置表情 API 与事件推送是独立链路，调用成功不代表一定收到 QQ 的通知。

## 正向 SDK

监听器应在连接前注册，SDK 会自动声明对应权限：

```js
api.on('message_reaction_changed', event => {
  const { msg_seq, message_id, emoji_id, count, operation } = event.body
  console.log(event.self_id, event.client_type, event.group_id,
    event.operator, msg_seq, message_id, emoji_id, count, operation)
})
await api.connect()
```

v2.1.12 SDK 支持在 createAPI 配置中显式传 `permissions: { group_event: true }`，与监听器推导的权限合并。v2.1.11 及更早版本忽略这个配置字段，必须先注册监听器再连接。仅在连接后注册监听器不会更新已经发送的握手权限；可提前显式声明权限或断开后重新连接。

反向连接由框架服务配置声明 group_event，并在 SDK 监听上述事件。不要把权限名 group_event 当作事件名，也不要只监听 group_message。

## 事件数据

- 外层消息为 `{ type: "event", data: event }`；原始 WebSocket 需读取 data.event_type，SDK 回调直接收到 event。
- `event_type`: `message_reaction_changed`；`category`: `notice`；`post_type`: `group_notice`。
- 保留 `self_id`、`client_type`、`group_id` 和 `operator`。无法从 UID 缓存确认 QQ 时，operator.uid 仍保留，不猜测 user_id。
- `body.msg_seq` 是原生群消息序号，不等于公共 message_id；缓存命中且群号匹配时才提供 `body.message_id`。
- `body.emoji_id` 是字符串；`body.count` 是服务端当前计数（可为 0）；`body.operation` 为 add 或 remove。

框架解析原生回应通知，不根据设置 API 的成功响应合成事件。协议没有推送、通知形态不受支持或插件未完成相应权限认证时，不能承诺收到事件。排查需区分 QQ 通知到达、框架解析、实际握手权限和 SDK 回调四个环节。
