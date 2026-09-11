# 购买宠物食物

**API 开源贡献者：星空花海**

按附件购买包补充默认食物，返回购得数量和金币花费。

- action：`buy_pet_food`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `count` | number | 是 | 正整数数量；洗护购买须满足目录步进及上下限 |

## 调用示例

```js
const result = await api.buy_pet_food({
  "self_id": 123456,
  "client_type": "android",
  "count": 1
})
```

## 返回结果

submitted、effect_verified、bought、cost_gold；服务端提供时含 balance、gold。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
