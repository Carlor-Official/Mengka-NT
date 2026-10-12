# can_send_record

检查当前在线 Bot 是否具备语音发送能力。

## 调用方式

```js
const result = await api.can_send_record(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{ yes: true }
```

当前返回值：Android 为 `true`，Linux 为 `false`。该值表示本地能力标志，不检测音频格式或执行上传。
