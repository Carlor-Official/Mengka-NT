# get_up_for_grabs

获取指定群聊中当前仍可领取的红包，与 `get_group_red_packets` 返回相同结果。

## 调用方式

```js
const packets = await api.get_up_for_grabs(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行查询的 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |

## 返回值

返回红包数组。没有可领取红包时返回空数组。字段与 [`get_group_red_packets`](get_group_red_packets.md) 相同。
