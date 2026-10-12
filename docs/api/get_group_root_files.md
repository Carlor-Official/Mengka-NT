# get_group_root_files

使用指定 Android 或 Linux QQ 在线会话获取群文件根目录。接口会自动处理 QQ 服务端分页，并分别返回文件与文件夹。

## 调用方式

```js
const result = await api.get_group_root_files({
  self_id: 1060221,
  group_id: 106500,
  file_count: 50,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `file_count` | number | 否 | 单页请求数量，默认 50，范围 1-100 |

## 返回值

返回值包含 `files` 和 `folders`。文件字段包括 `file_id`、`file_name`、`busid`、`file_size`、`upload_time`、`dead_time`、`modify_time`、`download_times`、`uploader`、`uploader_name` 与 `parent_folder_id`；文件夹字段包括 `folder_id`、`parent_folder_id`、`folder_name`、`creator`、`creator_name` 和 `total_file_count`。

该接口是只读操作，账号必须已加入目标群并具有查看群文件的权限。

`file_count` 指定初始分页大小。分页失败或目录读取结果不一致时返回错误。
