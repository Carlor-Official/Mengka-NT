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

## 1.0.3 扩展 API

SDK 1.0.3 已补齐当前服务端提供的空间、QQ 任务、群邀请、群签到以及群语音/视频上传接口：

| 方法 | 参数摘要 | 说明 |
| --- | --- | --- |
| `publish_qzone_feed` | `self_id, content, visibility?, selfDelete?, aiGenerated?` | 发布文字动态；可见性为 `1` 公开、`4` 好友、`64` 仅自己 |
| `publish_qzone_mood` | `self_id, content, private?, autoDelete24h?` | 发布空间说说 |
| `publish_qzone_ai_paint` / `publish_qzone_blind_box` | `self_id` | 执行对应空间活动发布 |
| `like_qzone_mood` / `report_qzone_feed_views` | `self_id, ...` | 执行空间点赞或浏览上报任务 |
| `get_level_tasks` | `self_id` | 刷新并查询 QQ 等级任务面板 |
| `execute_level_tasks` | `self_id, tasks` | 校验并接收任务名，返回 `accepted_tasks`；不表示任务已经完成 |
| `qq_daily_sign_in` / `qq_music_accelerate` | `self_id, ...` | QQ 签到与音乐等级加速接口 |
| `get_qqread_book_base_info` / `qq_farm_daily_login` | `self_id, ...` | QQ 阅读与经典农场接口 |
| `miniapp_user_grow_guard_judge_timing` | `self_id` | QQ 游戏中心时长上报接口 |
| `approve_group_invite` / `group_sign` | `self_id, group_id` | 同意群邀请与群签到 |
| `upload_group_voice` / `upload_group_video` | `self_id, group_id, file_path` | 上传后返回可用于群消息的文件信息 |
| `send_oidb_0x9379_0` | `self_id` | 发送 OIDB `0x9379_0` 请求 |

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
