# send_ark_share

与 `ArkSharePeer` 使用相同的联系人分享接口，参数与返回值一致。

## 调用方式

```js
const result = await api.send_ark_share(self_id, user_id, phone_number)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 当前好友 QQ 号 |
| `phone_number` | string | 否 | 卡片中显示的手机号 |

详见 [ArkSharePeer](ArkSharePeer.md)。

## 返回值

返回联系人分享 Ark 数据，字段见 [ArkSharePeer](ArkSharePeer.md#返回值)。
