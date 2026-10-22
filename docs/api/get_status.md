# get_status

获取当前在线 Bot 的连接状态、登录时间、上线时间与基础运行计数。

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
    login_time: 1792569617,
    online_time: 1792642228,
  },
}
```

`online` 只有在账号状态为在线且本地 MSF 连接处于已连接状态时才为 `true`。统计值直接来自框架进程内运行数据，不额外向 QQ 服务端查询。

## 时间字段

::: info 版本说明
从框架 **2.8.1** 起，`get_status` 同时返回 `stat.login_time`（登录时间）和 `stat.online_time`（上线时间）。2.8.0 尚不包含新增的 `stat.login_time`；`stat.online_time` 的返回位置和含义保持不变。
:::


| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `stat.login_time` | number | 登录时间，秒级 Unix 时间戳；与账号页面的“登录时间”一致。 |
| `stat.online_time` | number | 上线时间，秒级 Unix 时间戳；与账号页面的“上线时间”一致。它不是在线时长。 |

两个字段直接读取同一份账号运行状态。断线重连更新上线时间，不据此重置登录时间；没有记录时返回 `0`，应显示“暂无记录”。已有 `online_time` 字段的位置和含义保持不变。查询不会发起登录或 QQ 网络请求。

Linux 账号通过 `api.forProtocol('linux').get_status(self_id)` 查询，返回相同时间字段。JavaScript 显示日期时使用 `new Date(status.stat.login_time * 1000)`；按需要选择显示时区。
