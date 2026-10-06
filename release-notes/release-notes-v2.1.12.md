# 萌卡 NT v2.1.12

- 优化电脑 QQ 在线任务：优先复用同 QQ 的 Linux 账号、设备身份与登录缓存；首次创建沿用现有设备模板，不再额外生成模板。
- 修复账号重建时已有设备身份未完整载入的问题。缓存明确失效后才重新授权，网络或签名临时失败会保留缓存。
- 名片查询 `get_summary_card` 新增 `avatar_url`，支持 `avatar_only` 仅获取头像地址；完整名片查询正确传递超时上下文。
- 修复正向 Node.js SDK 忽略显式事件权限配置的问题，支持 `permissions: { group_event: true }`，完善 `message_reaction_changed` 接入说明。
- 同步 API 文档、等级任务说明和正反向 Node.js SDK。

## 升级说明

- 请同时升级框架主程序、前端和 Node.js SDK。原有名片查询调用方式保持兼容；仅获取头像可使用 `api.forProtocol('android').get_summary_card(selfId, targetQQ, { avatar_only: true })`。
- `avatar_url` 由 QQ 号生成，框架不在这里下载图片；完整名片内容仍取决于登录协议与 QQ 服务端。
- 表情回应监听器应在连接前注册，或提前显式声明 `group_event`。连接后新增监听器不会自动更新已有握手权限；框架仅转发实际收到的 QQ 通知。
- 已有 Linux 账号的设备身份、节点和模板保留。电脑在线登录成功仅表示开始累计时长，任务奖励以 QQ 返回的面板为准。
- 升级前备份配置和业务数据；手动升级同时替换主程序与 `public`，保留 `data` 中的现有配置和数据。
