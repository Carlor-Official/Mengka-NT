# set_group_member_invite_policy

设置群聊普通成员的邀请策略。接口会先读取 Android QQ 群详情，只修改对应权限位，提交后再次读取并校验结果，避免覆盖其他群设置。

## 调用方式

```js
const result = await api.set_group_member_invite_policy({
  self_id: 1060221,
  group_id: 123456789,
  policy: "require_approval",
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `policy` | string | 是 | `disabled`、`require_approval`、`no_approval` 或 `no_approval_under_100` |

## 返回值

成功时返回群号、回读后的策略、底层权限位以及 `read_back_verified: true`。
