# nc_get_user_status

查询指定 QQ 当前的基础在线状态和扩展状态。

## 调用方式

```js
const status = await api.nc_get_user_status(self_id, user_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 要查询的 QQ 号 |

## 返回值

返回值包含 `status`、`ext_status` 等 QQ 服务端实时字段。好友隐私设置可能限制可见状态。

公开状态不等同于框架内的登录状态；判断框架账号是否在线应查询 `get_bot_list` 或订阅账号上下线事件。本接口不提供陌生账号 UID，也不会触发好友申请事件。
