# 结算宠物 PK

**API 开源贡献者：星空花海**

直接提交一次 PK 结算，不预先查询 PK 状态；提交后请复查数值确认效果。

- action：`settle_pet_pk`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `story_id` | string | 是 | 发起 PK 返回的任务 ID，必须以 6900_ 开头 |

## 调用示例

```js
const result = await api.settle_pet_pk({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA==",
  "story_id": "6900_example"
})
```

## 返回结果

返回 `submitted`、`pet_id`、`story_id`、`effect_verified`。`submitted=true` 表示结算请求已提交，`effect_verified=false` 表示尚未核验实际效果。

调用方根据 PK 发起结果和业务时机调用本接口，无需先调用 `get_pet_pk_status`。框架直接发送一次结算请求；合法空响应也不自动重发。请在提交后通过 `get_pet_vitals` 复查数值，超时或结果未知时先等待并核对状态。普通活动结算的完成状态检查保持不变。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
