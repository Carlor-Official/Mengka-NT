# 获取宠物活动选项

**API 开源贡献者：星空花海**

读取学习、打工或冒险选项、时长、奖励与可用状态。

- action：`get_pet_activity_options`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `activity` | string | 是 | school / work / adventure |
| `career_type` | number | 否 | 职业总览返回的职业类型；不传则选第一个可用职业 |
| `stage` | number | 否 | 学习阶段 0–4；不传则读取总览 |
| `friend_pet_id` | string | 否 | work / adventure 可选雇佣好友宠物 ID；school 不接受 |

## 调用示例

```js
const result = await api.get_pet_activity_options({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA==",
  "activity": "work"
})
```

## 返回结果

activity、career_name、options[]。选项含 name、sub_event_type、cost、duration_seconds、duration_text、duration_known、reward、description、can_do、unavailable_reason、warning、icon_url、reward_icon_url。duration_known=false 时不要将 duration_seconds=0 视为实际时长。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
