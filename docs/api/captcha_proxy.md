# captcha_proxy

反向代理滑块页面发往腾讯验证服务的请求，由后端转发到 `t.captcha.qq.com`，并自动使用节点代理与登录会话 cookie。

## 调用方式

```js
const result = await api.captcha_proxy(
  self_id,
  url,
  method,
  headers,
  body,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `url` | string | 是 | 目标请求地址（`t.captcha.qq.com` 下的路径） |
| `method` | string | 否 | HTTP 方法，默认 `GET` |
| `headers` | object | 否 | 需要透传的请求头，键值均为字符串 |
| `body` | string | 否 | 请求体，默认空 |

## 返回值

```js
{
  status: 200,
  headers: { 'content-type': 'application/json' },
  result: 'BASE64_ENCODED_BODY',
}
```

`result` 为响应体的 base64 编码；`headers` 仅包含响应头的首个取值。

## 示例

```js
const resp = await api.captcha_proxy(
  123456789,
  'https://t.captcha.qq.com/cap_union_new_verify',
  'GET',
  { Referer: 'https://example.com/' },
)
const body = Buffer.from(resp.result, 'base64').toString('utf-8')
```
