# send_poke

向好友或群成员发送普通戳一戳。

## 调用方式

```js
await api.forProtocol('android').send_poke({self_id: 2082083, user_id: 1060221})
await api.forProtocol('android').send_poke({self_id: 2082083, user_id: 1060221, group_id: 1108676556})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 已登录账号 |
| user_id | number | 是 | 目标 QQ |
| group_id | number | 否 | 群内戳一戳的群号；省略或 0 为私聊 |

直接 WS 调用还须提供 `client_type: android | linuxqq`。好友关系、群成员资格与频率限制由 QQ 服务端判定，不绕过风控，不应循环批量调用。

## 返回值

成功返回 `{success: true, user_id, group_id}`；参数、网络、离线和原生拒绝返回 action 错误。超时结果未知，不自动重试。`user_poked` 事件需按会话声明 `friend_event` 或 `group_event`，提交成功不等同于真实事件已到达。
