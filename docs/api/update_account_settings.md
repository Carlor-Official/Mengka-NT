# update_account_settings

更新框架级账号运行设置。只提交需要修改的字段即可。

## 调用方式

```js
const settings = await api.update_account_settings({
  cacheLogin: true,
  autoLogin: true,
  privacyMode: false,
  silentMode: false,
  autoDeleteOffline: true,
  autoDeleteOfflineMinutes: 60
})
```

`autoDeleteOfflineMinutes` 范围为 1–10080。开启 `autoLogin` 前必须开启 `cacheLogin`；关闭缓存登录会同时关闭自动登录。成功返回保存后的完整设置。

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `cacheLogin` | boolean | 否 | 是否保存登录缓存 |
| `autoLogin` | boolean | 否 | 是否自动登录；要求 cacheLogin=true |
| `autoUpdate` | boolean | 否 | 是否自动更新 |
| `privacyMode` | boolean | 否 | 是否开启隐私模式 |
| `silentMode` | boolean | 否 | 是否开启静默模式 |
| `autoDeleteOffline` | boolean | 否 | 是否定时删除离线账号 |
| `autoDeleteOfflineMinutes` | number | 否 | 离线清理间隔，单位分钟，范围 1–10080 |

## 返回值

返回保存后的完整设置，字段见 [get_account_settings](get_account_settings.md#返回值)。
