# add_account

创建一个离线 Bot 账号，并指定该账号使用的登录节点。框架自动生成该 QQ 与具体协议独享的设备指纹。

## 调用方式

```js
const account = await api.add_account({
  self_id: 123456789,
  password,
  protocol_id,
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
| `node_id` | number | 是 | 账号登录节点 ID；这是账号字段，不是插件服务绑定 |
| `client_type` | string | 否 | `android` 或 `linuxqq`，省略时为 Android |

框架会校验节点和协议记录是否存在，并在账号创建事务内生成指纹。不接受非零 `device_profile_id`，也不支持自定义设备字段。密码属于敏感值，不要写入 URL 或日志。

## 返回值

返回新账号的 `self_id`、`protocol_id`、`device_profile_id`、`node_id` 和初始运行状态。

登录缓存由框架管理；不得提交非空 `token` 导入外部登录票据。此类请求会明确失败，不会忽略后继续保存。
