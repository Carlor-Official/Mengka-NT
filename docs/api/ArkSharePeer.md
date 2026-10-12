# ArkSharePeer

生成指定好友的联系人分享 Ark。

## 调用方式

```js
const result = await api.ArkSharePeer(self_id, user_id, phone_number)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 当前好友 QQ 号 |
| `phone_number` | string | 否 | 卡片中显示的手机号 |

## 返回值

返回 `{ result, errMsg, arkMsg }`，其中 `arkMsg` 可作为 Ark 消息内容继续发送。
