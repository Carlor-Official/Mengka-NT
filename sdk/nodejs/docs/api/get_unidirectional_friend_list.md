# get_unidirectional_friend_list

获取当前账号的单向好友列表。单向好友是仍关注当前账号、但没有出现在普通双向好友列表中的用户。

## 调用方式

```js
const users = await api.get_unidirectional_friend_list({
  self_id: 106606,
  top: 0,
  count: 99,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 要查询的在线 Bot QQ 号 |
| `top` | number | 否 | 分页起点，默认 `0` |
| `count` | number | 否 | 本次请求数量，默认 `99`，最大 `200` |
| `cookie` | string | 否 | QQ 服务端返回的分页游标；首批不填写 |

## 返回值

成功时直接返回用户数组：

```json
[
  {
    "uin": 1122334455,
    "uid": "u_example",
    "nick_name": "示例用户",
    "age": 0,
    "source": "通过群聊"
  }
]
```

`nick_name` 和 `source` 由框架解码 QQ Android 的真实响应得到，不使用好友缓存拼接。没有单向好友时返回空数组。

该接口只读取好友关系，不会添加或删除好友。当前仅支持 Android QQ。
