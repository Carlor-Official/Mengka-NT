# unlike_qzone_feed

取消对好友空间动态的点赞。

## 调用方式

```js
api.unlike_qzone_feed(self_id, feed)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `feed` | object | 是 | `get_qzone_friend_feeds` 返回的完整动态对象 |

## 返回值

此 API 不等待响应，不返回 Promise。

```js
const { feeds } = await api.get_qzone_friend_feeds(self_id)
api.unlike_qzone_feed(self_id, feeds[0])
```
