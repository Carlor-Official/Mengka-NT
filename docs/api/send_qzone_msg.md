# send_qzone_msg

发布可带图片、可见范围和指定好友范围的空间动态。

## 调用方式

```js
const result = await api.send_qzone_msg(
  self_id,
  '动态正文',
  ['https://example.com/image.jpg'],
  1,
  [],
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `content` | string | 否 | 动态文字，与图片至少填写一项 |
| `images` | string[] | 否 | 图片 URL 或框架可读取的文件来源 |
| `ugc_right` | number | 否 | 空间可见范围，默认 1 |
| `target_uins` | number[] | 否 | 指定可见好友列表 |

## 返回值

成功返回 `{ tid }`，可用于后续删除。
