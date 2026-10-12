# clear_account_cache

清理指定 QQ 与协议的本地登录缓存。

## 调用方式

```js
const result = await api.clear_account_cache(self_id, 'linux')
// { cleared: true }
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

第二个参数支持 `android` 或 `linux`，SDK 会转换为框架 `client_type`。同一 QQ 的两条协议缓存相互独立；清理后下次登录可能需要重新扫码或验证。

## 返回值

成功返回 `{ cleared: true }`。
