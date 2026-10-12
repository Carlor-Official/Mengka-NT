# register_captcha_proxy

注册滑块验证反向代理：由后端抓取并改写 TCaptcha.js，把脚本中的验证域名指向插件自身的反代地址。

## 调用方式

```js
const result = await api.register_captcha_proxy(
  self_id,
  url,
  proxy_base,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待滑块验证的 Bot QQ 号 |
| `url` | string | 否 | 滑块验证 URL；缺省时使用后端当前登录流程中的滑块地址 |
| `proxy_base` | string | 否 | 滑块脚本中验证域名的反代地址前缀；缺省时使用默认反代前缀 |

## 返回值

```js
{
  uin: 123456789,
  script: '改写后的 TCaptcha.js 内容',
}
```

`script` 为改写后的验证脚本，其验证域名已指向 `proxy_base` 对应的反代入口，前端可直接加载使用。

## 示例

```js
const { uin, script } = await api.register_captcha_proxy(
  123456789,
  'https://ssl.qq.com/xxxx/slider?uin=123456789&sid=xxx',
  'https://plugin-host.example.com/captcha',
)
```

需要账号处于登录中并已触发滑块验证；否则会返回错误。
