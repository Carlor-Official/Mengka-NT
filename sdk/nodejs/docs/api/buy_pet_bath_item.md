# 购买宠物洗护用品

**API 开源贡献者：星空花海**

购买数量 count 大于 0 即提交商城订单，不预查目录或校验目录数量上下限、步进。业务 result 和 order_id 按响应返回，由调用方判断购买结果。

- action：`buy_pet_bath_item`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `item_id` | string | 是 | 洗护目录返回的用品 ID，使用数字字符串，例如 "1"；框架按商城整数类型编码 |
| `count` | number | 是 | 购买数量，大于 0；不校验目录上下限或步进 |

## 调用示例

```js
const result = await api.buy_pet_bath_item({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA==",
  "item_id": "1",
  "count": 1
})
```

## 返回结果

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `result` | number | 商城业务结果码，按响应返回；不限定为 0 或 1，不由框架判定业务成功 |
| `order_id` | string | 商城返回的订单号，允许为空，不修改原始文本 |
| `submitted` | boolean | `true` 仅表示请求已提交并收到可解析的 OIDB 成功响应，不代表购买成功 |
| `effect_verified` | boolean | `false`，框架未核验库存或购买效果 |

protobuf 省略 `result` 或 `order_id` 时分别返回默认值 `0`、`""`。非零业务 `result`、空订单号均不再使调用报错；插件自行解释业务结果。

参数错误、网络错误、无效响应或 OIDB 外层非零错误码仍使调用失败。`action_result.ok=true` 不代表购买业务成功；结果不确定时由调用方查询库存确认，不自动重试购买。

商城下单的商品编号在 OIDB 内层使用整数（varint）；SDK 与调试请求仍传 `item_id: "1"` 这样的数字字符串。`count` 仅校验大于 0，不预查目录上下限或步进。OIDB 外层错误（如 1000316）保持报错；业务 result 不转成异常。不会自动重试购买。
