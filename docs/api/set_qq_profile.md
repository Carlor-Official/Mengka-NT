# set_qq_profile

设置当前 QQ Bot 的昵称、性别和个性签名。昵称与性别使用 QQ Android 的资料编辑协议；个性签名使用内容审核与富签名保存链路，并支持重复提交同一个值。

## 调用方式

```js
const result = await api.set_qq_profile(self_id, nickname, personal_note, sex)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 否 | 在线 Bot QQ 号；当前连接只管理一个 Bot 时可省略 |
| `nickname` | string | 是 | 新 QQ 昵称，不能为空 |
| `personal_note` | string | 否 | 新个性签名；显式传入空字符串时清空签名 |
| `sex` | number \| string | 否 | `0` 未知、`1` 男、`2` 女；省略时不修改 |

## 返回值

```js
{
  success: true,
  summary_card: {
    nickname: '新的昵称',
    sign: '新的个性签名'
  }
}
```

框架在写入后重新读取 QQ 名片。QQ 当前把个性签名放在 `richSign` 中时，框架会自动解析并同步到标准 `sign` 字段。重复提交相同签名会直接返回成功，不会把 QQ 审核服务的重复内容回执误报为失败。

## 示例

```js
await api.set_qq_profile(123456789, '萌卡机器人', '今天也要开心', 1)
```

::: warning 资料修改会真实同步到 QQ
昵称、性别和个性签名都是账号级资料。调用前应明确提示管理员，并避免在定时任务中反复修改。
:::
