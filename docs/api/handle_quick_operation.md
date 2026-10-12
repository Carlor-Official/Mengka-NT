# handle_quick_operation

根据萌卡 NT 上报的消息事件或请求事件执行一组快速操作。反向事件处理与 WebSocket 插件均可直接调用。

## 调用方式

```js
await api.call('.handle_quick_operation', {
  context,
  operation
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `context` | object | 是 | 框架上报的原始消息事件或请求事件 |
| `operation` | object | 是 | 要执行的快速操作 |

消息事件支持：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `reply` | string / object / array | - | 回复文本、单个消息段或消息段数组 |
| `at_sender` | boolean | `false` | 群聊回复时先 @发送者，匿名消息会忽略 |
| `delete` | boolean | `false` | 撤回触发该事件的群消息 |
| `kick` | boolean | `false` | 将非匿名发送者移出群聊 |
| `reject_add_request` | boolean | `false` | 踢出后拒绝再次加群 |
| `ban` | boolean | `false` | 禁言非匿名发送者 |
| `ban_duration` | number | `1800` | 禁言秒数 |

请求事件支持：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `approve` | boolean | 同意或拒绝好友申请、加群申请或邀请 |
| `remark` | string | 同意好友申请时设置备注 |
| `reason` | string | 拒绝加群申请时填写理由 |

## 返回值

所有操作执行成功后返回 `null`。任一步失败时抛出包含 action 名称的错误。

## 示例

收到群消息后回复、@发送者并禁言 10 分钟：

```js
await api.call('.handle_quick_operation', {
  context: event,
  operation: {
    reply: '已收到',
    at_sender: true,
    ban: true,
    ban_duration: 600
  }
})
```

## 说明

- 操作按照回复、撤回、踢出、禁言的顺序执行；任一步失败会返回明确的 action 名称和错误原因。
- 匿名群消息不执行 `at_sender`、`kick` 或 `ban`。
