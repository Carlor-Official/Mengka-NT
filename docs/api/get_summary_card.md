# get_summary_card

获取指定 QQ 的名片资料。

## 调用方式

```js
const card = await api.forProtocol('android').get_summary_card(selfId, targetQQ)
// 仅获取头像
const target = await api.forProtocol('android').get_summary_card(
  selfId, targetQQ, { avatar_only: true }
)
console.log(target.uin, target.avatar_url)
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 框架内账号 QQ |
| `client_type` | string | 否 | `android` 或 `linuxqq`；建议通过 SDK `forProtocol` 明确选择 |
| `target_uin` | number | 否 | 目标 QQ，省略或为 0 时查询自己 |
| `avatar_only` | boolean | 否 | 默认 false；true 时只生成目标头像地址，不发送名片协议请求 |

## 返回值

返回名片资料对象。`avatar_only=true` 时仅返回 `uin` 和 `avatar_url`。

| 常用字段 | 类型 | 说明 |
| --- | --- | --- |
| `uin` | number | 目标 QQ |
| `avatar_url` | string | 头像 URL |
| `nickname` | string | 昵称 |
| `remark` | string | 好友备注 |
| `level` | number | QQ 等级 |
| `sex` | number | 性别代码 |
| `age` | number | 年龄 |
| `country` / `province` / `city` | string | 地区资料 |
| `sign` | string | 个性签名 |
| `likes` / `voteCount` | number | 名片点赞相关数值 |
| `vipInfo` | object | 会员资料，可选 |

网络、协议或解析失败时抛出错误；查询超时为 15 秒。
