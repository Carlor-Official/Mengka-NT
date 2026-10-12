# delete_device_profile

删除未被任何账号使用的设备指纹。

## 调用方式

```js
const result = await api.delete_device_profile(profile_id)
// { deleted: true, id: profile_id }
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | number | 是 | 设备指纹 ID |

只要存在账号引用，框架就会拒绝删除。先通过 `get_device_profile_list` 查看 `accountCount` 与 `assignedAccounts`。

## 返回值

成功返回 `{ deleted: true, id: number }`。
