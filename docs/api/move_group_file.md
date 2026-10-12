# move_group_file

将指定群文件移动到另一目录。

## 调用方式

```js
await api.move_group_file(self_id, group_id, file_id, target_parent_directory)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |
| `file_id` | string | 是 | 群文件真实 ID |
| `target_parent_directory` | string | 是 | 目标目录 ID，根目录使用 `/` |
| `busid` | number | 否 | 文件业务 ID，省略时框架自动查询 |
| `current_parent_directory` | string | 否 | 当前目录 ID，省略时框架自动查询 |

## 返回值

成功返回 `{ ok: true }`。
