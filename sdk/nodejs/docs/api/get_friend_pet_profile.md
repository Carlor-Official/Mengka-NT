# 获取好友宠物档案

**API 开源贡献者：星空花海**

查询好友档案与基础数值；已知目标宠物 ID 时可直接查询基础数值。

- action：`get_friend_pet_profile`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `friend_uin` | string | 是 | 好友 QQ 号的十进制字符串；协议需要时显式传入 |
| `pet_id` | string | 否 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |

## 调用示例

```js
const result = await api.get_friend_pet_profile({
  "self_id": 123456,
  "client_type": "android",
  "friend_uin": "67890"
})
```

## 返回结果

pet_id、friend_uin、source、vitals。vitals 包含基础数值，不要求好友金币。直接传 pet_id 时返回 partial=true，不补造完整档案。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
