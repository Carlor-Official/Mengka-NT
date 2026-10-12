# set_group_portrait

设置指定群聊的头像。萌卡NT会按 QQ Android 的 Highway `command_id=3000` 上传链路，先获取当前账号的 Highway 会话，再将公开群号转换为 QQ 内部群 UIN 后提交图片。

## 调用方式

```js
const result = await api.set_group_portrait(self_id, group_id, file)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number / string | 是 | 公开群号 |
| `file` | string | 是 | 本地路径、`file://`、HTTP(S)、`base64://` 或 Base64 data URL |

图片必须是有效的 GIF、JPEG 或 PNG，大小不超过 10 MiB。调用账号必须是群主或具备修改群头像的管理员权限。

::: warning 路径属于后端主机
插件和萌卡NT不在同一台主机时，插件本机路径对后端不可见。此时应使用 HTTP(S)、`base64://` 或 data URL。
:::

## 返回值

```js
{
  result: 0,
  errMsg: '',
  new_seq: 24,
}
```

`result=0` 表示上传被接受。权限不足时返回 `No Perm`；头像 CDN 可能延迟更新。

## 示例

```js
await api.set_group_portrait(
  1060221,
  106500,
  'https://example.com/group-avatar.png',
)
```
