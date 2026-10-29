// Generated from reviewed public API contracts. Do not hand edit.
function freeze(value) { if (value && typeof value === 'object') { for (const item of Object.values(value)) freeze(item); Object.freeze(value) } return value }
export const API_CONTRACTS = freeze({
  "add_account": {
    "description": "在当前节点创建离线账号实例。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "password",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "必填条件：按协议。Android 必填；Linux 可留空，留空时登录使用二维码。"
      },
      {
        "name": "device_profile_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "已存在的设备配置 ID，大于 0。"
      },
      {
        "name": "nt",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "1=NT，0=WTLogin；新增默认1，更新省略保留。WTLogin仅支持Android。"
      }
    ]
  },
  "approve_filtered_friend_apply": {
    "description": "同意过滤好友申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标 QQ 号。"
      }
    ]
  },
  "approve_friend_apply": {
    "description": "同意好友申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标 QQ 号。"
      },
      {
        "name": "request_id",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "通知中的十进制请求 ID，必须使用字符串，避免整数精度丢失。"
      },
      {
        "name": "msg_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原通知的 msg_type。"
      },
      {
        "name": "request_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原通知的 request_type。"
      },
      {
        "name": "source_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "原通知的来源 ID。"
      },
      {
        "name": "sub_source_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "原通知的子来源 ID。"
      },
      {
        "name": "group_msg_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "原通知的群消息类型。"
      },
      {
        "name": "action_info",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "通知所选操作的附加信息，原样传入。"
      },
      {
        "name": "remark",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "好友备注。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "目标群号。"
      }
    ]
  },
  "approve_group_apply": {
    "description": "同意入群申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "request_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群系统通知中的请求编号"
      },
      {
        "name": "request_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群系统通知中的请求类型"
      },
      {
        "name": "request_extra",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群系统通知中的附加值"
      },
      {
        "name": "reason",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "拒绝理由或处理说明"
      }
    ]
  },
  "approve_group_invite": {
    "description": "同意好友发来的群聊邀请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "msg_seq",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "上游消息序列号"
      }
    ]
  },
  "auth_qr": {
    "description": "使用在线 Android Bot 确认一个已经扫描的 QQ 登录二维码。通常在 [`scan_qr`](/nt/api/scan_qr.html) 返回可确认状态后调用。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "k",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "待扫码业务二维码中的 k 值"
      },
      {
        "name": "need_a1",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否申请 A1 凭据"
      },
      {
        "name": "skip_phone_confirm",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否跳过手机确认请求，默认值见扫码响应"
      }
    ]
  },
  "cache_login": {
    "description": "使用保存的会话缓存登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "captcha_heartbeat": {
    "description": "查询滑块验证结果。",
    "params": [
      {
        "name": "uuid",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "register_captcha 返回的 UUID"
      }
    ]
  },
  "check_cache": {
    "description": "检查指定账号是否保存了登录缓存。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "check_sms": {
    "description": "检查短信验证，并在通过后继续登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "verify_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "3：用户向指定号码发送短信；4：接收短信。"
      },
      {
        "name": "sign",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前安全验证流程返回的 sign。"
      },
      {
        "name": "code",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "verify_type=4 时必填；3 时不需要，服务端检查是否收到用户发送的短信。"
      }
    ]
  },
  "check_url_safely": {
    "description": "使用当前在线 Android QQ 登录态，请求 QQ 服务器判断网址安全等级。该接口会返回真实的服务端判定，不使用固定的“安全”占位值。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "url",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      }
    ]
  },
  "clear_account_cache": {
    "description": "清除离线账号的本地登录缓存。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "comment_qzone_feed": {
    "description": "评论一条好友 QQ 空间动态，支持纯文字、纯图片及图文同时发送。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "feed",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "get_qzone_friend_feeds 返回的完整动态对象"
      },
      {
        "name": "feed.app_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "应用标识"
      },
      {
        "name": "feed.user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "feed.nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "feed.create_time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "创建时间"
      },
      {
        "name": "feed.feed_id",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "动态标识"
      },
      {
        "name": "feed.feeds_key",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "上游动态键"
      },
      {
        "name": "feed.url",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      },
      {
        "name": "feed.text",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "文本内容"
      },
      {
        "name": "feed.orig_uin",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "原动态发布者 QQ"
      },
      {
        "name": "feed.orig_tid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "原动态标识"
      },
      {
        "name": "feed.interaction",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "动态互动信息"
      },
      {
        "name": "feed.forward",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "原转发动态，结构与 feed 相同"
      },
      {
        "name": "feed.forward.app_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "应用标识"
      },
      {
        "name": "feed.forward.user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "feed.forward.nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "feed.forward.create_time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "创建时间"
      },
      {
        "name": "feed.forward.feed_id",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "动态标识"
      },
      {
        "name": "feed.forward.feeds_key",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "上游动态键"
      },
      {
        "name": "feed.forward.url",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      },
      {
        "name": "feed.forward.text",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "文本内容"
      },
      {
        "name": "feed.forward.orig_uin",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "原动态发布者 QQ"
      },
      {
        "name": "feed.forward.orig_tid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "原动态标识"
      },
      {
        "name": "feed.forward.interaction",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "动态互动信息"
      },
      {
        "name": "feed.forward.forward",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "原转发动态，结构与 feed 相同"
      },
      {
        "name": "content",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "正文内容"
      },
      {
        "name": "images",
        "type": "array",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "图片来源数组，最多 9 项"
      },
      {
        "name": "images[].url",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      },
      {
        "name": "images[].width",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "像素宽度"
      },
      {
        "name": "images[].height",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "像素高度"
      }
    ]
  },
  "confirm_identity_sms": {
    "description": "确认用户已发送身份验证短信，并继续当前登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "mobile",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "绑定的密保手机号。"
      },
      {
        "name": "area_code",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "手机号区号，例如 86；无隐式默认值。"
      }
    ]
  },
  "create_device_profile": {
    "description": "随机创建并保存一个完整设备指纹，返回可用于账号绑定的 ID。",
    "params": []
  },
  "create_group": {
    "description": "使用当前在线的安卓协议 Bot 创建普通 QQ 群。底层按 QQ 9.2.70 的创建群链路执行：先创建群聊，再按需邀请成员。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_name",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "群名称"
      },
      {
        "name": "description",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "描述文字"
      },
      {
        "name": "group_option",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "建群选项"
      },
      {
        "name": "group_class_ext",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群分类扩展值"
      },
      {
        "name": "group_type_flag",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群类型标识"
      },
      {
        "name": "user_ids",
        "type": "array",
        "typeLabel": "`integer[]`",
        "required": false,
        "description": "QQ 号数组"
      }
    ]
  },
  "create_group_file_folder": {
    "description": "在群文件根目录创建文件夹。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "folder_name",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "目录名称"
      }
    ]
  },
  "del_group_album_media": {
    "description": "删除群相册中的图片或视频。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "album_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册列表返回的相册 ID"
      },
      {
        "name": "lloc",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册媒体列表返回的媒体位置标识"
      }
    ]
  },
  "delete_account": {
    "description": "删除当前节点的离线账号实例。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "delete_filtered_friend_notification": {
    "description": "删除过滤好友通知。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标 QQ 号。"
      }
    ]
  },
  "delete_friend": {
    "description": "删除指定好友。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      }
    ]
  },
  "delete_group_file": {
    "description": "删除指定群文件。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "file_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "上传接口返回的文件标识"
      },
      {
        "name": "busid",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群文件业务 ID，可从文件列表获取"
      },
      {
        "name": "parent_folder_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "父目录 ID"
      }
    ]
  },
  "delete_group_folder": {
    "description": "删除指定群文件夹。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "folder_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "群文件目录 ID，根目录为 /"
      }
    ]
  },
  "delete_group_notice": {
    "description": "删除指定群公告。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "notice_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "公告列表返回的公告 ID"
      }
    ]
  },
  "delete_qzone_feed": {
    "description": "删除当前账号发布的指定 QQ 空间动态。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "tid",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "动态标识；发布时为新动态 ID，删除时为目标 ID"
      }
    ]
  },
  "do_group_album_comment": {
    "description": "评论群相册中的指定媒体。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "album_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册列表返回的相册 ID"
      },
      {
        "name": "lloc",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册媒体列表返回的媒体位置标识"
      },
      {
        "name": "content",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "正文内容"
      }
    ]
  },
  "execute_level_tasks": {
    "description": "按数组顺序执行等级任务。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "tasks",
        "type": "array",
        "typeLabel": "`string[]`",
        "required": true,
        "description": "要执行的任务名称数组，至少 1 项；可通过 level_task_management 查询当前支持项目"
      }
    ]
  },
  "fetch_ptt_text": {
    "description": "识别框架近期收到并缓存的群语音文字。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      },
      {
        "name": "format",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游语音转文字格式参数"
      }
    ]
  },
  "file_transfer": {
    "description": "在插件与框架之间分片上传、下载和读取文件。",
    "params": [
      {
        "name": "operation",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "start_upload、write、finish、start_download、read、status 或 cleanup。"
      }
    ]
  },
  "generate_ai_voice": {
    "description": "生成 AI 语音。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "character",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "AI 音色角色标识，来自 get_ai_characters"
      },
      {
        "name": "text",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "文本内容"
      },
      {
        "name": "chat_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游聊天类型参数"
      }
    ]
  },
  "get_account_management_context": {
    "description": "一次读取当前节点的账号、协议、设备与节点信息。",
    "params": []
  },
  "get_account_recent_logs": {
    "description": "读取账号最近 24 小时的运行日志。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "get_account_settings": {
    "description": "读取框架公开的账号行为设置。",
    "params": []
  },
  "get_ai_characters": {
    "description": "获取指定群聊当前可用的 AI 声音角色。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "chat_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游聊天类型参数"
      }
    ]
  },
  "get_bot_info": {
    "description": "获取指定账号实例的运行信息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "get_bot_list": {
    "description": "获取当前节点的全部账号实例，包括离线账号。",
    "params": []
  },
  "get_client_key": {
    "description": "获取指定协议下当前 Bot 的 clientkey。支持 Android 9.1.70 和 Linux 3.2.32。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_contact_ark": {
    "description": "获取好友或群的联系人分享卡片。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标群号"
      },
      {
        "name": "phone_number",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "联系人电话号码"
      }
    ]
  },
  "get_device_profile_list": {
    "description": "获取可选择的设备配置。",
    "params": []
  },
  "get_emoji_likes": {
    "description": "自动翻页获取群消息指定表情的全部回应用户。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      },
      {
        "name": "emoji_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "表情回应 ID"
      },
      {
        "name": "emoji_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "表情回应类型"
      },
      {
        "name": "cookie",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "上一页返回的分页游标"
      },
      {
        "name": "count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "读取条数"
      }
    ]
  },
  "get_essence_msg_list": {
    "description": "获取指定群聊的精华消息列表。框架使用当前账号的登录态读取 QQ 群精华服务，自动读取分页。插件不需要提供 Cookie、SKey 或 PsKey，框架也不会把这些凭据返回给插件。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "get_filtered_friend_notifications": {
    "description": "获取过滤好友通知。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "page_size",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "每页 1–50 条，默认 50；不能为 null。"
      },
      {
        "name": "cookie",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "上次返回的标准 Base64 游标，首次省略；不能为 null。"
      }
    ]
  },
  "get_flash_image": {
    "description": "- action：`get_flash_image`",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      },
      {
        "name": "index",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息内图片索引，从 0 开始"
      }
    ]
  },
  "get_friend_list": {
    "description": "获取 Bot 的完整好友列表。萌卡NT会自动完成分页。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_friend_msg_history": {
    "description": "从 QQ 服务器读取指定好友的一日漫游消息。该接口使用 Android QQ 的 `MessageSvc.PbGetOneDayRoamMsg`，返回结构与实时好友消息一致。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "last_message_time",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "历史消息时间游标"
      },
      {
        "name": "count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "读取条数"
      },
      {
        "name": "reverse_order",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否反向排序，默认 false"
      }
    ]
  },
  "get_friend_requests": {
    "description": "获取当前账号的好友申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "doubt_only",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "只读取可疑申请，默认 false"
      },
      {
        "name": "count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "最多返回条数，默认 50，范围 1–100"
      }
    ]
  },
  "get_friend_status": {
    "description": "查询好友状态。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标 QQ 号。"
      }
    ]
  },
  "get_friend_system_notifications": {
    "description": "获取好友系统通知。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      }
    ]
  },
  "get_friend_video_url": {
    "description": "获取好友视频地址。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "file_id",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前账号及协议收到的媒体 file_id；不能跨账号或协议复用"
      }
    ]
  },
  "get_friend_voice_url": {
    "description": "获取好友语音地址。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "file_id",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前账号及协议收到的媒体 file_id；不能跨账号或协议复用"
      }
    ]
  },
  "get_group_album_media_list": {
    "description": "分页获取指定群相册中的图片和视频。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "album_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册列表返回的相册 ID"
      },
      {
        "name": "attach_info",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "上一页返回的分页游标，首次可省略"
      }
    ]
  },
  "get_group_at_all_remain": {
    "description": "查询当前 QQ 在指定群聊中使用 `@全体成员` 的权限与剩余次数。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "get_group_file_system_info": {
    "description": "获取群文件数量限制和存储空间使用情况。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "get_group_files": {
    "description": "使用指定 Android 或 Linux QQ 在线会话获取群文件根目录。接口会自动处理 QQ 服务端分页，并分别返回文件与文件夹。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "folder_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "群文件目录 ID，根目录为 /"
      },
      {
        "name": "file_count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "文件数量 / 列表读取数量"
      }
    ]
  },
  "get_group_forward_msg": {
    "description": "获取群聊合并转发消息的完整内容。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "sender_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "发送红包或转发资源的 QQ 号"
      },
      {
        "name": "res_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "合并转发资源标识"
      }
    ]
  },
  "get_group_history_messages": {
    "description": "读取指定序号范围的普通群历史消息，按序号升序返回。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "begin_seq",
        "type": "number",
        "typeLabel": "integer",
        "required": false,
        "description": "包含起始序号，默认 0。"
      },
      {
        "name": "end_seq",
        "type": "number",
        "typeLabel": "integer",
        "required": false,
        "description": "包含结束序号，默认 0。"
      }
    ]
  },
  "get_group_honor_info": {
    "description": "获取指定群聊的实时荣誉榜单。接口使用萌卡 NT 当前账号的 Android 登录态访问 QQ 官方群荣誉服务。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "type",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "操作类型，见使用说明"
      }
    ]
  },
  "get_group_join_info": {
    "description": "查询入群方式。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标群号。"
      }
    ]
  },
  "get_group_list": {
    "description": "获取 Bot 的完整群聊列表。萌卡NT会自动完成分页。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_group_member_list": {
    "description": "获取指定群的完整成员列表。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "get_group_msg_history": {
    "description": "从 QQ 服务器读取指定群聊的历史消息。该接口使用 Android QQ 的 `MessageSvc.PbGetGroupMsg`，返回的 `message_id` 可以继续用于 `get_msg`、撤回、转发和标记已读。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "message_seq",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "历史消息序列号游标"
      },
      {
        "name": "count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "读取条数"
      },
      {
        "name": "reverse_order",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否反向排序，默认 false"
      }
    ]
  },
  "get_group_notice": {
    "description": "获取指定群聊的公告列表。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "get_group_red_packets": {
    "description": "获取指定群聊中当前仍可领取的红包。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "get_group_share_link": {
    "description": "获取群分享链接。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标群号。"
      }
    ]
  },
  "get_group_share_messages": {
    "description": "获取群共享历史消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标群号。"
      }
    ]
  },
  "get_group_signed_list": {
    "description": "获取指定群聊当天的打卡成员列表。接口使用萌卡 NT 当前账号的 Android 登录态访问 QQ 官方群打卡 TRPC Web 服务。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "get_group_system_notifications": {
    "description": "获取 Bot 的群聊系统通知列表。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_group_video_url": {
    "description": "获取群视频地址。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "file_id",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前账号及协议收到的媒体 file_id；不能跨账号或协议复用"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "目标群号。"
      }
    ]
  },
  "get_group_voice_url": {
    "description": "获取群语音地址。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "file_id",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前账号及协议收到的媒体 file_id；不能跨账号或协议复用"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "目标群号。"
      }
    ]
  },
  "get_level_tasks": {
    "description": "获取 QQ 等级加速面板。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_login_qr": {
    "description": "获取登录二维码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      }
    ]
  },
  "get_mini_app_ark": {
    "description": "根据内置模板或完整小程序参数生成可发送的 Ark 数据。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "type",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "操作类型，见使用说明"
      },
      {
        "name": "sdk_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "小程序 SDK 标识"
      },
      {
        "name": "app_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "应用标识"
      },
      {
        "name": "title",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "专属头衔"
      },
      {
        "name": "description",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "描述文字"
      },
      {
        "name": "pic_url",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "卡片图片地址"
      },
      {
        "name": "jump_url",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "跳转地址"
      },
      {
        "name": "web_url",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "网页备用跳转地址"
      },
      {
        "name": "icon_url",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "图标地址"
      },
      {
        "name": "version_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "小程序版本 ID"
      },
      {
        "name": "scene",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "小程序场景值"
      },
      {
        "name": "template_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "小程序模板类型"
      },
      {
        "name": "business_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "小程序业务类型"
      },
      {
        "name": "ver_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "小程序版本类型"
      },
      {
        "name": "share_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "分享类型"
      },
      {
        "name": "with_share_ticket",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "是否携带分享凭据"
      },
      {
        "name": "raw_ark_data",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否返回原始 Ark 内容结构"
      }
    ]
  },
  "get_msg": {
    "description": "读取框架当前进程已观察到的 OneBot 消息数据，不请求 QQ 历史消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      }
    ]
  },
  "get_music_ark": {
    "description": "根据 QQ Android 实际接收的音乐分享结构，生成可由 `send_msg`、`send_group_msg` 或 `send_friend_msg` 发送的 Ark 音乐卡片。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "type",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "操作类型，见使用说明"
      },
      {
        "name": "title",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "专属头衔"
      },
      {
        "name": "content",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "正文内容"
      },
      {
        "name": "url",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "资源地址"
      },
      {
        "name": "audio",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "音乐音频 HTTP/HTTPS 地址"
      },
      {
        "name": "image",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "图片来源或图片元信息"
      }
    ]
  },
  "get_node_list": {
    "description": "读取当前插件节点信息。",
    "params": []
  },
  "get_plugin_context": {
    "description": "获取当前服务范围、可用 action 与消息段能力。",
    "params": []
  },
  "get_protocol_list": {
    "description": "获取当前版本的协议目录。",
    "params": []
  },
  "get_ps_key": {
    "description": "获取指定域名的 PsKey。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "domain",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "要获取凭据的域名"
      }
    ]
  },
  "get_qq_classic_farm_code": {
    "description": "获取 QQ 经典农场登录码，供插件自行完成农场登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_qun_album_list": {
    "description": "分页获取群相册列表。接口直接调用 QQ Android 的 `QunAlbum.trpc` 服务，不依赖 PC QQ。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "attach_info",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "上一页返回的分页游标，首次可省略"
      }
    ]
  },
  "get_qzone_friend_feeds": {
    "description": "获取好友空间首包中的最新动态。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_received_profile_likes": {
    "description": "获取当前登录 QQ 的资料获赞记录。接口使用 QQ Android 的真实 `VisitorSvc.ReqGetVoterList` 请求，不读取网页缓存。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "page_size",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "每页数量，默认 30，范围 1–53"
      },
      {
        "name": "next_mid",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "下一页非负十进制字符串游标"
      }
    ]
  },
  "get_recent_contact": {
    "description": "根据框架当前进程已经接收或观察到的群聊、私聊事件生成近期会话，不读取手机 QQ 数据库，也不向 QQ 请求会话列表。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "读取条数"
      }
    ]
  },
  "get_red_packet_info": {
    "description": "查询群消息中 `red_packet` 消息段对应的 QQ 红包详细信息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "sender_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "发送红包或转发资源的 QQ 号"
      },
      {
        "name": "red_packet",
        "type": "object",
        "typeLabel": "`object`",
        "required": true,
        "description": "红包参数对象，详见下方结构"
      },
      {
        "name": "red_packet.title",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "收到的红包标题，沿用消息事件中的值"
      },
      {
        "name": "red_packet.listid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包编号"
      },
      {
        "name": "red_packet.authkey",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包认证键"
      },
      {
        "name": "red_packet.channel",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游红包通道值"
      },
      {
        "name": "red_packet.pay_flag",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包支付标识"
      },
      {
        "name": "red_packet.hb_from",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包来源标识"
      },
      {
        "name": "red_packet.msg_random",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游消息随机数"
      },
      {
        "name": "red_packet.client_seq",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "客户端序列号"
      },
      {
        "name": "red_packet.grab_uin_list",
        "type": "object",
        "typeLabel": "`integer[]`",
        "required": false,
        "description": "红包消息中的领取目标 QQ 列表"
      },
      {
        "name": "claim_token",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "预领取查询返回的令牌"
      }
    ]
  },
  "get_rkey": {
    "description": "读取当前账号用于私聊、群聊和媒体资源访问的 RKey。接口只返回框架登录后由后台刷新任务维护的缓存，不会因为插件调用而额外发送 RKey 请求。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_security_verify_methods": {
    "description": "查询当前登录的安全验证原因与可用方式。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "get_security_verify_qr": {
    "description": "为正在等待安全验证的密码登录创建授权二维码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "get_sent_profile_likes": {
    "description": "获取送出的名片赞。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "page_size",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "每页数量，默认 30，范围 1–53"
      },
      {
        "name": "next_mid",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "下一页非负十进制字符串游标"
      }
    ]
  },
  "get_skey": {
    "description": "获取指定协议下当前 Bot 的 skey。支持 Android 9.1.70 和 Linux 3.2.32。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      }
    ]
  },
  "get_sms": {
    "description": "请求当前登录的安全验证短信步骤。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "verify_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "3：用户向指定号码发送短信；4：接收短信。"
      },
      {
        "name": "sign",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前安全验证流程返回的 sign。"
      }
    ]
  },
  "get_social_lock_status": {
    "description": "查询社交功能限制。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      }
    ]
  },
  "get_unidirectional_friend_list": {
    "description": "获取当前账号的单向好友列表。单向好友是仍关注当前账号、但没有出现在普通双向好友列表中的用户。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "top",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游分页起点"
      },
      {
        "name": "count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "读取条数"
      },
      {
        "name": "cookie",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "上一页返回的分页游标"
      }
    ]
  },
  "get_user_agent": {
    "description": "读取账号实例当前协议使用的 User-Agent。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "get_user_profile": {
    "description": "获取指定 QQ 的名片资料。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "avatar_only",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "只返回头像信息，默认 false"
      }
    ]
  },
  "get_version_info": {
    "description": "读取框架版本及指定账号的协议平台。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "grab_group_voice_red_packet": {
    "description": "使用语音验证结果领取指定群语音红包。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "sender_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "发送红包或转发资源的 QQ 号"
      },
      {
        "name": "red_packet",
        "type": "object",
        "typeLabel": "`object`",
        "required": true,
        "description": "红包参数对象，详见下方结构"
      },
      {
        "name": "red_packet.title",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "收到的红包标题，沿用消息事件中的值"
      },
      {
        "name": "red_packet.listid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包编号"
      },
      {
        "name": "red_packet.authkey",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包认证键"
      },
      {
        "name": "red_packet.channel",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游红包通道值"
      },
      {
        "name": "red_packet.pay_flag",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包支付标识"
      },
      {
        "name": "red_packet.hb_from",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包来源标识"
      },
      {
        "name": "red_packet.msg_random",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游消息随机数"
      },
      {
        "name": "red_packet.client_seq",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "客户端序列号"
      },
      {
        "name": "red_packet.grab_uin_list",
        "type": "object",
        "typeLabel": "`integer[]`",
        "required": false,
        "description": "红包消息中的领取目标 QQ 列表"
      },
      {
        "name": "claim_token",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "预领取查询返回的令牌"
      },
      {
        "name": "voice_rate_id",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "语音红包验证结果标识"
      }
    ]
  },
  "grab_red_packet": {
    "description": "- action：`grab_red_packet`",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "sender_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "发送红包或转发资源的 QQ 号"
      },
      {
        "name": "red_packet",
        "type": "object",
        "typeLabel": "`object`",
        "required": true,
        "description": "红包参数对象，详见下方结构"
      },
      {
        "name": "red_packet.title",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "收到的红包标题，沿用消息事件中的值"
      },
      {
        "name": "red_packet.listid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包编号"
      },
      {
        "name": "red_packet.authkey",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包认证键"
      },
      {
        "name": "red_packet.channel",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游红包通道值"
      },
      {
        "name": "red_packet.pay_flag",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包支付标识"
      },
      {
        "name": "red_packet.hb_from",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包来源标识"
      },
      {
        "name": "red_packet.msg_random",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游消息随机数"
      },
      {
        "name": "red_packet.client_seq",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "客户端序列号"
      },
      {
        "name": "red_packet.grab_uin_list",
        "type": "object",
        "typeLabel": "`integer[]`",
        "required": false,
        "description": "红包消息中的领取目标 QQ 列表"
      },
      {
        "name": "claim_token",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "预领取查询返回的令牌"
      }
    ]
  },
  "invite_group_members": {
    "description": "邀请指定好友或来源群成员加入目标群。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "user_ids",
        "type": "array",
        "typeLabel": "`integer[]`",
        "required": true,
        "description": "QQ 号数组"
      },
      {
        "name": "source_group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "来源群；0 或省略时从好友解析目标，非零时从该群成员解析"
      }
    ]
  },
  "join_group": {
    "description": "申请加入群聊。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标群号。"
      },
      {
        "name": "group_option",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "get_group_join_info 返回的入群选项"
      },
      {
        "name": "source_sub_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "入群来源子编号。"
      },
      {
        "name": "apply_msg",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "申请入群附言。"
      },
      {
        "name": "rich_msg",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "富文本附言的标准 Base64 数据。"
      },
      {
        "name": "auth",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "QQ 返回的入群验证参数。"
      },
      {
        "name": "token",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "QQ 返回的入群令牌。"
      },
      {
        "name": "no_verify_auth",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "QQ 返回的免验证参数。"
      },
      {
        "name": "trans_info",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "QQ 返回的附加验证数据，标准 Base64。"
      }
    ],
    "removed": true
  },
  "kick_group_member": {
    "description": "将指定成员移出群聊，可同时拒绝该成员后续的加群申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "user_ids",
        "type": "array",
        "typeLabel": "`integer[]`",
        "required": true,
        "description": "QQ 号数组"
      },
      {
        "name": "reject_add_request",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "移出成员后是否拒绝其再次申请"
      }
    ]
  },
  "leave_group": {
    "description": "当前账号主动退出群聊。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "level_task_management": {
    "description": "管理当前账号的等级任务设置、每日调度与执行结果。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "operation",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "status、settings、panel 或 run。"
      },
      {
        "name": "tasks",
        "type": "array",
        "typeLabel": "string[]",
        "required": false,
        "description": "settings 必填，run 可选；任务名称来自 status.supported_tasks，最多 100 项。"
      },
      {
        "name": "schedule_enabled",
        "type": "boolean",
        "typeLabel": "boolean",
        "required": false,
        "description": "是否启用每日自动执行；允许 tasks 为 []，空计划不会执行任务。"
      },
      {
        "name": "schedule_time",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "服务器本地时间，24 小时 HH:mm。"
      },
      {
        "name": "refresh",
        "type": "boolean",
        "typeLabel": "boolean",
        "required": false,
        "description": "仅 panel 使用，默认 false；true 强制重新获取任务面板。"
      },
      {
        "name": "pc_protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "涉及电脑在线任务时，可指定同 QQ、同节点已有的 Linux 实例协议 ID；省略时自动匹配。没有匹配实例时，在执行任务时自动创建 Linux 账号并尝试免扫登录；保存配置不会创建账号。同节点存在多个匹配实例时需明确指定。"
      }
    ]
  },
  "like_qzone_feed": {
    "description": "点赞好友动态。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "feed",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "get_qzone_friend_feeds 返回的完整动态对象"
      },
      {
        "name": "feed.app_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "应用标识"
      },
      {
        "name": "feed.user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "feed.nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "feed.create_time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "创建时间"
      },
      {
        "name": "feed.feed_id",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "动态标识"
      },
      {
        "name": "feed.feeds_key",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "上游动态键"
      },
      {
        "name": "feed.url",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      },
      {
        "name": "feed.text",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "文本内容"
      },
      {
        "name": "feed.orig_uin",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "原动态发布者 QQ"
      },
      {
        "name": "feed.orig_tid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "原动态标识"
      },
      {
        "name": "feed.interaction",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "动态互动信息"
      },
      {
        "name": "feed.forward",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "原转发动态，结构与 feed 相同"
      },
      {
        "name": "feed.forward.app_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "应用标识"
      },
      {
        "name": "feed.forward.user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "feed.forward.nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "feed.forward.create_time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "创建时间"
      },
      {
        "name": "feed.forward.feed_id",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "动态标识"
      },
      {
        "name": "feed.forward.feeds_key",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "上游动态键"
      },
      {
        "name": "feed.forward.url",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      },
      {
        "name": "feed.forward.text",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "文本内容"
      },
      {
        "name": "feed.forward.orig_uin",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "原动态发布者 QQ"
      },
      {
        "name": "feed.forward.orig_tid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "原动态标识"
      },
      {
        "name": "feed.forward.interaction",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "动态互动信息"
      },
      {
        "name": "feed.forward.forward",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "原转发动态，结构与 feed 相同"
      }
    ]
  },
  "like_user_profile": {
    "description": "点赞指定用户的 QQ 名片。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "like_count",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "点赞次数"
      }
    ]
  },
  "login_account": {
    "description": "使用账号已保存的密码登录；Linux 未设置密码时获取登录二维码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "login_captcha": {
    "description": "在当前滑块会话内读取腾讯验证码脚本或转发验证码请求。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "operation",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "register 或 request。"
      },
      {
        "name": "proxy_base",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "当前页面的站内代理路径，如 /captcha-proxy；不能为绝对 URL、不能含查询串或路径跳转。"
      },
      {
        "name": "url",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "https://t.captcha.qq.com 下的验证码地址。"
      },
      {
        "name": "method",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "GET（默认）或 POST。"
      },
      {
        "name": "headers",
        "type": "object",
        "typeLabel": "object<string,string>",
        "required": false,
        "description": "只允许 User-Agent、Accept、Accept-Language、Content-Type。"
      },
      {
        "name": "body",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "请求正文，最多 1 MiB。"
      }
    ]
  },
  "mark_msg_as_read": {
    "description": "标记一条消息已读。框架根据消息引用自动选择群聊序号或私聊时间游标。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      },
      {
        "name": "all",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "true 标记全部缓存会话已读；不能同时传 message_id"
      }
    ]
  },
  "move_group_file": {
    "description": "将指定群文件移动到另一目录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "file_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "上传接口返回的文件标识"
      },
      {
        "name": "busid",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群文件业务 ID，可从文件列表获取"
      },
      {
        "name": "current_parent_directory",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "文件当前父目录 ID"
      },
      {
        "name": "target_parent_directory",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "移动后的父目录 ID"
      }
    ]
  },
  "ntlogin_check_sms": {
    "description": "NT 提交短信验证码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "verify_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "3：用户向指定号码发送短信；4：接收短信。"
      },
      {
        "name": "sign",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前安全验证流程返回的 sign。"
      },
      {
        "name": "code",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "必填条件：条件必填。verify_type=4 时必填；3 时不需要，服务端检查是否收到用户发送的短信。"
      }
    ]
  },
  "ntlogin_get_security_verify_methods": {
    "description": "NT 查询安全验证方式。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "ntlogin_get_security_verify_qr": {
    "description": "NT 获取安全验证二维码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "ntlogin_get_sms": {
    "description": "NT 获取短信验证码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "verify_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "3：用户向指定号码发送短信；4：接收短信。"
      },
      {
        "name": "sign",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "当前安全验证流程返回的 sign。"
      }
    ]
  },
  "ntlogin_login_account": {
    "description": "NT 密码登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "ntlogin_query_security_verify_qr": {
    "description": "NT 查询安全验证二维码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "guarantee_token",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "get_security_verify_qr 返回的当前令牌。"
      }
    ]
  },
  "ntlogin_submit_slider": {
    "description": "NT 提交滑块验证。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "ticket",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "腾讯验证码完成后返回的 ticket。"
      },
      {
        "name": "randstr",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "同一次验证返回的 randstr。"
      }
    ]
  },
  "offline_account": {
    "description": "停止当前登录流程或断开已登录账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "open_account_security_access": {
    "description": "调用当前待验证登录的安全验证步骤。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "type",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "QQ 安全验证方法，例如 QueryVerifyMethod、GetSMS、CheckSMS、CreateGuarantee、QueryGuaranteeStatus；支持方法随协议平台而异。"
      },
      {
        "name": "data",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "该方法的参数；省略时为空对象。"
      }
    ]
  },
  "profile_operation": {
    "description": "读取在线设备与状态，或修改个人资料、个性签名和机型显示。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "operation",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "下表中的操作名。"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "操作参数，默认 {}；拒绝未知字段，整个请求上限 16 KiB。"
      }
    ]
  },
  "publish_qzone_feed": {
    "description": "发布 QQ 空间文字或图片动态。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "content",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "正文内容"
      },
      {
        "name": "visibility",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "1 所有人；2 好友；5 仅自己；默认 1"
      },
      {
        "name": "self_delete_after_one_day",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否启用上游 24 小时自动删除；默认 false"
      },
      {
        "name": "declare_ai_generated",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否声明内容为 AI 生成；默认 false"
      },
      {
        "name": "images",
        "type": "array",
        "typeLabel": "`string[]`",
        "required": false,
        "description": "图片来源数组，最多 9 项"
      }
    ]
  },
  "qmate_accept_invite": {
    "description": "接受搭子邀请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      }
    ],
    "removed": true
  },
  "qmate_claim_task_reward": {
    "description": "领取搭子任务奖励。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      },
      {
        "name": "task_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "任务列表返回的任务 ID。"
      }
    ],
    "removed": true
  },
  "qmate_confirm_invite": {
    "description": "确认搭子邀请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      }
    ],
    "removed": true
  },
  "qmate_dissolve": {
    "description": "解除搭子关系。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      }
    ],
    "removed": true
  },
  "qmate_get_adoption_info": {
    "description": "查询搭子领养信息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      }
    ],
    "removed": true
  },
  "qmate_get_info": {
    "description": "获取搭子信息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      },
      {
        "name": "appearance_last_fetch_time",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "上次获取外观数据的时间值，首次可省略。"
      },
      {
        "name": "item_last_fetch_time",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "上次获取道具数据的时间值，首次可省略。"
      }
    ],
    "removed": true
  },
  "qmate_get_inventory": {
    "description": "获取搭子背包。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      },
      {
        "name": "category",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "背包分类编号。"
      },
      {
        "name": "sub_category",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "背包子分类编号。"
      },
      {
        "name": "cookie",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "上次响应的分页游标，原样传入；首次可省略。"
      }
    ],
    "removed": true
  },
  "qmate_get_invite_ark": {
    "description": "获取搭子邀请卡片。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      }
    ],
    "removed": true
  },
  "qmate_get_tasks": {
    "description": "获取搭子任务。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      }
    ],
    "removed": true
  },
  "qmate_hatch": {
    "description": "孵化搭子。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      }
    ],
    "removed": true
  },
  "qmate_report_incubation_combo": {
    "description": "上报搭子孵化连击。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      },
      {
        "name": "delta",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "本次孵化连击增量。"
      },
      {
        "name": "client_seq",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "本次操作序列；省略时由框架生成。"
      }
    ],
    "removed": true
  },
  "qmate_report_task_action": {
    "description": "上报搭子任务动作。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      },
      {
        "name": "task_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "任务列表返回的任务 ID。"
      },
      {
        "name": "action_id",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "任务列表返回的操作标识。"
      }
    ],
    "removed": true
  },
  "qmate_use_item": {
    "description": "使用搭子道具。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "搭档 QQ 号。"
      },
      {
        "name": "qmate_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "搭子类型，默认 1，必须为正整数。"
      },
      {
        "name": "sku_id",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "背包返回的道具 SKU 标识。"
      },
      {
        "name": "avatar_sub_type",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "道具对应的形象子类型。"
      },
      {
        "name": "rare_skin_confirm",
        "type": "boolean",
        "typeLabel": "boolean",
        "required": false,
        "description": "确认使用稀有皮肤，默认 false。"
      },
      {
        "name": "cooldown_confirm",
        "type": "boolean",
        "typeLabel": "boolean",
        "required": false,
        "description": "确认冷却相关提示，默认 false。"
      },
      {
        "name": "other_skin_confirm",
        "type": "boolean",
        "typeLabel": "boolean",
        "required": false,
        "description": "确认替换其他皮肤，默认 false。"
      }
    ],
    "removed": true
  },
  "qqpet_adopt_pet": {
    "description": "调用 QQ 宠物的 `adopt_pet` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_buy_food": {
    "description": "调用 QQ 宠物的 `buy_food` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_check_user_in_gray": {
    "description": "调用 QQ 宠物的 `check_user_in_gray` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_claim_daily_food": {
    "description": "调用 QQ 宠物的 `claim_daily_food` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_delete_interaction_record": {
    "description": "调用 QQ 宠物的 `delete_interaction_record` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_do_after_story_info": {
    "description": "调用 QQ 宠物的 `do_after_story_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_do_care": {
    "description": "调用 QQ 宠物的 `do_care` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_encourage_pet": {
    "description": "使用宠物 ID 和活动实例 ID 鼓励宠物，复用现有 OIDB 链路。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "仅支持 oidb，可省略。"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": true,
        "description": "必填对象，包含非空字符串 pet_id 和 story_id；story_id 为真实活动实例 ID。"
      }
    ],
    "removed": true
  },
  "qqpet_encourage_story": {
    "description": "调用 QQ 宠物的 `encourage_story` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_equip_career": {
    "description": "调用 QQ 宠物的 `equip_career` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_equip_medal": {
    "description": "调用 QQ 宠物的 `equip_medal` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_feeding": {
    "description": "调用 QQ 宠物的 `feeding` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_activity_options": {
    "description": "调用 QQ 宠物的 `get_activity_options` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_activity_overview": {
    "description": "调用 QQ 宠物的 `get_activity_overview` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_bath_catalog": {
    "description": "调用 QQ 宠物的 `get_bath_catalog` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_bath_inventory": {
    "description": "调用 QQ 宠物的 `get_bath_inventory` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_c2c_pet_info": {
    "description": "调用 QQ 宠物的 `get_c2c_pet_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_candidate_pets": {
    "description": "调用 QQ 宠物的 `get_candidate_pets` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_care_config": {
    "description": "调用 QQ 宠物的 `get_care_config` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_care_supply_info": {
    "description": "调用 QQ 宠物的 `get_care_supply_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_career_tree": {
    "description": "调用 QQ 宠物的 `get_career_tree` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_clothing": {
    "description": "调用 QQ 宠物的 `get_clothing` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_clothing_red_dot": {
    "description": "调用 QQ 宠物的 `get_clothing_red_dot` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_coin_bag_detail": {
    "description": "查询宠物钱袋。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "在线 QQ 号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "Android 协议 ID。"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下方业务参数；省略时为 {}。"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 oidb，仅支持 oidb。"
      }
    ],
    "removed": true
  },
  "qqpet_get_display_value": {
    "description": "调用 QQ 宠物的 `get_display_value` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_event_rule": {
    "description": "调用 QQ 宠物的 `get_event_rule` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_feed_red_dot": {
    "description": "调用 QQ 宠物的 `get_feed_red_dot` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_feed_times_info": {
    "description": "调用 QQ 宠物的 `get_feed_times_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_food_shop": {
    "description": "调用 QQ 宠物的 `get_food_shop` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_home_resource": {
    "description": "调用 QQ 宠物的 `get_home_resource` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_incr_resource": {
    "description": "调用 QQ 宠物的 `get_incr_resource` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_interaction_history": {
    "description": "调用 QQ 宠物的 `get_interaction_history` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_interaction_messages": {
    "description": "调用 QQ 宠物的 `get_interaction_messages` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_medal_detail": {
    "description": "调用 QQ 宠物的 `get_medal_detail` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_medal_gallery": {
    "description": "调用 QQ 宠物的 `get_medal_gallery` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_my_suits": {
    "description": "调用 QQ 宠物的 `get_my_suits` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_numeric_metrics": {
    "description": "调用 QQ 宠物的 `get_numeric_metrics` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_other_pet_status_info": {
    "description": "调用 QQ 宠物的 `get_other_pet_status_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_other_user_pet": {
    "description": "调用 QQ 宠物的 `get_other_user_pet` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_page_rules": {
    "description": "调用 QQ 宠物的 `get_page_rules` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_pet_story_status": {
    "description": "调用 QQ 宠物的 `get_pet_story_status` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_pk_power": {
    "description": "调用 QQ 宠物的 `get_pk_power` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_profile": {
    "description": "调用 QQ 宠物的 `get_profile` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_reaction": {
    "description": "调用 QQ 宠物的 `get_reaction` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_relation_list": {
    "description": "调用 QQ 宠物的 `get_relation_list` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_resource": {
    "description": "调用 QQ 宠物的 `get_resource` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_resource_detail": {
    "description": "调用 QQ 宠物的 `get_resource_detail` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_sequence": {
    "description": "调用 QQ 宠物的 `get_sequence` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_story_info": {
    "description": "调用 QQ 宠物的 `get_story_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_story_process": {
    "description": "调用 QQ 宠物的 `get_story_process` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_upgrade_config": {
    "description": "调用 QQ 宠物的 `get_upgrade_config` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_get_user_pet": {
    "description": "调用 QQ 宠物的 `get_user_pet` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_heart_beat": {
    "description": "调用 QQ 宠物的 `heart_beat` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_like": {
    "description": "调用 QQ 宠物的 `like` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_operation": {
    "description": "按业务流程操作 QQ 宠物，包含状态读取、喂养、活动和 PK。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "operation",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "catalog 或本页列出的业务操作名。"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "各操作的参数；最多 16 KiB，不能传 self_id、protocol_id、client_type、node_id 或未声明字段。"
      }
    ],
    "allowedOperations": [
      "activity.encourage",
      "activity.options",
      "activity.overview",
      "activity.settle",
      "activity.start",
      "activity.status",
      "attributes",
      "bath.buy",
      "bath.catalog",
      "bath.inventory",
      "bath.use",
      "catalog",
      "fatigue",
      "food.buy",
      "food.catalog",
      "food.feed",
      "friend.bathe",
      "friend.feed",
      "friend.poke",
      "friend.profile",
      "friend.visit",
      "interactions",
      "medals",
      "pk.friends",
      "pk.power",
      "pk.settle",
      "pk.start",
      "pk.status",
      "pk.strangers",
      "profile",
      "vitals"
    ]
  },
  "qqpet_place_order": {
    "description": "调用 QQ 宠物的 `place_order` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_poke_friend_pet": {
    "description": "调用 QQ 宠物的 `poke_friend_pet` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_push_feed_msg": {
    "description": "调用 QQ 宠物的 `push_feed_msg` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_query_like_count": {
    "description": "调用 QQ 宠物的 `query_like_count` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_remove_one_suit": {
    "description": "调用 QQ 宠物的 `remove_one_suit` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_report_action": {
    "description": "调用 QQ 宠物的 `report_action` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_report_clothing_red_dot": {
    "description": "调用 QQ 宠物的 `report_clothing_red_dot` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_report_event": {
    "description": "调用 QQ 宠物的 `report_event` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_report_feed_red_dot": {
    "description": "调用 QQ 宠物的 `report_feed_red_dot` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_report_guide": {
    "description": "调用 QQ 宠物的 `report_guide` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_save_avatar": {
    "description": "调用 QQ 宠物的 `save_avatar` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_save_one_suit": {
    "description": "调用 QQ 宠物的 `save_one_suit` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_set_c2c_pet_info": {
    "description": "调用 QQ 宠物的 `set_c2c_pet_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_set_c2c_pet_switch": {
    "description": "调用 QQ 宠物的 `set_c2c_pet_switch` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_set_care_config": {
    "description": "调用 QQ 宠物的 `set_care_config` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_set_device_info": {
    "description": "调用 QQ 宠物的 `set_device_info` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_snatch_coin_bag": {
    "description": "领取宠物钱袋。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "在线 QQ 号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "Android 协议 ID。"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下方业务参数；省略时为 {}。"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 oidb，仅支持 oidb。"
      }
    ],
    "removed": true
  },
  "qqpet_start_story": {
    "description": "调用 QQ 宠物的 `start_story` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_unequip_medal": {
    "description": "调用 QQ 宠物的 `unequip_medal` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_update_profile": {
    "description": "调用 QQ 宠物的 `update_profile` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 ``；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "qqpet_use_bath_item": {
    "description": "调用 QQ 宠物的 `use_bath_item` 操作。仅支持当前节点的在线 Android 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前节点的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "Android 协议配置 ID"
      },
      {
        "name": "transport",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "默认 `oidb`；可选 oidb / sso，仅有 OIDB 的操作不接受 sso"
      },
      {
        "name": "request",
        "type": "object",
        "typeLabel": "object",
        "required": false,
        "description": "下表业务字段；省略时为 {}"
      }
    ],
    "removed": true
  },
  "query_login_qr": {
    "description": "查询 Linux 无密码登录二维码并在确认后完成登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "query_security_verify_qr": {
    "description": "查询安全验证二维码，确认后继续登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "guarantee_token",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "get_security_verify_qr 返回的当前令牌。"
      }
    ]
  },
  "recall_friend_msg": {
    "description": "撤回好友消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标 QQ 号。"
      },
      {
        "name": "msg_seq",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原消息的消息序列，0 是有效值。"
      },
      {
        "name": "msg_random",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原消息的随机值，0 是有效值。"
      },
      {
        "name": "msg_time",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原消息的 Unix 秒时间戳，必须大于 0。"
      },
      {
        "name": "client_seq",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原消息的客户端序列，0 是有效值。"
      }
    ]
  },
  "recall_group_msg": {
    "description": "撤回群聊消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "msg_seq",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "上游消息序列号"
      },
      {
        "name": "msg_random",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "上游消息随机数"
      }
    ]
  },
  "recall_message": {
    "description": "撤回消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      }
    ]
  },
  "register_captcha": {
    "description": "创建滑块验证会话。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "slider_url",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "本次账号登录返回的滑块地址"
      }
    ]
  },
  "reject_friend_apply": {
    "description": "拒绝好友申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "目标 QQ 号。"
      },
      {
        "name": "request_id",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "通知中的十进制请求 ID，必须使用字符串，避免整数精度丢失。"
      },
      {
        "name": "msg_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原通知的 msg_type。"
      },
      {
        "name": "request_type",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "原通知的 request_type。"
      },
      {
        "name": "source_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "原通知的来源 ID。"
      },
      {
        "name": "sub_source_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "原通知的子来源 ID。"
      },
      {
        "name": "group_msg_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "原通知的群消息类型。"
      },
      {
        "name": "action_info",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "通知所选操作的附加信息，原样传入。"
      },
      {
        "name": "remark",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "好友备注。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "目标群号。"
      },
      {
        "name": "blacklist",
        "type": "boolean",
        "typeLabel": "boolean",
        "required": false,
        "description": "拒绝时是否加入黑名单，默认 false。"
      }
    ]
  },
  "reject_group_apply": {
    "description": "拒绝入群申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "request_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群系统通知中的请求编号"
      },
      {
        "name": "request_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群系统通知中的请求类型"
      },
      {
        "name": "request_extra",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群系统通知中的附加值"
      },
      {
        "name": "reason",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "拒绝理由或处理说明"
      }
    ]
  },
  "rename_group_file": {
    "description": "重命名指定群文件。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "file_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "上传接口返回的文件标识"
      },
      {
        "name": "busid",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群文件业务 ID，可从文件列表获取"
      },
      {
        "name": "current_parent_directory",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "文件当前父目录 ID"
      },
      {
        "name": "new_name",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "新的文件名"
      }
    ]
  },
  "retry_account_identity_verify": {
    "description": "在当前验证会话内重试登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "login_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "继续登录类型，默认 0；应与当前验证步骤匹配。"
      },
      {
        "name": "extra",
        "type": "object",
        "typeLabel": "object<string,string>",
        "required": false,
        "description": "该登录类型需要的附加值，例如 ticket/randstr 或 verify_sign。"
      }
    ]
  },
  "retry_account_security_verify": {
    "description": "在当前验证会话内重试登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "login_type",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "继续登录类型，默认 0；应与当前验证步骤匹配。"
      },
      {
        "name": "extra",
        "type": "object",
        "typeLabel": "object<string,string>",
        "required": false,
        "description": "该登录类型需要的附加值，例如 ticket/randstr 或 verify_sign。"
      }
    ]
  },
  "scan_qr": {
    "description": "使用在线 Android Bot 识别一个 QQ 登录二维码。本接口由 Android 会话执行，不负责创建或查询 Linux 登录会话。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "k",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "待扫码业务二维码中的 k 值"
      }
    ]
  },
  "sdk_auth_api": {
    "description": "使用当前账号请求第三方应用的 SDK 授权。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "client_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "第三方应用客户端 ID"
      },
      {
        "name": "response_type",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "应用授权响应类型"
      },
      {
        "name": "openapi",
        "type": "array",
        "typeLabel": "`integer[]`",
        "required": false,
        "description": "申请的开放 API 权限列表"
      },
      {
        "name": "pf",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "平台标识"
      },
      {
        "name": "need_pay",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "支付授权选项"
      },
      {
        "name": "sign",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "签名资料或授权签名"
      },
      {
        "name": "sdkv",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "SDK 版本"
      },
      {
        "name": "sdkp",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "SDK 平台"
      },
      {
        "name": "time",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "业务时间戳"
      },
      {
        "name": "pass_data",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "授权透传数据"
      },
      {
        "name": "app_unique_identifier",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "应用唯一标识"
      },
      {
        "name": "referer",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "授权来源标识"
      },
      {
        "name": "vid",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "授权业务标识"
      },
      {
        "name": "url_encoded_data",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "URL 编码的业务数据"
      },
      {
        "name": "auth_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "授权类型"
      }
    ]
  },
  "send_friend_msg": {
    "description": "发送好友消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "message",
        "type": "array",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "消息段数组，结构见消息段参考"
      },
      {
        "name": "source_message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "当前账号消息缓存中的引用编号，与 message 二选一"
      }
    ]
  },
  "send_friend_request": {
    "description": "向指定 QQ 主动提交好友申请，不是同意已收到的申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "message",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息段数组，结构见消息段参考"
      },
      {
        "name": "remark",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "备注；允许清除时传空字符串"
      }
    ],
    "removed": true
  },
  "send_group_join_request": {
    "description": "主动申请加入群聊。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "message",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息段数组，结构见消息段参考"
      }
    ],
    "removed": true
  },
  "send_group_msg": {
    "description": "发送群聊消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "message",
        "type": "array",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "消息段数组，结构见消息段参考"
      },
      {
        "name": "source_message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "当前账号消息缓存中的引用编号，与 message 二选一"
      }
    ]
  },
  "send_group_notice": {
    "description": "在指定群聊发布公告。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "content",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "正文内容"
      },
      {
        "name": "image",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "图片来源或图片元信息"
      }
    ]
  },
  "send_group_red_packet": {
    "description": "向指定群聊发送 QQ 群红包，支持拼手气、普通、专属、语音和口令五种类型。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "red_packet",
        "type": "object",
        "typeLabel": "`object`",
        "required": true,
        "description": "红包参数对象，详见下方结构"
      },
      {
        "name": "red_packet.type",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "操作类型，见使用说明"
      },
      {
        "name": "red_packet.total_amount",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "红包总金额，单位分"
      },
      {
        "name": "red_packet.total_num",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "红包总份数"
      },
      {
        "name": "red_packet.wishing",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "祝福语"
      },
      {
        "name": "red_packet.target_user_ids",
        "type": "object",
        "typeLabel": "`integer[]`",
        "required": false,
        "description": "专属红包接收 QQ 列表"
      },
      {
        "name": "payment_password",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "支付密码，仅实际支付时使用"
      },
      {
        "name": "dry_run",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "默认 false；true 创建订单但不付款"
      }
    ]
  },
  "send_group_temp_msg": {
    "description": "通过共同群聊向群成员发送 QQ 原生临时会话消息。目标 QQ 不需要与发送账号建立好友关系。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "message",
        "type": "array",
        "typeLabel": "`object[]`",
        "required": true,
        "description": "消息段数组，结构见消息段参考"
      }
    ],
    "removed": true
  },
  "send_packet": {
    "description": "- action：`send_packet`",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "cmd",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "SSO 命令名称"
      },
      {
        "name": "data",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "内容对象"
      },
      {
        "name": "rsp",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否等待上游响应，默认 true"
      }
    ]
  },
  "send_poke": {
    "description": "向好友或群成员发送普通戳一戳。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标群号"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      }
    ]
  },
  "set_friend_remark": {
    "description": "修改机器人通讯录里指定好友的备注。支持 Android、Linux QQ；多协议账号请显式指定协议。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "remark",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "备注；允许清除时传空字符串"
      }
    ]
  },
  "set_friend_request": {
    "description": "通过请求键处理当前账号的好友申请。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "request_key",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "申请列表返回的请求键"
      },
      {
        "name": "approve",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "true 同意，false 拒绝"
      },
      {
        "name": "remark",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "备注；允许清除时传空字符串"
      }
    ]
  },
  "set_group_add_option": {
    "description": "设置群聊的入群验证方式。请求使用 群资料协议写入，并在写入后重新读取群资料确认生效。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "add_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "群申请加入方式"
      },
      {
        "name": "group_question",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "group question"
      },
      {
        "name": "group_answer",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "group answer"
      }
    ]
  },
  "set_group_admin": {
    "description": "设置或取消群聊管理员。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "set_admin",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "true 设置管理员，false 取消"
      }
    ]
  },
  "set_group_album_media_like": {
    "description": "点赞群相册的一批上传内容或其中一项媒体。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "album_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册列表返回的相册 ID"
      },
      {
        "name": "batch_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "相册媒体的批次标识"
      },
      {
        "name": "lloc",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册媒体列表返回的媒体位置标识"
      },
      {
        "name": "like",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "true 点赞，false 取消点赞"
      }
    ]
  },
  "set_group_card": {
    "description": "修改指定群成员的群名片（群昵称），也可以传空字符串清空群名片。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "card",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "群名片；空字符串清除"
      }
    ]
  },
  "set_group_essence": {
    "description": "设置或取消群精华消息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      },
      {
        "name": "enabled",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "true 设置，false 取消"
      }
    ]
  },
  "set_group_member_invite_policy": {
    "description": "设置群聊普通成员的邀请策略。接口会先读取 Android QQ 群详情，只修改对应权限位，提交后再次读取并校验结果，避免覆盖其他群设置。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "policy",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "policy"
      }
    ]
  },
  "set_group_member_permissions": {
    "description": "单独开启或关闭一个群成员权限。接口使用 Android QQ 群详情与群设置链路，并在提交后回读验证。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "permission",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "permission"
      },
      {
        "name": "allow",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "是否允许指定成员权限"
      }
    ]
  },
  "set_group_mute": {
    "description": "设置或取消群聊成员禁言。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "duration_sec",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "禁言秒数；0 解除禁言"
      }
    ]
  },
  "set_group_mute_all": {
    "description": "开启或取消全员禁言。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "mute",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "true 全员禁言，false 解除"
      }
    ]
  },
  "set_group_name": {
    "description": "修改群名。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "group_name",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "群名称"
      }
    ]
  },
  "set_group_new_member_history_visibility": {
    "description": "设置新加入群聊的成员是否可以查看入群前的历史消息。接口使用 Android QQ 的群设置链路，并在提交后回读校验。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "visible",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "是否允许新成员查看历史消息"
      }
    ]
  },
  "set_group_portrait": {
    "description": "设置指定群聊的头像。萌卡NT会按 QQ Android 的 Highway `command_id=3000` 上传链路，先获取当前账号的 Highway 会话，再将公开群号转换为 QQ 内部群 UIN 后提交图片。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "file",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "文件来源；受媒体目录权限约束，可使用 transfer:// 引用"
      }
    ]
  },
  "set_group_robot_add_option": {
    "description": "设置机器人账号加入群聊时的准入方式。接口使用 Android QQ 的 `OidbSvcTrpcTcp.0xf00_3` 写入，并通过 `OidbSvcTrpcTcp.0xef0_1` 回读确认服务器已应用设置。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "robot_member_switch",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "机器人入群开关值"
      },
      {
        "name": "robot_member_examine",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "机器人入群审核开关值"
      }
    ]
  },
  "set_group_search": {
    "description": "设置群聊的搜索开关。请求使用 群资料协议写入，并在写入后重新读取确认。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "no_finger_open",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群名称搜索开关值"
      },
      {
        "name": "no_code_finger_open",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "群号搜索开关值"
      }
    ]
  },
  "set_group_special_title": {
    "description": "设置或清除群聊成员的专属头衔。框架解析目标成员的原生 UID，使用当前账号的登录会话执行；不会修改成员昵称或群名片。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "title",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "专属头衔"
      }
    ]
  },
  "set_input_status": {
    "description": "向指定好友同步正在输入或结束输入状态。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "event_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "输入状态事件类型"
      }
    ]
  },
  "set_msg_emoji_like": {
    "description": "为群消息添加或取消指定表情回应。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "message_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "消息事件或发送结果中的框架消息编号"
      },
      {
        "name": "emoji_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "表情回应 ID"
      },
      {
        "name": "set",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": true,
        "description": "true 添加表情回应，false 取消"
      },
      {
        "name": "emoji_type",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "表情回应类型"
      }
    ]
  },
  "set_qq_avatar": {
    "description": "设置当前 QQ Bot 的头像。后端不发送媒体 OIDB 请求，图片会直接通过 Highway HTTP 上传。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "文件来源；本地文件须在管理员允许的媒体目录内，或使用 transfer:// 引用"
      }
    ]
  },
  "sign_group": {
    "description": "使用当前账号在指定群签到。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      }
    ]
  },
  "submit_identity_captcha": {
    "description": "提交身份验证的腾讯验证码结果。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "ticket",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "腾讯验证码完成后返回的 ticket。"
      },
      {
        "name": "randstr",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "同一次验证返回的 randstr。"
      }
    ]
  },
  "submit_identity_phone": {
    "description": "核验绑定手机号并取得需要发送的短信信息。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "mobile",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "绑定的密保手机号。"
      },
      {
        "name": "area_code",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "手机号区号，例如 86；无隐式默认值。"
      }
    ]
  },
  "submit_slider": {
    "description": "提交当前密码登录的滑块验证结果并继续登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "ticket",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "腾讯验证码完成后返回的 ticket。"
      },
      {
        "name": "randstr",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "同一次验证返回的 randstr。"
      }
    ]
  },
  "translate_en2zh": {
    "description": "使用 QQ Android 的批量翻译服务，将英文文本翻译为中文。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "words",
        "type": "array",
        "typeLabel": "`string[]`",
        "required": false,
        "description": "待翻译文本数组或翻译结果"
      }
    ]
  },
  "unlike_qzone_feed": {
    "description": "取消对好友空间动态的点赞。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "feed",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "get_qzone_friend_feeds 返回的完整动态对象"
      },
      {
        "name": "feed.app_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "应用标识"
      },
      {
        "name": "feed.user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "feed.nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "feed.create_time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "创建时间"
      },
      {
        "name": "feed.feed_id",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "动态标识"
      },
      {
        "name": "feed.feeds_key",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "上游动态键"
      },
      {
        "name": "feed.url",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      },
      {
        "name": "feed.text",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "文本内容"
      },
      {
        "name": "feed.orig_uin",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "原动态发布者 QQ"
      },
      {
        "name": "feed.orig_tid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "原动态标识"
      },
      {
        "name": "feed.interaction",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "动态互动信息"
      },
      {
        "name": "feed.forward",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "原转发动态，结构与 feed 相同"
      },
      {
        "name": "feed.forward.app_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "应用标识"
      },
      {
        "name": "feed.forward.user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "feed.forward.nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "feed.forward.create_time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "创建时间"
      },
      {
        "name": "feed.forward.feed_id",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "动态标识"
      },
      {
        "name": "feed.forward.feeds_key",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "上游动态键"
      },
      {
        "name": "feed.forward.url",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "资源地址"
      },
      {
        "name": "feed.forward.text",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "文本内容"
      },
      {
        "name": "feed.forward.orig_uin",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "原动态发布者 QQ"
      },
      {
        "name": "feed.forward.orig_tid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "原动态标识"
      },
      {
        "name": "feed.forward.interaction",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "动态互动信息"
      },
      {
        "name": "feed.forward.forward",
        "type": "object",
        "typeLabel": "`object`",
        "required": false,
        "description": "原转发动态，结构与 feed 相同"
      }
    ]
  },
  "update_account": {
    "description": "更新离线账号的密码、协议和设备配置。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "new_protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "更新后的协议 ID；不变时也需显式传原 ID。"
      },
      {
        "name": "password",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "必填条件：按协议。Android 必填；Linux 可留空，留空时登录使用二维码。"
      },
      {
        "name": "device_profile_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "已存在的设备配置 ID，大于 0。"
      },
      {
        "name": "nt",
        "type": "number",
        "typeLabel": "number",
        "required": false,
        "description": "1=NT，0=WTLogin；新增默认1，更新省略保留。WTLogin仅支持Android。"
      }
    ]
  },
  "upload_friend_forward_msg": {
    "description": "创建文本合并转发消息并发送给指定好友，使用当前账号的原生发送链路。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "send",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否在上传后发送转发消息；默认 false"
      },
      {
        "name": "messages",
        "type": "array",
        "typeLabel": "`object[]`",
        "required": true,
        "description": "转发节点数组，详见下方结构"
      },
      {
        "name": "messages[].source_message_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "当前账号消息缓存中的引用编号，与 message 二选一"
      },
      {
        "name": "messages[].user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "messages[].nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "messages[].message",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "消息段数组，结构见消息段参考"
      },
      {
        "name": "messages[].time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "业务时间戳"
      }
    ]
  },
  "upload_friend_image": {
    "description": "上传图片并取得可用于发送消息的 `image` 消息段。上传完成不会自动发送消息。支持当前节点的在线 Android 与 Linux QQ 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前插件节点内的在线 QQ 账号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "账号协议 ID，须显式提供；0 是有效 ID。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "目标 QQ 号，不能用 UID 替代。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "integer",
        "required": false,
        "description": "普通好友会话省略或传 0；群临时会话传共同群号，此时发送方与目标须在该群且具有临时会话权限。"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。"
      }
    ]
  },
  "upload_friend_video": {
    "description": "上传视频并取得可用于发送消息的 `video` 消息段。上传完成不会自动发送消息。支持当前节点的在线 Android 与 Linux QQ 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前插件节点内的在线 QQ 账号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "账号协议 ID，须显式提供；0 是有效 ID。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "目标 QQ 号，不能用 UID 替代。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "integer",
        "required": false,
        "description": "普通好友会话省略或传 0；群临时会话传共同群号，此时发送方与目标须在该群且具有临时会话权限。"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。"
      }
    ]
  },
  "upload_friend_voice": {
    "description": "上传语音并取得可用于发送消息的 `voice` 消息段。上传完成不会自动发送消息。支持当前节点的在线 Android 与 Linux QQ 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前插件节点内的在线 QQ 账号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "账号协议 ID，须显式提供；0 是有效 ID。"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "目标 QQ 号，不能用 UID 替代。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "integer",
        "required": false,
        "description": "普通好友会话省略或传 0；群临时会话传共同群号，此时发送方与目标须在该群且具有临时会话权限。"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。"
      },
      {
        "name": "base64",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "完整音频的 Base64，与 file_path 不能同时提供。支持纯 Base64、base64:// 前缀和 Base64 data URL。"
      }
    ]
  },
  "upload_group_file": {
    "description": "将本地文件或可下载的 HTTP(S) 文件真实上传到群文件。上传完成后，文件会直接出现在 QQ 群文件列表中。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "file",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "文件来源；受媒体目录权限约束，可使用 transfer:// 引用"
      },
      {
        "name": "name",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "上传后显示的文件名"
      },
      {
        "name": "folder_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "群文件目录 ID，根目录为 /"
      },
      {
        "name": "upload_file",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否执行文件上传，默认 true"
      }
    ],
    "removed": true
  },
  "upload_group_forward_msg": {
    "description": "上传或发送群合并转发。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "send",
        "type": "boolean",
        "typeLabel": "`boolean`",
        "required": false,
        "description": "是否在上传后发送转发消息；默认 false"
      },
      {
        "name": "messages",
        "type": "array",
        "typeLabel": "`object[]`",
        "required": true,
        "description": "转发节点数组，详见下方结构"
      },
      {
        "name": "messages[].source_message_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "当前账号消息缓存中的引用编号，与 message 二选一"
      },
      {
        "name": "messages[].user_id",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "目标 QQ 号"
      },
      {
        "name": "messages[].nickname",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "昵称"
      },
      {
        "name": "messages[].message",
        "type": "object",
        "typeLabel": "`object[]`",
        "required": false,
        "description": "消息段数组，结构见消息段参考"
      },
      {
        "name": "messages[].time",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "业务时间戳"
      }
    ]
  },
  "upload_group_image": {
    "description": "上传图片并取得可用于发送消息的 `image` 消息段。上传完成不会自动发送消息。支持当前节点的在线 Android 与 Linux QQ 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前插件节点内的在线 QQ 账号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "账号协议 ID，须显式提供；0 是有效 ID。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "目标群号。"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。"
      }
    ]
  },
  "upload_group_video": {
    "description": "上传视频并取得可用于发送消息的 `video` 消息段。上传完成不会自动发送消息。支持当前节点的在线 Android 与 Linux QQ 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前插件节点内的在线 QQ 账号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "账号协议 ID，须显式提供；0 是有效 ID。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "目标群号。"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。"
      }
    ]
  },
  "upload_group_voice": {
    "description": "上传语音并取得可用于发送消息的 `voice` 消息段。上传完成不会自动发送消息。支持当前节点的在线 Android 与 Linux QQ 账号。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "当前插件节点内的在线 QQ 账号。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "账号协议 ID，须显式提供；0 是有效 ID。"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "integer",
        "required": true,
        "description": "目标群号。"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "本地允许目录中的文件、HTTP(S) URL、file:// 路径，或本插件服务已经完成的 transfer:// 引用。"
      },
      {
        "name": "base64",
        "type": "string",
        "typeLabel": "string",
        "required": false,
        "description": "完整音频的 Base64，与 file_path 不能同时提供。支持纯 Base64、base64:// 前缀和 Base64 data URL。"
      }
    ]
  },
  "upload_image_to_qun_album": {
    "description": "向已有群相册上传图片。框架使用当前 Android QQ 的 Qzone 登录态创建会话并分片上传。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "group_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标群号"
      },
      {
        "name": "album_id",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "相册列表返回的相册 ID"
      },
      {
        "name": "album_name",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "相册名称"
      },
      {
        "name": "file",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "文件来源；受媒体目录权限约束，可使用 transfer:// 引用"
      }
    ]
  },
  "upload_private_file": {
    "description": "将本地文件或可下载的 HTTP(S) 文件发送给指定 QQ 好友。框架使用 QQ Android 的离线文件通道，依次完成签名申请、Highway 上传和私聊文件消息下发。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "user_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "目标 QQ 号"
      },
      {
        "name": "file",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "文件来源；受媒体目录权限约束，可使用 transfer:// 引用"
      },
      {
        "name": "name",
        "type": "string",
        "typeLabel": "`string`",
        "required": true,
        "description": "上传后显示的文件名"
      }
    ],
    "removed": true
  },
  "upload_red_packet_voice": {
    "description": "上传用于语音红包验证的音频并取得验证结果。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "当前服务节点内的账号 QQ 号"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "账号协议配置 ID；从 get_protocol_list 获取，必须显式传入，0 也是有效 ID"
      },
      {
        "name": "red_packet",
        "type": "object",
        "typeLabel": "`object`",
        "required": true,
        "description": "红包参数对象，详见下方结构"
      },
      {
        "name": "red_packet.title",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "收到的红包标题，沿用消息事件中的值"
      },
      {
        "name": "red_packet.listid",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包编号"
      },
      {
        "name": "red_packet.authkey",
        "type": "object",
        "typeLabel": "`string`",
        "required": false,
        "description": "消息事件中的红包认证键"
      },
      {
        "name": "red_packet.channel",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游红包通道值"
      },
      {
        "name": "red_packet.pay_flag",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包支付标识"
      },
      {
        "name": "red_packet.hb_from",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "消息事件中的红包来源标识"
      },
      {
        "name": "red_packet.msg_random",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "上游消息随机数"
      },
      {
        "name": "red_packet.client_seq",
        "type": "object",
        "typeLabel": "`integer`",
        "required": false,
        "description": "客户端序列号"
      },
      {
        "name": "red_packet.grab_uin_list",
        "type": "object",
        "typeLabel": "`integer[]`",
        "required": false,
        "description": "红包消息中的领取目标 QQ 列表"
      },
      {
        "name": "sender_id",
        "type": "number",
        "typeLabel": "`integer`",
        "required": true,
        "description": "发送红包或转发资源的 QQ 号"
      },
      {
        "name": "file_path",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "文件来源；本地文件须在管理员允许的媒体目录内，或使用 transfer:// 引用"
      },
      {
        "name": "base64",
        "type": "string",
        "typeLabel": "`string`",
        "required": false,
        "description": "音频 Base64 内容，与 file_path 二选一"
      }
    ]
  },
  "wtlogin_check_sms": {
    "description": "WTLogin 提交短信验证码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      },
      {
        "name": "code",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "收到的短信验证码"
      }
    ]
  },
  "wtlogin_get_security_verify_methods": {
    "description": "WTLogin 查询安全验证方式。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "wtlogin_get_sms": {
    "description": "WTLogin 获取短信验证码。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "明确选择账号协议，0 有效；使用 get_protocol_list 查询。"
      }
    ]
  },
  "wtlogin_login_account": {
    "description": "WTLogin 密码登录。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      }
    ]
  },
  "wtlogin_submit_slider": {
    "description": "WTLogin 提交滑块验证。",
    "params": [
      {
        "name": "self_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "当前插件节点内的 QQ 号，5–10 位整数。"
      },
      {
        "name": "protocol_id",
        "type": "number",
        "typeLabel": "number",
        "required": true,
        "description": "账号实例的协议 ID；必须显式提供，0 是有效 ID。用 get_protocol_list 查询，不使用 client_type 替代。"
      },
      {
        "name": "ticket",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "腾讯验证码完成后返回的 ticket。"
      },
      {
        "name": "randstr",
        "type": "string",
        "typeLabel": "string",
        "required": true,
        "description": "同一次验证返回的 randstr。"
      }
    ]
  },
  "set_account_delegation": {
    "params": [
      {
        "name": "self_id",
        "type": "integer",
        "required": true,
        "description": "QQ 号，10000–9999999999。"
      },
      {
        "name": "protocol_id",
        "type": "integer",
        "required": true,
        "description": "账号协议 ID，必须显式提供，0 有效。"
      },
      {
        "name": "device_profile_id",
        "type": "integer",
        "required": true,
        "description": "当前账号绑定的设备指纹 ID。"
      },
      {
        "name": "request_id",
        "type": "string",
        "required": true,
        "description": "8–128 位字母、数字、下划线、点或连字符；发送前持久保存的幂等标识。"
      },
      {
        "name": "revision",
        "type": "integer",
        "required": true,
        "description": "首次创建传 0；更新传最近返回的修订号。"
      },
      {
        "name": "allow_login",
        "type": "boolean",
        "required": true,
        "description": "是否允许登录，必须显式提供。"
      },
      {
        "name": "allow_tasks",
        "type": "boolean",
        "required": true,
        "description": "是否允许执行等级任务，必须显式提供。"
      },
      {
        "name": "expires_at",
        "type": "integer",
        "required": true,
        "description": "UTC Unix 秒，范围 0–253402300799；任一允许项为 true 时必须为未来时间。"
      },
      {
        "name": "receipt",
        "type": "string",
        "required": false,
        "description": "首次省略或传空；更新必须传原始凭据。"
      }
    ],
    "transport": "ipc"
  },
  "get_account_delegation": {
    "params": [
      {
        "name": "receipt",
        "type": "string",
        "required": true,
        "description": "框架返回的原始委托凭据。"
      }
    ],
    "transport": "ipc"
  },
  "release_account_delegation": {
    "params": [
      {
        "name": "receipt",
        "type": "string",
        "required": true,
        "description": "本安装实例持有的原始委托凭据。"
      },
      {
        "name": "revision",
        "type": "integer",
        "required": true,
        "description": "最近读取的修订号，至少为 1。"
      }
    ],
    "transport": "ipc"
  }
})
