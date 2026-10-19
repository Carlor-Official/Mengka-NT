# update_account

更新一个离线 Bot 账号的协议、密码或登录节点。设备指纹由框架管理，不能手动选择。

## 调用方式

```js
await api.update_account({
  self_id: 123456789,
  password,
  protocol_id,
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
| `node_id` | number | 否 | 目标登录节点 ID；省略时保留账号当前节点 |
| `client_type` | string | 否 | 当前协议：`android` 或 `linuxqq`，省略时为 Android |
| `target_client_type` | string | 否 | 修改后的协议；省略时保持当前协议 |

账号必须处于离线状态。同一具体协议的普通编辑保留原指纹；切换具体协议后使用该账号对应协议的独立指纹。不接受非零 `device_profile_id`。主动更换当前指纹请调用 [refresh_account_fingerprint](refresh_account_fingerprint.md)。`node_id` 只改变账号登录节点，不改变任何插件 WS 服务的作用域。

## 返回值

成功时返回空业务数据；失败时 action 结果包含明确错误信息。密码属于敏感值，不要写入 URL 或日志。

登录缓存由框架管理；不得提交非空 `token` 导入外部登录票据。此类请求会明确失败，不会忽略后继续保存。
