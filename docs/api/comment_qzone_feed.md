# comment_qzone_feed

评论一条好友 QQ 空间动态，支持纯文字、纯图片及图文同时发送。

## 调用方式

```js
const result = await api.comment_qzone_feed(self_id, feed, content, images)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `feed` | object | 是 | `get_qzone_friend_feeds` 返回的完整动态对象 |
| `content` | string | 否 | 评论文字；不发送文字时传空字符串 |
| `images` | array | 否 | 图片列表，可传公网 HTTP(S) URL 字符串，或 `{ url, width, height }` 对象，最多 9 张 |

`content` 与 `images` 至少填写一项。动态内部所需的标识由框架根据 `feed` 自动处理。

## 返回值

```js
{
  self_id: 123456789,
  comment_id: 'COMMENT_ID',
  content: '评论内容',
  images: [
    { url: 'https://example.com/image.jpg', width: 1080, height: 1080 },
  ],
  created_at: 1710000000,
}
```

## 示例

```js
const { feeds } = await api.get_qzone_friend_feeds(self_id)

// 纯文字
await api.comment_qzone_feed(self_id, feeds[0], '写得真不错', [])

// 纯图片
await api.comment_qzone_feed(self_id, feeds[0], '', [
  'https://example.com/comment.jpg',
])

// 图文同时发送
const result = await api.comment_qzone_feed(self_id, feeds[0], '配图评论', [
  { url: 'https://example.com/comment.jpg', width: 1080, height: 1080 },
])
console.log(result.comment_id, result.images)
```

框架会下载图片并自动上传到当前账号的 QQ 空间媒体存储，再提交评论。图片地址必须能由框架服务器通过公网访问；不支持内网地址。本地文件需先放到可访问的 HTTP(S) 地址。
