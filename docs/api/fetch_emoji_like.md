# fetch_emoji_like

分页获取群消息指定表情的回应用户。

## 调用方式

```js
const page = await api.fetch_emoji_like({
  self_id: 106606,
  message_id: 123456789,
  emoji_id: '76',
  count: 100,
  cookie: '',
  emoji_type: 0,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Android Bot QQ 号 |
| `message_id` | number | 是 | 框架缓存中的群消息 ID |
| `emoji_id` | string | 是 | QQ 表情回应 ID |
| `count` | number | 否 | 单页数量，默认 `10`，最大 `100` |
| `cookie` | string | 否 | 上一页返回的分页游标，第一页留空 |
| `emoji_type` | number | 否 | 表情类型，默认由框架根据 `emoji_id` 判断 |

## 返回值

返回 `emojiLikesList`、下一页 `cookie`、`isFirstPage` 和 `isLastPage`。继续翻页时原样传入上次返回的 `cookie`。

该接口只读取回应用户，不会添加或取消表情回应。当前仅支持 Android QQ。
