# 萌卡 NT Node.js 插件 SDK

## 安装

将 `sdk.js`、`package.json` 和 `package-lock.json` 放入插件目录后执行：

```bash
npm install
```

## 连接框架

```js
import { createAPI } from './sdk.js'

const api = createAPI({
  host: '127.0.0.1',
  port: 3001,
  token: process.env.MENGKA_PLUGIN_TOKEN,
  name: 'example-plugin',
  version: '1.0.0',
  author: 'your-name',
})

await api.connect()
```

不要把插件令牌写入源码或提交到仓库。

## 获取框架信息

`get_framework_info()` 是全局 API，不需要传入 `self_id`：

```js
const info = await api.get_framework_info()
console.log(info.name, info.version)
```

返回字段包括 `name`、`version`、`summary`、`commit`、`build_time`、`go_version`、`os` 和 `arch`。

账号登录及安全验证接口见 [login.md](./login.md)。
