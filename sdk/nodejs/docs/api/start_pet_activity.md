# 发起宠物活动

**API 开源贡献者：星空花海**

按选项目录发起活动；打工与冒险支持同时提供好友 QQ 和宠物 ID。

- action：`start_pet_activity`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |
| `pet_id` | string | 是 | 宠物 ID，须按接口说明区分本人或目标；不能用 QQ 号代替 |
| `activity` | string | 是 | school / work / adventure |
| `option_name` | string | 是 | 选项目录返回的原始名称 |
| `sub_event_type` | number | 是 | 目录返回的子事件类型；学习/打工须大于 0，冒险允许 0 |
| `friend_uin` | string | 否 | 好友 QQ 号的十进制字符串；协议需要时显式传入 |
| `friend_pet_id` | string | 否 | 好友或对手宠物 ID，由调用方保存或从目录获得 |

## 调用示例

```js
const result = await api.start_pet_activity({
  "self_id": 123456,
  "client_type": "android",
  "pet_id": "MTIzNDU2LXBldA==",
  "activity": "work",
  "option_name": "目录返回的岗位名称",
  "sub_event_type": 6401
})
```

## 返回结果

submitted、pet_id、story_id。story_id 对应所选活动类型；保留此 ID 用于后续查询和结算。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
