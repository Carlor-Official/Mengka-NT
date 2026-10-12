# get_group_honor_info

获取指定群聊的实时荣誉榜单。接口使用萌卡 NT 当前账号的 Android 登录态访问 QQ 官方群荣誉服务。

## 调用方式

```js
const honor = await api.get_group_honor_info(106606, 106500, 'all')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 发起查询的在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群号 |
| `type` | string | 否 | `all`、`talkative`、`performer`、`legend` 或 `emotion`，默认 `all` |

## 返回值

返回萌卡原生结构：

```json
{
  "group_id": 106500,
  "type": "all",
  "current_talkative": {
    "user_id": 106606,
    "nickname": "群成员",
    "avatar": "https://example.com/avatar.jpg",
    "description": "9天，最长蝉联3天"
  },
  "rankings": {
    "talkative": [],
    "performer": [],
    "legend": [],
    "emotion": []
  }
}
```

`type` 不支持 `strong_newbie`。
