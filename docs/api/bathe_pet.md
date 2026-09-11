# 给自身宠物洗护

**API 开源贡献者：星空花海**

给目标宠物使用洗护道具，可指定数量。

- action：`bathe_pet`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `item_id` | string | 是 | 洗护目录返回的用品 ID |
| `count` | number | 否 | 使用数量 1–99，默认 1 |

## 调用示例

```js
const result = await api.bathe_pet({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA==",
  "item_id": "1"
})
```

## 返回结果

submitted、effect_verified、pet_id；服务端提供时含 clean、mood、remaining、completed、extra_1、extra_2。请读取数值确认实际清洁度。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
