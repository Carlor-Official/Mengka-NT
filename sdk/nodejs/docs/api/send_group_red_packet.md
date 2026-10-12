# send_group_red_packet

向指定群聊发送 QQ 群红包，支持拼手气、普通、专属、语音和口令五种类型。

## 调用方式

```js
const result = await api.send_group_red_packet(
  self_id,
  group_id,
  'lucky',
  100,
  2,
  payment_password,
  '恭喜发财',
)
```

`total_amount` 使用“分”为单位。上例表示总金额 1 元、共 2 份。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 接收红包的群号 |
| `red_packet_type` | string | 是 | 红包类型：`lucky`、`normal`、`exclusive`、`voice` 或 `command` |
| `total_amount` | number | 是 | 红包总金额，单位为分 |
| `total_num` | number | 是 | 红包份数 |
| `payment_password` | string | 正式发送时是 | QQ 钱包支付密码，仅用于本次请求 |
| `wishing` | string | 否 | 祝福语、语音口令或文字口令 |
| `target_uins` | number[] | 专属红包时是 | 可领取专属红包的 QQ 号列表 |
| `options.dry_run` | boolean | 否 | 仅校验参数和发送链路，不执行支付 |
| `options.probe_confirm` | boolean | 否 | `dry_run` 时额外检查支付确认路由 |

红包类型对应关系：

| 类型 | 说明 |
| --- | --- |
| `lucky` | 拼手气红包，每份金额随机 |
| `normal` | 普通红包，每份金额相同 |
| `exclusive` | 专属红包，需同时传入 `target_uins` |
| `voice` | 语音红包，`wishing` 为语音口令 |
| `command` | 口令红包，`wishing` 为文字口令 |

```json
{
  "action": "send_group_red_packet",
  "params": {
    "self_id": 123456789,
    "group_id": 987654321,
    "red_packet_type": "normal",
    "total_amount": 100,
    "total_num": 2,
    "wishing": "恭喜发财",
    "target_uins": [],
    "payment_password": "本次请求的支付密码"
  }
}
```

## 返回值

```js
{
  status: 'success',
  red_packet_type: 'normal',
  group_id: 987654321,
  total_amount: 100,
  total_num: 2
}
```

支付密码不会写入框架配置。调用方也不应记录、缓存或输出该字段。建议先使用 `dry_run: true` 检查参数和路由，再执行正式发送。
