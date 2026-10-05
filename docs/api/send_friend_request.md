# 主动申请添加好友

`send_friend_request` 提交好友申请，不自动重试；`submitted` 不代表已经成为好友。

## 参数

v2.5.3 起，目标 Bot QQ 等级至少 16 级且已在线。等级由框架运行状态核验；未知或不足时失败，不发包，也不占用申请冷却。调用方不能提供等级覆盖此检查。

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 在线 Bot QQ 号 |
| client_type | string | 是 | android 或 linuxqq |
| user_id | number | 是 | 申请添加的 QQ 号 |
| message | string | 否 | 申请说明 |
| remark | string | 否 | 好友备注 |

```js
const result = await api.forProtocol('android').send_friend_request(selfId, userId, '你好', '')
```

同一账号对同一目标至少间隔 30 秒；超时或结果不确定时先核对业务状态，不立即重发。原有协议支持、参数、结果结构与服务令牌认证保持不变，不要求白名单或专属 Key。
