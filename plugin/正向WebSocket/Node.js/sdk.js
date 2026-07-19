import WebSocket from 'ws'

// ========== 日志工具 ==========
const log = {
  info: (...a)  => console.log('\x1b[36m[SDK]\x1b[0m', ...a),
  ok:   (...a)  => console.log('\x1b[32m[SDK]\x1b[0m', ...a),
  warn: (...a)  => console.warn('\x1b[33m[SDK]\x1b[0m', ...a),
  err:  (...a)  => console.error('\x1b[31m[SDK]\x1b[0m', ...a),
}

// ========== 事件名常量 ==========
const EVENTS = ['group_message', 'friend_message', 'group_notice', 'friend_notice', 'bot_offline']

// ========== API 定义 ==========
const apiDefs = {
  // 获取 skey
  get_skey: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 获取 clientkey (hex 编码)
  get_clientkey: {
    wait: true,
    build: (self_id) => ({ self_id }),
  },
  // 发送群消息: message 为 [{type, data}] 数组, 支持 text/at/image/face。
  // face 支持 qq_face（face_id 必填，face_code 可选）和 super_face（type=33 或 37）。
  // 注: image 需传 file_id, 且对应图片必须已在群内收到过(缓存 2 分钟)
  send_group_msg: {
    wait: true,
    build: (self_id, group_id, message) => ({ self_id, group_id, message }),
  },
  // 发送好友消息: 同 send_group_msg 但不支持 at
  send_friend_msg: {
    wait: true,
    build: (self_id, user_id, message) => ({ self_id, user_id, message }),
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
  // 同意好友发来的群邀请。group_id 来自 friend_notice/group_invite 事件。
  approve_group_invite: {
    wait: true,
    build: (self_id, group_id) => ({ self_id, group_id }),
  },
  // 获取指定域名的 PsKey
  get_pskey: {
    wait: true,
    build: (self_id, domain) => ({ self_id, domain }),
  },
  // 上传群图片（支持本地路径/file:///http(s)://），返回 {type:"image",data:{file_id}} 可直接塞 message 数组
  upload_group_image: {
    wait: true,
    build: (self_id, group_id, file_path, name, image_type) => {
      const p = { self_id, group_id, file_path }
      if (name !== undefined) p.name = name
      if (image_type !== undefined) p.image_type = image_type
      return p
    },
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
  // 点赞 QQ 名片，like_count 默认 1。返回 SSO 错误码、错误信息和原始回包 hex。
  like_summary_card: {
    wait: true,
    build: (self_id, target_uin, like_count = 1) => ({ self_id, target_uin, like_count }),
  },
  // 获取节点下所有 Bot 列表（无需 self_id）
  get_bot_list: {
    wait: true,
    build: () => ({}),
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
  // 添加账号到当前插件所属节点，account 为 5-10 位无符号 QQ 整数
  add_account: {
    wait: true,
    resultMessage: '账号添加成功',
    resultData: false,
    build: (account, password, protocol_id, device_profile_id) => ({ account, password, protocol_id, device_profile_id }),
  },
  // 编辑当前插件所属节点内的账号
  update_account: {
    wait: true,
    resultMessage: '账号编辑成功',
    resultData: false,
    build: (account, password, protocol_id, device_profile_id) => ({ account, password, protocol_id, device_profile_id }),
  },
  // 取消登录中账号或使已登录账号离线，仅限当前插件所属节点
  offline_account: {
    wait: true,
    resultMessage: '账号已离线',
    resultData: false,
    build: account => ({ account }),
  },
  // 删除当前插件所属节点内已离线的账号
  delete_account: {
    wait: true,
    resultMessage: '账号删除成功',
    resultData: false,
    build: account => ({ account }),
  },
  // 登录当前插件所属节点内的离线账号。返回 { code, message }；
  // 滑块、身份验证附带 slider_url、identity_url；安全验证会返回 security_verify
  // （QQ 原始验证原因和可用方法），仅在响应带 URL 时才附带 security_url。
  login_account: {
    wait: true,
    build: account => ({ account }),
  },
  // 查询账号缓存的 token 是否完整有效。
  check_cache: {
    wait: true,
    build: account => ({ account }),
  },
  // 使用缓存连接 MSF，交换 Login ECDH 后执行 InfoSync 登录。
  cache_login: {
    wait: true,
    build: account => ({ account }),
  },
  // 提交 Type 0 滑块验证结果。Bot 会使用内部保存的 cookie 与 SID。
  submit_slider: {
    wait: true,
    build: (account, ticket, randstr) => ({ account, ticket, randstr }),
  },
  // 安全验证方式 4：传入 methods 中的 sign 下发短信，返回的新 sign 需要传给 check_sms。
  get_sms: {
    wait: true,
    build: (account, sign) => ({ account, sign }),
  },
  // 安全验证方式 4：提交短信验证码和下发时获得的 sign，SDK 会自动完成 NTLogin Type 2。
  check_sms: {
    wait: true,
    build: (account, sign, code) => ({ account, sign, code }),
  },
  // 设置/取消群管理员: set_admin=true 设为管理, false 取消
  set_group_admin: {
    wait: true,
    build: (self_id, group_id, target_uin, set_admin) => ({ self_id, group_id, target_uin, set_admin }),
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
}

// ========== 事件分发 ==========
function dispatchEvent(listeners, event) {
  const { post_type, group_id } = event
  let key = null
  if (post_type === 'group_message')   key = 'group_message'
  if (post_type === 'friend_message')  key = 'friend_message'
  if (post_type === 'group_notice')    key = 'group_notice'
  if (post_type === 'friend_notice')   key = 'friend_notice'
  if (post_type === 'bot_offline')     key = 'bot_offline'
  if (key && listeners[key]) {
    try { listeners[key](event) } catch (e) { log.err('事件回调异常:', e) }
  }
}

// ========== createAPI ==========
export function createAPI(config) {
  const { host = '127.0.0.1', port = 3001, token, name, version, author } = config
  if (!token)  throw new Error('token 必填')
  if (!name)   throw new Error('name 必填')
  if (!version) throw new Error('version 必填')
  if (!author) throw new Error('author 必填')

  const listeners = {}       // { group_message: fn, ... }
  const pending = new Map()  // id → { resolve, reject, timer, resultMessage, resultData }
  let ws = null
  let nextId = 0
  let connected = false

  function _send(obj) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return
    ws.send(JSON.stringify(obj))
  }

  function call(action, params, resultMessage = '', resultData = true) {
    return new Promise((resolve, reject) => {
      const id = String(++nextId)
      const timer = setTimeout(() => {
        pending.delete(id)
        const error = `action ${action} 超时 (30s)`
        if (resultMessage) resolve({ code: 1, msg: error })
        else reject(new Error(error))
      }, 30000)
      pending.set(id, { resolve, reject, timer, resultMessage, resultData })
      _send({ type: 'action', id, action, params })
    })
  }

  function connect() {
    const url = `ws://${host}:${port}/`
    log.info(`连接 ${url} ...`)
    return new Promise((resolve, reject) => {
      ws = new WebSocket(url)
      ws.on('open', () => {
        const p = {
          group_message:  !!listeners['group_message'],
          friend_message: !!listeners['friend_message'],
          group_event:    !!listeners['group_notice'],
          friend_event:   !!listeners['friend_notice'],
          bot_offline:    !!listeners['bot_offline'],
        }
        _send({ type: 'auth', token, name, version, author, permissions: p })
      })
      ws.on('message', (data) => {
        let msg
        try { msg = JSON.parse(data.toString()) } catch { return }
        switch (msg.type) {
          case 'auth_ok':
            connected = true
            log.ok('认证成功')
            resolve()
            startPing()
            break
          case 'auth_failed':
            reject(new Error(msg.message || '认证失败'))
            break
          case 'event':
            dispatchEvent(listeners, msg.data)
            break
          case 'action_result':
            if (msg.id && pending.has(msg.id)) {
              const { resolve: res, reject: rej, timer, resultMessage, resultData } = pending.get(msg.id)
              clearTimeout(timer)
              pending.delete(msg.id)
              if (resultMessage) {
                if (msg.ok) {
                  const result = { code: 0, msg: resultMessage }
                  if (resultData) result.data = msg.data
                  res(result)
                }
                else res({ code: 1, msg: msg.error || 'action failed' })
              }
              else if (msg.ok) res(msg.data)
              else rej(new Error(msg.error || 'action failed'))
            }
            break
          case 'pong': break
        }
      })
      ws.on('close', (code) => {
        connected = false
        for (const [, p] of pending) {
          clearTimeout(p.timer)
          if (p.resultMessage) p.resolve({ code: 1, msg: '连接断开' })
          else p.reject(new Error('连接断开'))
        }
        pending.clear()
        log.warn(`连接断开 code=${code}`)
      })
      ws.on('error', (err) => { reject(err) })
    })
  }

  let pingTimer = null
  function startPing() {
    pingTimer = setInterval(() => _send({ type: 'ping' }), 30000)
  }

  function on(eventType, fn) {
    if (!EVENTS.includes(eventType)) return
    listeners[eventType] = fn
  }

  function disconnect() {
    if (pingTimer) clearInterval(pingTimer)
    if (ws) ws.close()
  }

  const api = { on, connect, disconnect }

  // action 方法直接挂 api 上
  for (const [apiName, def] of Object.entries(apiDefs)) {
    api[apiName] = (...args) => {
      const params = def.build(...args)
      if (def.wait) return call(apiName, params, def.resultMessage, def.resultData !== false)
      _send({ type: 'action', action: apiName, params })
    }
  }

  return api
}
