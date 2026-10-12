# set_doubt_friends_add_request

同意一条可疑好友申请。

## 调用方式

```js
await api.set_doubt_friends_add_request(self_id, flag, true)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `flag` | string | 是 | 列表接口返回的原始标识 |
| `approve` | boolean | 否 | 当前仅支持 `true` |

## 返回值

成功返回 `null`。
