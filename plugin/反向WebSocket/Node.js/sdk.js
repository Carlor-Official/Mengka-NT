import WebSocket, { WebSocketServer } from 'ws'

// ========== 日志工具 ==========
const log = {
  info: (...a)  => console.log('\x1b[36m[SDK]\x1b[0m', ...a),
  ok:   (...a)  => console.log('\x1b[32m[SDK]\x1b[0m', ...a),
  warn: (...a)  => console.warn('\x1b[33m[SDK]\x1b[0m', ...a),
  err:  (...a)  => console.error('\x1b[31m[SDK]\x1b[0m', ...a),
}

// ========== 事件名常量 ==========
const EVENTS = ['group_message', 'friend_message', 'request', 'group_notice', 'friend_notice', 'bot_offline']

function normalizeRedPacket(redPacket) {
  if (!redPacket || typeof redPacket !== 'object' || Array.isArray(redPacket)) return {}
  if (redPacket.type === 'red_packet' && redPacket.data && typeof redPacket.data === 'object') {
    return redPacket.data
  }
  return redPacket
}

function buildRedPacketParams(self_id, group_id, sender_uin, redPacket) {
  const red_packet = normalizeRedPacket(redPacket)
  return {
    ...red_packet,
    self_id,
    group_id,
    sender_uin,
    red_packet,
  }
}

