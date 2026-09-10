# Node.js SDK

## 双模式部署与管理员免登 SDK

`plugin-connection.js` 提供统一的 `start/stop` 入口，支持手动正向、手动反向和市场自动部署；`plugin-runtime.js` 提供托管配置、管理员免登校验及生命周期。完整说明见[双模式接入指南](docs/dual-mode-sdk.md)，可运行 Demo 位于 `examples/dual-mode/server.mjs`。示例不含任何实际令牌、插件授权或支付密钥。


此目录提供不带版本子目录的萌卡 NT Node.js SDK：

- `sdk.js`：正向 WebSocket，由插件连接萌卡 NT。
- `reverse-sdk.js`：反向 WebSocket，由萌卡 NT 连接插件。

v2.1.0 的正向与反向 SDK 均提供 233 个 action，包含六个共享等级任务管理 API。插件服务使用服务令牌完成连接认证后，可直接调用框架提供的服务管理 API；`system_management` 与 `allowed_actions` 已从当前契约删除。事件订阅继续使用现有 WS 握手协议，SDK 中存在某个方法不代表框架支持任意未知 action。

## v2.1.0：一体化运行与电脑在线任务

新增独立服务端助手 `managed-connection.js`：`loadManagedConnection()` 读取每次启动分配的 WS 地址及令牌，`loadManagedStorage()` 读取存储与允许目录。详见[一体化插件接入](../../docs/managed-plugins.md)。公开 WS action 数量、名称、参数顺序与 2.0.9 一致，市场发布不再填写指纹或 JSON。

等级任务 `电脑QQ在线` 现在可通过原 `execute_level_tasks` / `execute_level_task_selection` 执行：同 QQ 安卓账号在线时免扫登录 Linux；首次执行自动创建独立 Linux 账号及设备，沿用安卓账号的登录节点，已有 Linux 配置不改写。Linux 已在线时不重复登录，QQ 按实际在线时长判定完成，不立即增加任务积分。插件应在自身业务授权允许创建和登录该 Linux 账号时才开放此任务。

## v2.0.8：在线 API 调试

v2.0.8 引入在线调试功能。控制台新增[在线 API 调试](../../docs/api-debugger.md)，支持 227 个 API 的参数填写、JSON / Python / JavaScript / cURL 预览、复制和手动发送。调试使用已启动的正向 WS 服务，沿用服务令牌、账号协议、专属 Key 与审计链路。

本版没有新增或更名公开 action、事件或 SDK 方法。输入变化只刷新代码；发送失败、超时、断线及 401 均不会自动重放。前后端须同时升级到 v2.0.8，SDK 无需为了调试功能改变调用参数。

## v2.0.7：审计回报与初始化阅读器

当前文档与框架 v2.1.0 对齐，更新于 2026-09-10。会员签到与电脑在线沿用共享等级任务 API；好友备注写入后回读确认，必须显式传入字符串。初始化 HTTP 客户端需遵守[协议确认契约](../../docs/initialization-agreement.md)，前后端必须一起更新。

## v2.0.6：主动申请及群操作

