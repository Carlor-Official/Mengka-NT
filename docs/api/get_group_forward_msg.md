# get_group_forward_msg

获取群聊合并转发消息的完整内容。

## 调用方式

```js
const result = await api.get_group_forward_msg(
  self_id,
  sender_uin,
  res_id,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `sender_uin` | number | 是 | 合并转发消息发送者 QQ 号 |
| `res_id` | string | 是 | 合并转发资源 ID |

## 返回值

```js
{
  res_id: 'RESOURCE_ID',
  messages: [],
}
```

`res_id` 通常来自收到的合并转发卡片消息段。
