# set_group_add_option

设置群聊的入群验证方式。请求使用 群资料协议写入，并在写入后重新读取群资料确认生效。

## 调用方式

```js
await api.set_group_add_option({
  self_id: 1060221,
  group_id: 123456789,
  add_type: 4,
  group_question: "请说明来意",
  group_answer: "",
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的 QQ 账号 |
| `group_id` | number | 是 | 群号 |
| `add_type` | number | 否 | QQ 群资料中的入群验证类型，默认 `0` |
| `group_question` | string | 否 | 入群问题 |
| `group_answer` | string | 否 | 预设答案 |

## 返回值

成功时返回群号、最终验证类型、问题、答案和 `read_back_verified: true`。只有群主或有相应权限的管理员可以修改。
