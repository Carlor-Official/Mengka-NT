# 编辑账号

通过已认证且具备账号管理权限的连接调用既有 `update_account`。接口接受对象参数，成功返回格式不变。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | QQ 号 |
| password | string | 是 | 新密码 |
| protocol_id | number | 是 | 新协议 ID |
| device_profile_id | number | 是 | 新设备指纹 ID |
| node_id | number | 否 | 目标登录节点 ID；省略时保留账号当前节点 |
| client_type | string | 否 | 当前协议：android 或 linuxqq，省略时为 Android |
| target_client_type | string | 否 | 修改后的协议；省略时保持当前协议 |

```js
await api.update_account({
  self_id,
  password,
  client_type: 'android',       // 原平台
  target_client_type: 'linuxqq', // 目标平台；省略则保持原平台
  protocol_id,                // 必须选择目标平台对应的协议 ID
  device_profile_id,
  // node_id: 1,              // 省略时保留原登录节点
})
```

反向切换时交换 `client_type` 与 `target_client_type`，并选择 Android 协议 ID。账号必须离线；不要用编辑接口绕过登录、安全验证或任务限制。

v2.5.4 的跨平台保存修复会在同一数据库事务中迁移通知设置、等级任务配置、任务执行记录及插件归属授权，丢弃旧协议的任务面板缓存。不会覆盖目标平台已存在的同 QQ 账号，任一关联记录冲突则全部回滚。保留密码、指纹和节点配置，但清除原协议登录票据及登录时间；保存不会自动登录，需使用目标协议重新登录。

元宝正在执行或确认验证时拒绝编辑账号。切换成功只作废处于登录安全验证阶段、尚未进入任务提交的旧验证，并释放旧设备连接；切回 Android 9.2.70 登录后可手动重新执行，旧验证入口不可复用，定时器不申请新验证。已执行、结果不确定或历史暂停记录继续保留；切换平台不能用来绕过这些保护。
