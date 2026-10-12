# get_skey

获取指定协议下当前 Bot 的 skey。支持 Android 9.1.70 和 Linux 3.2.32。

Android 读取当前登录票据中的 skey；Linux 使用当前账号的 clientkey 获取并校验网页 Cookie，返回其中的 skey，不覆盖 Android 票据缓存。

## 调用方式

```js
const androidResult = await api.get_skey(self_id, 'android')
const linuxResult = await api.get_skey(self_id, 'linux')
// 省略第二参数时仍选择 Android；也可使用 api.forProtocol('linux')。
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 对应协议下已在线的 Bot QQ 号 |
| `client_type` | string | 否 | 原始 action 请求的协议选择字段：`android` 或 `linuxqq`，省略时为 Android；SDK 将第二个协议参数转换成此字段 |

同一 QQ 的两个协议账号分别取值，不会回退到另一协议的账号。SDK 协议参数可传 `android` 或 `linux`。

## 返回值

```js
{ skey: 'CURRENT_PROTOCOL_SKEY' }
```

获取失败时返回错误。
