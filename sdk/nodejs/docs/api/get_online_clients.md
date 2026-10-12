# get_online_clients

获取当前账号的在线客户端列表。

## 调用方式

```js
const clients = await api.get_online_clients(106606)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 要查询的在线 Bot QQ 号 |
| `no_cache` | boolean | 否 | 兼容 Go-CQHTTP 参数；安卓端的设备变更由 QQ 服务端主动推送 |

## 返回值

成功时直接返回客户端数组：

```json
[
  {
    "app_id": 1,
    "device_name": "DESKTOP",
    "device_kind": "Windows",
    "client_type": 2,
    "state": 1,
    "platform_id": 3,
    "new_client_type": 2
  }
]
```

`app_id`、客户端类型、状态和平台字段来自 QQ 服务端；`device_kind` 优先使用服务端平台名称。账号刚登录且设备推送尚未到达时会返回空数组，收到推送后会自动更新。
