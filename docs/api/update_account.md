# update_account

更新一个离线 Bot 账号的协议、密码、设备指纹或登录节点。

## 调用方式

```js
await api.update_account({
  self_id: 123456789,
  password,
  protocol_id,
  device_profile_id,
  client_type: 'android',
  target_client_type: 'linuxqq',
  node_id,
})
```

## 参数

SDK 方法接受一个参数对象。

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | QQ 号 |
| `password` | string | 是 | 新密码 |
| `protocol_id` | number | 是 | 新协议 ID |
| `device_profile_id` | number | 是 | 新设备指纹 ID |
| `node_id` | number | 否 | 目标登录节点 ID；省略时保留账号当前节点 |
| `client_type` | string | 否 | 当前协议：`android` 或 `linuxqq`，省略时为 Android |
| `target_client_type` | string | 否 | 修改后的协议；省略时保持当前协议 |

账号必须处于离线状态。`node_id` 只改变账号登录节点，不改变任何插件 WS 服务的作用域。

## 返回值

成功时返回空业务数据；失败时 action 结果包含明确错误信息。密码属于敏感值，不要写入 URL 或日志。