以下能力从 v2.0.6 起提供。完整参数见[官网 API 目录](https://mknt.net/api/)，事件字段见[萌卡原生事件](https://mknt.net/events/)。替换 SDK 不会升级框架服务，调用新增能力前须先升级服务。

v2.0.6 已包含群聊/好友发送引用、私聊接收引用段和 Linux 群图片上传修复。26 类事件已完成列明的双账号、双协议、跨节点和正反向 WS 有限场景验证，不代表所有外部客户端模板或媒体格式均经过实测。

`send_private_msg`成功返回`{ message_id }`，不要要求其返回`send_friend_msg`的`success/msg_seq/msg_random`字段。引用当前消息使用事件顶层`message_id`；接收到的reply段内部标识可能为空。图片URL中的临时`rkey`可能随协议或刷新变化，不应作为消息身份。好友图片和非好友临时会话引用的本轮真实全链路仍未认证，不能由共用单元测试推断已实测。

v2.0.6 增加 `send_friend_request`、`send_group_join_request`、`set_group_name`、`set_group_essence`、`send_poke`、`leave_group`，共 227 个 action；v2.0.5 不支持这些方法，不能仅替换 SDK 后调用旧服务。

`api.forProtocol('android' | 'linuxqq').leave_group({ self_id, group_id })` 主动退群。操作前查询真实成员身份，群主调用拒绝，不提供解散群能力。返回 `submitted: true` 仅为原生请求确认，不合成离群事件；通过成员列表和 `group_member_left` 验证实际结果。网络超时返回结果不确定，不能自动重试。此接口从 v2.0.6 起提供。

v2.0.6 补齐自身离群原生入口，并修复推送顺序、旧会话取消和成员去重提交顺序。两账号 Android/Linux、跨节点及三 WS 已完成主动退出、踢出、拒绝新申请、再次申请及批准恢复的有限场景验证；历史失败记录保留，不反推未抓包来源，也不保证所有外部客户端模板均可用。

`group_member_left` 的自身原生通知可能只有群号；此时 `self_id === user_id`，`reason` 和操作者字段省略，SDK 保持原样，不填入默认原因。框架为简略通知保留约一秒合并窗口，优先采用窗口内的完整原生通知；离线或重登撤销旧任务。使用方不能把字段缺失当作主动退出或被踢出的证明。

`api.forProtocol('android').send_group_join_request(self_id, group_id, message = '')` 主动提交入群申请，说明最多 255 个 UTF-8 字节。返回 `submitted`、`status`、`result`、`group_id`；提交成功不表示已入群。同账号同群至少间隔 60 秒，不确定结果先查询，不自动重试。Linux 主动提交明确返回不支持，不使用 Android 回退。Android 发起、两协议接收及审批已在双账号、跨节点、双正向及单反向 WS 验证；拒绝后重新申请通过。邀请待审批不在本次验收范围内。

v2.0.6 修复 `get_essence_msg_list` 的 `12002` 查询错误，无需更换方法名或传入额外凭据。使用 `api.forProtocol('android')` 选择账号协议；列表中的 `message_id` 属于当前查询账号，不可在不同账号之间复用。该修复尚未发布到 v2.0.5。

`api.forProtocol('linuxqq').kick_group_member(self_id, group_id, user_id, false)` 使用当前 Linux 会话执行移除，`false` 不禁止该成员后续申请。遇到超时或无法确认的结果先查成员列表，不自动重试。踢出、拒绝后重申请及批准恢复已完成双账号、双协议、两节点与三 WS 回归；未知外部模板不因此视为通过。

v2.0.6 同时修复 Android 平板 `scan_qr` / `auth_qr` 的 `-10117`：框架读取同版本 Phone 协议的 `appid`。SDK 调用方式不变，插件不要自行传入 AppID；协议目录需包含匹配版本的 Phone 项。授权后仍须查询二维码登录流程，确认实际上线。

`set_group_name`、`set_group_essence`、`send_poke` 和 `leave_group` 使用对象参数，包含 `self_id`，通过 `api.forProtocol('android' | 'linuxqq')` 选择协议。修改群名传 `group_id, group_name`（UTF-8 最多 60 字节）；精华传 `group_id, message_id, enabled`（`enabled` 必填，消息属于当前账号缓存中的目标群）；戳一戳传 `user_id`，群内操作另传 `group_id`。返回成功不保证事件已投递，超时不自动重试。

```js
const result = await api.forProtocol('android').send_friend_request(
  self_id, user_id, '你好，请通过好友申请', '新朋友'
)
```

`self_id` 为发起账号，`user_id` 为目标 QQ。`message` 和 `remark` 可省略，分别限制为 UTF-8 127 字节。
SDK 默认发送明确的 `client_type: 'android'`，Linux 作用域发送 `linuxqq`。底层调用必须提供 `client_type`，不允许自行携带签名、专属 Key 或节点绑定字段。

v2.0.6 后端的 Linux 主动好友申请已通过两个测试账号、跨节点、双协议接收和双正向 WS 验证，覆盖待审批及无需验证的直接添加。Linux 使用当前会话的原生 UID 请求，当前仍需已解析的目标 UID；无 UID 缓存的陌生账号尚未验收，解析失败明确报错。不借用 Android 会话、不自动降级重发；SDK 方法和参数不变。

返回的 `status` 为 `submitted / policy_rejected / rejected / verification_required`，并保留 `submitted / user_id / policy / result / error_code / message`。提交成功不代表已经成为好友；只能通过真实接收事件的 `flag` 处理申请，并回读好友列表确认。网络超时表示结果未知，不自动重试；同一账号、协议和目标 30 秒内拒绝重复提交。

## 萌卡原生事件

群文件目录回读按账号本次登录隔离：离线、重登撤销旧任务，旧响应不会跨会话重试或提交事件。框架上传动态提交后会唤醒上传者在线协议独立回读，确认真实文件后才生成事件。离线期间的文件可查目录，不在重登后作为新上传重放。

v2.0.6将事件发送改为每条 WS 独立的有序队列，避免一个慢插件阻塞其他插件和账号原生推送处理。单连接最多排队 256 条，待发送及正在发送的数据合计上限 8 MiB；超限或写入失败时断开该连接并记录原因。断线期间的事件不保证补发，插件重连后应重新查询好友申请、账号或群文件等所需状态，不能自动重放有副作用的 action。事件权限、名称、字段和同次广播的 `event_id` 保持不变。

正反向 WS 使用相同事件契约。同一账号/协议事件在各合法订阅连接中的 `event_id` 和载荷一致；消息 `source` 保留实际发起服务名称。私聊、群文件、头衔和群申请等已分别完成三路有限场景验证，不能由单项结果外推所有通知来源。反向监听应配置令牌并限制网络访问范围。

v2.0.6修复较长群撤回通知的长度解析。群历史查询的 `message_seq: 0` 改为读取服务器真实最新序号，返回消息将保存可供 `get_msg` 使用的账号范围内 `message_id`，排除已删除的无发送者占位记录；查询历史不会重播消息事件。接口名称及参数不变，Linux 仍须单独实机验收。

SDK 同时支持大类监听和具体事件监听。具体事件通过 `event.event_type` 分发，事件对象统一包含 `event_id`、`occurred_at`、`category`、`event_type`、`self_id`、`client_type` 和 `post_type`。

7 个大类监听入口为 `group_message`、`friend_message`、`request`、`group_notice`、`friend_notice`、`system_event`、`bot_offline`；它们与下列 26 个精确事件共享对应事件数据，不应计为 7 类新增原生事件。

```js
api.on('group_member_joined', event => {
  console.log(event.group_id, event.user_id)
})

api.on('system_heartbeat', event => {
  console.log(event.status, event.interval_seconds)
})
```

当前具体监听器：

- 消息：`private_message_received`、`group_message_received`、`message_sent`。
- 请求：`friend_request_received`、`group_request_received`。好友申请的 `flag` 为不透明字符串，必须连同事件 `self_id`、`client_type` 原样传入处理接口；不要转为数字或跨协议使用。v2.0.6支持 Linux 原生接收及处理申请，缺少数字 QQ 标识时保留 `user_uid`。
- 群通知：`group_message_recalled`、`group_member_joined`、`group_member_left`、`group_admin_changed`、`group_member_muted`、`group_file_uploaded`、`group_card_changed`、`group_name_changed`、`group_title_changed`、`group_essence_changed`、`group_system_tip`、`message_reaction_changed`。
- 好友通知：`friend_added`、`friend_message_recalled`、`user_poked`、`profile_liked`、`typing_status_changed`。
- 系统：`system_lifecycle`、`system_heartbeat`、`account_online`、`account_offline`。`account_online` 需要 `system_event` 订阅，原生登录完成后触发，携带 `self_id`、`client_type`、`node_id`；重复在线状态不重复触发。

正向连接应在 `connect()` 前注册监听器，反向服务应在接入框架连接前注册。SDK 自动声明权限；`NATIVE_EVENTS` 导出包含 7 个大类加 26 个精确事件，共 33 项，不是 33 类独立业务事件。

| 范围 | 认证权限字段 |
| --- | --- |
| 群 / 好友消息 | `group_message` / `friend_message` |
| 好友 / 群申请 | `request` |
| 群 / 好友通知 | `group_event` / `friend_event` |
| 连接、心跳、账号上线 | `system_event` |
| 账号离线 | `bot_offline` |

好友申请必须有 `request`；当前群申请接受 `request` 或 `group_event` 任一权限，精确群申请监听器会声明两者。

具体监听器和大类监听器同时注册会分别回调，不要把两次回调误判成两次服务器事件。同步回调异常由 SDK 捕获，异步处理需自行 `.catch()`。

`system_lifecycle` 在认证成功后产生一次 `connected`，`system_heartbeat` 每 30 秒为 `alive`；两者按连接独立生成 ID，账号字段为 `self_id: 0, client_type: 'framework'`。账号上线/离线则按账号真实状态转换生成，不因 WS 重连补发；上线需要 `system_event`，离线需要 `bot_offline`。离线、重登及控制心跳不等同于业务事件补发。

普通好友申请使用 `friend_request_received`，以事件的账号、协议和原样 `flag` 处理；`get_doubt_friends_add_request` 只查询 Android 可疑申请，空列表不能证明没有普通申请。拒绝不会产生 `friend_added`，新申请必须使用新标识。不要自动审批收到的所有申请。

### v2.0.6：结构化通知修复

只有摘要的原生群卡片统一为 `group_system_tip`，插件可展示 `body.summary`，不要按文案推断管理员、名片、群名、头衔、精华、文件或戳一戳变化。v2.0.6 框架删除了这类关键词误分类；专用事件仍由各自原生结构化数据或已标记的服务器回读确认，不再用摘要替代必要字段。事件监听器和订阅权限名称不变。

以下为v2.0.6 的结构化字段。验收范围须按事件与触发方式区分，不能由某个字段或监听器存在推断所有协议及场景均可用：

| 事件 | 已确认字段 |
| --- | --- |
| `group_admin_changed` | `group_id`、`target`、`body.set_admin`（设置为 `true`，取消为 `false`） |
| `group_card_changed` | `group_id`、`target`、`body.card`（空字符串表示清空） |
| `friend_message_recalled` | `operator`、`body.msg_seq`、`body.from_uid`、`body.to_uid`；可选 `body.prompt_text` |
| `message_reaction_changed` | `group_id`、`operator`、`body.msg_seq`、`body.emoji_id`、`body.count`、`body.operation`（`add` / `remove`）；缓存命中时有 `body.message_id` |
| `typing_status_changed` | `operator`、`body.state`、`body.from_uid`、`body.to_uid`；可选 `body.text`。Android 实测 `1` 开始、`0` 停止 |
| `group_member_joined` | `group_id`、`user_uid`；确认 QQ 映射时有 `user_id`，原生入群完成通知不再依赖历史审批记录 |

`operator` / `target` 可包含 `uid`，只有确认对应 QQ 时才包含 `user_id`；不要将缺失值当作账号 `0`。管理员原生通知未提供操作者时省略 `operator`。同一账号事件在不同 WS 上保留相同 `event_id`；不同账号收到同一群操作会各自生成事件，请结合 `self_id + client_type` 处理。

`group_member_left` 直接处理原生完成通知，提供可确认的 `user_uid`、`operator_uid` 和 `reason: 'left' | 'kicked'`；原因未知时省略。入群/退出事件不保证存在 `request_id`，不能把成员完成通知当作待处理请求审批。

框架上传的 `group_file_uploaded` 已通过两账号 Android/Linux、跨节点、双正向 WS 的上传者及接收者验证；接收方两协议离线时，上传者仍能独立确认上传，接收方重登不重播离线期间的文件。该确认使用真实服务器目录，提供 `body.file_id`、`file_name`、`file_size`、`busid`、`upload_time`（秒）及 `parent_folder_id`，不伪造 `msg_seq`。

框架发起的名片、管理员和头衔变更通过修改前后服务器状态确认补齐缺失通知；原生与回读共同去重，A → B → A 不会被连续相同值去重吞掉。文件与属性的回读事件有顶层 `source: 'server_readback'`、`confirmed_at`（毫秒）；原生通知省略这两个字段，无法确认的操作者不虚构。离线或重登会撤销旧回读，回读超时不是成功事件。

文件、名片、管理员、头衔、群申请、加入和移出已完成双账号、Android/Linux、两节点及双正向/单反向 WS 的对应回归。反向重连后的文件与头衔另有验证，但其他客户端触发方式不据此视为通过。

文件树事件回读含重试总预算 45 秒，属性修改后所有观察者共享 15 秒预算，两类查询共用最多 8 个名额。外部客户端直接修改、没有任何提示的外部上传、完整原生文件消息、长期高负载必须独立验收；不要把框架 API 成功视为事件必达承诺。

已确认的小页提前结束问题改为在原位置复核并扩大末页窗口：两个原失败目录的四会话、两种页大小共 16 份结果一致；含 21 个文件、8 个目录的混合列表在五种页大小下共 20 份结果一致。`file_count` 是初始单页数量，末页存在歧义时增加只读复核，单次仍不超过 100 条。满 100 条时移动半个窗口，以原生顺序核对重叠记录后确认尾部，不再直接报错。总条目上限 10000，单次完整目录读取最多 45 秒（调用方更短的截止时间优先）；视图矛盾、重复或无法确认完整性仍返回错误。

99/100/101 条目录边界已在四会话与页大小 1/50/100 下交叉验证，目录事件专项使用双正向 WS，与三路回归分别记录。更大目录、持续并发变化、无提示外部上传及长期高负载未由这些测试覆盖。真实被踢/票据过期、自然禁言到期、全员禁言、邀请待审批、好友图片和非好友临时会话引用也不在这组真实回归范围内。

## 2.0 服务管理接口

服务管理接口不再使用单独开关或逐项授权清单。插件通过框架服务令牌认证后可直接调用；管理端地址仅用于管理员 SSO，可留空。

```js
const context = await api.get_plugin_context()
if (context.management_api_version !== 1) throw new Error('框架服务管理 API 版本不匹配')

const nodes = await api.get_node_list()
const bots = await api.get_bot_list()
const accountContext = await api.get_account_management_context()

await api.add_account({
  self_id,
  password,
  protocol_id,
  device_profile_id,
  node_id: nodes[0].id,
  client_type: 'linuxqq',
})
```

v2.0.9 服务管理接口共 53 个 action：33 个管理专用接口与 20 个复用 Bot 处理器的接口，均由 `get_plugin_context().available_actions` 声明。它是v2.0.9 的 233 个公开 action 的子集，不是全部目录。插件应检查所需能力，不能只检查 `management_api_version === 1`。

33 个管理专用 action 分为：

- 等级任务管理：`get_level_task_accounts`、`get_level_task_account`、`get_level_task_panel`、`get_level_task_settings`、`update_level_task_settings`、`execute_level_task_selection`

- 插件与节点：`get_plugin_context`、`get_node_list`、`create_node`、`update_node`、`delete_node`、`test_node_latency`

- 指纹：`create_device_profile`、`delete_device_profile`
- 账号目录与设置：`get_account_management_context`、`get_account_settings`、`update_account_settings`
- 离线通知与缓存：`get_account_offline_notification`、`update_account_offline_notification`、`clear_account_cache`、`stop_account_login`
- 身份与安全验证：`submit_account_identity_captcha`、`submit_account_identity_phone`、`confirm_account_identity_sms`、`retry_account_identity_verify`、`open_account_security_access`、`retry_account_security_verify`
- 授权租约与诊断：`get_account_access_list`、`set_account_access`、`clear_account_access`、`get_account_recent_logs`
- 账号归属验证：`create_account_recovery_qr`、`query_account_recovery_qr_status`。二维码由 Linux 原生链路生成，仅在手机 QQ 确认后返回账号，不执行登录、不保存登录票据。

`create_node` / `update_node` 的直连节点（`proxy_enabled: false`）默认使用 `proxy_type: 'http'`、`port: 8080`（空类型与端口 `0` 同样使用默认值）；明确提供的有效代理设置会保留，关闭代理不会清空这些字段。类型仅支持 `http` / `socks5`，端口为 1–65535。SDK 原样传递参数，默认值由框架处理。更新须提交完整配置，省略 `proxy_password` 保留密码、传入空字符串清除密码。启用中的节点只能保持原配置并设置 `enabled: false`，停用后再修改配置。旧直连节点的空类型、零端口可在停用时自动规范化，无需手动改库。此修复由 v2.0.6 提供。

20 个复用接口为：`get_bot_list`、`get_bot_info`、`get_protocol_list`、`get_device_profile_list`、`add_account`、`update_account`、`delete_account`、`login_account`、`check_cache`、`cache_login`、`submit_slider`、`get_security_verify_methods`、`get_sms`、`check_sms`、`create_login_qr`、`query_login_qr_status`、`get_level_tasks`、`execute_level_tasks`、`get_summary_card`、`get_user_agent`。WS 服务不绑定节点，普通账号接口根据 `self_id + client_type` 在账号实际节点执行。`get_bot_list()` 返回当前框架实例的全部账号，插件用户归属与商业权限仍需由插件自己的后端校验。

`create_device_profile`、`stop_account_login` 是当前唯一名称；`generate_device_profile`、`offline_account` 不再注册。`add_account`、`update_account` 只接受对象参数。编辑账号协议时由 `client_type` 指定原协议、`target_client_type` 指定目标协议。

服务配置请求不得携带 `node_id`、`system_management` 或 `allowed_actions`。反向 WS 不再接收 `X-Mengka-Node-ID`，ready 及上下文也不返回服务级 `node_id`。`get_plugin_context` 返回 `service_id`、`service_name`、`admin_base_url`、`management_api_version` 和 `available_actions`。这是当前契约，不提供旧服务字段兼容；账号新增/编辑与节点管理接口自己的 `node_id` 不应删除。

节点列表不会返回代理密码；更新节点时省略 `proxy_password` 表示保留，传空字符串表示清除。账号授权租约按 `(self_id, platform)` 独立，Android 与 Linux 不共享权益。

正向与反向 SDK 的 action 与参数顺序一致。使用规范协议名 `android`、`linuxqq`；便捷方法的默认目标是 Android，切换协议请用 `forProtocol`。无作用域的通用 `call` 不会替你补账号协议，账号 action 必须显式传 `self_id` 和 `client_type`。

目录中尚未提供便捷方法的 API，可以使用通用调用入口：

```js
await api.forProtocol('linuxqq').call('action_name', { self_id, ...params }, { timeout: 60000 })
```

`api.callAction` 与 `api.call` 等价。调用会经过服务令牌认证、action 注册检查；专属 Key API 还会执行独立鉴权。

`send_packet` 与 30 个 QQ 宠物 API 由框架统一执行专属 Key 鉴权。插件只提交原有业务参数，框架会自动读取当前实例已固定绑定并加密保存的 Key；插件配置、action 外层和 `params` 均不接受 `access_key`：

```js
const api = createAPI({
  host: '127.0.0.1',
  port: 3001,
  token: process.env.MENGKA_PLUGIN_TOKEN,
  pluginId: 'example-plugin',
  name: 'example',
  version: '1.0.0',
  author: 'developer',
})

await api.send_packet(self_id, cmd, data, true, reserve)
```

Key 的选择与绑定由框架管理端发起，权限、续期和吊销由算法系统管理。插件无权读取、提交、替换或记录完整 Key；绑定失效时，框架会返回稳定的专属 Key 鉴权错误。

v2.0.6 增加明确确认的实例接管：同一框架的所有 WS 共用当前实例授权，不需要修改 SDK 参数。接管后旧实例的新受控调用被拒绝；已获准的在途请求可按原审计记录回报，不能重新申请或缓存正向授权继续调用。QQ 登录、非受控 API 与插件服务令牌保持独立。接管需协同更新算法服务和框架前后端，不能把 SDK 更新当作服务已升级；详情见仓库 `release-notes-v2.0.6.md`。

管理员清空专属 Key 后，旧凭据不能继续申请授权。框架识别经过验证的清空状态后撤下本地激活，用户需要领取新的 Key 重新激活；插件不读取完整 Key，也不自行重绑或重试有副作用的受控调用。

随机设备指纹与框架前端“指纹 → 添加指纹 → 一键生成其余内容”使用同一套规则。接口不需要参数，会创建并保存一条随机命名的独立指纹记录；返回的 `id` 可以直接作为 `add_account` 的 `device_profile_id`：

```js
const profile = await api.create_device_profile()
await api.add_account({ self_id, password, protocol_id, device_profile_id: profile.id, node_id, client_type: 'android' })
```

Linux 账号登录完整使用框架管理端的原生账号链路。调用 `login_account` 并传 `client_type: 'linuxqq'` 时，框架会返回原生二维码信息；使用现有 `query_login_qr_status` 按管理端相同的 1.5 秒间隔查询，确认后由框架完成上线。二维码失效后可调用现有 `create_login_qr` 刷新，不新增平行 action。

在线 Android Bot 也可以扫描并授权另一个登录二维码：

```js
await api.scan_qr(android_self_id, qr_url_or_k)
await api.auth_qr(android_self_id, qr_url_or_k, false)
```

红包接口保留规范的 `red_packet` 嵌套对象。第 4 个参数接受消息段的 `data` 或完整 `red_packet` 段，由 SDK 构造当前请求；这不代表可以连接任意旧版框架：

```js
const redPacket = event.message.find(segment => segment.type === 'red_packet')
const info = await api.get_red_packet_info(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket,
)
const result = await api.grab_red_packet(
  event.self_id,
  event.group_id,
  event.sender.user_id,
  redPacket,
  info.pre_grap_token,
)
```

安装依赖：

```bash
npm install
```

正向模式：

```js
import { createAPI } from './sdk.js'
```

反向模式：

```js
import { createReverseAPI } from './reverse-sdk.js'
```

群聊和私聊原生引用回复直接复用现有发送 API。`message_id` 使用消息事件或发送接口返回的值：

```js
await api.send_group_msg(self_id, group_id, [
  { type: 'reply', data: { message_id: event.message_id } },
  { type: 'text', data: { text: '引用回复正文' } },
])

await api.send_friend_msg(self_id, user_id, [
  { type: 'reply', data: { message_id: event.message_id } },
  { type: 'text', data: { text: '引用回复正文' } },
])
```

群成员无需互为好友也可以通过来源群发起临时会话：

```js
await api.send_group_temp_msg(self_id, group_id, user_id, [
  { type: 'text', data: { text: '你好，这是群临时会话。' } },
])
```

发送群红包支持 `lucky`、`normal`、`exclusive`、`voice` 和 `command` 五种类型。金额单位为分，支付密码只应在本次调用中传入：

```js
await api.send_group_red_packet(
  self_id,
  group_id,
  'normal',
  100,
  2,
  payment_password,
  '恭喜发财',
)
```

可运行示例位于仓库的 `plugin/正向WebSocket/Node.js` 和 `plugin/反向WebSocket/Node.js`。

## v2.0.9：共享等级任务管理

六个共享管理 API 从 v2.0.9 起提供，使用前检查框架能力。参数、返回和用户插件迁移说明见[共享等级任务管理](../../docs/level-task-management.md)。

## 一体化插件部署

v2.1.0 支持由框架管理安装、连接和进程。Node.js 服务端可通过独立的 managed-connection.js 助手读取启动时的私有连接文件。契约与部署要求见[托管插件接入](../../docs/managed-plugins.md)。WS action 契约保持 v2.0.9 不变。


## 2.1.0 升级

- [等级任务与会员签到](../../docs/level-task-management.md)：会员任务通过同一套面板、设置和选中执行 API 接入，新增开关默认关闭。
- [好友备注](../../docs/api/set_friend_remark.md)：Android、Linux 写入后回读确认；必须显式传字符串，`remark: ''` 表示清空，缺失或非字符串不再误清空。
- [一体化插件接入](../../docs/managed-plugins.md)：使用 `managed-connection.js` 读取框架提供的连接与存储信息。
