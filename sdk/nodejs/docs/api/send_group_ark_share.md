# send_group_ark_share

与 `ArkShareGroup` 使用相同的群分享接口，参数与返回值一致。

## 调用方式

```js
const ark = await api.send_group_ark_share(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 当前账号已加入的群号 |

详见 [ArkShareGroup](ArkShareGroup.md)。

## 返回值

返回群分享 Ark JSON 字符串。
