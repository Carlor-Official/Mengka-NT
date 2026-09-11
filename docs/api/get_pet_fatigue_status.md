# 获取学习打工疲劳

**API 开源贡献者：星空花海**

优先可用职业，回退学习，按最短选项 warning 判断疲劳。

- action：`get_pet_fatigue_status`
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
const result = await api.get_pet_fatigue_status({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA=="
})
```

## 返回结果

known、fatigued、tier、benefitRate、todayHours、reason、warnings[]、activity、option_name。无法识别提示时 known=false，疲劳档位及倍率为 null。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
