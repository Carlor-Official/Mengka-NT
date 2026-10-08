# 领取红包

- action：`grab_red_packet`
- 使用条件：服务已认证，目标账号在线且 QQ 等级至少 16 级。

下一版本起，领取红包由后端核验框架当前账号等级。等级未知或低于 16 级时拒绝领取，不发起领取请求、不自动重试。调用方传入等级不能覆盖此检查，网页「调试」入口同样生效。

红包信息查询 `get_red_packet_info`、群红包查询 `get_group_red_packets` 和等级任务状态查询 `get_level_task_status` 不新增 16 级限制。等级达标不代表任意协议都支持领取，原有协议、认证与参数校验继续生效。

## SDK 调用

```js
const packet = event.message.find(segment => segment.type === 'red_packet')
const info = await api.get_red_packet_info(
  event.self_id, event.group_id, event.sender.user_id, packet.data,
)
const result = await api.grab_red_packet(
  event.self_id, event.group_id, event.sender.user_id,
  packet.data, info.pre_grap_token,
)
```

五个位置参数不变。第 4 个参数也可为完整的 red_packet 消息段，SDK 自动读取 data，并展开成后端请求字段。
`pre_grap_token` 使用 `get_red_packet_info` 返回对象顶层的同名字段；保持现有字段拼写，不放进红包对象内。
请使用收到的红包数据，不自行生成 listid、authkey 或重复领取。登录票据、设备及红包加密上下文由框架提供。

## 请求参数

原始 action 和网页调试使用下列展开字段；SDK 自动展开第 4 个位置参数。

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 已登录的机器人 QQ 号 |
| `client_type` | string | 通用调用必填 | android 或 linuxqq；SDK 默认 android，协议支持情况按原有实现核验 |
| `group_id` | number | 是 | 红包所在群号 |
| `sender_uin` | number | 是 | 红包发送人 QQ 号 |
| `title` | string | 否 | 收到的红包标题 |
| `listid` | string | 是 | 收到的红包列表 ID |
| `authkey` | string | 是 | 收到的红包鉴权串 |
| `channel` | number | 否 | 收到的红包渠道，缺省为 0 |
| `pay_flag` | number | 是 | 收到的红包支付标记 |
| `hb_from` | number | 是 | 收到的红包来源标记 |
| `pre_grap_token` | string | 是 | 预领取响应对象顶层的同名字段 |

## 返回与错误

成功返回红包服务解密后的领取结果 JSON。等级未知、等级不足、账号离线、无效参数、服务错误或超时使调用失败。
领取结果不确定时先核对官方业务状态，不自动重试，也不将传输成功视为已领取。
