# delete_node

删除已停用且未被账号引用的节点。

## 调用方式

```js
const result = await api.delete_node(node_id)
// { deleted: true, id: node_id }
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | number | 是 | 节点 ID |

启用中的节点或仍有关联账号的节点会被框架拒绝删除。调用前可结合 `get_node_list` 显示占用数量。

## 返回值

成功返回 `{ deleted: true, id: number }`。
