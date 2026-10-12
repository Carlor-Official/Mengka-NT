# set_online_status

设置当前账号的基础在线状态或扩展状态。

## 调用方式

```js
await api.set_online_status(self_id, status, ext_status, battery_status)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `status` | number \| string | 是 | 基础状态：`10` 在线、`30` 离开、`40` 隐身、`50` 忙碌、`60` Q我吧、`70` 请勿打扰 |
| `ext_status` | number \| string | 是 | QQ 扩展状态 ID；普通基础状态填写 `0` |
| `battery_status` | number \| string | 是 | 电量状态值 `0-100`；仅当 `ext_status=1000` 时写入请求，其余状态填写 `0` |

数值参数同时接受 JSON number 和十进制字符串，便于兼容现有 OneBot/NapCat 插件。

## 返回值

成功返回 `null`。

## 示例

```js
// 普通在线
await api.set_online_status(123456789, 10, 0, 0)

// 显示 76% 电量
await api.set_online_status(123456789, 10, 1000, 76)

// 离开
await api.set_online_status(123456789, 30, 0, 0)
```

::: warning 离线请使用账号管理接口
该 action 只修改 QQ 在线展示状态，不接受离线状态。需要断开账号时请调用 `stop_account_login`。
:::
