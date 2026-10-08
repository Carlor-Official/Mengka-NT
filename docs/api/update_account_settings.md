# 更新框架设置

调用既有 `update_account_settings`，仅提交需修改的字段，返回保存后的完整设置。通过已认证的插件管理连接调用。

```javascript
await api.update_account_settings({ autoUpdate: true })
await api.update_account_settings({ autoUpdate: false })
```

下一版本增加实例级 `autoUpdate: boolean`，默认关闭；省略保留原值，非布尔值拒绝。开启后后台每10分钟检查最新正式版并按现有校验流程安装，更新会短暂重启框架。它不会改变缓存登录和自动登录开关；详情及失败恢复见[框架自动更新](../automatic-update.md)。

原有字段仍有效：`cacheLogin`、`autoLogin`、`privacyMode`、`silentMode`、`autoDeleteOffline`、`autoDeleteOfflineMinutes`。开启自动登录前必须开启缓存登录；关闭缓存登录同时关闭自动登录；自动删除间隔范围1–10080分钟。SDK返回 `action_result.data`。
