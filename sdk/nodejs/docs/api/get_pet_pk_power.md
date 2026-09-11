# 获取目标宠物战力

**API 开源贡献者：星空花海**

传本人或对手 petId；战力非正数时报 pk_power_missing。

- action：`get_pet_pk_power`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |

## 调用示例

```js
const result = await api.get_pet_pk_power({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA=="
})
```

## 返回结果

pet_id、dominant_type、power。战力未就绪时返回 pk_power_missing。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
