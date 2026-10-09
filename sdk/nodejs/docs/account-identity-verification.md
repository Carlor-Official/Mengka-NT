# 普通 QQ 身份验证续登

身份验证是两个步骤：先确认短信，再续接 QQ 登录。

```js
await api.confirm_account_identity_sms(self_id, mobile, area_code)
const result = await api.retry_account_identity_verify({
  self_id, client_type: 'android', login_type: 0, extra: {}
})
if (result.code === 0) {
  // 已完成 QQ 上线注册；结果同时保留 self_id、status 等 Bot 字段。
} else {
  // 按本轮 identity_url / slider_url / security_url / security_verify 展示新验证。
}
```

- `confirm_account_identity_sms` 成功只表示短信身份授权通过，不代表 QQ 已上线。
- `retry_account_identity_verify` 与 `retry_account_security_verify` 返回 `code`、`message`；只有上线注册完成后才返回 `code: 0` 和 Bot 信息。业务失败保留 `extra_info`；再次验证同时返回新验证资料。
- 新挑战或新登录会话不能复用旧短信状态。短信确认已经成功、续登暂时失败时，只续登，不重复确认短信。
- 身份短信确认后使用 `login_type: 0, extra: {}`；其他方式的参数来自该会话，不能混用 `verify_sign`。
- 正反向 SDK 的这组验证方法等待 45 秒，为框架最多 30 秒的处理保留返回时间。原生 IPC 通用调用也应预留返回时间。超时后先查询账号状态，再决定后续操作，不自动重放验证。
- 验证资料仅用于当前登录流程，避免记录完整验证 URL、手机号、签名或票据。
