# delete_friend

删除指定好友。

## 调用方式

```js
const result = await api.delete_friend(self_id, target_uin)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `target_uin` | number | 是 | 要删除的好友 QQ 号 |

## 返回值

```js
{ success: true, target_uin: 112233445 }
```
