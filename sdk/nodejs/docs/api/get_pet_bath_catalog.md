# 获取宠物洗护目录

**API 开源贡献者：星空花海**

含价格、数量步进、上下限及完整图形资源。

- action：`get_pet_bath_catalog`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |

## 调用示例

```js
const result = await api.get_pet_bath_catalog({
  "self_id": 123456,
  "client_type": "android"
})
```

## 返回结果

道具数组：item_id、name、gold_price、clean_gain、mood_gain、description、default_count、step、minimum、maximum 以及图形 URL。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
