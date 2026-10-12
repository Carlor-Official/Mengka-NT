# send_group_notice

在指定群聊发布公告。

## 调用方式

```js
const result = await api._send_group_notice({
  self_id: 123456789,
  group_id: 987654321,
  content: '公告内容',
  image: 'base64://...'
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 当前在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群号 |
| `content` | string | 否 | 公告正文；与 `image` 不能同时为空 |
| `image` | string | 否 | 可选图片，支持框架目录内文件、HTTP(S) URL、`base64://` 和 `file://` |

## 返回值

```json
{
  "notice_id": "公告 ID"
}
```

账号需要拥有发布群公告的权限。图片会先上传到 QQ 群公告图片接口，再将返回的图片 ID 和尺寸随公告正文发布。可用 `_get_group_notice` 回读，并用 `_del_group_notice` 删除。
