# set_group_member_permissions

单独开启或关闭一个群成员权限。接口使用 Android QQ 群详情与群设置链路，并在提交后回读验证。

## 调用方式

```js
const result = await api.set_group_member_permissions({
  self_id: 1060221,
  group_id: 123456789,
  permission: "invite",
  allow: true,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `permission` | string | 是 | 当前支持 `upload_album`、`temporary_session`、`create_group` |
| `allow` | boolean | 是 | 是否允许 |

## 返回值

成功时返回修改后的权限位与 `read_back_verified: true`。
