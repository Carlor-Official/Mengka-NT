# send_forward_msg

萌卡 NT 通用合并转发接口。填写 `user_id` 时发送给好友，填写
`group_id` 时发送到群聊；两个目标参数必须且只能填写一个。

## 调用方式

### 私聊

```js
const result = await api.send_forward_msg({
  self_id,
  user_id: 123456789,
  messages: [{
    type: 'node',
    data: {
      user_id: 123456789,
      nickname: '示例用户',
      content: '这是一条合并转发内容',
    },
  }],
})
```

### 群聊

```js
const result = await api.send_forward_msg({
  self_id,
  group_id: 123456789,
  messages,
})
```

节点结构、消息引用、返回字段与
[send_private_forward_msg](send_private_forward_msg.md) 和
[send_group_forward_msg](send_group_forward_msg.md) 一致。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ 账号 |
| `user_id` | number | 二选一 | 目标好友 QQ，与 `group_id` 互斥 |
| `group_id` | number | 二选一 | 目标群号，与 `user_id` 互斥 |
| `messages` | object[] | 是 | 转发节点列表，节点结构见对应私聊或群聊合并转发接口 |

## 返回值

返回合并转发结果，字段见 [私聊合并转发](send_private_forward_msg.md#返回值) 或 [群聊合并转发](send_group_forward_msg.md#返回值)。
