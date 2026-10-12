# nc_get_rkey

`get_rkey` 的另一公开 action，参数和返回值完全一致，使用相同的媒体密钥缓存。

## 调用方式

```js
const keys = await api.nc_get_rkey(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

详见 [get_rkey](get_rkey.md)。

## 返回值

返回 RKey 数据，字段见 [get_rkey](get_rkey.md#返回值)。
