# cache_login

使用本地缓存登录指定协议账号。框架会在该账号自己的登录节点上执行。

## 调用方式

```js
const self_id = 123456789 // 要登录的 Bot QQ 号
const result = await api.cache_login(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已创建且离线的 Bot QQ 号 |

## 返回值

成功：

```js
{ code: 0, message: '登录成功' }
```

失败：

```js
{
  code: 1,
  message: '错误信息',
  cache_invalid: true,
}
```

`cache_invalid` 为 `true` 时改用 [`login_account`](login_account.md)。
