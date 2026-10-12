# get_group_list

获取 Bot 的完整群聊列表。萌卡NT会自动完成分页。

## 调用方式

```js
const result = await api.get_group_list(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{
  groups: [],
  total_count: 0,
  self_uin: 123456789,
}
```
