# delete_group_file

删除指定群文件。

## 调用方式

```js
await api.delete_group_file({
  self_id: 1060221,
  group_id: 106500,
  file_id: '/e2ca26cc-d974-4968-9b71-eec65c9e8590',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `file_id` | string | 是 | 群文件 ID；也兼容 `id` |
| `busid` | number | 否 | 文件业务 ID；也兼容 `bus_id`，未填写时框架会自动查询 |
| `parent_folder_id` | string | 否 | 文件所在文件夹 ID；也兼容 `folder_id`、`folder`，未填写时框架会自动查询 |

## 返回值

成功时返回 `ret_code: 0`。仅提供 `file_id` 即可使用；框架会递归查询文件列表并补齐删除所需的业务 ID 和父文件夹。

::: warning 删除权限
该操作会真实删除群文件。框架始终使用 `self_id` 指定的 QQ 执行，权限不足或文件不存在时会返回 QQ 服务端的真实错误。
:::
