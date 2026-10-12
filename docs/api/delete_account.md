# delete_account

删除当前插件所属节点下的离线账号。

## 调用方式

```js
const self_id = 123456789 // 要删除的 Bot QQ 号
const result = await api.delete_account(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 账号 QQ 号；与 `client_type` 一起定位协议账号 |

账号必须处于离线状态。

## 返回值

```js
{ code: 0, msg: '账号删除成功' }
```

失败时返回 `{ code: 1, msg: '错误信息' }`。
