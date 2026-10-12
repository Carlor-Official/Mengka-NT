# create_node

创建直连或代理节点。

## 调用方式

```js
const node = await api.create_node({
  name: '华东节点',
  enabled: true,
  proxy_enabled: true,
  proxy_type: 'socks5',
  host: '127.0.0.1',
  port: 1080,
  proxy_username: 'user',
  proxy_password: 'secret',
  remark: '业务节点'
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 节点名称 |
| `enabled` | boolean | 否 | 是否启用 |
| `proxy_enabled` | boolean | 否 | 是否使用代理 |
| `proxy_type` | string | 否 | http 或 socks5 |
| `host` | string | 启用代理时必填 | 代理主机 |
| `port` | number | 启用代理时必填 | 代理端口 |
| `proxy_username` | string | 否 | 代理用户名 |
| `proxy_password` | string | 否 | 代理密码 |
| `remark` | string | 否 | 备注 |

`name` 必填。启用代理时，`proxy_type` 只支持 `http` 或 `socks5`，并必须提供有效的 `host` 与 1–65535 端口。

关闭代理（`proxy_enabled: false`）时无需提交代理字段：`proxy_type` 省略或为空时默认保存为 `http`，`port` 省略或为 `0` 时默认保存为 `8080`。明确提供的有效类型、端口、地址和认证信息会保留；这些字段只有启用代理后才用于连接。代理类型不支持其他值，端口必须在 1–65535 范围内（直连的 `0` 按上述默认值处理）。

```js
const directNode = await api.create_node({
  name: '直连节点',
  enabled: true,
  proxy_enabled: false
})
// directNode.proxy_type === 'http'; directNode.port === 8080
```

## 返回值

成功返回节点详情，但不会回显代理密码。
