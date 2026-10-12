# delete_group_folder

删除指定群文件夹。

## 调用方式

```js
await api.delete_group_folder({
  self_id: 1060221,
  group_id: 106500,
  folder_id: '/3d7e7839-1512-4e77-bb69-aa66124c603b',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `folder_id` | string | 是 | 文件夹 ID；也兼容 `folder`，不能传根目录 `/` |

## 返回值

成功时返回 `ret_code: 0`。

::: danger 删除操作
QQ 服务端只允许群主或管理员删除文件夹。调用前应先通过目录查询确认 `folder_id`，不要使用名称猜测 ID；文件夹非空时是否允许删除由 QQ 服务端决定。
:::
