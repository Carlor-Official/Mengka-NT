# add_account

创建一个离线 Bot 账号，并指定该账号使用的登录节点。

## 调用方式

```js
const account = await api.add_account({
  self_id: 123456789,
  password,
  protocol_id,
  device_profile_id,
  node_id,
  client_type: 'linuxqq',
})
```

## 参数

SDK 方法接受一个参数对象。

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 5 到 12 位 QQ 号 |
| `password` | string | 是 | 账号密码 |
| `protocol_id` | number | 是 | 协议数组下标 |
| `device_profile_id` | number | 是 | 设备指纹记录 ID |
| `node_id` | number | 是 | 账号登录节点 ID；这是账号字段，不是插件服务绑定 |
| `client_type` | string | 否 | `android` 或 `linuxqq`，省略时为 Android |

框架会校验节点、设备指纹和协议记录是否存在。密码属于敏感值，不要写入 URL 或日志。

## 返回值

返回新账号的 `self_id`、`protocol_id`、`device_profile_id`、`node_id` 和初始运行状态。
