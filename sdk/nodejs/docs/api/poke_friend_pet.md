# 踩一踩好友宠物

**API 开源贡献者：星空花海**

协议明确要求好友 QQ 号，使用 varint 编码。

- action：`poke_friend_pet`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `friend_uin` | string | 是 | 好友 QQ 号的十进制字符串；协议需要时显式传入 |

## 调用示例

```js
const result = await api.poke_friend_pet({
  "self_id": 123456,
  "client_type": "android",
  "friend_uin": "67890"
})
```

## 返回结果

submitted、effect_verified、friend_uin。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
