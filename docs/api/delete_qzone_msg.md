# delete_qzone_msg

删除当前账号发布的空间动态。

## 调用方式

```js
await api.delete_qzone_msg(self_id, tid)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `tid` | string | 是 | 发布接口返回的动态标识 |

## 返回值

成功返回 `null`。删除结果以再次查询空间动态为准。
