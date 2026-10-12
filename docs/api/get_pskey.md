# get_pskey

获取指定域名的 PsKey。

使用 `client_type` 选择目标账号协议。返回凭据仅适用于该账号及指定域名。

## 调用方式

```js
const result = await api.get_pskey(self_id, domain)
// Linux 账号：使用协议作用域明确选择。
const linuxResult = await api.forProtocol('linuxqq').get_pskey(self_id, 'qun.qq.com')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `domain` | string | 是 | 目标域名 |
| `client_type` | string | 否 | WS 请求字段；SDK 通过 `forProtocol('linuxqq')` 指定，多协议账号应始终明确协议 |

## 返回值

```js
{
  domain: 'DOMAIN',
  pskey: 'PSKEY',
}
```
