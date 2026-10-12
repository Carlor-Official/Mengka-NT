# create_login_qr

为正在等待安全验证的 Bot 创建登录二维码。

## 调用方式

```js
const self_id = 123456789 // 正在登录的 Bot QQ 号
const result = await api.create_login_qr(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |

## 返回值

```js
{
  code: 0,
  message: '二维码生成成功',
  qr_url: 'https://accounts.qq.com/safe/scanresult?...',
  guarantee_token: 'GUARANTEE_TOKEN',
  expires_in: 180,
}
```

将 `qr_url` 渲染成二维码，并保留 `guarantee_token` 用于查询状态。二维码有效期单位为秒。

完整流程见[Bot 登录流程](https://mknt.net/reference/login-flow.html)。
