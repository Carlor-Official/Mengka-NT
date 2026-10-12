# get_group_files_by_folder

获取群文件夹中的文件与子文件夹，自动读取后续分页。

## 调用方式

```js
const result = await api.get_group_files_by_folder({
  self_id: 1060221,
  group_id: 106500,
  folder_id: '/3d7e7839-1512-4e77-bb69-aa66124c603b',
  file_count: 50,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `folder_id` | string | 是 | 文件夹 ID；也兼容 `folder` |
| `file_count` | number | 否 | 单页请求数量，默认 50，范围 1-100 |

## 返回值

返回结构与 [`get_group_root_files`](get_group_root_files.md) 相同。接口会自动读取后续分页，不需要调用方维护分页游标。

## 分页与完整性

自动分页读取全部内容；目录变化、重复记录或无效游标导致结果不完整时返回错误。

读取超时为 45 秒，总条目上限为 10000。
