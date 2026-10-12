# get_recent_contact

根据框架当前进程已经接收或观察到的群聊、私聊事件生成近期会话，不读取手机 QQ 数据库，也不向 QQ 请求会话列表。

## 调用方式

```js
await api.get_recent_contact(self_id, count)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `count` | number | 否 | 返回会话数量，默认 10，范围 1 到 100 |

## 返回值

返回结果按最后消息从新到旧排列，群聊和私聊分别去重。最后一条消息的字段名为 `lastestMsg`。

```json
[
  {
    "peerUin": "106500",
    "peerName": "测试群",
    "msgTime": "1787620800",
    "msgId": "123456789",
    "lastestMsg": {
      "message_type": "group",
      "group_id": 106500,
      "message": [{ "type": "text", "data": { "text": "测试" } }],
      "raw_message": "测试"
    }
  }
]
```

缓存按账号隔离，保留 7 天且每账号最多 4096 条；框架重启后会从空缓存重新积累。
