# Node.js SDK

此目录提供不带版本子目录的萌卡 NT Node.js SDK：

- `sdk.js`：正向 WebSocket，由插件连接萌卡 NT。
- `reverse-sdk.js`：反向 WebSocket，由萌卡 NT 连接插件。

当前 SDK 已与萌卡 NT v1.6.0 开发基线的 115 个便捷方法同步。插件市场服务的可调用 API 和可订阅事件以开发者在萌卡 NT 官网勾选、审核并随安装冻结的权限快照为准；SDK 中存在某个方法不代表插件已经获得该权限。

本轮补充了媒体 RKey、用户在线状态、小程序与 Ark 分享、AI 语音、语音转文字、消息表情回应、输入状态、可疑好友申请、空间动态、群文件移动与重命名以及原生协议包调用方法。正向和反向 SDK 的参数顺序保持一致。

红包接口会保留规范的 `red_packet` 嵌套对象，并兼容尚未更新的框架版本。第 4 个参数既可以传消息段的 `data`，也可以传完整的 `red_packet` 消息段：

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const info = await api.get_red_packet_info(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket,
)
const result = await api.grab_red_packet(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket,
  info.pre_grap_token,
)
```

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
