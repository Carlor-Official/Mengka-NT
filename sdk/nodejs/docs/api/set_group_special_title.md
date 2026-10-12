# set_group_special_title

设置或清除群聊成员的专属头衔。框架解析目标成员的原生 UID，使用当前账号的登录会话执行；不会修改成员昵称或群名片。

## 调用方式

```js
const result = await api.set_group_special_title(
  self_id,
  group_id,
  user_id,
  title,
)
```

`success: true` 表示服务端确认设置请求成功。空响应、畸形响应、命令/服务号不匹配及服务端拒绝均作为错误返回。设置成功不等于事件已投递；框架会回读实际成员头衔，确认变化后补发标记 `source: 'server_readback'` 的 `group_title_changed`，并与原生推送去重。设置与恢复已通过双账号、Android/Linux、跨节点及三 WS 验证；不承诺其他客户端的任意通知模板或断线期间事件必达。详见[服务器回读确认](https://mknt.net/events/notice.html#服务器回读确认)。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |
| `user_id` | number | 是 | 目标成员 QQ 号 |
| `title` | string | 是 | 专属头衔，传空字符串清除头衔 |

## 返回值

```js
{
  success: true,
}
```
