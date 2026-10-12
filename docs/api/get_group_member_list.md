# get_group_member_list

获取指定群的完整成员列表。

## 调用方式

```js
const result = await api.get_group_member_list(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |

## 返回值

```js
{
  group_id: 987654321,
  members: [],
  total_count: 0,
}
```

成员常用字段包括 `uin`、`nickname`、`card`、`level`、`title`、`join_time` 和 `last_speak_time`。
