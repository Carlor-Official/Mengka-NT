# submit_slider

提交滑块验证结果。

## 调用方式

```js
const self_id = 123456789 // 正在登录的 Bot QQ 号
const result = await api.submit_slider(self_id, ticket, randstr)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 正在登录的 Bot QQ 号 |
| `ticket` | string | 是 | 滑块完成后返回的 ticket |
| `randstr` | string | 是 | 滑块完成后返回的 randstr |

## 返回值

返回结构与 [`login_account`](login_account.md) 一致。若返回另一种验证状态，继续按新的 `code` 处理。
