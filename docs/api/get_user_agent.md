# get_user_agent

获取当前 Bot 协议和设备指纹对应的 QQ Android WebView User-Agent。

使用 `api.forProtocol('android')` 或 `api.forProtocol('linuxqq')` 选择账号协议。

## 调用方式

```js
const result = await api.get_user_agent(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | Bot QQ 号，登录验证过程中也可调用 |

## 返回值

```js
{
  user_agent: 'Mozilla/5.0 ...'
}
```

返回值根据 Bot 当前绑定的协议版本和设备指纹生成。
