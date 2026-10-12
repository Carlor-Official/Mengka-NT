# create_group

使用当前在线的安卓协议 Bot 创建普通 QQ 群。底层按 QQ 9.2.70 的创建群链路执行：先创建群聊，再按需邀请成员。

## 调用方式

```js
const result = await api.create_group({
  self_id: 1060221,
  group_name: '萌卡 NT API 验证群',
  description: '用于验证安卓协议群聊接口',
  user_ids: [106606],
  invite_message: 'API 联调邀请',
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行创建操作的在线 Bot QQ 号 |
| `group_name` | string | 是 | 群名称；也兼容 `name` |
| `description` | string | 否 | 群简介；也兼容 `introduction` |
| `user_id` | number | 否 | 创建成功后邀请的单个 QQ 号 |
| `user_ids` | number[] | 否 | 创建成功后邀请的 QQ 号列表，一次最多 20 个 |
| `invite_message` | string | 否 | 邀请附言；也兼容 `message`、`reason` |
| `group_option` | number | 否 | 创建时的入群验证选项；也兼容 `verify_type` |
| `group_class_ext` | number | 否 | 群分类扩展值；也兼容 `classify` |

## 返回值

没有填写邀请成员时：

```js
{
  created: true,
  group_id: 987654321,
  group_uin: 1234567890,
  owner_id: 1060221,
  group_size: 1,
  group_name: '萌卡 NT API 验证群',
  invite_attempted: false,
  invite_success: false,
}
```

填写邀请成员时，返回值会额外包含 `invite_user_ids` 和 `invite`。创建群聊和邀请成员是两个独立阶段；如果群已创建但邀请失败，接口仍返回 `created: true`、新群的 `group_id` 以及 `invite_error`，调用方不应自动重试整个创建请求，以免生成重复群聊。

::: warning 权限与风控
创建群聊、邀请成员是否成功由 QQ 服务端根据账号权限、频率和安全状态决定。接口不会绕过安全验证、邀请确认或账号风控。
:::
