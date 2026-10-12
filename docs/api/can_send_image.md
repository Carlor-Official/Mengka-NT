# can_send_image

检查当前在线 Bot 是否具备图片发送能力。

## 调用方式

```js
const result = await api.can_send_image(self_id)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |

## 返回值

```js
{ yes: true }
```

当前返回值：Android 为 `true`，Linux 为 `false`。

Linux 的能力标志未覆盖所有图片接口；具体支持范围见对应上传或发送接口。
