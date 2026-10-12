# check_url_safely

使用当前在线 Android QQ 登录态，请求 QQ 服务器判断网址安全等级。该接口会返回真实的服务端判定，不使用固定的“安全”占位值。

## 调用方式

```json
{
  "action": "check_url_safely",
  "params": {
    "self_id": 1060221,
    "url": "https://www.qq.com/"
  }
}
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行检测的在线 Bot QQ 号 |
| `url` | string | 是 | 完整的 `http://` 或 `https://` 网址，最长 4096 字符 |

## 返回值

```js
{
  level: 1,
}
```

`level` 含义：

- `1`：安全。
- `2`：未知，QQ 服务器没有给出明确安全结果。
- `3`：危险。
