# set_group_essence

设置或取消群精华消息。

## 调用方式

```js
await api.forProtocol('android').set_group_essence({
  self_id: 2082083, group_id: 1108676556, message_id: messageId, enabled: true
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 已登录账号 |
| group_id | number | 是 | 消息所在群 |
| message_id | number | 是 | 当前账号收到、发送或读取历史时由框架保存的群消息 ID |
| enabled | boolean | 是 | true 设置，false 取消，不提供默认值 |

直接 WS 调用还须提供 `client_type: android | linuxqq`。消息引用必须属于当前账号和指定群，不接受任意序列号、随机数或原生包。缓存失效时先重新获取群历史消息引用。

## 返回值

成功返回 `{success: true, group_id, message_id, enabled}`，表示原生接口确认操作，不表示事件已投递。权限、参数、无效引用、超时和原生业务错误返回 action 错误；超时先读回，禁止盲目重试。通过 `get_essence_msg_list` 核对，订阅 `group_essence_changed` 时声明 `group_event`。取消仅操作自己明确选定的消息。
