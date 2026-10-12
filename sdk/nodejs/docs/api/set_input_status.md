# set_input_status

向指定好友同步正在输入或结束输入状态。

## 调用方式

```js
await api.set_input_status(self_id, user_id, event_type)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `user_id` | number | 是 | 好友 QQ 号 |
| `event_type` | number | 否 | `1` 表示正在输入，`0` 表示结束 |

目标必须是当前账号的好友。成功返回空对象。

## 返回值

成功返回空对象 `{}`。