// ========== API 定义 ==========
const apiDefs = {
  // 1.8.0 正式公开目录补充（options 对象按文档字段原样透传）。
  set_restart: { wait: true, build: (options = {}) => ({ ...options }) },
  check_url_safely: { wait: true, build: (options = {}) => ({ ...options }) },
  translate_en2zh: { wait: true, build: (options = {}) => ({ ...options }) },
  get_group_msg_history: { wait: true, build: (options = {}) => ({ ...options }) },
  get_friend_msg_history: { wait: true, build: (options = {}) => ({ ...options }) },
  send_private_msg: { wait: true, build: (options = {}) => ({ ...options }) },
  delete_msg: { wait: true, build: (options = {}) => ({ ...options }) },
  mark_group_msg_as_read: { wait: true, build: (options = {}) => ({ ...options }) },
  mark_private_msg_as_read: { wait: true, build: (options = {}) => ({ ...options }) },
  mark_msg_as_read: { wait: true, build: (options = {}) => ({ ...options }) },
  upload_private_file: { wait: true, timeout: 5 * 60 * 1000, build: (options = {}) => ({ ...options }) },
  send_forward_msg: { wait: true, build: (options = {}) => ({ ...options }) },
  send_private_forward_msg: { wait: true, build: (options = {}) => ({ ...options }) },
  mark_all_as_read: { wait: true, build: (options = {}) => ({ ...options }) },
  handle_quick_operation: { wait: true, build: (options = {}) => ({ ...options }) },
  get_unidirectional_friend_list: { wait: true, build: (options = {}) => ({ ...options }) },
  get_profile_like: { wait: true, build: (options = {}) => ({ ...options }) },
  set_friend_remark: { wait: true, build: (options = {}) => ({ ...options }) },
  get_group_at_all_remain: { wait: true, build: (options = {}) => ({ ...options }) },
  get_essence_msg_list: { wait: true, build: (options = {}) => ({ ...options }) },
  get_group_file_system_info: { wait: true, build: (options = {}) => ({ ...options }) },
  create_group: { wait: true, build: (options = {}) => ({ ...options }) },
  set_group_member_invite_policy: { wait: true, build: (options = {}) => ({ ...options }) },
  set_group_member_permissions: { wait: true, build: (options = {}) => ({ ...options }) },
  set_group_new_member_history_visibility: { wait: true, build: (options = {}) => ({ ...options }) },
  set_group_add_option: { wait: true, build: (options = {}) => ({ ...options }) },
  set_group_search: { wait: true, build: (options = {}) => ({ ...options }) },
  set_group_robot_add_option: { wait: true, build: (options = {}) => ({ ...options }) },
  get_qun_album_list: { wait: true, build: (options = {}) => ({ ...options }) },
  get_group_album_media_list: { wait: true, build: (options = {}) => ({ ...options }) },
  upload_image_to_qun_album: { wait: true, timeout: 5 * 60 * 1000, build: (options = {}) => ({ ...options }) },
  do_group_album_comment: { wait: true, build: (options = {}) => ({ ...options }) },
  set_group_album_media_like: { wait: true, build: (options = {}) => ({ ...options }) },
  cancel_group_album_media_like: { wait: true, build: (options = {}) => ({ ...options }) },
  del_group_album_media: { wait: true, build: (options = {}) => ({ ...options }) },
  get_group_root_files: { wait: true, build: (options = {}) => ({ ...options }) },
  get_group_files_by_folder: { wait: true, build: (options = {}) => ({ ...options }) },
  create_group_file_folder: { wait: true, build: (options = {}) => ({ ...options }) },
  delete_group_folder: { wait: true, build: (options = {}) => ({ ...options }) },
  upload_group_file: { wait: true, timeout: 5 * 60 * 1000, build: (options = {}) => ({ ...options }) },
  delete_group_file: { wait: true, build: (options = {}) => ({ ...options }) },
  send_group_notice: { wait: true, build: (options = {}) => ({ ...options }) },
  del_group_notice: { wait: true, build: (options = {}) => ({ ...options }) },
  get_qq_farm_code: { wait: true, build: (options = {}) => ({ ...options }) },
  // 获取 skey
  get_skey: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 获取当前 Bot 协议和设备指纹对应的 User-Agent
  get_user_agent: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 按框架前端“一键生成”规则创建并保存一套独立设备指纹。
  generate_device_profile: { wait: true, build: () => ({}) },
  // 兼容系统状态查询；这些 action 只读取框架本地运行状态，不发送 QQ 协议请求。
  get_login_info: { wait: true, build: (self_id) => ({ self_id }) },
  get_status: { wait: true, build: (self_id) => ({ self_id }) },
  get_online_clients: { wait: true, build: (self_id, no_cache = false) => ({ self_id, no_cache }) },
  get_model_show: { wait: true, build: (self_id, model = '') => ({ self_id, model }) },
  set_model_show: { wait: true, build: (self_id, model = '', model_show = '') => ({ self_id, model, model_show }) },
  get_version_info: { wait: true, build: (self_id) => ({ self_id }) },
  can_send_image: { wait: true, build: (self_id) => ({ self_id }) },
  can_send_record: { wait: true, build: (self_id) => ({ self_id }) },
  // 安全文件下载和临时流文件接口。
  download_file: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (url, thread_count = 1, headers = {}) => (
      url && typeof url === 'object' ? { ...url } : { url, thread_count, headers }
    ),
  },
  upload_file_stream: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (options = {}) => ({ ...options }),
  },
  clean_stream_temp_file: { wait: true, build: () => ({}) },
  test_download_stream: {
    wait: true,
    build: (options = false) => (
      options && typeof options === 'object' ? { ...options } : { error: Boolean(options) }
    ),
  },
  // 第二批安全兼容接口：流式下载只接受 file，不会通过 file_id 查询 QQ 文件服务。
  download_file_stream: {
    wait: true, stream: true, timeout: 2 * 60 * 1000,
    build: (options = {}) => ({ ...options }),
  },
  download_file_image_stream: {
    wait: true, stream: true, timeout: 2 * 60 * 1000,
    build: (options = {}) => ({ ...options }),
  },
  download_file_record_stream: {
    wait: true, stream: true, timeout: 2 * 60 * 1000,
    build: (options = {}) => ({ ...options }),
  },
  // 消息查询只读取框架进程内、按账号隔离的近期消息缓存。
  get_msg: { wait: true, build: (self_id, message_id) => ({ self_id, message_id }) },
  get_recent_contact: { wait: true, build: (self_id, count = 10) => ({ self_id, count }) },

  // 复用现有好友/群发送与进程内消息缓存的 OneBot 兼容接口。
  send_msg: {
    wait: true,
    build: (self_id, message_type, target_id, message) => {
      const target = message_type === 'group' ? { group_id: target_id } : { user_id: target_id }
      return { self_id, message_type, target_id, message, ...target }
    },
  },
  forward_friend_single_msg: {
    wait: true,
    build: (self_id, message_id, user_id) => ({ self_id, message_id, user_id }),
  },
  forward_group_single_msg: {
    wait: true,
    build: (self_id, message_id, group_id) => ({ self_id, message_id, group_id }),
  },
  get_forward_msg: {
    wait: true,
    build: (options = {}) => ({ ...options }),
  },
  set_group_kick_members: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (self_id, group_id, user_ids, reject_add_request = false) => ({
      self_id, group_id, user_ids, reject_add_request,
    }),
  },

  // 获取媒体访问 RKey。get_rkey 与 nc_get_rkey 返回同一标准列表。
  get_rkey: { wait: true, build: (self_id) => ({ self_id }) },
  nc_get_rkey: { wait: true, build: (self_id) => ({ self_id }) },
  get_rkey_server: { wait: true, build: (self_id) => ({ self_id }) },
  // 查询指定 QQ 的在线状态。
  nc_get_user_status: { wait: true, build: (self_id, user_id) => ({ self_id, user_id }) },
  // 生成小程序 Ark 数据；options 对应文档中的模板或完整小程序参数。
  get_mini_app_ark: {
    wait: true,
    build: (self_id, options = {}) => ({ ...options, self_id }),
  },
  // 生成带内容绑定签名的 QQ 音乐 Ark 卡片。
  get_music_ark: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, options = {}) => ({ ...options, self_id }),
  },
  // 生成好友或群聊分享 Ark。兼容调用名与原调用名返回相同数据。
  ArkSharePeer: {
    wait: true,
    build: (self_id, user_id, phone_number = '') => ({ self_id, user_id, phone_number }),
  },
  send_ark_share: {
    wait: true,
    build: (self_id, user_id, phone_number = '') => ({ self_id, user_id, phone_number }),
  },
  ArkShareGroup: {
    wait: true,
    build: (self_id, group_id) => ({ self_id, group_id }),
  },
  send_group_ark_share: {
    wait: true,
    build: (self_id, group_id) => ({ self_id, group_id }),
  },
  // AI 声音角色、合成链接和群聊直接发送。
  get_ai_characters: {
    wait: true,
    build: (self_id, group_id, chat_type = 1) => ({ self_id, group_id, chat_type }),
  },
  get_ai_record: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (self_id, group_id, character, text, chat_type = 1) => ({
      self_id, group_id, character, text, chat_type,
    }),
  },
  send_group_ai_record: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (self_id, group_id, character, text, chat_type = 1) => ({
      self_id, group_id, character, text, chat_type,
    }),
  },
  // 识别框架消息缓存中的群语音。
  fetch_ptt_text: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, message_id, format = 0) => ({ self_id, message_id, format }),
  },
  // 群消息表情回应。
  set_msg_emoji_like: {
    wait: true,
    build: (self_id, message_id, emoji_id, set = true) => ({ self_id, message_id, emoji_id, set }),
  },
  fetch_emoji_like: {
    wait: true,
    build: (self_id, message_id, emoji_id, count = 100, cookie = '', emoji_type = 0) => ({
      self_id, message_id, emoji_id, count, cookie, emoji_type,
    }),
  },
  get_emoji_likes: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, message_id, emoji_id, emoji_type = 0) => ({
      self_id, message_id, emoji_id, emoji_type,
    }),
  },
  // 向好友同步正在输入或结束输入状态。
  set_input_status: {
    wait: true,
    build: (self_id, user_id, event_type = 1) => ({ self_id, user_id, event_type }),
  },
  // 读取和处理可疑好友申请。
  get_doubt_friends_add_request: {
    wait: true,
    build: (self_id, count = 50) => ({ self_id, count }),
  },
  set_doubt_friends_add_request: {
    wait: true,
    build: (self_id, flag, approve = true) => ({ self_id, flag, approve }),
  },
  // 发布带图片的空间动态或按 tid 删除动态。
  send_qzone_msg: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (self_id, content, images = [], ugc_right = 1, target_uins = []) => ({
      self_id, content, images, ugc_right, target_uins,
    }),
  },
  delete_qzone_msg: {
    wait: true,
    build: (self_id, tid) => ({ self_id, tid }),
  },
  // 重命名或移动群文件。
  rename_group_file: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (self_id, group_id, file_id, new_name, options = {}) => ({
      ...options, self_id, group_id, file_id, new_name,
    }),
  },
  move_group_file: {
    wait: true,
    timeout: 2 * 60 * 1000,
    build: (self_id, group_id, file_id, target_parent_directory, options = {}) => ({
      ...options, self_id, group_id, file_id, target_parent_directory,
    }),
  },
  // 发送已组装的原生协议包。data/reserve 使用十六进制字符串。
  send_packet: {
    wait: true,
    timeout: 45 * 1000,
    build: (self_id, cmd, data, rsp = true, reserve = '') => ({
      self_id, cmd, data, rsp, ...(reserve ? { reserve } : {}),
    }),
  },

  // 设置 QQ Android 在线状态；普通状态的 ext_status/battery_status 填 0。
  set_online_status: {
    wait: true,
    build: (self_id, status, ext_status = 0, battery_status = 0) => ({
      self_id,
      status,
      ext_status,
      battery_status,
    }),
  },
  // 设置自定义在线状态。face_type 默认 1，wording 默认一个空格。
  set_diy_online_status: {
    wait: true,
    build: (self_id, face_id, face_type = 1, wording = ' ') => ({
      self_id,
      face_id,
      face_type,
      wording,
    }),
  },
  // 获取 clientkey (hex 编码)
  get_clientkey: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 宠物资料会返回 pet_id；食物和洗护用品可传目录中的名称或 ID。
  get_pet_profile: { wait: true, build: (self_id) => ({ self_id }) },
  get_pet_vitals: { wait: true, build: (self_id) => ({ self_id }) },
  get_pet_food_catalog: { wait: true, build: (self_id) => ({ self_id }) },
  feed_pet: { wait: true, build: (self_id, pet_id, food) => ({ self_id, pet_id, food }) },
  buy_pet_food: { wait: true, build: (self_id, pet_id, food, count = 1) => ({ self_id, pet_id, food, count }) },
  get_pet_bath_catalog: { wait: true, build: (self_id) => ({ self_id }) },
  get_pet_bath_inventory: { wait: true, build: (self_id) => ({ self_id }) },
  bathe_pet: { wait: true, build: (self_id, pet_id, item, count = 1) => ({ self_id, pet_id, item, count }) },
  buy_pet_bath_item: { wait: true, build: (self_id, pet_id, item, count = 1) => ({ self_id, pet_id, item, count }) },
  // activity 支持 school/work/adventure 或 学习/打工/冒险。
  get_pet_activity_overview: { wait: true, build: (self_id, activity) => ({ self_id, activity }) },
  get_pet_activity_options: { wait: true, build: (self_id, activity, friend_id = 0) => ({ self_id, activity, friend_id }) },
  start_pet_activity: { wait: true, build: (self_id, activity, option_name, friend_id = 0) => ({ self_id, activity, option_name, friend_id }) },
  get_pet_activity_status: { wait: true, build: (self_id) => ({ self_id }) },
  settle_pet_activity: { wait: true, build: (self_id) => ({ self_id }) },
  encourage_pet_activity: { wait: true, build: (self_id) => ({ self_id }) },
  get_pet_pk_friends: { wait: true, build: (self_id, cursor = '') => ({ self_id, cursor }) },
  get_pet_pk_power: { wait: true, build: (self_id) => ({ self_id }) },
  poke_friend_pet: { wait: true, build: (self_id, friend_id) => ({ self_id, friend_id }) },
  get_friend_pet_profile: { wait: true, build: (self_id, friend_id) => ({ self_id, friend_id }) },
  feed_friend_pet: { wait: true, build: (self_id, friend_id, food) => ({ self_id, friend_id, food }) },
  bathe_friend_pet: { wait: true, build: (self_id, friend_id, item, count = 1) => ({ self_id, friend_id, item, count }) },
  visit_friend_pet: { wait: true, build: (self_id, friend_id) => ({ self_id, friend_id }) },
  start_pet_pk: { wait: true, build: (self_id, friend_id) => ({ self_id, friend_id }) },
  get_pet_pk_status: { wait: true, build: (self_id, story_id) => ({ self_id, story_id }) },
  settle_pet_pk: { wait: true, build: (self_id, story_id) => ({ self_id, story_id }) },
  // 发送群消息: message 为 [{type, data}] 数组, 支持 text/reply/at/image/voice/video/face。
  // 原生引用回复: [{type:'reply',data:{message_id}}, {type:'text',data:{text:'回复正文'}}]；兼容 data.id。
  // text 原生支持 Unicode emoji，并支持 QQ 表情简写 [bq190]；face 支持 qq_face（face_id 必填，face_code 可选）和 super_face（type=33 或 37）。
  // 注: image 需传 file_id, 且对应图片必须已在群内收到过(缓存 5 分钟)
  send_group_msg: {
    wait: true,
    build: (self_id, group_id, message) => ({ self_id, group_id, message }),
  },
  // 发送好友消息: 支持 text/reply/image；reply 用法与群消息相同，且 message_id 必须属于当前好友会话。
  send_friend_msg: {
    // 好友消息支持 text/image/qq_face；text 同样支持 Unicode emoji 和 [bq190]。
    wait: true,
    build: (self_id, user_id, message) => ({ self_id, user_id, message }),
  },
  // 发送群临时会话消息: 目标无需是好友，但发送账号与目标必须同在 group_id 指定的群。
  send_group_temp_msg: {
    wait: true,
    build: (self_id, group_id, user_id, message) => ({ self_id, group_id, user_id, message }),
  },
  // 获取好友列表: 返回 { friends, total_count, self_uin }，后端自动翻页拿完
  get_friend_list: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 获取好友空间首包最新动态。
  // feeds: [{ app_id, user_id, nickname, create_time, feed_id, feeds_key,
  //           url, text, orig_uin?, orig_tid?, forward? }]
  get_qzone_friend_feeds: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 发布文本空间动态。visibility: 1=所有人，2=好友，5=仅自己。
  publish_qzone_feed: {
    wait: true,
    build: (self_id, content, visibility = 1, self_delete_after_one_day = false, declare_ai_generated = false) => ({
      self_id,
      content,
      visibility,
      self_delete_after_one_day,
      declare_ai_generated,
    }),
  },
  // 评论 get_qzone_friend_feeds 返回的动态。content 与 images 至少填写一项；
  // images 支持公网 URL 字符串或 { url, width, height } 对象，最多 9 张。
  comment_qzone_feed: {
    wait: true,
    build: (self_id, feed, content = '', images = []) => ({ self_id, feed, content, images }),
  },
  // 点赞一条 get_qzone_friend_feeds 返回的动态。直接传入完整 feed；
  // 后端根据 feed.forward 是否存在自动处理转发动态。该动作没有回调，不要 await。
  like_qzone_feed: {
    wait: false,
    build: (self_id, feed) => ({ self_id, feed }),
  },
  // 取消对一条 get_qzone_friend_feeds 返回动态的点赞。该动作没有回调，不要 await。
  unlike_qzone_feed: {
    wait: false,
    build: (self_id, feed) => ({ self_id, feed }),
  },
  // 获取群列表: 返回 { groups, total_count, self_uin }
  get_group_list: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 获取群成员列表: 返回 { group_id, members, total_count }
  // members: [{ uin, nickname, card, level, title, join_time, last_speak_time }]
  get_group_member_list: {
    wait: true,
    build: (self_id, group_id) => ({ self_id, group_id }),
  },
  get_group_notice: { wait: true, build: (self_id, group_id) => ({ self_id, group_id }) },
  get_group_honor_info: { wait: true, build: (self_id, group_id, type = 'all') => ({ self_id, group_id, type }) },
  get_group_signed_list: { wait: true, build: (self_id, group_id) => ({ self_id, group_id }) },
  // 获取群聊通知列表: 返回 { notifications, total_count }，包含所有通知类型。
  get_group_system_notifications: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 同意入群申请。request_* 来自 group_notice/apply 事件或群聊通知列表。
  approve_group_apply: {
    wait: true,
    build: (self_id, group_id, request_id, request_type, request_extra) => {
      const p = { self_id, group_id, request_id, request_type }
      if (request_extra !== undefined) p.request_extra = request_extra
      return p
    },
  },
  // 拒绝入群申请。reason 为可选拒绝理由。
  reject_group_apply: {
    wait: true,
    build: (self_id, group_id, request_id, request_type, reason, request_extra) => {
      const p = { self_id, group_id, request_id, request_type }
      if (reason !== undefined) p.reason = reason
      if (request_extra !== undefined) p.request_extra = request_extra
      return p
    },
  },
  // 同意好友 Ark 卡片发来的群邀请。
  approve_group_invite: {
    wait: true,
    build: (self_id, group_id, msgseq) => ({ self_id, group_id, msgseq }),
  },
  // 获取指定域名的 PsKey
  get_pskey: {
    wait: true,
    build: (self_id, domain) => ({ self_id, domain }),
  },
  // 发送五种 QQ 群红包。total_amount 使用分为单位，支付密码只参与本次请求。
  send_group_red_packet: {
    wait: true,
    timeout: 120 * 1000,
    build: (
      self_id,
      group_id,
      red_packet_type,
      total_amount,
      total_num,
      payment_password,
      wishing = '恭喜发财',
      target_uins = [],
      options = {},
    ) => ({
      ...options,
      self_id,
      group_id,
      red_packet_type,
      total_amount,
      total_num,
      payment_password,
      wishing,
      target_uins,
    }),
  },
  // 查询红包详情，返回值顶层包含正式领取所需的 pre_grap_token。
  get_red_packet_info: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, group_id, sender_uin, red_packet) =>
      buildRedPacketParams(self_id, group_id, sender_uin, red_packet),
  },
  // pre_grap_token 必须传入 get_red_packet_info 返回的同名顶层字段。
  grab_red_packet: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, group_id, sender_uin, red_packet, pre_grap_token) => ({
      ...buildRedPacketParams(self_id, group_id, sender_uin, red_packet),
      pre_grap_token,
    }),
  },
  // 查询指定群中仍可领取的红包，返回数组。
  get_group_red_packets: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, group_id) => ({ self_id, group_id }),
  },
  get_up_for_grabs: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, group_id) => ({ self_id, group_id }),
  },
  // 设置当前 QQ 账号头像（支持本地路径/file:///http(s)://）。
  set_qq_avatar: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, file_path) => ({ self_id, file_path }),
  },
  // 上传群图片（支持本地路径/file:///http(s)://），返回 {type:"image",data:{file_id}} 可直接塞 message 数组
  upload_group_image: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, group_id, file_path) => ({ self_id, group_id, file_path }),
  },
  // 上传好友图片（支持本地路径/file:///http(s)://），返回可直接发送的图片段
  upload_friend_image: {
    wait: true,
    timeout: 60 * 1000,
    build: (self_id, user_id, file_path) => ({ self_id, user_id, file_path }),
  },
  // 上传群语音，接受 FFmpeg 可解码的常见格式，后端负责转码和生成波形。
  upload_group_voice: {
    wait: true,
    timeout: 5 * 60 * 1000,
    build: (self_id, group_id, file_path) => ({ self_id, group_id, file_path }),
  },
  // 上传群视频，返回可直接放入 send_group_msg.message 的 video 段。
  // 后端接收本地路径/file:///http(s)://，并通过 FFmpeg 容器提取时长和封面。
  upload_group_video: {
    wait: true,
    timeout: 5 * 60 * 1000,
    build: (self_id, group_id, file_path) => ({ self_id, group_id, file_path }),
  },
  // 查询QQ名片，不传 target_uin 则查自己
  get_summary_card: {
    wait: true,
    build: (self_id, target_uin) => {
      const p = { self_id }
      if (target_uin !== undefined) p.target_uin = target_uin
      return p
    },
  },
  // 设置当前 QQ 的昵称、个性签名和性别；personal_note/sex 省略时不修改。
  set_qq_profile: {
    wait: true,
    timeout: 45 * 1000,
    build: (self_id, nickname, personal_note, sex) => {
      const p = { self_id, nickname }
      if (personal_note !== undefined) p.personal_note = personal_note
      if (sex !== undefined) p.sex = sex
      return p
    },
  },
  // 设置或清空当前 QQ 个性签名。
  set_self_longnick: {
    wait: true,
    timeout: 45 * 1000,
    build: (self_id, longNick) => ({ self_id, longNick }),
  },
  // 设置群头像；file 支持本地路径、URL、file://、base64:// 和 data URL。
  set_group_portrait: {
    wait: true,
    timeout: 45 * 1000,
    build: (self_id, group_id, file) => ({ self_id, group_id, file }),
  },
  // 点赞 QQ 名片，like_count 默认 1。返回 SSO 错误码、错误信息和原始回包 hex。
  like_summary_card: {
    wait: true,
    build: (self_id, target_uin, like_count = 1) => ({ self_id, target_uin, like_count }),
  },
  // 获取节点下所有 Bot 列表（无需 self_id）；每项包含 is_qq_vip 会员状态。
  get_bot_list: {
    wait: true,
    build: () => ({}),
  },
  // 获取当前节点下指定 Bot 的运行信息，返回值包含 is_qq_vip 会员状态。
  get_bot_info: {
    wait: true,
    build: self_id => ({ self_id }),
  },
  // 获取本地 protocol.json 的完整数组，不额外注入 ID（无需 self_id）
  get_protocol_list: {
    wait: true,
    build: () => ({}),
  },
  // 获取完整设备指纹信息（无需 self_id）
  get_device_profile_list: {
    wait: true,
    build: () => ({}),
  },
  // 添加账号到当前插件所属节点，self_id 为 5-10 位无符号 QQ 整数
  add_account: {
    wait: true,
    resultMessage: '账号添加成功',
    resultData: false,
    build: (self_id, password, protocol_id, device_profile_id) => ({ self_id, password, protocol_id, device_profile_id }),
  },
  // 编辑当前插件所属节点内的账号
  update_account: {
    wait: true,
    resultMessage: '账号编辑成功',
    resultData: false,
    build: (self_id, password, protocol_id, device_profile_id) => ({ self_id, password, protocol_id, device_profile_id }),
  },
  // 取消登录中账号或使已登录账号离线，仅限当前插件所属节点
  offline_account: {
    wait: true,
    resultMessage: '账号已离线',
    resultData: false,
    build: self_id => ({ self_id }),
  },
  // 删除当前插件所属节点内已离线的账号
  delete_account: {
    wait: true,
    resultMessage: '账号删除成功',
    resultData: false,
    build: self_id => ({ self_id }),
  },
  // 登录当前插件所属节点内的离线账号。返回 { code, message }；
  // 滑块、身份验证附带 slider_url、identity_url；安全验证会返回 security_verify
  // （QQ 原始验证原因和可用方法），仅在响应带 URL 时才附带 security_url。
  login_account: {
    wait: true,
    build: self_id => ({ self_id }),
  },
  // 查询账号缓存的 token 是否完整有效。
  check_cache: {
    wait: true,
    build: self_id => ({ self_id }),
  },
  // 使用缓存连接 MSF，交换 Login ECDH 后执行 InfoSync 登录。
  cache_login: {
    wait: true,
    build: self_id => ({ self_id }),
  },
  // 提交 Type 0 滑块验证结果。Bot 会使用内部保存的 cookie 与 SID。
  submit_slider: {
    wait: true,
    build: (self_id, ticket, randstr) => ({ self_id, ticket, randstr }),
  },
  // 重新查询安全验证原因和可用方式，返回结构与 login_account.security_verify 一致。
  get_security_verify_methods: {
    wait: true,
    build: self_id => ({ self_id }),
  },
  // 请求短信验证。verify_type 必填：4 为接收短信（服务端下发验证码），3 为发送短信
  // （用密保手机把指定内容发到指定号码）。返回服务端原始响应：两种类型都会给出新的
  // sign，3 还会给出 sms（短信内容）和 send_to（接收号码）。
  get_sms: {
    wait: true,
    build: (self_id, verify_type, sign) => ({ self_id, verify_type, sign }),
  },
  // 提交短信验证，verify_type 需与 get_sms 一致，sign 用 get_sms 新返回的那个。
  // 4 必须传 code；3 不用传 code，改为回查服务端是否收到用户发出的短信。
  // 校验通过会自动完成 NTLogin Type 2 并返回登录结果，未通过则返回服务端原始响应。
  check_sms: {
    wait: true,
    build: (self_id, verify_type, sign, code) => ({ self_id, verify_type, sign, code }),
  },
  // 创建扫码安全验证二维码，返回 qr_url、guarantee_token 和 expires_in。
  create_login_qr: {
    wait: true,
    build: self_id => ({ self_id }),
  },
  // 查询扫码状态。confirmed 时后端会继续登录，最终返回结构与 login_account 一致。
  query_login_qr_status: {
    wait: true,
    build: (self_id, guarantee_token) => ({ self_id, guarantee_token }),
  },
  // 设置/取消群管理员: set_admin=true 设为管理, false 取消
  set_group_admin: {
    wait: true,
    build: (self_id, group_id, target_uin, set_admin) => ({ self_id, group_id, target_uin, set_admin }),
  },
  // 修改群成员名片；card 传空字符串时清空群名片
  set_group_card: {
    wait: true,
    build: (self_id, group_id, user_id, card) => ({ self_id, group_id, user_id, card }),
  },
  // 群打卡，返回打卡文案、累计天数、群排名、详情地址及结构化响应字段
  group_sign: {
    wait: true,
    build: (self_id, group_id) => ({ self_id, group_id }),
  },
  // 群禁言: duration_sec 禁言秒数，0 取消禁言
  set_group_mute: {
    wait: true,
    build: (self_id, group_id, target_uin, duration_sec) => ({ self_id, group_id, target_uin, duration_sec }),
  },
  // 全员禁言: mute=true 开启, false 取消
  set_group_mute_all: {
    wait: true,
    build: (self_id, group_id, mute) => ({ self_id, group_id, mute }),
  },
  // 设置群成员专属头衔，title 传空字符串时清除头衔
  set_group_special_title: {
    wait: true,
    build: (self_id, group_id, user_id, title) => ({ self_id, group_id, user_id, title }),
  },
  // 踢出群成员: reject_add_request=true 时同时拒绝该成员后续的加群申请
  kick_group_member: {
    wait: true,
    build: (self_id, group_id, user_id, reject_add_request) => ({ self_id, group_id, user_id, reject_add_request }),
  },
  // 撤回群消息: msg_seq=消息序列号, msg_random=消息随机数
  recall_group_msg: {
    wait: true,
    build: (self_id, group_id, msg_seq, msg_random) => ({ self_id, group_id, msg_seq, msg_random }),
  },
  // 获取群聊合并转发消息: sender_uin=发送者QQ, res_id=合并转发资源ID
  get_group_forward_msg: {
    wait: true,
    build: (self_id, sender_uin, res_id) => ({ self_id, sender_uin, res_id }),
  },
  // 上传文本合并转发消息。
  // messages: [{ user_id, nickname, time, message: [{ type: 'text', data: { text } }] }]
  // time 为 Unix 秒；非 text 段会由服务端丢弃。
  // 返回值的 message 字段可直接传给 send_group_msg 发送合并转发卡片。
  send_group_forward_msg: {
    wait: true,
    build: (self_id, group_id, messages) => ({ self_id, group_id, messages }),
  },
  // 删除好友: target_uin=要删除的好友QQ号
  delete_friend: {
    wait: true,
    build: (self_id, target_uin) => ({ self_id, target_uin }),
  },
  // 处理好友申请: flag 必须原样使用 request 事件提供的值
  set_friend_add_request: {
    wait: true,
    build: (self_id, flag, approve = true, remark = '') => ({ self_id, flag, approve, remark }),
  },
  // 获取QQ等级加速面板: 返回今日加速天数、付费倍率、任务列表等
  get_level_tasks: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 按数组顺序执行指定的QQ等级加速任务。
  execute_level_tasks: {
    wait: true,
    timeout: 5 * 60 * 1000,
    build: (self_id, tasks) => ({ self_id, tasks }),
  },
  // 注册滑块验证反代：抓取并改写 TCaptcha.js，返回 { uin, script }。
  // script 为改写后的脚本内容，capDomain 已指向 proxy_base（为空时用默认反代前缀）。
  register_captcha_proxy: {
    wait: true,
    timeout: 30 * 1000,
    build: (self_id, url, proxy_base = '') => ({ self_id, url, proxy_base }),
  },
  // 反代转发滑块页请求到 t.captcha.qq.com（走节点代理）。
  // 返回 { status, headers, result }，result 为响应体 base64 编码。
  captcha_proxy: {
    wait: true,
    timeout: 30 * 1000,
    build: (self_id, url, method = 'GET', headers = {}, body = '') => ({ self_id, url, method, headers, body }),
  },
}

