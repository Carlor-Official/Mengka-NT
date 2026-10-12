# get_doubt_friends_add_request

获取被 QQ 标记为可疑的待处理好友申请。

这不是所有普通好友申请的列表。返回空数组只表示本次没有查到可疑申请，不能据此判断是否收到普通申请。普通申请应监听 `friend_request_received`，保留事件账号、协议及 `flag` 后再由用户确认处理。

## 调用方式

```js
const requests = await api.get_doubt_friends_add_request({
  self_id: 106606,
  count: 50,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `count` | number | 否 | 返回数量，默认 50，最大 100 |

## 返回值

每项包含 `flag`、`uin`、`nick`、`source`、`reason` 和 `time`。后续处理必须原样使用 `flag`。

该接口只读取待处理申请，不会同意、拒绝或修改好友关系。当前仅支持 Android QQ。

Linux 不支持可疑好友申请列表。普通好友申请通过 `friend_request_received` 事件接收。
