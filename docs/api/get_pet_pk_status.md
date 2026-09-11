# 获取宠物 PK 状态

**API 开源贡献者：星空花海**

查询指定 PK：请求成功且 body 为空表示已完成，body 非空表示进行中；任务无效等错误直接返回。

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

返回 `pet_id`、`story_id`、`raw_body_hex`、`status_known`、`finished`。

- 请求成功且 OIDB 业务 body 为空：`status_known=true`、`finished=true`，PK 已完成。
- 请求成功且 body 非空：`status_known=true`、`finished=false`，PK 进行中。
- `999 / story detail not exist` 表示任务不存在或无效；其他服务端错误、超时和无效响应同样返回错误，不判定为完成。

本接口只查询状态，不会发起结算；需要结算时由调用方调用 `settle_pet_pk`。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
