# get_account_management_context

一次读取插件账号管理页所需的框架快照，避免分别请求账号、协议、指纹和节点时得到不同时刻的数据。

## 调用方式

```js
const context = await api.get_account_management_context()
```

## 参数

无。

## 返回值

```js
{
  api_version: 1,
  accounts: [],
  protocols: [],
  device_profiles: [],
  nodes: []
}
```

`accounts` 使用框架账号列表的完整字段和样式数据；插件前端不应自行删减字段或重新推导协议、节点与运行状态。当前插件应要求 `api_version === 1`。

`device_profiles` 为只读诊断数据，不是可选设备库。账号新增时自动生成指纹，编辑页面不得将该列表作为选择器。
