# create_group_file_folder

在群文件根目录创建文件夹。

## 调用方式

```js
await api.create_group_file_folder({
  self_id: 1060221,
  group_id: 106500,
  folder_name: 'API 测试资料',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `folder_name` | string | 是 | 文件夹名称；也兼容 `name`，UTF-8 不超过 90 字节 |

## 返回值

成功时返回 `ret_code: 0` 以及本次提交的群号和文件夹名称。

::: warning 群权限
QQ 服务端只允许群主或管理员创建群文件夹。普通成员调用会返回真实权限错误，框架不会使用其他在线 QQ 代替执行。
:::
