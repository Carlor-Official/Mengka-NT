# rename_group_file

重命名指定群文件。

## 调用方式

```js
await api.rename_group_file(self_id, group_id, file_id, '新文件名.zip')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `file_id` | string | 是 | 群文件真实 ID |
| `new_name` | string | 是 | 新文件名 |
| `busid` | number | 否 | 文件业务 ID，省略时框架自动查询 |
| `current_parent_directory` | string | 否 | 当前目录 ID，省略时框架自动查询 |

## 返回值

成功返回 `{ ok: true }`。
