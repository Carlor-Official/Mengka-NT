# 在线 API 调试

此功能从 v2.0.8 起提供。使用时需同时更新前后端；v2.0.7 及更早安装包不包含该功能。

登录框架控制台后，在左侧 **容器 → 调试 → 设置** 中选择“调试”。

1. 选择已启动的正向 WebSocket 服务。没有服务时，先在“插件 → 服务列表”添加并启动；调试不会自动创建、启动或修改服务。
2. 搜索中文名称或 action，按分类选择 API。当前目录与 v2.0.8 官方 SDK 的 227 个 action 对齐。
3. 填写参数。数字、布尔值和数组分别按对应类型编辑；表单留空的可选字段不发送。需要空字符串、复杂嵌套或额外字段时，切换到完整 JSON 模式，或填写“补充参数”。账号接口使用 `self_id` 和 `client_type`（`android` / `linuxqq`）；具体协议支持范围与前置条件以接口文档和服务端校验为准。
4. 中间实时预览 JSON、Python、JavaScript 或 cURL，并可复制。编辑、搜索、切换语言均不会调用 action。
5. 点击“发送请求”。右侧显示 HTTP 状态、等待耗时、请求时间、API、服务与完整响应，支持格式化 JSON、原始文本、复制和清空。

请求发出后，参数和服务暂时锁定。默认等待 60 秒，可设置 1–300 秒；停止等待、超时、断线和 401 都不会自动重试。“停止等待”不撤销服务端已执行的操作。修改参数或换接口后，上一次结果仍保留，并提示其属于旧请求。

## 专属 Key 限制

带有“专属 Key”标记的 API（包括 send_packet 和 QQ 宠物接口）必须先在头像菜单中激活框架专属 Key，且 Key 已授权所选 API。未激活、过期、撤销、停用、实例不匹配或无法验证状态时，禁止发送调试请求。激活后点击“刷新权限”更新按钮状态；普通 API 不依赖专属 Key。

后端会在建立调试连接前重新检查，拒绝时返回 HTTP 403；绕过页面直接请求也无法跳过此限制。通过预检查后，实际执行仍经过原有逐次授权、限流与审计。页面加载和手动刷新只读取权限元数据，不执行 API。

## 请求示例

- **JSON**：原生 WS `type/id/action/params` 消息体。
- **Python**：使用 `websocket-client`；通过 `MENGKA_WS_TOKEN` 传服务令牌，必要时通过 `MENGKA_WS_URL` 指定可访问的 WS/WSS 地址。
- **JavaScript**：使用 Node.js `ws`，保存为 `.mjs`；环境变量与 Python 相同。
- **cURL**：Bash 格式，通过当前控制台的 `/api/v1/debug/request` 发送同一 action，`MENGKA_ADMIN_COOKIE` 填合法管理员会话 Cookie（例如 `mengka_token=...`）。

Python / JavaScript 直连插件端口，默认是 `ws://控制台主机:服务端口/`。控制台使用 HTTPS 不意味着插件端口已启用 TLS；使用独立代理时应设置 `MENGKA_WS_URL`。页面本身经同源管理端转发，不需要浏览器直接连接插件端口，也不会读取 HttpOnly Cookie 或将服务令牌写入代码预览。

参数、服务令牌与响应不写入浏览器持久存储。页面离开后本次调试状态不保留。复制代码可能包含手动填写的敏感业务参数，应自行妥善保管。

## 管理端调试通道

以下三个路由均要求现有管理员会话：

- `GET /api/v1/debug/services`：返回正向服务的 `id/name/port/available`，不返回令牌。
- `GET /api/v1/debug/access`：返回框架统一的受控 API 清单、已授权范围和激活状态，不返回 Key。
- `POST /api/v1/debug/request`：要求 `Content-Type: application/json`，只接受 `service_id`、`timeout_seconds` 与 `request`。

```json
{
  "service_id": 1,
  "timeout_seconds": 60,
  "request": {
    "type": "action",
    "id": "debug-unique-id",
    "action": "get_bot_list",
    "params": {}
  }
}
```

成功建立并完成交换时，外层返回 `code: 0`，`data.result` 保留原生 `action_result`，`data.streams` 保留同 ID 的 `action_stream` 分片，`data.elapsed_ms` 为服务端耗时。**外层 code 为 0 不代表 action 成功**，仍需检查 `data.result.ok` 与业务返回内容。

调试请求上限 1 MiB；响应总量上限 10 MiB。流式分片在本次请求结束后统一展示；超过预览上限的大文件传输应使用 SDK。未知接口、服务端参数错误、QQ 协议限制、专属 Key 拒绝均保留原执行链路的失败信息。

通道仅连接本机已配置、已运行的正向服务，使用该服务当前令牌进行普通 WS 认证，不接受任意远程 URL，不绕过插件 dispatcher、专属 Key 校验或审计，也不恢复已删除的 action / 参数。没有新增或修改公开插件 action，现有 SDK 无需变更。
