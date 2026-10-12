# set_group_kick_members

批量将指定成员移出群聊。该接口兼容 NapCat 同名 action，在 Android 9.2.70 协议下按成员顺序调用已经验证的单人移出群聊链路。

## 调用方式

```js
const result = await api.set_group_kick_members(
  self_id,
  group_id,
  user_ids,
  reject_add_request,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `user_ids` | number[] | 是 | 被移出成员的 QQ 号数组，兼容别名 `user_id`，单次最多 20 个 |
| `reject_add_request` | boolean | 否 | 是否同时拒绝这些成员后续的加群申请，默认 `false` |

数组中的重复 QQ 会自动去重；不允许移出当前 Bot。执行过程中任一成员失败时，接口会停止并在错误信息中返回已完成数量和失败 QQ，避免调用方误判为全部成功。

## 返回值

全部成员处理成功时返回空对象：

```js
{}
```
