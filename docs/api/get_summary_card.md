# 获取 QQ 名片与头像

- action：`get_summary_card`，沿用现有服务 Token 认证与账号路由。
- `self_id` 是框架内的账号，`target_uin` 是目标 QQ，省略或为 0 时查询自己。
- 新增字段与选项从 v2.1.12 起提供；需同时升级框架与 SDK。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 框架内账号 QQ |
| `client_type` | string | 否 | `android` 或 `linuxqq`；建议通过 SDK `forProtocol` 明确选择 |
| `target_uin` | number | 否 | 目标 QQ，省略或为 0 时查询自己 |
| `avatar_only` | boolean | 否 | 默认 false；true 时只生成目标头像地址，不发送名片协议请求 |

## 头像克隆用法

```js
const target = await api.forProtocol('android').get_summary_card(
  selfId, targetQQ, { avatar_only: true }
)
console.log(target.uin, target.avatar_url)
```

仅取头像返回 `{ uin, avatar_url }`。`avatar_url` 依据目标 QQ 生成，指向 QQ 公开头像服务，格式为 `https://q1.qlogo.cn/g?b=qq&nk=目标QQ&s=640`；不是名片响应中的原始字段。框架不在这里下载图片，也不保证 CDN 图片实时刷新或目标账号一定存在。插件取得图片后按设置头像接口要求上传。

普通查询保持 `api.get_summary_card(selfId, targetQQ)` 的调用方式，原有返回字段不删除，并增加 `avatar_url`。完整查询仍依赖当前登录协议及 QQ 服务端，部分名片字段可能缺省；Linux 实测返回的部分字段为空，不能将其视为完整 Android 资料。

普通查询使用 15 秒请求上下文；网络、SSO 和解析失败继续报错，不返回虚构名片，也不自动降级为仅头像结果。不需要昵称、等级等资料时应显式使用 `avatar_only: true`。
