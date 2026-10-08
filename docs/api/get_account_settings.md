# 读取框架设置

调用既有 `get_account_settings`，不传账号参数，返回框架实例级运行设置。通过已认证的插件管理连接调用，不新增权限或action别名。

```javascript
const settings = await api.get_account_settings()
```

返回字段：`cacheLogin`、`autoLogin`、`privacyMode`、`silentMode`、`autoDeleteOffline`、`autoDeleteOfflineMinutes`，下一版本增加 `autoUpdate` 布尔字段，旧配置默认 `false`。具体自动更新行为见[框架自动更新](../automatic-update.md)。SDK返回 `action_result.data`。
