# get_model_show

获取当前 QQ 账号与设备型号可用的在线机型显示名称。接口由萌卡 NT 后端直接使用当前账号的 Android 9.2.70 登录态、设备指纹和 QQ 会员机型服务完成。

## 调用方式

```js
const result = await api.get_model_show(1060221, 'Xiaomi 14 Pro')
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 要查询的在线 Bot QQ 号 |
| `model` | string | 否 | 手机型号；未填写时使用账号绑定指纹中的型号 |

## 返回值

成功时返回：

```json
{
  "variants": [
    {
      "model_show": "Xiaomi 14 Pro",
      "need_pay": false
    }
  ]
}
```

`need_pay` 表示该显示名称是否要求 QQ 会员权益。查询结果来自 QQ 服务端。
