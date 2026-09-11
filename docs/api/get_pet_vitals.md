# 获取目标宠物数值

**API 开源贡献者：星空花海**

显式目标 petId；分别查询基础数值与金币。

- action：`get_pet_vitals`
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
const result = await api.get_pet_vitals({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA=="
})
```

## 返回结果

pet_id、mood、hunger、cleanliness、total、gold。成功 OIDB 响应中，缺失的 `mood`、`hunger`、`cleanliness`、`total`、`gold` 数值字段均按 `0` 返回；服务端错误、超时或无效协议响应仍返回失败。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
