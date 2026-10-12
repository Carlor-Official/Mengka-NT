# ArkShareGroup

生成指定群聊的分享 Ark。

## 调用方式

```js
const ark = await api.ArkShareGroup(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 当前账号已加入的群号 |

## 返回值

返回 Ark JSON 字符串。
