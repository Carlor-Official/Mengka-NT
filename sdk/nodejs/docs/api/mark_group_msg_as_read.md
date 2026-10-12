# mark_group_msg_as_read

把指定群消息标记为已读。框架从 `message_id` 解析真实群号和消息序号，再通过安卓协议上报已读游标。

## 调用方式

```js
await api.mark_group_msg_as_read(1060221, message_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `message_id` | number | 是 | 群消息 ID |

## 返回值

成功返回空对象 `{}`。
