# set_self_longnick

设置或清空当前账号的个性签名。

## 调用方式

```js
const result = await api.set_self_longnick(self_id, longNick)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 否 | 在线 Bot QQ 号；当前连接只管理一个 Bot 时可省略 |
| `longNick` | string | 是 | 新个性签名；显式传入空字符串时清空签名 |

兼容参数名 `long_nick`，但新插件建议统一使用 `longNick`。

## 返回值

```js
{
  success: true,
  summary_card: {
    sign: '新的个性签名'
  }
}
```

保存成功后框架会读取一次最新 QQ 名片。若 QQ 名片服务短暂延迟，接口仍返回 `success: true`，并在 `readback_warning` 中说明读取失败原因；可稍后调用 `get_summary_card` 再确认。

## 示例

```js
// 设置签名
await api.set_self_longnick(123456789, '今天也要开心')

// 清空签名
await api.set_self_longnick(123456789, '')
```

::: warning 内容会经过 QQ 审核
审核未通过时接口直接返回失败，不会继续发送保存请求。框架不会使用原始文本绕过审核，也不会把审核前的 RichStatus 数据直接写入 QQ。
:::
