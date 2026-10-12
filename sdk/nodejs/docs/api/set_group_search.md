# set_group_search

设置群聊的搜索开关。请求使用 群资料协议写入，并在写入后重新读取确认。

## 调用方式

```js
await api.set_group_search({
  self_id: 1060221,
  group_id: 123456789,
  no_finger_open: 1,
  no_code_finger_open: 0,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `no_finger_open` | number | 二选一 | 按群号搜索开关值 |
| `no_code_finger_open` | number | 二选一 | 按条件搜索开关值 |

两个搜索字段至少填写一个；未填写的字段保持不变。成功响应包含最终值和 `read_back_verified: true`。

## 返回值

成功返回搜索开关的最终值及 `read_back_verified: true`。
