# get_device_profile_list

只读获取框架内的设备指纹记录及关联账号。指纹由框架按 QQ 和具体协议自动管理。

## 调用方式

```js
const profiles = await api.get_device_profile_list()
```

## 参数

无。

## 返回值

返回设备指纹数组。`id` 仅供展示与诊断，不得传给新增或编辑账号接口来指定设备。

每项还包含：

| 字段 | 说明 |
| --- | --- |
| `accountCount` | 正在引用该指纹的账号数量 |
| `assignedAccounts` | 关联账号数组，包含 `self_id` 与 `platform` |

独立创建、修改及删除指纹接口已移除；如需重新生成账号当前协议的指纹，请调用 [refresh_account_fingerprint](refresh_account_fingerprint.md)。
