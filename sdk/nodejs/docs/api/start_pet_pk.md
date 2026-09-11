# 发起宠物 PK

**API 开源贡献者：星空花海**

显式本人和对手 petId，固定场景 6900 与子事件 6901。

- action：`start_pet_pk`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `friend_uin` | string | 是 | 好友 QQ 号的十进制字符串；协议需要时显式传入 |
| `friend_pet_id` | string | 是 | 好友或对手宠物 ID，由调用方保存或从目录获得 |

## 调用示例

```js
const result = await api.start_pet_pk({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA==",
  "friend_uin": "67890",
  "friend_pet_id": "Njc4OTAtcGV0"
})
```

## 返回结果

submitted、pet_id、story_id；story_id 以 6900_ 开头。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
