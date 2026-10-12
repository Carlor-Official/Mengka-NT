# set_qq_avatar

设置当前 QQ Bot 的头像。后端不发送媒体 OIDB 请求，图片会直接通过 Highway HTTP 上传。

## 调用方式

```js
const result = await api.set_qq_avatar(self_id, file_path)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `file_path` | string | 是 | 后端本地路径、`file://` 或后端可访问的 HTTP(S) 地址 |

图片大小上限为 5MB。建议使用 PNG 或 JPEG 图片。

::: warning 路径属于后端主机
插件和萌卡NT不在同一台主机时，插件本机路径对后端不可见。此时应提供后端可访问的 HTTP(S) 地址。
:::

## 返回值

```js
{ success: true }
```

QQ头像 CDN 可能存在短暂缓存，上传成功后旧头像仍可能显示一段时间。

## 示例

```js
await api.set_qq_avatar(
  123456789,
  'https://example.com/avatar.png',
)
```
