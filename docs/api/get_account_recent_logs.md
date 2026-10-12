# get_account_recent_logs

获取指定 QQ 与协议最近的账号运行日志。

## 调用方式

```js
const result = await api.get_account_recent_logs(self_id, 'linux')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

## 返回值

```js
{
  self_id,
  platform: 'linux',
  logs: [
    { id: 321, text: '账号已下线', created_at: '2026-09-03 12:00:00' }
  ]
}
```

最多返回最近 200 条。日志用于故障定位，不应向普通用户展示内部敏感信息；同一 QQ 的 Android 与 Linux 日志分别查询。
