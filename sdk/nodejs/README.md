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

## 服务端 API 同步

SDK 的方法列表和参数字段已与当前服务端注册的插件 API 对齐。账号管理及登录方法仍以 QQ 号作为第一个参数，SDK 会按服务端协议发送 `self_id`。

| 方法 | 参数摘要 | 说明 |
| --- | --- | --- |
| `get_bot_list` | 无 | 获取当前插件节点下的 Bot 列表 |
| `get_bot_info` | `self_id` | 获取指定 Bot 的状态、协议、设备指纹和运行统计 |
| `get_user_agent` | `self_id` | 获取 Bot 当前协议与设备指纹对应的 User-Agent |
| `get_protocol_list` / `get_device_profile_list` | 无 | 获取添加或编辑账号所需的协议与设备指纹 |
| `publish_qzone_feed` | `self_id, content, visibility?, selfDelete?, aiGenerated?` | 发布文字动态；可见性为 `1` 公开、`4` 好友、`64` 仅自己 |
| `get_qzone_friend_feeds` / `like_qzone_feed` / `unlike_qzone_feed` | `self_id, ...` | 查询、点赞或取消点赞好友空间动态 |
| `get_level_tasks` | `self_id` | 刷新并查询 QQ 等级任务面板 |
| `execute_level_tasks` | `self_id, tasks` | 执行指定等级任务；成功时不返回额外数据 |
| `approve_group_invite` / `group_sign` | `self_id, group_id` | 同意群邀请与群签到 |
| `upload_group_voice` / `upload_group_video` | `self_id, group_id, file_path` | 上传后返回可用于群消息的文件信息 |
| `set_group_special_title` | `self_id, group_id, user_id, title` | 设置专属头衔；空标题表示清除 |
| `kick_group_member` | `self_id, group_id, user_id, rejectAddRequest?` | 踢出群成员，可选拒绝后续加群申请 |
| `get_security_verify_methods` | `account` | 刷新等待登录账号的安全验证方式 |
| `create_login_qr` / `query_login_qr_status` | `account, ...` | 创建并轮询登录确认二维码 |

此前列出但当前服务端未注册的空间活动、QQ 阅读/农场、音乐加速和原始 OIDB 方法已从 SDK 移除，避免调用后才收到“未知 action”。

空间动态发布示例：

```js
const result = await api.publish_qzone_feed(
  123456789,
  '来自萌卡 NT 的动态',
  1,
  false,
  false,
)
console.log(result.feed, result.client_feed_id)
```

账号登录及安全验证接口见 [login.md](./login.md)。
