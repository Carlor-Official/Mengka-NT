# approve_group_invite

同意好友发来的群聊邀请。

## 调用方式

```js
const result = await api.approve_group_invite(self_id, group_id, msgseq)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 邀请加入的群聊 ID |
| `msgseq` | number | 是 | 邀请通知的请求序号 |

`group_id` 和 `msgseq` 从 `get_group_system_notifications` 返回的同一条邀请通知中取得。
`flag` 使用邀请事件返回的值。

## 返回值

返回邀请处理结果。请求已处理或已失效时会返回错误，不会伪造成功结果。

测试环境已完成真实链路验证：框架向 1060221 发出群 106500 的邀请，用户在 QQ 客户端确认后，框架通过群成员查询确认该账号已入群。
