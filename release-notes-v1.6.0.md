# 萌卡 NT v1.6.0

v1.6.0 集中扩展了框架的消息、群聊、红包、账号资料与媒体能力。插件可以直接调用更多 QQ 原生功能，官网 API 目录与 Node.js SDK 已同步更新。

## 新增 API

### 消息与会话

- `send_group_temp_msg`：通过共同群聊向非好友群成员发起临时会话，并保留来源群上下文。
- `get_mini_app_ark`：生成可直接发送的小程序卡片数据。
- `ArkSharePeer`、`ArkShareGroup`：生成好友或群聊分享卡片；同时提供 `send_ark_share`、`send_group_ark_share` 兼容调用名。
- `get_ai_characters`、`get_ai_record`、`send_group_ai_record`：查询 AI 声音角色、生成语音并发送到群聊。
- `fetch_ptt_text`：识别消息中的语音内容。
- `set_msg_emoji_like`、`fetch_emoji_like`、`get_emoji_likes`：添加、取消或查询群消息表情回应。
- `set_input_status`：向好友同步正在输入或结束输入状态。

### 群红包

- `send_group_red_packet`：发送拼手气、普通、专属、语音和口令五种群红包。
- 红包发送支持金额、份数、祝福语、专属领取人以及发送前链路检查。

### 好友、空间与账号资料

- `get_doubt_friends_add_request`、`set_doubt_friends_add_request`：查询并处理可疑好友申请。
- `set_friend_add_request`：同意或拒绝好友申请，并可设置好友备注。
- `send_qzone_msg`、`delete_qzone_msg`：发布带图片的空间动态或删除本人动态。
- `set_qq_profile`、`set_self_longnick`：修改当前 QQ 的昵称、资料与个性签名。
- `nc_get_user_status`：查询指定 QQ 的在线状态与扩展状态。
- `set_online_status`、`set_diy_online_status`：设置普通在线状态或自定义状态。

### 群文件与群资料

- `rename_group_file`、`move_group_file`：重命名群文件或在群目录之间移动文件。
- `set_group_portrait`：设置群头像。

### 媒体与底层能力

- `get_rkey`、`nc_get_rkey`、`get_rkey_server`：获取私聊、群聊等媒体资源的访问凭据与过期信息。
- `send_packet`：使用当前账号会话发送已组装的原生协议包。

## API 优化

- `send_group_msg`、`send_friend_msg`：支持在消息段中直接传入 `reply` 实现原生引用回复，并统一兼容 QQ 自带表情与 Unicode Emoji。
- `send_group_temp_msg`：发送前会校验共同群关系和成员身份；群聊禁止普通成员临时会话时，群主与管理员仍可按权限发送。
- `get_red_packet_info`、`grab_red_packet`：补齐红包预领取信息和领取参数，减少重复查询；语音与口令红包使用已取得的红包上下文快速进入领取流程。
- `get_group_red_packets`、`get_up_for_grabs`：统一返回当前群聊仍可领取的红包列表，便于自动发现和领取。
- 群消息、好友消息和插件 action 的结果关联进一步收紧，降低并发调用时的超时、串包和重复处理风险。
- API 超时信息会显示实际等待时长，长耗时的媒体、红包和文件接口不再统一显示为 30 秒。

## SDK 与能力目录

- 官网 API 目录更新为 186 个公开 API、6 类事件，并按当前框架真实 action 展示和授权。
- Node.js SDK 增至 117 个便捷方法，正向与反向连接的参数顺序保持一致。
- 新增 `api.call` / `api.callAction` 通用入口；目录中没有便捷方法时，也可以按 action 和参数对象直接调用。
- 官网授权快照仍决定插件实际可用的 API 与事件，SDK 方法不会绕过服务权限。

## 升级说明

1. 停止旧版框架并备份现有 `data` 目录。
2. 下载对应系统的 v1.6.0 外发包，完整替换程序和 `public` 前端资源。
3. 保留原有业务数据、配置、插件与运行目录，不要用新包中的初始化数据覆盖现有数据。
4. 启动框架后，检查账号在线状态和插件连接是否恢复正常。

## 下载校验

| 文件 | SHA-256 |
| --- | --- |
| `mengka-nt-v1.6.0-windows-amd64.zip` | `35CE698EA312618C2167AEB16F51B71966CB8F7D85F8E0CBB1B59D387F6A3997` |
| `mengka-nt-v1.6.0-linux-amd64.tar.gz` | `7972CCB5F0151E64B22CBCDAE70F461BEB661AD6A8693CB395B3D5C1D37EB742` |
| `mengka-nt-v1.6.0-linux-arm64.tar.gz` | `0A9E51D1417853B30C4069CBBB0D0C901BB8CFBABC16B0B601921F580103CB11` |
