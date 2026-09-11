# 获取宠物成长属性

**API 开源贡献者：星空花海**

读取学习场景中的力量、智力、魅力。

- action：`get_pet_attributes`
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
const result = await api.get_pet_attributes({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA=="
})
```

## 返回结果

attributes[]，每项包含 name 和 value。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
