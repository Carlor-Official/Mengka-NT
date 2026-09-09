# set_friend_remark

修改机器人通讯录里指定好友的备注。支持 Android、Linux QQ；多协议账号请显式指定协议。

## 调用

```js
await api.forProtocol('android').set_friend_remark({ self_id, user_id, remark })

// 显式空字符串表示清空，不要省略 remark。
await api.forProtocol('linuxqq').set_friend_remark({ self_id, user_id, remark: '' })
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行操作的在线 Bot QQ 号 |
| `user_id` | number | 是 | 好友 QQ 号 |
| `remark` | string | 是 | 新备注；传空字符串会清除备注 |
| `client_type` | string | 否 | `android` 或 `linuxqq`；SDK 可通过 `forProtocol` 指定 |

## 返回值

成功时返回空数据：

```js
null
```

v2.1.0 起，框架检查外层 SSO 状态和完整 OIDB 响应，并重新拉取服务器好友列表确认备注一致后才返回成功。

缺少 `remark`、传 `null`、数字、布尔值或其他非字符串会在发送前被拒绝，不会清空已有备注。字符串按原值提交。控制台调试页需要清空时，也可在补充 JSON 中明确填写 `{"remark":""}`。

该操作修改的是 `self_id` 对 `user_id` 的备注，不会修改对方客户端里保存的机器人名称。如果写入后回读超时、好友不存在或备注不一致，接口返回错误；请求可能已经发送，请先调用 `get_friend_list` 核对，不要因为超时自动重发。

如果目标不是当前账号的好友，或无法解析其 QQNT UID，接口会直接返回可读错误，不会把数字 QQ 号伪装成 UID 发送。
