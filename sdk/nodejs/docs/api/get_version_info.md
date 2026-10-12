# get_version_info

获取萌卡 NT 框架版本、插件协议版本和当前账号协议。

## 调用方式

```js
const version = await api.get_version_info(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{
  app_name: 'Mengka-NT',
  protocol_version: 'v11',
  app_version: 'x.y.z',
  client_type: 'linux',
}
```

`app_version` 使用当前运行二进制的框架版本，不写死在 SDK 中；`client_type` 为当前账号的 `android` 或 `linux` 平台。
