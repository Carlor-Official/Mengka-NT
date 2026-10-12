# get_account_settings

读取框架级账号运行设置。

## 调用方式

```js
const settings = await api.get_account_settings()
```

## 参数

无。

## 返回值

```js
{
  cacheLogin: true,
  autoLogin: true,
  privacyMode: false,
  silentMode: false,
  autoDeleteOffline: false,
  autoDeleteOfflineMinutes: 60
}
```

这些设置作用于整个框架，不是当前插件的本地偏好。
