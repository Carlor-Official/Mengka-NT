# like_summary_card

点赞指定用户的 QQ 名片。

::: tip 适用协议
支持 Android 和 Linux QQ。
:::

## 调用方式

```js
const result = await api.like_summary_card(
  self_id,
  target_uin,
  like_count,
)
const linuxResult = await api.forProtocol('linuxqq').like_summary_card(self_id, target_uin, 1)
```

## 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `self_id` | number | 是 | - | 在线 Bot QQ 号 |
| `target_uin` | number | 是 | - | 目标 QQ 号 |
| `like_count` | number | 否 | `1` | 点赞次数 |
| `client_type` | string | 否 | `android` | WS 请求字段；SDK 通过 `forProtocol('linuxqq')` 指定，多协议账号应明确协议 |

## 返回值

```js
{ code: 0, msg: '成功' }
```

`code` 和 `msg` 来自 QQ 名片点赞响应。

仅 `code === 0` 表示操作成功；额度、风控和服务端拒绝仍按实际结果返回。Linux 需要解析目标原生 UID，无法确认身份时明确失败，点赞通知见 `profile_liked` 事件。
