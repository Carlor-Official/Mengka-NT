# test_node_latency

测试节点代理地址的 TCP 连接延迟，并更新节点最近检测状态。

## 调用方式

```js
const result = await api.test_node_latency(node_id)
// { latency_ms: 42, node: { ... } }
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | number | 是 | 节点 ID |

仅对已启用代理的节点有效，连接超时为 8 秒。该数值表示代理端口可连接耗时，不等同于 QQ 业务请求延迟。

## 返回值

返回 `{ latency_ms: number, node: object }`，延迟单位为毫秒，`node` 为更新后的节点详情。
