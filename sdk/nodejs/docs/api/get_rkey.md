# get_rkey

读取当前账号用于私聊、群聊和媒体资源访问的 RKey。接口只返回框架登录后由后台刷新任务维护的缓存，不会因为插件调用而额外发送 RKey 请求。

## 调用方式

```js
const keys = await api.get_rkey(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

返回数组；每项包含 `type`、`type_id`、`rkey`、`created_at`、`ttl` 和 `expired`。后台缓存尚未完成首次刷新或已经过期时会明确报错，调用方稍后重试即可。

RKey 属于敏感临时凭证，不应写入日志或长期保存。
