# get_qq_farm_code

获取一个新的 QQ 经典农场登录 code。框架使用当前 Android QQ 会话，通过固定的农场协议完成签名与组包，并只返回格式校验通过的 32 位十六进制 code。

## 调用方式

```js
const result = await api.get_qq_farm_code(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Android Bot QQ 号 |

不支持传入 `cmd`、`data` 或其他原始协议参数。

## 返回值

```js
{
  code: '0123456789abcdef0123456789abcdef',
}
```

`code` 是农场登录凭据，每次调用都可能重新签发。插件应按敏感信息处理，仅在需要登录农场时使用，不要写入日志、公开接口或持久化明文。

## 错误说明

- 当前账号不是在线 Android QQ。
- 当前协议版本信息不完整。
- 取码请求超时或签名失败。
- 服务端没有返回 32 位十六进制 code。
