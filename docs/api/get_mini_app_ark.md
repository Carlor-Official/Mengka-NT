# get_mini_app_ark

根据内置模板或完整小程序参数生成可发送的 Ark 数据。

## 调用方式

```js
const result = await api.get_mini_app_ark(self_id, {
  type: 'bili',
  title: '视频标题',
  desc: '视频简介',
  picUrl: 'https://example.com/cover.jpg',
  jumpUrl: 'https://www.bilibili.com/video/BV...',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `type` | string | 否 | 内置模板：`bili` 或 `weibo` |
| `title` | string | 是 | 卡片标题 |
| `desc` | string | 否 | 卡片说明 |
| `picUrl` | string | 是 | 封面地址 |
| `jumpUrl` | string | 是 | 小程序跳转地址 |
| `webUrl` | string | 否 | Web 备用地址 |
| `rawArkData` | boolean | 否 | 返回 QQ 原始结构 |

不使用内置模板时，可额外传 `appId`、`sdkId`、`iconUrl`、`versionId`、`scene`、`templateType`、`businessType`、`verType` 和 `shareType`。

## 返回值

返回 `{ data: object }`。`rawArkData=true` 时 `data` 为服务端 Ark 结构；否则为可发送的标准 Ark 数据。
