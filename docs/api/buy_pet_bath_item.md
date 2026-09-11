# 购买宠物洗护用品

**API 开源贡献者：星空花海**

先校验服务端目录数量规则，再提交商城订单。

- action：`buy_pet_bath_item`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `item_id` | string | 是 | 洗护目录返回的用品 ID |
| `count` | number | 是 | 正整数数量；洗护购买须满足目录步进及上下限 |

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

submitted、result、order_id、effect_verified。没有订单号时返回结果未知，请先查询库存。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
