# set_group_card

修改指定群成员的群名片（群昵称），也可以传空字符串清空群名片。

修改其他成员时，当前 Bot 需要是群主或管理员；普通成员只能修改自己的群名片。最终权限由 QQ 群设置和服务器校验决定。

## 调用方式

```js
const result = await api.set_group_card(
  self_id,
  group_id,
  user_id,
  card,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 目标成员 QQ 号 |
| `card` | string | 是 | 新群名片；传空字符串时清空群名片 |

## 返回值

```js
{
  success: true,
  group_id: 106500,
  user_id: 1060221,
  card: '萌卡测试昵称',
}
```

清空群名片时，返回值中的 `card` 为 `''`。

## 示例

```js
await api.set_group_card(2082083, 106500, 1060221, '新群昵称')

// 清空群名片
await api.set_group_card(2082083, 106500, 1060221, '')
```
