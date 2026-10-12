# get_device_profile_list

获取可用于创建或更新账号的设备指纹列表。

## 调用方式

```js
const profiles = await api.get_device_profile_list()
```

## 参数

无。

## 返回值

返回完整设备指纹数组。调用账号 API 时使用所选记录的 `id` 作为 `device_profile_id`。

每项还包含：

| 字段 | 说明 |
| --- | --- |
| `accountCount` | 正在引用该指纹的账号数量 |
| `assignedAccounts` | 关联账号数组，包含 `self_id` 与 `platform` |

当 `accountCount > 0` 时，系统管理接口 `delete_device_profile` 会拒绝删除，调用方应在界面中显示占用账号而不是只提供失败提示。
