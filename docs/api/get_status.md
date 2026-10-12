# get_status

获取当前在线 Bot 的连接状态与基础运行计数。

## 调用方式

```js
const status = await api.get_status(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{
  online: true,
  good: true,
  client_type: 'android',
  stat: {
    packet_received: 1024,
    packet_sent: 128,
    online_time: 3600,
  },
}
```

`online` 只有在账号状态为在线且本地 MSF 连接处于已连接状态时才为 `true`。统计值直接来自框架进程内运行数据，不额外向 QQ 服务端查询。
