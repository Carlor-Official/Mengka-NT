# get_friend_pet_profile

**API 开源贡献者：星空花海**

读取目标好友的宠物档案或基础数值。支持 Android，使用对象参数调用。

## 请求

```js
const result = await api.get_friend_pet_profile({
  self_id: 123456,
  client_type: 'android',
  friend_uin: '67890',
  pet_id: knownFriendPetId,
})
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | android |
| `friend_uin` | string | 是 | 目标好友 QQ 号 |
| `pet_id` | string | 否 | 目标好友实际返回的宠物 ID；不能用 QQ 号替代 |

传入 pet_id 时直接查询基础数值，跳过按 QQ 号查档案的入口。省略时先查档案；仅当服务返回低版本错误 1000120，且当前机器人账号保存过该好友的有效 ID，才使用该 ID 查询最新数值。

成功查询并验证归属后的 ID 在当前机器人账号内保留 15 分钟，最多 256 个。复用不会延长有效期，也不会复用旧数值。账号实例关闭、清除登录缓存或框架重启后记录清空；复用查询失败会移除对应 ID。不会从其他机器人账号借用登录态或读取记录。

## 返回

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `pet_id` | string | 目标宠物 ID |
| `friend_uin` | string | 目标好友 QQ 号 |
| `source` | string | other_pet：直接取得档案；provided_pet_id：使用请求中的 ID；cached_pet_id：低版本错误后复用已验证 ID |
| `partial` | boolean | 使用显式或已保存 ID 时为 true，仅保证 ID、主人和基础数值，不补造完整档案 |
| `vitals` | object | 本次实时查询的基础数值：mood、hunger、cleanliness、total；不包含好友金币 |

```json
{
  "pet_id": "67890-known-pet",
  "friend_uin": "67890",
  "source": "cached_pet_id",
  "partial": true,
  "vitals": { "pet_id": "67890-known-pet", "mood": 80, "hunger": 73, "cleanliness": 90, "total": 81 }
}
```

示例 ID 仅用于展示格式，请使用实际返回值。

## 错误

- 没有可用 ID 且档案入口受限：保留上游错误码，提示提供真实 pet_id。
- ID 与 friend_uin 不匹配：拒绝请求。
- 网络超时、非版本类业务错误或无效响应：直接返回错误，不转换成成功，不触发写入或自动重试。

好友／陌生人目录受限不影响已知 pet_id 的直查。没有真实 ID 时，本接口不会猜测或拼造 ID。
