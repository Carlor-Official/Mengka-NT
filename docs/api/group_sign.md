# group_sign

执行群聊打卡。

## 调用方式

```js
const result = await api.group_sign(self_id, group_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `group_id` | number | 是 | 群聊 ID |

## 返回值

返回打卡文案、累计天数、群排名、详情地址与结构化响应字段。
