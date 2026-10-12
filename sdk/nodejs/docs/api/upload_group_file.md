# upload_group_file

将本地文件或可下载的 HTTP(S) 文件真实上传到群文件。上传完成后，文件会直接出现在 QQ 群文件列表中。

## 调用方式

```js
const result = await api.upload_group_file({
  self_id: 1060221,
  group_id: 106500,
  file: 'D:/Mengka-NT/files/report.txt',
  name: 'report.txt',
  folder: '/',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `file` | string | 是 | 本地文件路径、`file://` 地址或 HTTP(S) 下载地址；也兼容 `file_path` |
| `name` | string | 是 | 上传后显示的文件名；也兼容 `file_name` |
| `folder` | string | 否 | 目标文件夹 ID，默认 `/`；也兼容 `folder_id`、`parent_folder_id` |
| `upload_file` | boolean | 否 | 是否执行真实上传，默认 `true`；传 `false` 会直接返回错误 |

## 返回值

成功时返回 `file_id`、`file_name`、`busid`、`file_size` 和 `parent_folder_id`。这些字段可直接用于后续查询或删除。

::: warning 账号与群权限
框架始终使用 `self_id` 指定的 QQ 执行上传，不会切换到其他在线账号。群文件容量、群身份和 QQ 服务端风控仍以该账号的实际结果为准。
:::
