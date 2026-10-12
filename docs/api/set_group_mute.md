# set_group_mute

设置或取消群聊成员禁言。

::: tip 适用协议
Android 与 Linux QQ 均使用萌卡 NT 原生群管理链路执行。
:::

## 调用方式

```js
const result = await api.set_group_mute(
  self_id,
  group_id,
  target_uin,
  duration_sec,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `target_uin` | number | 是 | 目标成员 QQ 号 |
| `duration_sec` | number | 是 | 禁言秒数，`0` 取消禁言 |

## 返回值

```js
{
  group_id: 987654321,
  target_uin: 112233445,
  duration_sec: 600,
}
```
