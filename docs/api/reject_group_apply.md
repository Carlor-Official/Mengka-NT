# reject_group_apply

拒绝入群申请。

## 调用方式

```js
const result = await api.reject_group_apply(
  self_id,
  group_id,
  request_id,
  request_type,
  reason,
  request_extra,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `request_id` | number | 是 | 请求 ID |
| `request_type` | number | 是 | 请求类型 |
| `reason` | string | 否 | 拒绝理由 |
| `request_extra` | number | 否 | 附加请求标识 |

## 返回值

返回申请处理结果。
