# set_diy_online_status

设置当前在线 Bot 的自定义状态图标和文字。底层使用 QQ Android 的真实自定义状态请求。

## 调用方式

```js
const message = await api.set_diy_online_status(
  self_id,
  face_id,
  face_type,
  wording,
)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `face_id` | number \| string | 是 | QQ 自定义状态图标 ID，必须大于 `0` |
| `face_type` | number \| string | 否 | 图标类型，默认 `1` |
| `wording` | string | 否 | 状态文字，默认一个空格 |

数值参数同时接受 JSON number 和十进制字符串。

## 返回值

返回 QQ 服务端给出的状态设置结果文字，例如：

```text
set status success
```

## 示例

```js
await api.set_diy_online_status(
  123456789,
  1,
  1,
  'API 验证',
)
```

需要恢复普通状态时，调用：

```js
await api.set_online_status(123456789, 10, 0, 0)
```
