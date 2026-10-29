// Generated public request contracts. Conditional requirements are enforced by the framework.
export interface ActionParams {
  add_account: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 必填条件：按协议。Android 必填；Linux 可留空，留空时登录使用二维码。 */
    "password"?: string;
    /** 已存在的设备配置 ID，大于 0。 */
    "device_profile_id": number;
    /** 1=NT，0=WTLogin；新增默认1，更新省略保留。WTLogin仅支持Android。 */
    "nt"?: number;
  };
  approve_filtered_friend_apply: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标 QQ 号。 */
    "user_id": number;
  };
  approve_friend_apply: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标 QQ 号。 */
    "user_id": number;
    /** 通知中的十进制请求 ID，必须使用字符串，避免整数精度丢失。 */
    "request_id": string;
    /** 原通知的 msg_type。 */
    "msg_type": number;
    /** 原通知的 request_type。 */
    "request_type": number;
    /** 原通知的来源 ID。 */
    "source_id"?: number;
    /** 原通知的子来源 ID。 */
    "sub_source_id"?: number;
    /** 原通知的群消息类型。 */
    "group_msg_type"?: number;
    /** 通知所选操作的附加信息，原样传入。 */
    "action_info"?: string;
    /** 好友备注。 */
    "remark"?: string;
    /** 目标群号。 */
    "group_id"?: number;
  };
  approve_group_apply: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 群系统通知中的请求编号 */
    "request_id"?: number;
    /** 群系统通知中的请求类型 */
    "request_type"?: number;
    /** 群系统通知中的附加值 */
    "request_extra"?: number;
    /** 拒绝理由或处理说明 */
    "reason"?: string;
  };
  approve_group_invite: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 上游消息序列号 */
    "msg_seq": number;
  };
  auth_qr: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 待扫码业务二维码中的 k 值 */
    "k"?: string;
    /** 是否申请 A1 凭据 */
    "need_a1"?: boolean;
    /** 是否跳过手机确认请求，默认值见扫码响应 */
    "skip_phone_confirm"?: boolean;
  };
  cache_login: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  captcha_heartbeat: {
    /** register_captcha 返回的 UUID */
    "uuid": string;
  };
  check_cache: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  check_sms: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 3：用户向指定号码发送短信；4：接收短信。 */
    "verify_type": number;
    /** 当前安全验证流程返回的 sign。 */
    "sign": string;
    /** verify_type=4 时必填；3 时不需要，服务端检查是否收到用户发送的短信。 */
    "code"?: string;
  };
  check_url_safely: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 资源地址 */
    "url"?: string;
  };
  clear_account_cache: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  comment_qzone_feed: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** get_qzone_friend_feeds 返回的完整动态对象 */
    "feed"?: Record<string, unknown>;
    /** 应用标识 */
    "feed.app_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "feed.user_id"?: Record<string, unknown>;
    /** 昵称 */
    "feed.nickname"?: Record<string, unknown>;
    /** 创建时间 */
    "feed.create_time"?: Record<string, unknown>;
    /** 动态标识 */
    "feed.feed_id"?: Record<string, unknown>;
    /** 上游动态键 */
    "feed.feeds_key"?: Record<string, unknown>;
    /** 资源地址 */
    "feed.url"?: Record<string, unknown>;
    /** 文本内容 */
    "feed.text"?: Record<string, unknown>;
    /** 原动态发布者 QQ */
    "feed.orig_uin"?: Record<string, unknown>;
    /** 原动态标识 */
    "feed.orig_tid"?: Record<string, unknown>;
    /** 动态互动信息 */
    "feed.interaction"?: Record<string, unknown>;
    /** 原转发动态，结构与 feed 相同 */
    "feed.forward"?: Record<string, unknown>;
    /** 应用标识 */
    "feed.forward.app_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "feed.forward.user_id"?: Record<string, unknown>;
    /** 昵称 */
    "feed.forward.nickname"?: Record<string, unknown>;
    /** 创建时间 */
    "feed.forward.create_time"?: Record<string, unknown>;
    /** 动态标识 */
    "feed.forward.feed_id"?: Record<string, unknown>;
    /** 上游动态键 */
    "feed.forward.feeds_key"?: Record<string, unknown>;
    /** 资源地址 */
    "feed.forward.url"?: Record<string, unknown>;
    /** 文本内容 */
    "feed.forward.text"?: Record<string, unknown>;
    /** 原动态发布者 QQ */
    "feed.forward.orig_uin"?: Record<string, unknown>;
    /** 原动态标识 */
    "feed.forward.orig_tid"?: Record<string, unknown>;
    /** 动态互动信息 */
    "feed.forward.interaction"?: Record<string, unknown>;
    /** 原转发动态，结构与 feed 相同 */
    "feed.forward.forward"?: Record<string, unknown>;
    /** 正文内容 */
    "content"?: string;
    /** 图片来源数组，最多 9 项 */
    "images"?: unknown[];
    /** 资源地址 */
    "images[].url"?: Record<string, unknown>;
    /** 像素宽度 */
    "images[].width"?: Record<string, unknown>;
    /** 像素高度 */
    "images[].height"?: Record<string, unknown>;
  };
  confirm_identity_sms: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 绑定的密保手机号。 */
    "mobile": string;
    /** 手机号区号，例如 86；无隐式默认值。 */
    "area_code": string;
  };
  create_device_profile: {
  };
  create_group: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 群名称 */
    "group_name": string;
    /** 描述文字 */
    "description"?: string;
    /** 建群选项 */
    "group_option"?: number;
    /** 群分类扩展值 */
    "group_class_ext"?: number;
    /** 群类型标识 */
    "group_type_flag"?: number;
    /** QQ 号数组 */
    "user_ids"?: unknown[];
  };
  create_group_file_folder: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 目录名称 */
    "folder_name": string;
  };
  del_group_album_media: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 相册列表返回的相册 ID */
    "album_id": string;
    /** 相册媒体列表返回的媒体位置标识 */
    "lloc": string;
  };
  delete_account: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  delete_filtered_friend_notification: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标 QQ 号。 */
    "user_id": number;
  };
  delete_friend: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
  };
  delete_group_file: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 上传接口返回的文件标识 */
    "file_id": string;
    /** 群文件业务 ID，可从文件列表获取 */
    "busid"?: number;
    /** 父目录 ID */
    "parent_folder_id"?: number;
  };
  delete_group_folder: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 群文件目录 ID，根目录为 / */
    "folder_id"?: string;
  };
  delete_group_notice: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 公告列表返回的公告 ID */
    "notice_id": string;
  };
  delete_qzone_feed: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 动态标识；发布时为新动态 ID，删除时为目标 ID */
    "tid": string;
  };
  do_group_album_comment: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 相册列表返回的相册 ID */
    "album_id": string;
    /** 相册媒体列表返回的媒体位置标识 */
    "lloc": string;
    /** 正文内容 */
    "content": string;
  };
  execute_level_tasks: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 要执行的任务名称数组，至少 1 项；可通过 level_task_management 查询当前支持项目 */
    "tasks": unknown[];
  };
  fetch_ptt_text: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
    /** 上游语音转文字格式参数 */
    "format"?: number;
  };
  file_transfer: {
    /** start_upload、write、finish、start_download、read、status 或 cleanup。 */
    "operation": string;
  };
  generate_ai_voice: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** AI 音色角色标识，来自 get_ai_characters */
    "character": string;
    /** 文本内容 */
    "text": string;
    /** 上游聊天类型参数 */
    "chat_type"?: number;
  };
  get_account_management_context: {
  };
  get_account_recent_logs: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  get_account_settings: {
  };
  get_ai_characters: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 上游聊天类型参数 */
    "chat_type"?: number;
  };
  get_bot_info: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  get_bot_list: {
  };
  get_client_key: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_contact_ark: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id"?: number;
    /** 目标群号 */
    "group_id"?: number;
    /** 联系人电话号码 */
    "phone_number"?: string;
  };
  get_device_profile_list: {
  };
  get_emoji_likes: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
    /** 表情回应 ID */
    "emoji_id"?: string;
    /** 表情回应类型 */
    "emoji_type"?: number;
    /** 上一页返回的分页游标 */
    "cookie"?: string;
    /** 读取条数 */
    "count"?: number;
  };
  get_essence_msg_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  get_filtered_friend_notifications: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 每页 1–50 条，默认 50；不能为 null。 */
    "page_size"?: number;
    /** 上次返回的标准 Base64 游标，首次省略；不能为 null。 */
    "cookie"?: string;
  };
  get_flash_image: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
    /** 消息内图片索引，从 0 开始 */
    "index"?: number;
  };
  get_friend_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_friend_msg_history: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 历史消息时间游标 */
    "last_message_time"?: number;
    /** 读取条数 */
    "count"?: number;
    /** 是否反向排序，默认 false */
    "reverse_order"?: boolean;
  };
  get_friend_requests: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 只读取可疑申请，默认 false */
    "doubt_only"?: boolean;
    /** 最多返回条数，默认 50，范围 1–100 */
    "count"?: number;
  };
  get_friend_status: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标 QQ 号。 */
    "user_id": number;
  };
  get_friend_system_notifications: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
  };
  get_friend_video_url: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 当前账号及协议收到的媒体 file_id；不能跨账号或协议复用 */
    "file_id": string;
  };
  get_friend_voice_url: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 当前账号及协议收到的媒体 file_id；不能跨账号或协议复用 */
    "file_id": string;
  };
  get_group_album_media_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 相册列表返回的相册 ID */
    "album_id": string;
    /** 上一页返回的分页游标，首次可省略 */
    "attach_info"?: string;
  };
  get_group_at_all_remain: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  get_group_file_system_info: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  get_group_files: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 群文件目录 ID，根目录为 / */
    "folder_id"?: string;
    /** 文件数量 / 列表读取数量 */
    "file_count"?: number;
  };
  get_group_forward_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 发送红包或转发资源的 QQ 号 */
    "sender_id": number;
    /** 合并转发资源标识 */
    "res_id": string;
  };
  get_group_history_messages: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 包含起始序号，默认 0。 */
    "begin_seq"?: number;
    /** 包含结束序号，默认 0。 */
    "end_seq"?: number;
  };
  get_group_honor_info: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 操作类型，见使用说明 */
    "type"?: string;
  };
  get_group_join_info: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标群号。 */
    "group_id": number;
  };
  get_group_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_group_member_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  get_group_msg_history: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 历史消息序列号游标 */
    "message_seq"?: number;
    /** 读取条数 */
    "count"?: number;
    /** 是否反向排序，默认 false */
    "reverse_order"?: boolean;
  };
  get_group_notice: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  get_group_red_packets: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  get_group_share_link: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标群号。 */
    "group_id": number;
  };
  get_group_share_messages: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标群号。 */
    "group_id": number;
  };
  get_group_signed_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  get_group_system_notifications: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_group_video_url: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 当前账号及协议收到的媒体 file_id；不能跨账号或协议复用 */
    "file_id": string;
    /** 目标群号。 */
    "group_id"?: number;
  };
  get_group_voice_url: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 当前账号及协议收到的媒体 file_id；不能跨账号或协议复用 */
    "file_id": string;
    /** 目标群号。 */
    "group_id"?: number;
  };
  get_level_tasks: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_login_qr: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
  };
  get_mini_app_ark: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 操作类型，见使用说明 */
    "type"?: string;
    /** 小程序 SDK 标识 */
    "sdk_id"?: string;
    /** 应用标识 */
    "app_id"?: string;
    /** 专属头衔 */
    "title": string;
    /** 描述文字 */
    "description"?: string;
    /** 卡片图片地址 */
    "pic_url"?: string;
    /** 跳转地址 */
    "jump_url"?: string;
    /** 网页备用跳转地址 */
    "web_url"?: string;
    /** 图标地址 */
    "icon_url"?: string;
    /** 小程序版本 ID */
    "version_id"?: string;
    /** 小程序场景值 */
    "scene"?: number;
    /** 小程序模板类型 */
    "template_type"?: number;
    /** 小程序业务类型 */
    "business_type"?: number;
    /** 小程序版本类型 */
    "ver_type"?: number;
    /** 分享类型 */
    "share_type"?: number;
    /** 是否携带分享凭据 */
    "with_share_ticket"?: number;
    /** 是否返回原始 Ark 内容结构 */
    "raw_ark_data"?: boolean;
  };
  get_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
  };
  get_music_ark: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 操作类型，见使用说明 */
    "type"?: string;
    /** 专属头衔 */
    "title": string;
    /** 正文内容 */
    "content": string;
    /** 资源地址 */
    "url": string;
    /** 音乐音频 HTTP/HTTPS 地址 */
    "audio": string;
    /** 图片来源或图片元信息 */
    "image": string;
  };
  get_node_list: {
  };
  get_plugin_context: {
  };
  get_protocol_list: {
  };
  get_ps_key: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 要获取凭据的域名 */
    "domain": string;
  };
  get_qq_classic_farm_code: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_qun_album_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 上一页返回的分页游标，首次可省略 */
    "attach_info"?: string;
  };
  get_qzone_friend_feeds: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_received_profile_likes: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 每页数量，默认 30，范围 1–53 */
    "page_size"?: number;
    /** 下一页非负十进制字符串游标 */
    "next_mid"?: string;
  };
  get_recent_contact: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 读取条数 */
    "count"?: number;
  };
  get_red_packet_info: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 发送红包或转发资源的 QQ 号 */
    "sender_id": number;
    /** 红包参数对象，详见下方结构 */
    "red_packet": Record<string, unknown>;
    /** 收到的红包标题，沿用消息事件中的值 */
    "red_packet.title"?: Record<string, unknown>;
    /** 消息事件中的红包编号 */
    "red_packet.listid"?: Record<string, unknown>;
    /** 消息事件中的红包认证键 */
    "red_packet.authkey"?: Record<string, unknown>;
    /** 上游红包通道值 */
    "red_packet.channel"?: Record<string, unknown>;
    /** 消息事件中的红包支付标识 */
    "red_packet.pay_flag"?: Record<string, unknown>;
    /** 消息事件中的红包来源标识 */
    "red_packet.hb_from"?: Record<string, unknown>;
    /** 上游消息随机数 */
    "red_packet.msg_random"?: Record<string, unknown>;
    /** 客户端序列号 */
    "red_packet.client_seq"?: Record<string, unknown>;
    /** 红包消息中的领取目标 QQ 列表 */
    "red_packet.grab_uin_list"?: Record<string, unknown>;
    /** 预领取查询返回的令牌 */
    "claim_token"?: string;
  };
  get_rkey: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_security_verify_methods: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  get_security_verify_qr: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  get_sent_profile_likes: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 每页数量，默认 30，范围 1–53 */
    "page_size"?: number;
    /** 下一页非负十进制字符串游标 */
    "next_mid"?: string;
  };
  get_skey: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
  };
  get_sms: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 3：用户向指定号码发送短信；4：接收短信。 */
    "verify_type": number;
    /** 当前安全验证流程返回的 sign。 */
    "sign": string;
  };
  get_social_lock_status: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
  };
  get_unidirectional_friend_list: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 上游分页起点 */
    "top"?: number;
    /** 读取条数 */
    "count"?: number;
    /** 上一页返回的分页游标 */
    "cookie"?: string;
  };
  get_user_agent: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  get_user_profile: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id"?: number;
    /** 只返回头像信息，默认 false */
    "avatar_only"?: boolean;
  };
  get_version_info: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  grab_group_voice_red_packet: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 发送红包或转发资源的 QQ 号 */
    "sender_id": number;
    /** 红包参数对象，详见下方结构 */
    "red_packet": Record<string, unknown>;
    /** 收到的红包标题，沿用消息事件中的值 */
    "red_packet.title"?: Record<string, unknown>;
    /** 消息事件中的红包编号 */
    "red_packet.listid"?: Record<string, unknown>;
    /** 消息事件中的红包认证键 */
    "red_packet.authkey"?: Record<string, unknown>;
    /** 上游红包通道值 */
    "red_packet.channel"?: Record<string, unknown>;
    /** 消息事件中的红包支付标识 */
    "red_packet.pay_flag"?: Record<string, unknown>;
    /** 消息事件中的红包来源标识 */
    "red_packet.hb_from"?: Record<string, unknown>;
    /** 上游消息随机数 */
    "red_packet.msg_random"?: Record<string, unknown>;
    /** 客户端序列号 */
    "red_packet.client_seq"?: Record<string, unknown>;
    /** 红包消息中的领取目标 QQ 列表 */
    "red_packet.grab_uin_list"?: Record<string, unknown>;
    /** 预领取查询返回的令牌 */
    "claim_token"?: string;
    /** 语音红包验证结果标识 */
    "voice_rate_id"?: Record<string, unknown>;
  };
  grab_red_packet: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 发送红包或转发资源的 QQ 号 */
    "sender_id": number;
    /** 红包参数对象，详见下方结构 */
    "red_packet": Record<string, unknown>;
    /** 收到的红包标题，沿用消息事件中的值 */
    "red_packet.title"?: Record<string, unknown>;
    /** 消息事件中的红包编号 */
    "red_packet.listid"?: Record<string, unknown>;
    /** 消息事件中的红包认证键 */
    "red_packet.authkey"?: Record<string, unknown>;
    /** 上游红包通道值 */
    "red_packet.channel"?: Record<string, unknown>;
    /** 消息事件中的红包支付标识 */
    "red_packet.pay_flag"?: Record<string, unknown>;
    /** 消息事件中的红包来源标识 */
    "red_packet.hb_from"?: Record<string, unknown>;
    /** 上游消息随机数 */
    "red_packet.msg_random"?: Record<string, unknown>;
    /** 客户端序列号 */
    "red_packet.client_seq"?: Record<string, unknown>;
    /** 红包消息中的领取目标 QQ 列表 */
    "red_packet.grab_uin_list"?: Record<string, unknown>;
    /** 预领取查询返回的令牌 */
    "claim_token"?: string;
  };
  invite_group_members: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** QQ 号数组 */
    "user_ids": unknown[];
    /** 来源群；0 或省略时从好友解析目标，非零时从该群成员解析 */
    "source_group_id"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  join_group: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标群号。 */
    "group_id": number;
    /** get_group_join_info 返回的入群选项 */
    "group_option"?: number;
    /** 入群来源子编号。 */
    "source_sub_id"?: number;
    /** 申请入群附言。 */
    "apply_msg"?: string;
    /** 富文本附言的标准 Base64 数据。 */
    "rich_msg"?: string;
    /** QQ 返回的入群验证参数。 */
    "auth"?: string;
    /** QQ 返回的入群令牌。 */
    "token"?: string;
    /** QQ 返回的免验证参数。 */
    "no_verify_auth"?: string;
    /** QQ 返回的附加验证数据，标准 Base64。 */
    "trans_info"?: string;
  };
  kick_group_member: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** QQ 号数组 */
    "user_ids": unknown[];
    /** 移出成员后是否拒绝其再次申请 */
    "reject_add_request": boolean;
  };
  leave_group: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  level_task_management: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** status、settings、panel 或 run。 */
    "operation": string;
    /** settings 必填，run 可选；任务名称来自 status.supported_tasks，最多 100 项。 */
    "tasks"?: unknown[];
    /** 是否启用每日自动执行；允许 tasks 为 []，空计划不会执行任务。 */
    "schedule_enabled"?: boolean;
    /** 服务器本地时间，24 小时 HH:mm。 */
    "schedule_time"?: string;
    /** 仅 panel 使用，默认 false；true 强制重新获取任务面板。 */
    "refresh"?: boolean;
    /** 涉及电脑在线任务时，可指定同 QQ、同节点已有的 Linux 实例协议 ID；省略时自动匹配。没有匹配实例时，在执行任务时自动创建 Linux 账号并尝试免扫登录；保存配置不会创建账号。同节点存在多个匹配实例时需明确指定。 */
    "pc_protocol_id"?: number;
  };
  like_qzone_feed: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** get_qzone_friend_feeds 返回的完整动态对象 */
    "feed"?: Record<string, unknown>;
    /** 应用标识 */
    "feed.app_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "feed.user_id"?: Record<string, unknown>;
    /** 昵称 */
    "feed.nickname"?: Record<string, unknown>;
    /** 创建时间 */
    "feed.create_time"?: Record<string, unknown>;
    /** 动态标识 */
    "feed.feed_id"?: Record<string, unknown>;
    /** 上游动态键 */
    "feed.feeds_key"?: Record<string, unknown>;
    /** 资源地址 */
    "feed.url"?: Record<string, unknown>;
    /** 文本内容 */
    "feed.text"?: Record<string, unknown>;
    /** 原动态发布者 QQ */
    "feed.orig_uin"?: Record<string, unknown>;
    /** 原动态标识 */
    "feed.orig_tid"?: Record<string, unknown>;
    /** 动态互动信息 */
    "feed.interaction"?: Record<string, unknown>;
    /** 原转发动态，结构与 feed 相同 */
    "feed.forward"?: Record<string, unknown>;
    /** 应用标识 */
    "feed.forward.app_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "feed.forward.user_id"?: Record<string, unknown>;
    /** 昵称 */
    "feed.forward.nickname"?: Record<string, unknown>;
    /** 创建时间 */
    "feed.forward.create_time"?: Record<string, unknown>;
    /** 动态标识 */
    "feed.forward.feed_id"?: Record<string, unknown>;
    /** 上游动态键 */
    "feed.forward.feeds_key"?: Record<string, unknown>;
    /** 资源地址 */
    "feed.forward.url"?: Record<string, unknown>;
    /** 文本内容 */
    "feed.forward.text"?: Record<string, unknown>;
    /** 原动态发布者 QQ */
    "feed.forward.orig_uin"?: Record<string, unknown>;
    /** 原动态标识 */
    "feed.forward.orig_tid"?: Record<string, unknown>;
    /** 动态互动信息 */
    "feed.forward.interaction"?: Record<string, unknown>;
    /** 原转发动态，结构与 feed 相同 */
    "feed.forward.forward"?: Record<string, unknown>;
  };
  like_user_profile: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 点赞次数 */
    "like_count"?: number;
  };
  login_account: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  login_captcha: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** register 或 request。 */
    "operation": string;
    /** 当前页面的站内代理路径，如 /captcha-proxy；不能为绝对 URL、不能含查询串或路径跳转。 */
    "proxy_base"?: string;
    /** https://t.captcha.qq.com 下的验证码地址。 */
    "url"?: string;
    /** GET（默认）或 POST。 */
    "method"?: string;
    /** 只允许 User-Agent、Accept、Accept-Language、Content-Type。 */
    "headers"?: Record<string, unknown>;
    /** 请求正文，最多 1 MiB。 */
    "body"?: string;
  };
  mark_msg_as_read: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
    /** true 标记全部缓存会话已读；不能同时传 message_id */
    "all"?: boolean;
  };
  move_group_file: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 上传接口返回的文件标识 */
    "file_id": string;
    /** 群文件业务 ID，可从文件列表获取 */
    "busid"?: number;
    /** 文件当前父目录 ID */
    "current_parent_directory"?: string;
    /** 移动后的父目录 ID */
    "target_parent_directory": string;
  };
  ntlogin_check_sms: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 3：用户向指定号码发送短信；4：接收短信。 */
    "verify_type": number;
    /** 当前安全验证流程返回的 sign。 */
    "sign": string;
    /** 必填条件：条件必填。verify_type=4 时必填；3 时不需要，服务端检查是否收到用户发送的短信。 */
    "code"?: string;
  };
  ntlogin_get_security_verify_methods: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  ntlogin_get_security_verify_qr: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  ntlogin_get_sms: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 3：用户向指定号码发送短信；4：接收短信。 */
    "verify_type": number;
    /** 当前安全验证流程返回的 sign。 */
    "sign": string;
  };
  ntlogin_login_account: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  ntlogin_query_security_verify_qr: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** get_security_verify_qr 返回的当前令牌。 */
    "guarantee_token": string;
  };
  ntlogin_submit_slider: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 腾讯验证码完成后返回的 ticket。 */
    "ticket": string;
    /** 同一次验证返回的 randstr。 */
    "randstr": string;
  };
  offline_account: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  open_account_security_access: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** QQ 安全验证方法，例如 QueryVerifyMethod、GetSMS、CheckSMS、CreateGuarantee、QueryGuaranteeStatus；支持方法随协议平台而异。 */
    "type": string;
    /** 该方法的参数；省略时为空对象。 */
    "data"?: Record<string, unknown>;
  };
  profile_operation: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 下表中的操作名。 */
    "operation": string;
    /** 操作参数，默认 {}；拒绝未知字段，整个请求上限 16 KiB。 */
    "request"?: Record<string, unknown>;
  };
  publish_qzone_feed: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 正文内容 */
    "content": string;
    /** 1 所有人；2 好友；5 仅自己；默认 1 */
    "visibility"?: number;
    /** 是否启用上游 24 小时自动删除；默认 false */
    "self_delete_after_one_day"?: boolean;
    /** 是否声明内容为 AI 生成；默认 false */
    "declare_ai_generated"?: boolean;
    /** 图片来源数组，最多 9 项 */
    "images"?: unknown[];
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_accept_invite: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_claim_task_reward: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
    /** 任务列表返回的任务 ID。 */
    "task_id": number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_confirm_invite: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_dissolve: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_get_adoption_info: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_get_info: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
    /** 上次获取外观数据的时间值，首次可省略。 */
    "appearance_last_fetch_time"?: number;
    /** 上次获取道具数据的时间值，首次可省略。 */
    "item_last_fetch_time"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_get_inventory: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
    /** 背包分类编号。 */
    "category": number;
    /** 背包子分类编号。 */
    "sub_category"?: number;
    /** 上次响应的分页游标，原样传入；首次可省略。 */
    "cookie"?: string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_get_invite_ark: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_get_tasks: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_hatch: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_report_incubation_combo: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
    /** 本次孵化连击增量。 */
    "delta": number;
    /** 本次操作序列；省略时由框架生成。 */
    "client_seq"?: string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_report_task_action: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
    /** 任务列表返回的任务 ID。 */
    "task_id": number;
    /** 任务列表返回的操作标识。 */
    "action_id"?: string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qmate_use_item: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 搭档 QQ 号。 */
    "user_id": number;
    /** 搭子类型，默认 1，必须为正整数。 */
    "qmate_type"?: number;
    /** 背包返回的道具 SKU 标识。 */
    "sku_id": string;
    /** 道具对应的形象子类型。 */
    "avatar_sub_type"?: string;
    /** 确认使用稀有皮肤，默认 false。 */
    "rare_skin_confirm"?: boolean;
    /** 确认冷却相关提示，默认 false。 */
    "cooldown_confirm"?: boolean;
    /** 确认替换其他皮肤，默认 false。 */
    "other_skin_confirm"?: boolean;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_adopt_pet: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_buy_food: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_check_user_in_gray: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_claim_daily_food: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_delete_interaction_record: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_do_after_story_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_do_care: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_encourage_pet: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 仅支持 oidb，可省略。 */
    "transport"?: string;
    /** 必填对象，包含非空字符串 pet_id 和 story_id；story_id 为真实活动实例 ID。 */
    "request": Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_encourage_story: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_equip_career: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_equip_medal: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_feeding: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_activity_options: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_activity_overview: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_bath_catalog: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_bath_inventory: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_c2c_pet_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_candidate_pets: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_care_config: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_care_supply_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_career_tree: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_clothing: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_clothing_red_dot: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_coin_bag_detail: {
    /** 在线 QQ 号。 */
    "self_id": number;
    /** Android 协议 ID。 */
    "protocol_id": number;
    /** 下方业务参数；省略时为 {}。 */
    "request"?: Record<string, unknown>;
    /** 默认 oidb，仅支持 oidb。 */
    "transport"?: string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_display_value: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_event_rule: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_feed_red_dot: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_feed_times_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_food_shop: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_home_resource: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_incr_resource: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_interaction_history: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_interaction_messages: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_medal_detail: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_medal_gallery: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_my_suits: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_numeric_metrics: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_other_pet_status_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_other_user_pet: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_page_rules: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_pet_story_status: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_pk_power: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_profile: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_reaction: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_relation_list: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_resource: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_resource_detail: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_sequence: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_story_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_story_process: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_upgrade_config: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_get_user_pet: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_heart_beat: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_like: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  qqpet_operation: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** catalog 或本页列出的业务操作名。 */
    "operation": string;
    /** 各操作的参数；最多 16 KiB，不能传 self_id、protocol_id、client_type、node_id 或未声明字段。 */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_place_order: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_poke_friend_pet: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_push_feed_msg: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_query_like_count: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_remove_one_suit: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_report_action: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_report_clothing_red_dot: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_report_event: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_report_feed_red_dot: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_report_guide: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_save_avatar: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_save_one_suit: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_set_c2c_pet_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_set_c2c_pet_switch: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_set_care_config: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_set_device_info: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_snatch_coin_bag: {
    /** 在线 QQ 号。 */
    "self_id": number;
    /** Android 协议 ID。 */
    "protocol_id": number;
    /** 下方业务参数；省略时为 {}。 */
    "request"?: Record<string, unknown>;
    /** 默认 oidb，仅支持 oidb。 */
    "transport"?: string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_start_story: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_unequip_medal: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_update_profile: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  qqpet_use_bath_item: {
    /** 当前节点的账号 QQ 号 */
    "self_id": number;
    /** Android 协议配置 ID */
    "protocol_id": number;
    /** 默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso */
    "transport"?: string;
    /** 下表业务字段；省略时为 {} */
    "request"?: Record<string, unknown>;
  };
  query_login_qr: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  query_security_verify_qr: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** get_security_verify_qr 返回的当前令牌。 */
    "guarantee_token": string;
  };
  recall_friend_msg: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标 QQ 号。 */
    "user_id": number;
    /** 原消息的消息序列，0 是有效值。 */
    "msg_seq": number;
    /** 原消息的随机值，0 是有效值。 */
    "msg_random": number;
    /** 原消息的 Unix 秒时间戳，必须大于 0。 */
    "msg_time": number;
    /** 原消息的客户端序列，0 是有效值。 */
    "client_seq": number;
  };
  recall_group_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 上游消息序列号 */
    "msg_seq": number;
    /** 上游消息随机数 */
    "msg_random": number;
  };
  recall_message: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
  };
  register_captcha: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 本次账号登录返回的滑块地址 */
    "slider_url": string;
  };
  reject_friend_apply: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 目标 QQ 号。 */
    "user_id": number;
    /** 通知中的十进制请求 ID，必须使用字符串，避免整数精度丢失。 */
    "request_id": string;
    /** 原通知的 msg_type。 */
    "msg_type": number;
    /** 原通知的 request_type。 */
    "request_type": number;
    /** 原通知的来源 ID。 */
    "source_id"?: number;
    /** 原通知的子来源 ID。 */
    "sub_source_id"?: number;
    /** 原通知的群消息类型。 */
    "group_msg_type"?: number;
    /** 通知所选操作的附加信息，原样传入。 */
    "action_info"?: string;
    /** 好友备注。 */
    "remark"?: string;
    /** 目标群号。 */
    "group_id"?: number;
    /** 拒绝时是否加入黑名单，默认 false。 */
    "blacklist"?: boolean;
  };
  reject_group_apply: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 群系统通知中的请求编号 */
    "request_id"?: number;
    /** 群系统通知中的请求类型 */
    "request_type"?: number;
    /** 群系统通知中的附加值 */
    "request_extra"?: number;
    /** 拒绝理由或处理说明 */
    "reason"?: string;
  };
  rename_group_file: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 上传接口返回的文件标识 */
    "file_id": string;
    /** 群文件业务 ID，可从文件列表获取 */
    "busid"?: number;
    /** 文件当前父目录 ID */
    "current_parent_directory"?: string;
    /** 新的文件名 */
    "new_name": string;
  };
  retry_account_identity_verify: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 继续登录类型，默认 0；应与当前验证步骤匹配。 */
    "login_type"?: number;
    /** 该登录类型需要的附加值，例如 ticket/randstr 或 verify_sign。 */
    "extra"?: Record<string, unknown>;
  };
  retry_account_security_verify: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 继续登录类型，默认 0；应与当前验证步骤匹配。 */
    "login_type"?: number;
    /** 该登录类型需要的附加值，例如 ticket/randstr 或 verify_sign。 */
    "extra"?: Record<string, unknown>;
  };
  scan_qr: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 待扫码业务二维码中的 k 值 */
    "k"?: string;
  };
  sdk_auth_api: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 第三方应用客户端 ID */
    "client_id"?: number;
    /** 应用授权响应类型 */
    "response_type"?: string;
    /** 申请的开放 API 权限列表 */
    "openapi"?: unknown[];
    /** 平台标识 */
    "pf"?: string;
    /** 支付授权选项 */
    "need_pay"?: number;
    /** 签名资料或授权签名 */
    "sign"?: string;
    /** SDK 版本 */
    "sdkv"?: string;
    /** SDK 平台 */
    "sdkp"?: string;
    /** 业务时间戳 */
    "time"?: number;
    /** 授权透传数据 */
    "pass_data"?: string;
    /** 应用唯一标识 */
    "app_unique_identifier"?: string;
    /** 授权来源标识 */
    "referer"?: number;
    /** 授权业务标识 */
    "vid"?: number;
    /** URL 编码的业务数据 */
    "url_encoded_data"?: string;
    /** 授权类型 */
    "auth_type"?: number;
  };
  send_friend_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 消息段数组，结构见消息段参考 */
    "message"?: unknown[];
    /** 当前账号消息缓存中的引用编号，与 message 二选一 */
    "source_message_id"?: number;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  send_friend_request: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 消息段数组，结构见消息段参考 */
    "message"?: string;
    /** 备注；允许清除时传空字符串 */
    "remark"?: string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  send_group_join_request: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 消息段数组，结构见消息段参考 */
    "message"?: string;
  };
  send_group_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 消息段数组，结构见消息段参考 */
    "message"?: unknown[];
    /** 当前账号消息缓存中的引用编号，与 message 二选一 */
    "source_message_id"?: number;
  };
  send_group_notice: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 正文内容 */
    "content"?: string;
    /** 图片来源或图片元信息 */
    "image"?: string;
  };
  send_group_red_packet: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 红包参数对象，详见下方结构 */
    "red_packet": Record<string, unknown>;
    /** 操作类型，见使用说明 */
    "red_packet.type"?: Record<string, unknown>;
    /** 红包总金额，单位分 */
    "red_packet.total_amount"?: Record<string, unknown>;
    /** 红包总份数 */
    "red_packet.total_num"?: Record<string, unknown>;
    /** 祝福语 */
    "red_packet.wishing"?: Record<string, unknown>;
    /** 专属红包接收 QQ 列表 */
    "red_packet.target_user_ids"?: Record<string, unknown>;
    /** 支付密码，仅实际支付时使用 */
    "payment_password"?: string;
    /** 默认 false；true 创建订单但不付款 */
    "dry_run"?: boolean;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  send_group_temp_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 消息段数组，结构见消息段参考 */
    "message": unknown[];
  };
  send_packet: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** SSO 命令名称 */
    "cmd"?: string;
    /** 内容对象 */
    "data"?: string;
    /** 是否等待上游响应，默认 true */
    "rsp"?: boolean;
  };
  send_poke: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id"?: number;
    /** 目标 QQ 号 */
    "user_id"?: number;
  };
  set_friend_remark: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 备注；允许清除时传空字符串 */
    "remark": string;
  };
  set_friend_request: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 申请列表返回的请求键 */
    "request_key": string;
    /** true 同意，false 拒绝 */
    "approve": boolean;
    /** 备注；允许清除时传空字符串 */
    "remark"?: string;
  };
  set_group_add_option: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 群申请加入方式 */
    "add_type": number;
    /** group question */
    "group_question"?: string;
    /** group answer */
    "group_answer"?: string;
  };
  set_group_admin: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** true 设置管理员，false 取消 */
    "set_admin": boolean;
  };
  set_group_album_media_like: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 相册列表返回的相册 ID */
    "album_id": string;
    /** 相册媒体的批次标识 */
    "batch_id"?: string;
    /** 相册媒体列表返回的媒体位置标识 */
    "lloc": string;
    /** true 点赞，false 取消点赞 */
    "like"?: boolean;
  };
  set_group_card: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 群名片；空字符串清除 */
    "card": string;
  };
  set_group_essence: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
    /** true 设置，false 取消 */
    "enabled": boolean;
  };
  set_group_member_invite_policy: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** policy */
    "policy": string;
  };
  set_group_member_permissions: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** permission */
    "permission": string;
    /** 是否允许指定成员权限 */
    "allow": boolean;
  };
  set_group_mute: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 禁言秒数；0 解除禁言 */
    "duration_sec": number;
  };
  set_group_mute_all: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** true 全员禁言，false 解除 */
    "mute": boolean;
  };
  set_group_name: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 群名称 */
    "group_name"?: string;
  };
  set_group_new_member_history_visibility: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 是否允许新成员查看历史消息 */
    "visible": boolean;
  };
  set_group_portrait: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 文件来源；受媒体目录权限约束，可使用 transfer:// 引用 */
    "file": string;
  };
  set_group_robot_add_option: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 机器人入群开关值 */
    "robot_member_switch"?: number;
    /** 机器人入群审核开关值 */
    "robot_member_examine"?: number;
  };
  set_group_search: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 群名称搜索开关值 */
    "no_finger_open"?: number;
    /** 群号搜索开关值 */
    "no_code_finger_open"?: number;
  };
  set_group_special_title: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 专属头衔 */
    "title": string;
  };
  set_input_status: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 输入状态事件类型 */
    "event_type"?: number;
  };
  set_msg_emoji_like: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 消息事件或发送结果中的框架消息编号 */
    "message_id": number;
    /** 表情回应 ID */
    "emoji_id"?: string;
    /** true 添加表情回应，false 取消 */
    "set": boolean;
    /** 表情回应类型 */
    "emoji_type"?: number;
  };
  set_qq_avatar: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 文件来源；本地文件须在管理员允许的媒体目录内，或使用 transfer:// 引用 */
    "file_path": string;
  };
  sign_group: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
  };
  submit_identity_captcha: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 腾讯验证码完成后返回的 ticket。 */
    "ticket": string;
    /** 同一次验证返回的 randstr。 */
    "randstr": string;
  };
  submit_identity_phone: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 绑定的密保手机号。 */
    "mobile": string;
    /** 手机号区号，例如 86；无隐式默认值。 */
    "area_code": string;
  };
  submit_slider: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 腾讯验证码完成后返回的 ticket。 */
    "ticket": string;
    /** 同一次验证返回的 randstr。 */
    "randstr": string;
  };
  translate_en2zh: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 待翻译文本数组或翻译结果 */
    "words"?: unknown[];
  };
  unlike_qzone_feed: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** get_qzone_friend_feeds 返回的完整动态对象 */
    "feed"?: Record<string, unknown>;
    /** 应用标识 */
    "feed.app_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "feed.user_id"?: Record<string, unknown>;
    /** 昵称 */
    "feed.nickname"?: Record<string, unknown>;
    /** 创建时间 */
    "feed.create_time"?: Record<string, unknown>;
    /** 动态标识 */
    "feed.feed_id"?: Record<string, unknown>;
    /** 上游动态键 */
    "feed.feeds_key"?: Record<string, unknown>;
    /** 资源地址 */
    "feed.url"?: Record<string, unknown>;
    /** 文本内容 */
    "feed.text"?: Record<string, unknown>;
    /** 原动态发布者 QQ */
    "feed.orig_uin"?: Record<string, unknown>;
    /** 原动态标识 */
    "feed.orig_tid"?: Record<string, unknown>;
    /** 动态互动信息 */
    "feed.interaction"?: Record<string, unknown>;
    /** 原转发动态，结构与 feed 相同 */
    "feed.forward"?: Record<string, unknown>;
    /** 应用标识 */
    "feed.forward.app_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "feed.forward.user_id"?: Record<string, unknown>;
    /** 昵称 */
    "feed.forward.nickname"?: Record<string, unknown>;
    /** 创建时间 */
    "feed.forward.create_time"?: Record<string, unknown>;
    /** 动态标识 */
    "feed.forward.feed_id"?: Record<string, unknown>;
    /** 上游动态键 */
    "feed.forward.feeds_key"?: Record<string, unknown>;
    /** 资源地址 */
    "feed.forward.url"?: Record<string, unknown>;
    /** 文本内容 */
    "feed.forward.text"?: Record<string, unknown>;
    /** 原动态发布者 QQ */
    "feed.forward.orig_uin"?: Record<string, unknown>;
    /** 原动态标识 */
    "feed.forward.orig_tid"?: Record<string, unknown>;
    /** 动态互动信息 */
    "feed.forward.interaction"?: Record<string, unknown>;
    /** 原转发动态，结构与 feed 相同 */
    "feed.forward.forward"?: Record<string, unknown>;
  };
  update_account: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 更新后的协议 ID；不变时也需显式传原 ID。 */
    "new_protocol_id": number;
    /** 必填条件：按协议。Android 必填；Linux 可留空，留空时登录使用二维码。 */
    "password"?: string;
    /** 已存在的设备配置 ID，大于 0。 */
    "device_profile_id": number;
    /** 1=NT，0=WTLogin；新增默认1，更新省略保留。WTLogin仅支持Android。 */
    "nt"?: number;
  };
  upload_friend_forward_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id"?: number;
    /** 是否在上传后发送转发消息；默认 false */
    "send"?: boolean;
    /** 转发节点数组，详见下方结构 */
    "messages": unknown[];
    /** 当前账号消息缓存中的引用编号，与 message 二选一 */
    "messages[].source_message_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "messages[].user_id"?: Record<string, unknown>;
    /** 昵称 */
    "messages[].nickname"?: Record<string, unknown>;
    /** 消息段数组，结构见消息段参考 */
    "messages[].message"?: Record<string, unknown>;
    /** 业务时间戳 */
    "messages[].time"?: Record<string, unknown>;
  };
  upload_friend_image: {
    /** 当前插件节点内的在线 QQ 账号。 */
    "self_id": number;
    /** 账号协议 ID，须显式提供；0 是有效 ID。 */
    "protocol_id": number;
    /** 目标 QQ 号，不能用 UID 替代。 */
    "user_id": number;
    /** 普通好友会话省略或传 0；群临时会话传共同群号，此时发送方与目标须在该群且具有临时会话权限。 */
    "group_id"?: number;
    /** 本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。 */
    "file_path": string;
  };
  upload_friend_video: {
    /** 当前插件节点内的在线 QQ 账号。 */
    "self_id": number;
    /** 账号协议 ID，须显式提供；0 是有效 ID。 */
    "protocol_id": number;
    /** 目标 QQ 号，不能用 UID 替代。 */
    "user_id": number;
    /** 普通好友会话省略或传 0；群临时会话传共同群号，此时发送方与目标须在该群且具有临时会话权限。 */
    "group_id"?: number;
    /** 本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。 */
    "file_path": string;
  };
  upload_friend_voice: {
    /** 当前插件节点内的在线 QQ 账号。 */
    "self_id": number;
    /** 账号协议 ID，须显式提供；0 是有效 ID。 */
    "protocol_id": number;
    /** 目标 QQ 号，不能用 UID 替代。 */
    "user_id": number;
    /** 普通好友会话省略或传 0；群临时会话传共同群号，此时发送方与目标须在该群且具有临时会话权限。 */
    "group_id"?: number;
    /** 本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。 */
    "file_path"?: string;
    /** 完整音频的 Base64，与 file_path 不能同时提供。支持纯 Base64、base64:// 前缀和 Base64 data URL。 */
    "base64"?: string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  upload_group_file: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 文件来源；受媒体目录权限约束，可使用 transfer:// 引用 */
    "file": string;
    /** 上传后显示的文件名 */
    "name": string;
    /** 群文件目录 ID，根目录为 / */
    "folder_id"?: string;
    /** 是否执行文件上传，默认 true */
    "upload_file"?: boolean;
  };
  upload_group_forward_msg: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 是否在上传后发送转发消息；默认 false */
    "send"?: boolean;
    /** 转发节点数组，详见下方结构 */
    "messages": unknown[];
    /** 当前账号消息缓存中的引用编号，与 message 二选一 */
    "messages[].source_message_id"?: Record<string, unknown>;
    /** 目标 QQ 号 */
    "messages[].user_id"?: Record<string, unknown>;
    /** 昵称 */
    "messages[].nickname"?: Record<string, unknown>;
    /** 消息段数组，结构见消息段参考 */
    "messages[].message"?: Record<string, unknown>;
    /** 业务时间戳 */
    "messages[].time"?: Record<string, unknown>;
  };
  upload_group_image: {
    /** 当前插件节点内的在线 QQ 账号。 */
    "self_id": number;
    /** 账号协议 ID，须显式提供；0 是有效 ID。 */
    "protocol_id": number;
    /** 目标群号。 */
    "group_id": number;
    /** 本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。 */
    "file_path": string;
  };
  upload_group_video: {
    /** 当前插件节点内的在线 QQ 账号。 */
    "self_id": number;
    /** 账号协议 ID，须显式提供；0 是有效 ID。 */
    "protocol_id": number;
    /** 目标群号。 */
    "group_id": number;
    /** 本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。 */
    "file_path": string;
  };
  upload_group_voice: {
    /** 当前插件节点内的在线 QQ 账号。 */
    "self_id": number;
    /** 账号协议 ID，须显式提供；0 是有效 ID。 */
    "protocol_id": number;
    /** 目标群号。 */
    "group_id": number;
    /** 本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。 */
    "file_path"?: string;
    /** 完整音频的 Base64，与 file_path 不能同时提供。支持纯 Base64、base64:// 前缀和 Base64 data URL。 */
    "base64"?: string;
  };
  upload_image_to_qun_album: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标群号 */
    "group_id": number;
    /** 相册列表返回的相册 ID */
    "album_id": string;
    /** 相册名称 */
    "album_name"?: string;
    /** 文件来源；受媒体目录权限约束，可使用 transfer:// 引用 */
    "file": string;
  };
  /** @deprecated 该 API 已移除，调用将拒绝并返回 API_REMOVED。 */
  upload_private_file: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 目标 QQ 号 */
    "user_id": number;
    /** 文件来源；受媒体目录权限约束，可使用 transfer:// 引用 */
    "file": string;
    /** 上传后显示的文件名 */
    "name": string;
  };
  upload_red_packet_voice: {
    /** 当前服务节点内的账号 QQ 号 */
    "self_id": number;
    /** 账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID */
    "protocol_id": number;
    /** 红包参数对象，详见下方结构 */
    "red_packet": Record<string, unknown>;
    /** 收到的红包标题，沿用消息事件中的值 */
    "red_packet.title"?: Record<string, unknown>;
    /** 消息事件中的红包编号 */
    "red_packet.listid"?: Record<string, unknown>;
    /** 消息事件中的红包认证键 */
    "red_packet.authkey"?: Record<string, unknown>;
    /** 上游红包通道值 */
    "red_packet.channel"?: Record<string, unknown>;
    /** 消息事件中的红包支付标识 */
    "red_packet.pay_flag"?: Record<string, unknown>;
    /** 消息事件中的红包来源标识 */
    "red_packet.hb_from"?: Record<string, unknown>;
    /** 上游消息随机数 */
    "red_packet.msg_random"?: Record<string, unknown>;
    /** 客户端序列号 */
    "red_packet.client_seq"?: Record<string, unknown>;
    /** 红包消息中的领取目标 QQ 列表 */
    "red_packet.grab_uin_list"?: Record<string, unknown>;
    /** 发送红包或转发资源的 QQ 号 */
    "sender_id": number;
    /** 文件来源；本地文件须在管理员允许的媒体目录内，或使用 transfer:// 引用 */
    "file_path"?: string;
    /** 音频 Base64 内容，与 file_path 二选一 */
    "base64"?: string;
  };
  wtlogin_check_sms: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
    /** 收到的短信验证码 */
    "code": string;
  };
  wtlogin_get_security_verify_methods: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  wtlogin_get_sms: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 明确选择账号协议，0 有效；使用 get_protocol_list 查询。 */
    "protocol_id": number;
  };
  wtlogin_login_account: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
  };
  wtlogin_submit_slider: {
    /** 当前插件节点内的 QQ 号，5–10 位整数。 */
    "self_id": number;
    /** 账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。 */
    "protocol_id": number;
    /** 腾讯验证码完成后返回的 ticket。 */
    "ticket": string;
    /** 同一次验证返回的 randstr。 */
    "randstr": string;
  };
  set_account_delegation: {
    /** QQ 号，10000–9999999999。 */
    "self_id": number;
    /** 账号协议 ID，必须显式提供，0 有效。 */
    "protocol_id": number;
    /** 当前账号绑定的设备指纹 ID。 */
    "device_profile_id": number;
    /** 8–128 位字母、数字、下划线、点或连字符；发送前持久保存的幂等标识。 */
    "request_id": string;
    /** 首次创建传 0；更新传最近返回的修订号。 */
    "revision": number;
    /** 是否允许登录，必须显式提供。 */
    "allow_login": boolean;
    /** 是否允许执行等级任务，必须显式提供。 */
    "allow_tasks": boolean;
    /** UTC Unix 秒，范围 0–253402300799；任一允许项为 true 时必须为未来时间。 */
    "expires_at": number;
    /** 首次省略或传空；更新必须传原始凭据。 */
    "receipt"?: string;
  };
  get_account_delegation: {
    /** 框架返回的原始委托凭据。 */
    "receipt": string;
  };
  release_account_delegation: {
    /** 本安装实例持有的原始委托凭据。 */
    "receipt": string;
    /** 最近读取的修订号，至少为 1。 */
    "revision": number;
  };
}
export type ActionName = keyof ActionParams;
export type ActionMethods = { [K in ActionName]: (params: ActionParams[K], options?: CallOptions) => Promise<unknown> };
export interface CallOptions { timeoutMs?: number; signal?: AbortSignal }
