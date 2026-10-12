# get_essence_msg_list

获取指定群聊的精华消息列表。框架使用当前账号的登录态读取 QQ 群精华服务，自动读取分页。插件不需要提供 Cookie、SKey 或 PsKey，框架也不会把这些凭据返回给插件。

## 调用方式

```js
const messages = await api.get_essence_msg_list({
  self_id: 1060221,
  client_type: 'android',
  group_id: 123456789,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ 账号 |
| `client_type` | string | 是 | `android` 或 `linuxqq` |
| `group_id` | number | 是 | 群号 |

## 返回值

成功时返回数组，每项包含 `msg_seq`、`msg_random`、`sender_id`、`sender_nick`、`operator_id`、`operator_nick`、`message_id`、`operator_time` 和 `content`。

`content` 将原生文本、QQ 表情、图片、文件与分享内容转换为消息段。发送者和操作者 QQ 使用服务器返回值；`message_id` 是执行查询账号自己的公共消息引用，不可跨账号复用。

登录态失效、超时、消息标识无效或分页异常时返回错误。无精华消息时返回空数组；单次读取上限为 100 页。

该接口只读取精华消息，不会设置或删除精华。支持 Android 和 Linux QQ。
