# 主动申请加入群聊

`send_group_join_request` 提交入群申请，不自动重试；`submitted` 不代表已入群。

## 参数

v2.5.3 起，目标 Bot QQ 等级至少 16 级且已在线。等级由框架运行状态核验；未知或不足时失败，不发包，也不占用申请冷却。调用方不能提供等级覆盖此检查。

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 在线 Bot QQ 号 |
| client_type | string | 是 | android；Linux 主动入群仍不支持 |
| group_id | number | 是 | 申请加入的群号 |
| message | string | 否 | 申请说明，最多 255 个 UTF-8 字节 |

```js
const result = await api.forProtocol('android').send_group_join_request(selfId, groupId, '申请说明')
```

返回 `group_id`、`submitted`、`status`、`result`。同一账号对同一群至少间隔 60 秒，不确定结果先检查群通知。原有协议支持、参数、结果结构与服务令牌认证保持不变，不要求白名单或专属 Key。
