# get_profile_like

获取当前登录 QQ 的资料获赞记录。接口使用 QQ Android 的真实 `VisitorSvc.ReqGetVoterList` 请求，不读取网页缓存。

## 调用方式

```js
const result = await api.get_profile_like({
  self_id: 2082083,
  user_id: 2082083,
  start: 0,
  count: 10,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 要查询的在线 Bot QQ 号 |
| `user_id` | number | 否 | 查询目标；Android 9.2.70 当前只允许与 `self_id` 相同 |
| `start` | number | 否 | 分页起点，默认 `0` |
| `count` | number | 否 | 本次返回数量，默认 `10`，最大 `100` |
| `cookie` | string | 否 | 服务端分页游标的 Base64 文本；首批不填写 |

## 返回值

成功时返回：

```json
{
  "uid": "u_example",
  "time": "1787612400",
  "favoriteInfo": {
    "userInfos": [],
    "total_count": 0,
    "last_time": 0,
    "today_count": 0
  },
  "voteInfo": {
    "userInfos": [
      {
        "uin": 1122334455,
        "uid": "u_example_friend",
        "nick": "示例用户",
        "count": 1,
        "latestTime": 1787612300,
        "isFriend": true
      }
    ],
    "total_count": 100,
    "new_count": 2,
    "new_nearby_count": 0,
    "last_visit_time": 1787612400
  }
}
```

`voteInfo.userInfos` 是分页获赞用户；`total_count` 是累计获赞数，`new_count` 是当天获赞数。`uid` 和 `isFriend` 会在好友资料可用时补齐；非好友不会通过猜测生成 UID。

QQ 9.2.70 的此响应没有稳定提供 VIP/SVIP 标志，因此兼容字段 `isvip`、`isSvip` 当前返回 `false`。

该接口只读取本人获赞记录，不会点赞或修改个人资料。当前仅支持 Android QQ。
