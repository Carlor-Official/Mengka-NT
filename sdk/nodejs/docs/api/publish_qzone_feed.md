# publish_qzone_feed

执行前会强制查询当前 QQ 等级；等级低于 16 级时请求会被拒绝。

发布一条文本 QQ 空间动态。

## 调用方式

```js
const result = await api.publish_qzone_feed(
  self_id,
  content,
  visibility,
  self_delete_after_one_day,
  declare_ai_generated,
)
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `content` | string | 是 | - | 动态文本，不能只包含空白字符 |
| `visibility` | number | 否 | `1` | `1` 所有人可见、`2` 好友可见、`5` 仅自己可见 |
| `self_delete_after_one_day` | boolean | 否 | `false` | 是否在一天后自动删除 |
| `declare_ai_generated` | boolean | 否 | `false` | 是否声明内容由 AI 生成 |

## 返回值

```js
{
  self_id: 123456789,
  feed: {},
  client_feed_id: 'CLIENT_FEED_ID',
  server_time: 1710000000,
}
```

返回的 `feed` 可用于 `comment_qzone_feed`、`like_qzone_feed` 或 `unlike_qzone_feed`。
