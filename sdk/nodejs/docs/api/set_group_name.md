# set_group_name

修改群名。

## 调用方式

```js
await api.forProtocol('android').set_group_name({
  self_id: 2082083, group_id: 1108676556, group_name: '测试群'
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 已登录账号 |
| group_id | number | 是 | 要管理的群 |
| group_name | string | 是 | 非空 UTF-8 文本，最多 60 字节 |

直接发送 WS action 时还必须传 `client_type: android | linuxqq`。账号需要具备 QQ 服务端允许的群管理权限。

## 返回值

成功返回 `{success: true, group_id, group_name, read_back_verified: true}`。只有提交后读回群名相符才返回成功。读回失败不代表修改未生效，请先查询确认，不要自动重复操作。参数错误、离线、网络超时或原生拒绝均返回 action 错误。

关联接口：`get_group_list`。群名变化通知使用 `group_name_changed` 事件，订阅权限为 `group_event`。
