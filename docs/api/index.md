# API 参考

通过已认证的 WebSocket 服务调用接口。Node.js SDK 的正向与反向连接使用相同方法；成功时 Promise 返回业务数据，失败时抛出异常。

## 调用方式

```js
const androidApi = api.forProtocol('android')
const linuxApi = api.forProtocol('linuxqq')
const info = await androidApi.get_login_info(self_id)
```

账号接口使用 `self_id` 指定 QQ。`client_type` 取 `android` 或 `linuxqq`；SDK 未设置协议作用域时默认 Android。服务管理接口是否需要账号参数，以各接口参数表为准。

### WebSocket 请求

```json
{
  "type": "action",
  "id": "request-1",
  "action": "get_login_info",
  "params": { "self_id": 123456789, "client_type": "android" }
}
```

### 成功响应

```json
{
  "type": "action_result",
  "id": "request-1",
  "ok": true,
  "data": { "user_id": 123456789, "nickname": "示例账号", "client_type": "android" }
}
```

### 错误响应

```json
{
  "type": "action_result",
  "id": "request-1",
  "ok": false,
  "error": "账号未在线"
}
```

各接口的返回说明对应 `data`。流式接口通过回调接收分片，详见 [download_file_stream](download_file_stream.md)。连接与认证见 [SDK 接入](https://mknt.net/development/nodejs-sdk.html)，推送格式见 [事件参考](https://mknt.net/events/)。

## 系统信息

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [获取登录信息](get_login_info.md) | Android / Linux 双协议可用 | 读取当前账号 ID、昵称和客户端类型 |
| [获取运行状态](get_status.md) | Android / Linux 双协议可用 | 读取当前账号连接状态与本地收发统计 |
| [获取版本信息](get_version_info.md) | Android / Linux 双协议可用 | 读取萌卡 NT 和插件协议版本 |
| [检查图片发送能力](can_send_image.md) | Android / Linux 双协议可用 | 查询当前账号平台是否支持图片发送 |
| [检查语音发送能力](can_send_record.md) | Android / Linux 双协议可用 | 查询当前账号平台是否支持语音发送 |
| [下载文件](download_file.md) | Android / Linux 双协议可用 | 将公网 HTTP/HTTPS 文件安全下载到框架隔离目录 |
| [上传文件流](upload_file_stream.md) | Android / Linux 双协议可用 | 分片上传文件到框架临时目录 |
| [清理流临时文件](clean_stream_temp_file.md) | Android / Linux 双协议可用 | 清理上传流状态与临时文件 |
| [测试流式传输](test_download_stream.md) | Android / Linux 双协议可用 | 发送十个测试分片并返回完成结果 |
| [流式下载文件](download_file_stream.md) | Android / Linux 双协议可用 | 通过分片帧下载文件 |
| [流式下载图片](download_file_image_stream.md) | Android / Linux 双协议可用 | 通过分片帧下载图片并返回宽高 |
| [流式下载语音](download_file_record_stream.md) | Android / Linux 双协议可用 | 通过分片帧下载语音并可转换格式 |
| [获取在线客户端](get_online_clients.md) | Android / Linux 双协议可用 | 返回账号在线设备列表 |
| [设置在线状态](set_online_status.md) | Android 协议可用 | 设置在线、离开、忙碌、隐身及扩展状态 |
| [设置自定义在线状态](set_diy_online_status.md) | Android 协议可用 | 设置自定义状态图标和文字 |
| [设置正在输入状态](set_input_status.md) | Android 协议可用 | 向指定好友同步正在输入或结束输入状态 |
| [获取用户在线状态](nc_get_user_status.md) | Android / Linux 双协议可用 | 查询指定 QQ 当前的在线状态与扩展状态 |
| [重启框架服务](set_restart.md) | Android / Linux 双协议可用 | 保留账号缓存会话并重启当前框架进程 |
| [检查网址安全性](check_url_safely.md) | Android / Linux 双协议可用 | 由 QQ Android 服务返回安全、未知或危险等级 |
| [英文翻译为中文](translate_en2zh.md) | Android / Linux 双协议可用 | 调用 QQ Android 批量翻译服务 |
| [发送原始协议包](send_packet.md) | Android 协议可用 | 使用当前账号会话发送已组装的原生协议包 |
| [获取在线机型显示](get_model_show.md) | Android 协议可用 | 使用账号会话和设备指纹查询 QQ 服务端可用机型名称 |
| [设置在线机型显示](set_model_show.md) | Android 协议可用 | 设置在线机型名称，或恢复 QQ 默认显示 |

## 消息与媒体

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [发送群聊消息](send_group_msg.md) | Android / Linux 双协议可用 | 向指定群聊发送消息 |
| [发送好友消息](send_friend_msg.md) | Android / Linux 双协议可用 | 向指定好友发送消息 |
| [发送消息](send_msg.md) | Android / Linux 双协议可用 | 按好友或群聊目标复用现有消息发送链路 |
| [获取群聊历史消息](get_group_msg_history.md) | Android / Linux 双协议可用 | 从 QQ 服务器按消息序号分页读取群聊历史消息 |
| [获取好友历史消息](get_friend_msg_history.md) | Android / Linux 双协议可用 | 从 QQ 服务器按消息时间分页读取好友漫游消息 |
| [转发单条好友消息](forward_friend_single_msg.md) | Android 协议可用 | 将进程内缓存消息重新发送给指定好友 |
| [转发单条群消息](forward_group_single_msg.md) | Android 协议可用 | 将进程内缓存消息重新发送到指定群聊 |
| [上传好友图片](upload_friend_image.md) | Android / Linux 双协议可用 | 上传好友聊天图片 |
| [设置 QQ 头像](set_qq_avatar.md) | Android 协议可用 | 通过 Highway 上传当前 Bot 头像 |
| [上传群聊图片](upload_group_image.md) | Android / Linux 双协议可用 | 上传图片并生成图片消息段 |
| [上传群聊语音](upload_group_voice.md) | Android / Linux 双协议可用 | 上传音频并生成语音消息段 |
| [上传群聊视频](upload_group_video.md) | Android / Linux 双协议可用 | 上传 MP4 视频并生成视频消息段 |
| [获取群聊合并转发消息](get_group_forward_msg.md) | Android / Linux 双协议可用 | 获取合并转发的完整内容 |
| [获取合并转发消息](get_forward_msg.md) | Android / Linux 双协议可用 | 从消息 ID 或资源 ID 获取合并转发节点 |
| [发送群聊合并转发消息](send_group_forward_msg.md) | Android / Linux 双协议可用 | 创建文本合并转发消息 |
| [生成好友分享 Ark](ArkSharePeer.md) | Android 协议可用 | 根据现有好友资料生成联系人分享 Ark |
| [生成好友分享 Ark（通用 action）](send_ark_share.md) | Android 协议可用 | 与 `ArkSharePeer` 使用同一套萌卡原生处理链路 |
| [生成群聊分享 Ark](ArkShareGroup.md) | Android 协议可用 | 根据现有群资料生成群聊分享 Ark |
| [生成群聊分享 Ark（通用 action）](send_group_ark_share.md) | Android 协议可用 | 与 `ArkShareGroup` 使用同一套萌卡原生处理链路 |
| [发送群红包](send_group_red_packet.md) | Android 协议可用 | 发送拼手气、普通、专属、语音或口令群红包 |
| [查询红包详细信息](get_red_packet_info.md) | Android 协议可用 | 查询收到的 QQ 红包状态与金额信息 |
| [领取红包](grab_red_packet.md) | Android 协议可用 | 领取收到的 QQ 群红包 |
| [获取群聊可领取红包](get_group_red_packets.md) | Android 协议可用 | 获取指定群聊中当前仍可领取的红包 |
| [获取可领取红包](get_up_for_grabs.md) | Android 协议可用 | 与群聊可领取红包查询使用同一套萌卡原生处理链路 |
| [获取消息](get_msg.md) | Android / Linux 双协议可用 | 读取框架保留的标准消息引用和消息段 |
| [获取闪照原图地址](get_flash_image.md) | Android 协议可用 | 读取当前账号实时收到的闪照原图地址与图片信息 |
| [生成音乐 Ark 卡片](get_music_ark.md) | Android 协议可用 | 根据 QQ 或网易云歌曲信息生成带内容绑定签名的可播放音乐卡片 |
| [分页获取消息表情回应](fetch_emoji_like.md) | Android 协议可用 | 分页获取指定群消息的表情回应用户 |
| [获取全部消息表情回应](get_emoji_likes.md) | Android 协议可用 | 自动翻页获取指定群消息的全部表情回应用户 |
| [发送私聊消息](send_private_msg.md) | Android / Linux 双协议可用 | 按用户 ID 使用萌卡原生好友消息链路发送消息 |
| [发送群临时会话消息](send_group_temp_msg.md) | Android / Linux 双协议可用 | 通过共同群聊向非好友群成员发起临时私聊 |
| [撤回消息](delete_msg.md) | Android / Linux 双协议可用 | 根据消息引用自动分派群聊或私聊撤回 |
| [标记群聊已读](mark_group_msg_as_read.md) | Android / Linux 双协议可用 | 将指定群消息序号作为群聊已读游标上报 |
| [标记私聊已读](mark_private_msg_as_read.md) | Android / Linux 双协议可用 | 将指定好友消息时间作为私聊已读游标上报 |
| [标记消息已读](mark_msg_as_read.md) | Android / Linux 双协议可用 | 自动识别群聊或私聊并上报已读游标 |
| [设置群头像](set_group_portrait.md) | Android 协议可用 | 按 QQ Android 9.2.70 的真实上传链路设置群聊头像 |
| [上传私聊文件](upload_private_file.md) | Android / Linux 双协议可用 | 通过 QQ Android 9.2.70 离线文件通道向好友发送文件 |
| [发送合并转发消息](send_forward_msg.md) | Android / Linux 双协议可用 | 按 `user_id` 或 `group_id` 自动选择私聊或群聊目标 |
| [发送私聊合并转发消息](send_private_forward_msg.md) | Android / Linux 双协议可用 | 创建文本合并转发消息并发送给指定好友 |
| [生成小程序 Ark 卡片](get_mini_app_ark.md) | Android 协议可用 | 生成可发送的小程序 Ark 数据 |
| [获取 AI 声音角色](get_ai_characters.md) | Android 协议可用 | 获取群聊可用的 AI 声音角色列表 |
| [生成 AI 语音](get_ai_record.md) | Android 协议可用 | 合成 AI 语音并返回可访问地址 |
| [发送群聊 AI 语音](send_group_ai_record.md) | Android 协议可用 | 合成并直接发送群聊 AI 语音 |
| [识别语音文字](fetch_ptt_text.md) | Android 协议可用 | 识别框架消息缓存中的群语音 |
| [设置消息表情回应](set_msg_emoji_like.md) | Android 协议可用 | 添加或取消群消息表情回应 |
| [标记所有消息已读](mark_all_as_read.md) | Android / Linux 双协议可用 | 批量上报框架近期缓存的最新会话游标 |
| [处理事件快速操作](handle_quick_operation.md) | Android 协议可用 | 根据消息或申请事件上下文执行回复、撤回、群管理和申请处理 |

## 好友与空间

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [获取好友列表](get_friend_list.md) | Android / Linux 双协议可用 | 获取完整好友列表 |
| [获取单向好友列表](get_unidirectional_friend_list.md) | Android 协议可用 | 获取当前账号的真实单向好友关系 |
| [获取资料获赞](get_profile_like.md) | Android 协议可用 | 获取当前登录 QQ 的真实资料获赞记录与统计 |
| [获取可疑好友申请](get_doubt_friends_add_request.md) | Android 协议可用 | 获取 QQ 标记为可疑的待处理好友申请 |
| [删除好友](delete_friend.md) | Android 协议可用 | 删除指定好友 |
| [获取好友动态](get_qzone_friend_feeds.md) | Android 协议可用 | 获取好友空间最新动态 |
| [发布空间动态](publish_qzone_feed.md) | Android 协议可用 | 发布一条文本空间动态 |
| [点赞好友动态](like_qzone_feed.md) | Android 协议可用 | 点赞指定动态 |
| [取消好友动态点赞](unlike_qzone_feed.md) | Android 协议可用 | 取消指定动态的点赞 |
| [获取 QQ 名片](get_summary_card.md) | Android / Linux 双协议可用 | 获取自己或指定用户的 QQ 名片 |
| [点赞 QQ 名片](like_summary_card.md) | Android / Linux 双协议可用 | 点赞指定用户的 QQ 名片 |
| [获取 skey](get_skey.md) | Android / Linux 双协议可用 | 获取当前 Bot 的 skey |
| [获取 User-Agent](get_user_agent.md) | Android / Linux 双协议可用 | 获取当前 Bot 协议和设备指纹对应的 User-Agent |
| [获取 clientkey](get_clientkey.md) | Android / Linux 双协议可用 | 获取十六进制 clientkey |
| [获取 PsKey](get_pskey.md) | Android / Linux 双协议可用 | 获取指定域名的 PsKey |
| [获取媒体 RKey](get_rkey.md) | Android 协议可用 | 读取框架后台已维护的媒体 RKey 缓存 |
| [获取媒体 RKey（通用 action）](nc_get_rkey.md) | Android 协议可用 | 与 `get_rkey` 使用同一套萌卡原生缓存 |
| [获取媒体 RKey 服务信息](get_rkey_server.md) | Android 协议可用 | 读取私聊、群聊 RKey 与统一过期时间 |
| [获取最近会话](get_recent_contact.md) | Android 协议可用 | 获取框架近期观察到的私聊与群聊会话 |
| [设置好友备注](set_friend_remark.md) | Android 协议可用 | 设置或清除指定好友的备注 |
| [处理好友申请](set_friend_add_request.md) | Android / Linux 双协议可用 | 同意或拒绝好友申请，可在同意时设置备注 |
| [主动申请加好友](send_friend_request.md) | Android / Linux 双协议可用 | 提交好友申请，不等同于好友关系已建立 |
| [主动申请入群](send_group_join_request.md) | Android 协议可用 | Android 提交入群说明，不等同于账号已入群 |
| [主动退群](leave_group.md) | Android / Linux 双协议可用 | 当前账号退出群聊，禁止群主调用，不提供解散群能力 |
| [修改群名](set_group_name.md) | Android / Linux 双协议可用 | 设置群名称，以服务器确认及通知为准 |
| [设置精华消息](set_group_essence.md) | Android / Linux 双协议可用 | 设置或取消已缓存群消息的精华状态 |
| [戳一戳](send_poke.md) | Android / Linux 双协议可用 | 向好友或群成员发送普通戳一戳 |
| [处理可疑好友申请](set_doubt_friends_add_request.md) | Android 协议可用 | 同意指定可疑好友申请 |
| [发布空间动态（完整参数）](send_qzone_msg.md) | Android 协议可用 | 发布带图片、可见范围和指定好友范围的空间动态 |
| [删除空间动态](delete_qzone_msg.md) | Android 协议可用 | 按动态 tid 删除本人空间动态 |
| [评论好友动态](comment_qzone_feed.md) | Android 协议可用 | 评论指定动态 |
| [设置 QQ 资料](set_qq_profile.md) | Android 协议可用 | 设置当前账号昵称、性别和个性签名，并回读最新名片 |
| [设置 QQ 个性签名](set_self_longnick.md) | Android 协议可用 | 按 QQ Android 9.2.70 的审核与保存链路设置或清空当前账号签名 |

## 群聊管理

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [获取群聊列表](get_group_list.md) | Android / Linux 双协议可用 | 获取完整群聊列表 |
| [获取群聊成员列表](get_group_member_list.md) | Android / Linux 双协议可用 | 获取指定群聊的成员 |
| [获取群聊系统通知](get_group_system_notifications.md) | Android 协议可用 | 获取群聊申请与通知 |
| [同意加入群聊申请](approve_group_apply.md) | Android 协议可用 | 同意指定申请 |
| [拒绝加入群聊申请](reject_group_apply.md) | Android 协议可用 | 拒绝指定申请 |
| [同意群聊邀请](approve_group_invite.md) | Android 协议可用 | 同意好友发来的群聊邀请 |
| [设置群聊管理员](set_group_admin.md) | Android / Linux 双协议可用 | 设置或取消管理员 |
| [群聊打卡](group_sign.md) | Android 协议可用 | 在指定群聊打卡 |
| [设置群聊成员禁言](set_group_mute.md) | Android / Linux 双协议可用 | 设置或取消成员禁言 |
| [设置群聊全员禁言](set_group_mute_all.md) | Android / Linux 双协议可用 | 开启或取消全员禁言 |
| [设置群聊专属头衔](set_group_special_title.md) | Android / Linux 双协议可用 | 设置或清除成员专属头衔 |
| [移出群聊成员](kick_group_member.md) | Android / Linux 双协议可用 | 将指定成员移出群聊 |
| [批量移出群聊成员](set_group_kick_members.md) | Android / Linux 双协议可用 | 按顺序复用单人移出链路，单次最多 20 人 |
| [撤回群聊消息](recall_group_msg.md) | Android / Linux 双协议可用 | 撤回指定群聊消息 |
| [获取 @全体成员 剩余次数](get_group_at_all_remain.md) | Android 协议可用 | 查询当前账号和群聊的实时 @全体成员权限与限额 |
| [获取群荣誉信息](get_group_honor_info.md) | Android 协议可用 | 获取龙王、群聊之火、群聊炽焰和快乐源泉榜单 |
| [获取群精华消息](get_essence_msg_list.md) | Android / Linux 双协议可用 | 获取指定群聊的精华消息列表 |
| [获取群组今日打卡列表](get_group_signed_list.md) | Android 协议可用 | 获取群聊当天的打卡成员和排名 |
| [获取群文件系统信息](get_group_file_system_info.md) | Android 协议可用 | 获取文件数量限制和存储空间使用情况 |
| [创建群聊](create_group.md) | Android 协议可用 | 创建普通 QQ 群，并可在创建成功后邀请成员 |
| [设置成员邀请策略](set_group_member_invite_policy.md) | Android 协议可用 | 控制普通成员能否直接邀请他人入群 |
| [设置成员权限](set_group_member_permissions.md) | Android 协议可用 | 单独开启或关闭成员邀请、上传等权限位 |
| [设置新成员历史消息可见性](set_group_new_member_history_visibility.md) | Android 协议可用 | 控制新成员是否能查看入群前历史消息 |
| [设置群加群选项](set_group_add_option.md) | Android 协议可用 | 设置入群验证方式、问题与答案 |
| [设置群搜索选项](set_group_search.md) | Android 协议可用 | 设置群号和条件搜索开关 |
| [设置机器人入群选项](set_group_robot_add_option.md) | Android 协议可用 | 设置机器人账号入群时是否允许及是否需要审核 |
| [获取群相册列表](get_qun_album_list.md) | Android 协议可用 | 分页获取群相册及封面信息 |
| [获取群相册媒体列表](get_group_album_media_list.md) | Android 协议可用 | 分页获取相册内的图片和视频 |
| [上传图片到群相册](upload_image_to_qun_album.md) | Android 协议可用 | 使用当前 Android QQ 登录态分片上传图片 |
| [评论群相册媒体](do_group_album_comment.md) | Android 协议可用 | 评论指定相册图片或视频 |
| [点赞群相册媒体](set_group_album_media_like.md) | Android 协议可用 | 点赞一批或指定相册媒体 |
| [取消群相册媒体点赞](cancel_group_album_media_like.md) | Android 协议可用 | 取消一批或指定相册媒体的点赞 |
| [删除群相册媒体](del_group_album_media.md) | Android 协议可用 | 删除相册图片或视频 |
| [获取群文件根目录](get_group_root_files.md) | Android / Linux 双协议可用 | 获取根目录文件与文件夹，并自动处理分页 |
| [获取群文件夹内容](get_group_files_by_folder.md) | Android / Linux 双协议可用 | 获取指定文件夹中的文件与子文件夹 |
| [创建群文件夹](create_group_file_folder.md) | Android 协议可用 | 由群主或管理员在根目录创建文件夹 |
| [删除群文件夹](delete_group_folder.md) | Android 协议可用 | 按真实文件夹 ID 删除群文件夹 |
| [上传群文件](upload_group_file.md) | Android / Linux 双协议可用 | 通过 QQ Android 9.2.70 文件通道真实上传群文件 |
| [删除群文件](delete_group_file.md) | Android 协议可用 | 删除群文件，缺省业务参数由框架自动查询补齐 |
| [重命名群文件](rename_group_file.md) | Android 协议可用 | 按文件 ID 重命名群文件 |
| [移动群文件](move_group_file.md) | Android 协议可用 | 在群文件目录之间移动文件 |
| [修改群成员名片](set_group_card.md) | Android / Linux 双协议可用 | 修改或清空指定成员在群内显示的昵称 |
| [获取群公告](get_group_notice.md) | Android 协议可用 | 使用当前 Android QQ 登录态获取群公告 |
| [发布群公告](send_group_notice.md) | Android 协议可用 | 发布文字公告，并可附带本地、URL 或 Base64 图片 |
| [删除群公告](del_group_notice.md) | Android 协议可用 | 删除指定群聊中的公告 |

## 账号、登录与等级任务

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [获取 Bot 列表](get_bot_list.md) | Android / Linux 双协议可用 | 获取当前框架实例中的全部协议账号；不接受参数 |
| [获取 Bot 信息](get_bot_info.md) | Android / Linux 双协议可用 | 获取指定 Bot 的运行信息 |
| [获取协议列表](get_protocol_list.md) | Android / Linux 双协议可用 | 获取可选协议 |
| [获取设备指纹列表](get_device_profile_list.md) | Android / Linux 双协议可用 | 只读查询设备指纹与账号归属 |
| [添加账号](add_account.md) | Android / Linux 双协议可用 | 创建账号并指定其登录节点 |
| [编辑账号](update_account.md) | Android / Linux 双协议可用 | 编辑离线账号配置 |
| [停止账号会话](stop_account_login.md) | Android / Linux 双协议可用 | 取消正在进行的登录，或下线已登录账号 |
| [删除账号](delete_account.md) | Android / Linux 双协议可用 | 删除指定协议的离线账号 |
| [密码登录](login_account.md) | Android / Linux 双协议可用 | 发起密码登录 |
| [检查登录缓存](check_cache.md) | Android / Linux 双协议可用 | 检查本地登录缓存 |
| [缓存登录](cache_login.md) | Android / Linux 双协议可用 | 使用本地缓存登录 |
| [提交滑块验证](submit_slider.md) | Android / Linux 双协议可用 | 提交滑块结果 |
| [查询安全验证方式](get_security_verify_methods.md) | Android / Linux 双协议可用 | 查询安全验证原因与可用方式 |
| [创建登录二维码](create_login_qr.md) | Android / Linux 双协议可用 | 创建安全验证登录二维码 |
| [查询登录二维码状态](query_login_qr_status.md) | Android / Linux 双协议可用 | 查询扫码状态并在确认后继续登录 |
| [获取短信验证码](get_sms.md) | Android / Linux 双协议可用 | 下发安全验证短信 |
| [提交短信验证码](check_sms.md) | Android / Linux 双协议可用 | 提交短信验证码并继续登录 |
| [Android 扫描登录二维码](scan_qr.md) | Android 协议可用 | 使用在线 Android Bot 扫描登录二维码 |
| [Android 授权登录二维码](auth_qr.md) | Android 协议可用 | 使用在线 Android Bot 确认二维码授权 |
| [获取等级加速任务](get_level_tasks.md) | Android / Linux 双协议可用 | 获取 QQ 等级加速面板 |
| [执行等级加速任务](execute_level_tasks.md) | Android / Linux 双协议可用 | 执行指定的等级加速任务 |
| [获取等级加速账号列表](get_level_task_accounts.md) | Android / Linux 双协议可用 | 获取框架共享等级任务账号及协议支持情况 |
| [获取等级加速账号详情](get_level_task_account.md) | Android / Linux 双协议可用 | 读取单个账号的共享任务状态 |
| [获取等级任务状态](get_level_task_status.md) | Android / Linux 双协议可用 | 只读获取等级任务状态 |
| [获取等级加速面板](get_level_task_panel.md) | Android / Linux 双协议可用 | 刷新或读取共享任务面板 |
| [读取等级任务计划](get_level_task_settings.md) | Android / Linux 双协议可用 | 读取框架统一调度配置 |
| [保存等级任务计划](update_level_task_settings.md) | Android / Linux 双协议可用 | 保存计划，不立即执行 |
| [执行选定等级任务](execute_level_task_selection.md) | Android / Linux 双协议可用 | 复用框架执行过滤、缓存与并发控制 |
| [注册滑块验证反代](register_captcha_proxy.md) | Android / Linux 双协议可用 | 注册滑块反代并返回改写后的验证脚本 |
| [滑块验证反代请求](captcha_proxy.md) | Android / Linux 双协议可用 | 反代转发滑块请求到腾讯验证服务 |

## 框架服务管理

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [获取插件上下文](get_plugin_context.md) | Android / Linux 双协议可用 | 读取当前服务、节点、契约版本、可用管理 action 与管理端地址 |
| [获取账号管理上下文](get_account_management_context.md) | Android / Linux 双协议可用 | 一次读取账号、协议、指纹和节点快照 |
| [创建账号归属验证二维码](create_account_recovery_qr.md) | Android / Linux 双协议可用 | 创建只用于证明 QQ 归属的临时二维码 |
| [查询账号归属验证](query_account_recovery_qr_status.md) | Android / Linux 双协议可用 | 查询扫码状态，确认后只返回 QQ 号 |
| [获取节点列表](get_node_list.md) | Android / Linux 双协议可用 | 获取全部节点及账号统计，不返回代理密码 |
| [创建节点](create_node.md) | Android / Linux 双协议可用 | 创建直连或 HTTP/SOCKS5 代理节点 |
| [更新节点](update_node.md) | Android / Linux 双协议可用 | 更新已停用节点，代理密码支持保留或清除 |
| [删除节点](delete_node.md) | Android / Linux 双协议可用 | 删除已停用且未被账号引用的节点 |
| [测试节点延迟](test_node_latency.md) | Android / Linux 双协议可用 | 测试节点代理 TCP 连接延迟 |
| [获取账号设置](get_account_settings.md) | Android / Linux 双协议可用 | 读取缓存登录、自动登录和离线清理设置 |
| [更新账号设置](update_account_settings.md) | Android / Linux 双协议可用 | 更新框架级账号设置并校验依赖关系 |
| [获取账号离线通知](get_account_offline_notification.md) | Android / Linux 双协议可用 | 读取指定 QQ 与协议的离线邮件通知设置 |
| [更新账号离线通知](update_account_offline_notification.md) | Android / Linux 双协议可用 | 更新指定 QQ 与协议的离线邮件通知设置 |
| [刷新账号指纹](refresh_account_fingerprint.md) | Android / Linux 双协议可用 | 经确认后刷新离线账号当前协议的独立指纹并清除登录缓存 |
| [清理账号缓存](clear_account_cache.md) | Android / Linux 双协议可用 | 清理指定 QQ 和协议的本地登录缓存 |
| [提交身份滑块](submit_account_identity_captcha.md) | Android 协议可用 | 提交身份验证滑块结果 |
| [提交身份手机号](submit_account_identity_phone.md) | Android 协议可用 | 提交身份验证手机号并请求短信 |
| [确认身份短信](confirm_account_identity_sms.md) | Android 协议可用 | 确认身份验证短信已完成 |
| [重试身份验证登录](retry_account_identity_verify.md) | Android 协议可用 | 使用验证结果重试账号登录 |
| [调用账号安全验证](open_account_security_access.md) | Android / Linux 双协议可用 | 调用指定 SsoSecureAccess 验证类型 |
| [重试安全验证登录](retry_account_security_verify.md) | Android / Linux 双协议可用 | 使用安全验证结果重试账号登录 |
| [获取账号授权租约](get_account_access_list.md) | Android / Linux 双协议可用 | 获取当前服务创建的账号授权租约 |
| [设置账号授权租约](set_account_access.md) | Android / Linux 双协议可用 | 为指定 QQ 与协议创建或更新授权租约 |
| [清除账号授权租约](clear_account_access.md) | Android / Linux 双协议可用 | 清除当前服务对指定 QQ 与协议的租约 |
| [获取账号最近日志](get_account_recent_logs.md) | Android / Linux 双协议可用 | 获取指定 QQ 与协议最近 200 条账号日志 |

## QQ 宠物

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [获取宠物资料](get_pet_profile.md) | Android 协议可用 | 获取本人宠物资料 |
| [获取宠物勋章图鉴](get_pet_medal_gallery.md) | Android 协议可用 | 获取全部勋章及获得、佩戴状态 |
| [获取宠物数值](get_pet_vitals.md) | Android 协议可用 | 根据 pet_id 获取本人或好友宠物的心情、饱腹、清洁和金币 |
| [获取宠物三维属性](get_pet_attributes.md) | Android 协议可用 | 获取力量、智力、魅力等成长属性 |
| [获取食物目录](get_pet_food_catalog.md) | Android 协议可用 | 获取食物目录与库存 |
| [给宠物喂食](feed_pet.md) | Android 协议可用 | 使用指定名称或 ID 的食物喂食 |
| [购买宠物食物](buy_pet_food.md) | Android 协议可用 | 按食物名称或 ID 购买宠物食物 |
| [获取洗护用品目录](get_pet_bath_catalog.md) | Android 协议可用 | 获取洗护用品与价格 |
| [获取洗护用品库存](get_pet_bath_inventory.md) | Android 协议可用 | 获取洗护用品持有数量 |
| [给宠物洗护](bathe_pet.md) | Android 协议可用 | 按名称或 ID 使用洗护用品 |
| [购买洗护用品](buy_pet_bath_item.md) | Android 协议可用 | 按名称或 ID 购买洗护用品 |
| [获取活动概览](get_pet_activity_overview.md) | Android 协议可用 | 获取学习或打工概览 |
| [获取活动选项](get_pet_activity_options.md) | Android 协议可用 | 获取可选课程、岗位或冒险 |
| [开始宠物活动](start_pet_activity.md) | Android 协议可用 | 开始学习、打工或冒险 |
| [获取活动状态](get_pet_activity_status.md) | Android 协议可用 | 获取当前活动状态 |
| [结算宠物活动](settle_pet_activity.md) | Android 协议可用 | 结算当前活动 |
| [鼓励活动中的宠物](encourage_pet_activity.md) | Android 协议可用 | 鼓励当前活动中的宠物 |
| [获取宠物疲劳状态](get_pet_fatigue_status.md) | Android 协议可用 | 获取学习/打工目录下发的疲劳档位与收益倍率 |
| [获取 PK 好友列表](get_pet_pk_friends.md) | Android 协议可用 | 获取可 PK 的好友 |
| [获取推荐 PK 对手](get_pet_pk_strangers.md) | Android 协议可用 | 获取宠物服务推荐的陌生人对手 |
| [获取宠物互动消息](get_pet_interaction_messages.md) | Android 协议可用 | 获取来访、投喂等互动动态 |
| [获取宠物 PK 数值](get_pet_pk_power.md) | Android 协议可用 | 根据 pet_id 获取本人或好友宠物战力 |
| [戳一戳好友宠物](poke_friend_pet.md) | Android 协议可用 | 与好友宠物互动 |
| [获取好友宠物资料](get_friend_pet_profile.md) | Android 协议可用 | 获取好友宠物资料与当前数值 |
| [给好友宠物喂食](feed_friend_pet.md) | Android 协议可用 | 使用指定食物给好友宠物喂食 |
| [给好友宠物洗护](bathe_friend_pet.md) | Android 协议可用 | 使用指定用品给好友宠物洗护 |
| [访问好友宠物](visit_friend_pet.md) | Android 协议可用 | 访问好友的宠物页面 |
| [发起宠物 PK](start_pet_pk.md) | Android 协议可用 | 与指定好友的宠物开始 PK |
| [获取宠物 PK 状态](get_pet_pk_status.md) | Android 协议可用 | 查询指定 PK 任务状态 |
| [结算宠物 PK](settle_pet_pk.md) | Android 协议可用 | 结算指定 PK 任务 |

## QQ 农场

| API | 可用协议 | 说明 |
| --- | --- | --- |
| [获取 QQ 农场登录 code](get_qq_farm_code.md) | Android 协议可用 | 获取一个新的 32 位 QQ 农场登录 code |
