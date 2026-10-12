# get_red_packet_info

查询群消息中 `red_packet` 消息段对应的 QQ 红包详细信息。

## 调用方式

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const result = await api.get_red_packet_info(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket.data,
)
```

也可以直接把完整的 `red_packet` 消息段作为第 4 个参数传入，官方 SDK 会自动读取其中的 `data`。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_uin` | number | 是 | 红包发送人 QQ 号 |
| `red_packet` | object | 是 | 收到的 `red_packet` 消息段 `data` |
| `red_packet.title` | string | 否 | 红包标题 |
| `red_packet.listid` | string | 是 | 红包列表 ID |
| `red_packet.authkey` | string | 是 | 红包鉴权串 |
| `red_packet.channel` | number | 否 | 红包渠道，缺省为 `0` |
| `red_packet.pay_flag` | number | 是 | 红包支付标记，取自收到的 `red_packet` 消息段 |
| `red_packet.hb_from` | number | 是 | 红包来源标记，取自收到的 `red_packet` 消息段 |

未使用官方 SDK 时，当前后端接收的是展开后的红包字段，不接收嵌套的 `red_packet` 对象：

```json
{
  "action": "get_red_packet_info",
  "params": {
    "self_id": 644691423,
    "group_id": 714169244,
    "sender_uin": 51974055,
    "title": "恭喜发财",
    "listid": "10000448012608253500114336737900",
    "authkey": "45c7afde0cb06eed0198c763b46a580a",
    "channel": 1,
    "pay_flag": 0,
    "hb_from": 0
  }
}
```

请直接使用收到的红包消息段数据，不要自行重新生成 `listid`、`authkey`。官方 SDK 会自动把第 4 个位置参数展开成当前后端实际接收的字段。

## 返回值

返回 QQ 红包服务解密后的 JSON 对象，例如：

```js
{
  retcode: '0',
  retmsg: 'ok',
  pre_grap_token: 'rand=...&sign=...&ts=...&ver=1',
  send_object: {
    channel: '1',
    recv_amount: '0',
    recv_num: '0',
    send_listid: '10000452012608021400100537757900',
    send_name: '示例用户',
    send_uin: '350873596',
    total_amount: '100',
    total_num: '1',
    wishing: '恭喜发财',
  },
  state: '16',
}
```

`pre_grap_token` 位于返回对象顶层。正式领取时，将它作为 `grab_red_packet` 的第 5 个参数传入。
