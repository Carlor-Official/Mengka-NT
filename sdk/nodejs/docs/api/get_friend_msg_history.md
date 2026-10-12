# get_friend_msg_history

从 QQ 服务器读取指定好友的一日漫游消息。该接口使用 Android QQ 的 `MessageSvc.PbGetOneDayRoamMsg`，返回结构与实时好友消息一致。

## 调用方式

```js
const result = await api.get_friend_msg_history({
  self_id: 1060221,
  user_id: 106606,
  message_seq: 0,
  count: 20,
  reverseOrder: false,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ 账号 |
| `user_id` | number | 是 | 好友 QQ 号 |
| `message_seq` | number | 否 | 分页锚点；可传上一页的 `next_message_seq` 或已返回的 `message_id`，传 `0` 从最新消息开始 |
| `count` | number | 否 | 返回数量，默认 `20`，范围 `1-100` |
| `reverseOrder` | boolean | 否 | 是否反转本页消息顺序，默认 `false`；也兼容 `reverse_order` |

## 返回值

```json
{
  "messages": [
    {
      "time": 1720000000,
      "self_id": 1060221,
      "post_type": "message",
      "message_type": "private",
      "message_id": 234567,
      "user_id": 106606,
      "target_id": 1060221,
      "message": [{ "type": "text", "data": { "text": "你好" } }],
      "raw_message": "你好"
    }
  ],
  "next_message_seq": 1719999000,
  "has_more": true
}
```

`next_message_seq` 在好友漫游协议中实际表示上一页最早消息的时间游标，调用方只需原样回传，不要自行换算。

该接口是只读查询。Android 使用Android 协议；Linux QQ 使用对应的原生历史消息能力，不会转发到同 QQ 的 Android 实例。
