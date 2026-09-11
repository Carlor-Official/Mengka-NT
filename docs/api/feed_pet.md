# 给自身宠物喂食

**API 开源贡献者：星空花海**

给目标宠物喂食，可指定食物；提交后读取数值确认效果。

- action：`feed_pet`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `food_id` | string | 否 | 指定食物 ID；不传或空串使用默认食物 |
| `feed_type` | number | 否 | 喂食类型：0（默认）、1001、9990032、9990033、9990034 |

## 调用示例

```js
const result = await api.feed_pet({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA=="
})
```

## 返回结果

submitted、effect_verified、pet_id。submitted=true 表示请求已提交；请读取 get_pet_vitals 确认饱食度。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
