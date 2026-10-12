# get_rkey_server

以服务信息结构返回框架后台缓存中的私聊和群聊媒体 RKey，不会在 API 调用阶段新增 QQ 协议请求。

## 调用方式

```js
const server = await api.get_rkey_server(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{
  name: 'Mengka NT',
  private_rkey: '...',
  group_rkey: '...',
  expired_time: 1770000000,
}
```

`expired_time` 为两类 RKey 中较早的过期时间。
