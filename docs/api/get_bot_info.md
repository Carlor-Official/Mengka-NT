# get_bot_info

获取指定协议 Bot 的运行信息。框架根据 `self_id + client_type` 定位账号，并使用账号自己的登录节点。账号可以处于离线、登录中或在线状态。

## 调用方式

```js
const bot = await api.forProtocol('android').get_bot_info(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | Bot QQ 号 |

## 返回值

```js
{
  self_id: 123456789,
  protocol_id: 0,
  device_profile_id: 1,
  nickname: '示例账号',
  status: 1,
  login_time: 1710000000,
  online_time: 3600,
  last_active: 1710003600,
  level: 42,
  is_qq_vip: true,
  friend_count: 100,
  group_count: 20,
  received: 1234,
  sent: 567,
  extra_info: '',
}
```

`status`：`0` 离线、`1` 在线、`2` 登录中。

`is_qq_vip`：是否已开通 QQ 会员，`true` 为已开通，`false` 为未开通。
