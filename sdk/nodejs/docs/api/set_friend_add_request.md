# set_friend_add_request

处理好友申请。框架按所选账号协议回读当前申请列表，匹配真实且待处理的 `flag`：Android 使用对应好友系统消息，Linux 使用原生申请查询与处理协议。不会借用另一个 Android 登录会话处理 Linux 请求。

## 调用方式

```js
await api.call('set_friend_add_request', {
  self_id: event.self_id,
  client_type: event.client_type,
  flag: event.flag,
  approve: true,
  remark: '新朋友',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行操作的 Bot QQ 号 |
| `client_type` | string | 是 | 原事件的 `android` 或 `linuxqq`，不能替换为另一协议 |
| `flag` | string | 是 | 好友申请事件中的不透明请求标识，必须原样传入 |
| `approve` | boolean / string | 否 | 是否同意，默认 `true`；字符串 `"false"` 表示拒绝 |
| `remark` | string | 否 | 同意好友申请时设置的好友备注 |

## 返回值

成功时返回空数据；申请已处理、`flag` 过期或不存在时返回明确错误。

Linux 的备注设置是同意后的独立步骤；若同意成功但备注失败，错误会明确说明申请已处理，不能再次同意。实际好友关系由列表回读和原生 `friend_added` 分别确认，不因处理 API 成功直接生成事件。

拒绝时传 `approve: false`。拒绝不会建立好友关系或产生 `friend_added`；已拒绝的旧 `flag` 不能再次处理。对方重新发起申请时，以新事件中的 `flag` 为准，不复用旧标识。

::: warning
不要自行生成或解析 `flag`。框架会在每次处理前重新查询 QQ 当前申请列表，避免使用已经失效的请求字段。
:::
