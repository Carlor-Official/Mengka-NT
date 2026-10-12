# set_group_mute_all

开启或取消全员禁言。

::: tip 适用协议
Android 与 Linux QQ 均使用萌卡 NT 原生群管理链路执行。
:::

## 调用方式

```js
const result = await api.set_group_mute_all(self_id, group_id, mute)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `mute` | boolean | 是 | `true` 开启，`false` 取消 |

## 返回值

```js
{ group_id: 987654321, mute: true }
```
