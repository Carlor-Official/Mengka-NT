# 获取宠物陌生人目录

**API 开源贡献者：星空花海**

可选 mode，默认 4；模式 4 过滤无效条目，单页最多 100 条。

- action：`get_pet_pk_strangers`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

> 待下一版本发布：本页包含 v2.2.1 之后的参数或返回字段调整。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `cursor` | string | 否 | 服务端返回的下一页游标 |
| `mode` | number | 否 | 非负安全整数；省略默认 4，显式传入 0 或其他值原样发送 |

## 调用示例

```js
const result = await api.get_pet_pk_strangers({
  "self_id": 123456,
  "client_type": "android",
  "mode": 4
})
```

`mode` 写入 `pkFriendList` 请求的 field 2；其他模式的业务含义与结果由上游决定。`get_pet_pk_friends` 仍固定使用模式 6。

## 返回结果

friends[]、next_cursor、has_more。条目包含 pet_id、pet_name、user_id、nickname、pet_status、dominant_type、displayed_pk_power。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
