# 获取宠物 PK 状态

**API 开源贡献者：星空花海**

查询指定 PK，返回原始响应；当前完成状态可能未知。

- action：`get_pet_pk_status`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `story_id` | string | 是 | 状态接口返回的当前任务 ID；必须与目标活动类型匹配 |

## 调用示例

```js
const result = await api.get_pet_pk_status({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA==",
  "story_id": "6900_example"
})
```

## 返回结果

pet_id、story_id、raw_body_hex、status_known、finished。当前 status_known=false、finished=null；合法空响应也不能判定为已完成。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
