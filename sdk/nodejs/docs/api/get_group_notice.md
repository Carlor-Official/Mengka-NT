# get_group_notice

获取指定群聊的公告列表。

## 调用方式

```js
const notices = await api.get_group_notice(1060221, 123456789)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行查询的在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群号 |

## 返回值

成功时返回公告数组：

```json
[
  {
    "notice_id": "notice-id",
    "sender_id": 106606,
    "published_at": 1788134400,
    "content": "公告内容",
    "images": [],
    "settings": {},
    "read_count": 12
  }
]
```

框架只返回一套原生字段，不提供 `_get_group_notice` 下划线别名，也不重复生成 OneBot 的 `message.image` / `message.images` 两套结构。
