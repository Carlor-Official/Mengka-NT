# create_account_recovery_qr

创建一个只用于证明 QQ 归属的临时二维码。该链路使用临时 Linux 设备身份，不读写账号的持久设备指纹。

## 调用方式

```js
const recovery = await api.create_account_recovery_qr()
```

## 参数

无。

## 返回值

```js
{
  recovery_token: 'temporary-token',
  url: 'https://example.qq.com/qr',
  state: 'waiting_for_scan',
  expires_at: '2026-09-04T08:00:00Z'
}
```

前端应将 `url` 渲染为二维码，并使用 `recovery_token` 调用 `query_account_recovery_qr_status`。二维码只验证 QQ 归属，不执行登录、不修改密码、不生成或保存登录票据。
