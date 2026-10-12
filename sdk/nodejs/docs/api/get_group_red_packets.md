# get_group_red_packets

获取指定群聊中当前仍可领取的红包。

## 调用方式

```js
const packets = await api.get_group_red_packets(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行查询的 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |

## 返回值

返回红包数组。没有可领取红包时返回空数组。

```js
[
  {
    sender_uin: 123456789,
    title: '恭喜发财',
    listid: '红包列表 ID',
    authkey: '领取凭据',
    channel: 1,
    pay_flag: 0,
    hb_from: 0,
    time: 1710000000,
  },
]
```
