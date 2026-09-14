# 获取宠物互动消息

**API 开源贡献者：星空花海**

读取互动文本、消息分段、时间、来源和事件类型。

- action：`get_pet_interaction_messages`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

> 待下一版本发布：本页包含 v2.2.1 之后的参数或返回字段调整。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `limit` | number | 否 | 消息条数，非负安全整数，默认 20；不限制 1–50，显式传值原样发送 |

## 调用示例

```js
const result = await api.get_pet_interaction_messages({
  "self_id": 123456,
  "client_type": "android"
})
```

省略 `limit` 使用 20；显式传入 0、51 或更大数值均原样发送，框架不再执行 1–50 范围限制。实际返回条数由上游决定。

## 返回结果

messages[]：user_id、text、segments、timestamp、message_id、pet_name、event_type。纯文本消息的 segments 为空数组。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
