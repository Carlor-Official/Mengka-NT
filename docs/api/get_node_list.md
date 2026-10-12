# get_node_list

获取框架全部节点及账号统计。

## 调用方式

```js
const nodes = await api.get_node_list()
```

## 参数

无。

## 返回值

| 字段 | 说明 |
| --- | --- |
| `id`, `name`, `enabled` | 节点标识、名称和启用状态 |
| `proxy_enabled`, `proxy_type` | 是否使用代理及 `http`/`socks5` 类型 |
| `host`, `port`, `proxy_username` | 代理连接信息 |
| `remark`, `last_check` | 备注与最近检测结果 |
| `account_count`, `online_account_count` | 账号总数与在线数 |

返回值永不包含 `proxy_password`。需要编辑时，密码栏应默认留空并以“留空表示保留”提示用户。
