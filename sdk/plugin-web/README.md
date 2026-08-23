# 萌卡 NT 插件网页后台 SDK

这套 SDK 用于把插件自带的 WebUI 作为萌卡 NT 管理端内页打开。框架负责登录态、反向代理和管理令牌注入，插件只监听框架分配的 `127.0.0.1` 端口。

## 后端接入

插件安装包不要求包含 `mengka-plugin.json`，API 与事件权限以开发者在官网勾选并审核通过的快照为准。只有需要让框架自动托管插件 WebUI 时，才在发布包中放置可选运行描述文件，参考 `mengka-plugin.example.json`。插件进程从以下环境变量或同名占位符读取后台参数：

- `MENGKA_PLUGIN_ADMIN_HOST` / `{{admin_host}}`
- `MENGKA_PLUGIN_ADMIN_PORT` / `{{admin_port}}`
- `MENGKA_PLUGIN_ADMIN_BASE_PATH` / `{{admin_base_path}}`
- `MENGKA_PLUGIN_ADMIN_TOKEN_FILE` / `{{admin_token_file}}`
- `MENGKA_PLUGIN_ADMIN_EMBEDDED=1`

若 `auth_type` 为 `header`，插件 API 校验 `auth_header` 指定的请求头，令牌从 `MENGKA_PLUGIN_ADMIN_TOKEN_FILE` 读取。不要把令牌写入 HTML、JavaScript、日志或查询参数。

可选运行描述文件只用于入口、参数和 WebUI 元数据，不得作为 API 或事件授权来源。

## 前端接入

Vite 项目应使用相对资源路径：

```js
export default defineConfig({ base: './' })
```

API 请求通过 SDK 解析框架挂载前缀：

```js
import { pluginFetch, ready, setTitle } from '@mengka-nt/plugin-web-sdk'

const response = await pluginFetch('/api/status')
setTitle('我的插件后台')
ready()
```

独立打开插件 WebUI 时，`pluginFetch('/api/status')` 仍请求插件自身的 `/api/status`；框架内打开时会自动改写为当前插件的代理地址，因此同一份页面不需要维护两套路由。

## 安全边界

- 管理服务只允许监听 `127.0.0.1`，不可监听公网地址。
- 浏览器不保存插件管理令牌；框架代理在服务端注入。
- 插件后台入口只对已登录的框架管理员开放。
- 插件不得尝试访问父页面 DOM，跨页协作应使用 SDK 的 `ready`、`setTitle` 等消息接口。
