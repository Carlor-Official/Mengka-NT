# 反向 WebSocket Node.js 示例

安装依赖并启动：

```bash
npm install
npm start
```

在管理后台添加“反向 WS”插件服务，并填写：

- WebSocket 地址：`ws://127.0.0.1:3002/`
- 服务令牌：与 `index.js` 中的 `token` 保持一致
- 重连间隔：按需设置，默认 `5` 秒

萌卡NT 后台会主动连接本示例。连接建立后，SDK 接收事件，并通过同一连接发送 Action 请求。`sdk.js` 暴露 `listen()`、`waitForConnection()`、`close()`、`on()` 以及与正向 SDK 相同的 Action 方法。
