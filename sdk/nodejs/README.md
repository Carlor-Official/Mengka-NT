# Node.js SDK

此目录提供不带版本子目录的萌卡 NT Node.js SDK：

- `sdk.js`：正向 WebSocket，由插件连接萌卡 NT。
- `reverse-sdk.js`：反向 WebSocket，由萌卡 NT 连接插件。

当前 SDK 与萌卡 NT v1.5.8 的 85 个公开 action 同步。插件市场服务的可调用 API 和可订阅事件以开发者在萌卡 NT 官网勾选、审核并随安装冻结的权限快照为准；SDK 中存在某个方法不代表插件已经获得该权限。

安装依赖：

```bash
npm install
```

正向模式：

```js
import { createAPI } from './sdk.js'
```

反向模式：

```js
import { createReverseAPI } from './reverse-sdk.js'
```

可运行示例位于仓库的 `plugin/正向WebSocket/Node.js` 和 `plugin/反向WebSocket/Node.js`。