// ========== 事件分发 ==========
function dispatchEvent(listeners, event) {
  const { post_type, group_id } = event
  let key = null
  if (post_type === 'group_message')   key = 'group_message'
  if (post_type === 'friend_message')  key = 'friend_message'
  if (post_type === 'request')         key = 'request'
  if (post_type === 'group_notice')    key = 'group_notice'
  if (post_type === 'friend_notice')   key = 'friend_notice'
  if (post_type === 'bot_offline')     key = 'bot_offline'
  if (key && listeners[key]) {
    try { listeners[key](event) } catch (e) { log.err('事件回调异常:', e) }
  }
}

// ========== createReverseAPI ==========
export function createReverseAPI(config = {}) {
  const { host = '0.0.0.0', port = 3002, path = '/', token, sendPacketKey = '' } = config
  if (!token) throw new Error('token 必填')

  const listeners = {}
  const pending = new Map()
  const connectionWaiters = new Set()
  let wss = null
  let ws = null
  let ready = false
  let closing = false
  let nextId = 0
  let connectionInfo = null
  let rawPacketAccessKey = String(sendPacketKey || '').trim()

  function requestToken(req) {
    const authorization = String(req.headers.authorization || '')
    const bearer = authorization.match(/^Bearer\s+(.+)$/i)
    return bearer?.[1] || String(req.headers['x-mengka-token'] || '')
  }

  function rejectPending(message) {
    for (const [, item] of pending) {
      clearTimeout(item.timer)
      if (item.resultMessage) item.resolve({ code: 1, msg: message })
      else item.reject(new Error(message))
    }
    pending.clear()
  }

  function resolveConnectionWaiters() {
    for (const waiter of connectionWaiters) {
      clearTimeout(waiter.timer)
      waiter.resolve(connectionInfo)
    }
    connectionWaiters.clear()
  }

  function _send(obj) {
    if (!ready || !ws || ws.readyState !== WebSocket.OPEN) {
      throw new Error('萌卡NT 后台尚未建立反向 WebSocket 连接')
    }
    ws.send(JSON.stringify(obj))
  }

  function buildActionMessage(action, params, id = '', accessKey = '') {
    const message = { type: 'action', ...(id ? { id } : {}), action, params }
    if (action === 'send_packet') {
      const key = String(accessKey || rawPacketAccessKey || '').trim()
      // 正常模式由框架读取已固定绑定的 Key；显式值仅用于旧插件兼容。
      if (key) message.access_key = key
    }
    return message
  }

  function setSendPacketKey(value) {
    rawPacketAccessKey = String(value || '').trim()
  }

  function handleActionResult(msg) {
    if (!msg.id || !pending.has(msg.id)) return
    const item = pending.get(msg.id)
    clearTimeout(item.timer)
    pending.delete(msg.id)
    if (item.resultMessage) {
      if (msg.ok) {
        const result = { code: 0, msg: item.resultMessage }
        if (item.resultData) result.data = msg.data
        item.resolve(result)
      } else {
        item.resolve({ code: 1, msg: msg.error || 'action failed' })
      }
    } else if (msg.ok) {
      item.resolve(msg.data)
    } else {
      item.reject(new Error(msg.error || 'action failed'))
    }
  }

  function handleActionStream(msg) {
    if (!msg.id || !pending.has(msg.id)) return
    const { onStream } = pending.get(msg.id)
    if (typeof onStream === 'function') {
      try { onStream(msg.data) } catch (e) { log.err('流式回调异常:', e) }
    }
  }

  function handleConnection(socket, req) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      socket.close(1013, '已有后台连接')
      return
    }

    ws = socket
    ready = false
    connectionInfo = {
      service: String(req.headers['x-mengka-service'] || ''),
      node_id: Number(req.headers['x-mengka-node-id'] || 0),
      mode: 'reverse',
    }

    socket.on('message', data => {
      let msg
      try { msg = JSON.parse(data.toString()) } catch { return }
      if (msg.type === 'ready') {
        ready = true
        connectionInfo = { ...connectionInfo, ...msg }
        log.ok(`后台已连接 服务=${connectionInfo.service || '-'} 节点=${connectionInfo.node_id || '-'}`)
        resolveConnectionWaiters()
      } else if (msg.type === 'event') {
        dispatchEvent(listeners, msg.data)
      } else if (msg.type === 'action_stream') {
        handleActionStream(msg)
      } else if (msg.type === 'action_result') {
        handleActionResult(msg)
      }
    })

    socket.on('close', code => {
      if (ws !== socket) return
      ws = null
      ready = false
      connectionInfo = null
      rejectPending('连接断开')
      if (!closing) log.warn(`后台连接断开 code=${code}，等待自动重连`)
    })
    socket.on('error', err => log.err('WebSocket 连接异常:', err.message))
  }

  function listen() {
    if (wss) return Promise.resolve()
    closing = false
    return new Promise((resolve, reject) => {
      const server = new WebSocketServer({
        host,
        port,
        path,
        verifyClient: ({ req }, done) => {
          if (requestToken(req) === token) done(true)
          else done(false, 401, 'Invalid token')
        },
      })
      wss = server
      server.on('connection', handleConnection)
      server.once('listening', () => {
        log.info(`反向 WebSocket 服务已监听 ws://${host}:${port}${path}`)
        resolve()
      })
      server.once('error', err => {
        if (!server.address()) wss = null
        reject(err)
      })
    })
  }

  function waitForConnection(timeoutMs = 0) {
    if (ready) return Promise.resolve(connectionInfo)
    if (closing) return Promise.reject(new Error('反向 WebSocket 服务已关闭'))
    return new Promise((resolve, reject) => {
      const waiter = { resolve, reject, timer: null }
      if (timeoutMs > 0) {
        waiter.timer = setTimeout(() => {
          connectionWaiters.delete(waiter)
          reject(new Error(`等待后台连接超时 (${timeoutMs}ms)`))
        }, timeoutMs)
      }
      connectionWaiters.add(waiter)
    })
  }

  function call(action, params, resultMessage = '', resultData = true, timeoutMs = 30000, onStream = null, accessKey = '') {
    if (!ready || !ws || ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('萌卡NT 后台尚未建立反向 WebSocket 连接'))
    }
    return new Promise((resolve, reject) => {
      const id = String(++nextId)
      let message
      try {
        message = buildActionMessage(action, params, id, accessKey)
      } catch (error) {
        reject(error)
        return
      }
      const timer = setTimeout(() => {
        pending.delete(id)
        const error = `action ${action} 超时 (${timeoutMs}ms)`
        if (resultMessage) resolve({ code: 1, msg: error })
        else reject(new Error(error))
      }, timeoutMs)
      pending.set(id, { resolve, reject, timer, resultMessage, resultData, onStream })
      _send(message)
    })
  }

  function on(eventType, fn) {
    if (!EVENTS.includes(eventType)) return
    listeners[eventType] = fn
  }

  function close() {
    closing = true
    ready = false
    rejectPending('服务已关闭')
    for (const waiter of connectionWaiters) {
      clearTimeout(waiter.timer)
      waiter.reject(new Error('反向 WebSocket 服务已关闭'))
    }
    connectionWaiters.clear()
    if (ws) ws.close(1000, 'server shutdown')
    ws = null
    connectionInfo = null
    if (!wss) return Promise.resolve()
    const server = wss
    wss = null
    return new Promise(resolve => server.close(() => resolve()))
  }

  const callAction = (action, params = {}, options = {}) => call(
    action,
    params,
    options.resultMessage || '',
    options.resultData !== false,
    options.timeout || 30000,
    options.onStream || null,
    options.accessKey || '',
  )
  const api = { on, listen, waitForConnection, close, call: callAction, callAction, setSendPacketKey }
  Object.defineProperty(api, 'connected', { enumerable: true, get: () => ready })

  for (const [apiName, def] of Object.entries(apiDefs)) {
    api[apiName] = (...args) => {
      if (def.stream) {
        const options = args[0] || {}
        const onStream = args[1]
        return call(apiName, def.build(options), def.resultMessage, def.resultData !== false, def.timeout, onStream)
      }
      const params = def.build(...args)
      if (def.wait) return call(apiName, params, def.resultMessage, def.resultData !== false, def.timeout)
      _send(buildActionMessage(apiName, params))
    }
  }

  return api
}
