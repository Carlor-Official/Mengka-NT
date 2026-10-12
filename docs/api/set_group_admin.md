# set_group_admin

设置或取消群聊管理员。

缺少状态、空响应、畸形响应及重复状态字段均按失败处理。非零服务状态保留错误码。网络或响应异常不能证明操作未执行，请先回读成员角色确认，不要直接重复操作。

管理员变化事件见 [群管理变化](https://mknt.net/events/notice.html#服务器回读确认)。回读确认事件的 `source` 为 `server_readback`。

## 调用方式

```js
const result = await api.set_group_admin(
  self_id,
  group_id,
  target_uin,
  set_admin,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `target_uin` | number | 是 | 目标成员 QQ 号 |
| `set_admin` | boolean | 是 | `true` 设置，`false` 取消 |

## 返回值

```js
{
  group_id: 987654321,
  target_uin: 112233445,
  set_admin: true,
}
```
