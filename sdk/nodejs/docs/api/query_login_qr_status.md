# query_login_qr_status

查询 Bot 登录二维码的扫码状态。扫码确认后，服务端会自动继续 NTLogin。

## 调用方式

```js
const self_id = 123456789
const result = await api.query_login_qr_status(self_id, guarantee_token)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在等待安全验证的 Bot QQ 号 |
| `guarantee_token` | string | 是 | `create_login_qr` 返回的轮询 token |

## 返回值

未扫码：

```js
{ code: 0, message: '等待扫码', status: 'waiting', status_code: 0 }
```

已扫码、等待手机确认：

```js
{ code: 0, message: '扫码成功，等待确认', status: 'scanned', status_code: 3 }
```

已失效：

```js
{ code: 0, message: '二维码已失效', status: 'expired', status_code: 2 }
```

已确认时，`status` 为 `confirmed`，并返回与 [`login_account`](login_account.md) 相同的登录结果：

```js
{ code: 0, message: '登录成功', status: 'confirmed', status_code: 1 }
```

收到 `confirmed` 或 `expired` 后应停止轮询。
