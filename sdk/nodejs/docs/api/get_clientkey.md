# get_clientkey

获取指定协议下当前 Bot 的 clientkey。支持 Android 9.2.70 和 Linux 3.2.32。

读取当前账号的 clientkey；为空或进入到期前刷新窗口时，使用该账号对应协议请求刷新并保存到期时间。返回十六进制字符串。

## 调用方式

```js
const androidResult = await api.get_clientkey(self_id, 'android')
const linuxResult = await api.get_clientkey(self_id, 'linux')
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
{ clientkey: 'HEX_ENCODED_CLIENTKEY' }
```

获取失败时抛出错误。
