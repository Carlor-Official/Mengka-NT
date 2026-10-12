# create_device_profile

使用框架与前端“一键生成”相同的规则创建随机设备指纹。

## 调用方式

```js
const profile = await api.create_device_profile({ name: '账号 106606 指纹' })
```

`name` 可省略；省略时框架自动生成名称。返回完整指纹记录，其 `id` 可直接用于 `add_account`。每个账号应使用独立指纹，避免多人复用。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 否 | 指纹名称；省略时自动生成 |

## 返回值

返回设备指纹记录，包含 `id` 和指纹配置；`id` 可用于账号的设备配置。
