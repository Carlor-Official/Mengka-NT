# check_cache

检查账号的本地登录缓存是否完整有效。

## 调用方式

```js
const self_id = 123456789 // 要检查的 Bot QQ 号
const result = await api.check_cache(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | Bot QQ 号；与 `client_type` 一起定位协议账号 |

## 返回值

```js
{ valid: true }
```

仅在 `valid === true` 时调用 [`cache_login`](cache_login.md)。
