# get_login_info

获取当前在线 Bot 的登录号、昵称和客户端协议。

## 调用方式

```js
const info = await api.get_login_info(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{
  user_id: 123456789,
  nickname: '示例账号',
  client_type: 'android',
}
```

`client_type` 为 `android` 或 `linux`。
