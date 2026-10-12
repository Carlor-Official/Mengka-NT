# set_group_robot_add_option

设置机器人账号加入群聊时的准入方式。接口使用 Android QQ 的 `OidbSvcTrpcTcp.0xf00_3` 写入，并通过 `OidbSvcTrpcTcp.0xef0_1` 回读确认服务器已应用设置。

## 调用方式

```js
await api.set_group_robot_add_option({
  self_id: 1060221,
  group_id: 123456789,
  robot_member_switch: 0,
  robot_member_examine: 2,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 QQ 账号 |
| `group_id` | number/string | 是 | 群号 |
| `robot_member_switch` | number | 二选一 | `0` 允许机器人申请入群，`1` 禁止机器人入群 |
| `robot_member_examine` | number | 二选一 | `0` 无需管理员审核，`2` 需要管理员审核 |

两个选项至少填写一个；未填写的字段不会写入，原设置保持不变。常用组合：

- `0 / 0`：允许机器人直接入群。
- `0 / 2`：允许机器人申请，需管理员审核。
- `1 / 2`：禁止机器人入群。

## 返回值

成功返回 `null`，与 NapCat action 契约一致。返回成功前，框架已完成回读校验。只有群主或具备相应权限的管理员可以修改。
