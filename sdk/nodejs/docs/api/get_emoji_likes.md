# get_emoji_likes

自动翻页获取群消息指定表情的全部回应用户。

## 调用方式

```js
const result = await api.get_emoji_likes({
  self_id: 106606,
  message_id: 123456789,
  emoji_id: '76',
  emoji_type: 0,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Android Bot QQ 号 |
| `message_id` | number | 是 | 框架缓存中的群消息 ID |
| `emoji_id` | string | 是 | QQ 表情回应 ID |
| `emoji_type` | number | 否 | 表情类型，默认 0 |

## 返回值

返回 `{ emoji_like_list }`，每项包含 `user_id` 和 `nick_name`。

框架最多自动读取 10 页，并在服务端返回末页、空游标或重复游标时立即停止。该接口不会添加或取消表情回应。
