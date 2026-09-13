# 获取闪照原图地址

- action：`get_flash_image`
- 最低版本：框架与 Node.js SDK v2.2.1。

读取当前账号实时收到的闪照原图地址及图片信息。当前识别 CommonElem service 3 的群聊和私聊闪照。私聊消息未携带 origUrl 时，使用 QQ 明确提供的 downloadPath 按私聊原图路由解析；不会只凭 resId、文件名或 MD5 构造地址。私聊已使用 Android 与 Linux QQ 接收真实闪照验证，接口返回地址可下载且大小、MD5 一致；群聊原图地址路径尚未实测。

```js
const image = await api.forProtocol('android').get_flash_image(selfId, messageId)
// image.url 为 QQ 消息提供的原图地址；能否访问以 QQ 服务端为准。
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| self_id | number | 是 | 实际接收闪照的机器人 QQ |
| client_type | string | 是 | android 或 linuxqq；SDK 默认 android，forProtocol 可切换 |
| message_id | number | 是 | 框架消息事件中的 message_id，不能使用 msg_seq 或文件 ID |
| index | number | 否 | 同一消息中闪照的下标，从 0 开始，默认 0 |

## 返回

```json
{
  "message_id": 123456,
  "index": 0,
  "count": 1,
  "file_id": "upstream-file-id",
  "url": "https://gchat.qpic.cn/upstream-original-path",
  "name": "upstream-file-name",
  "md5": "",
  "size": 512,
  "width": 120,
  "height": 80
}
```

`size` 单位为字节。上游未提供的数值为 0、文本为空字符串；URL 缺失会报错。示例地址为占位，不能直接访问。

框架返回消息明确提供的原图地址，或由 QQ 提供的私聊 downloadPath 按原图路由解析的地址，不自动下载、不保存图片、不报告已查看、不修改 QQ 的有效期。成功返回表示找到地址，不代表已验证图片仍可访问；QQ 拒绝访问时不能用此接口恢复。收到消息、调试参数预览都不会触发图片请求。

## 消息识别与缓存

群聊和私聊消息中的闪照使用独立的 `flash_image` 段：

```json
{ "type": "flash_image", "data": { "file_id": "upstream-file-id", "width": 120, "height": 80 } }
```

将外层消息事件的 `message_id` 交给本接口。消息段不自动携带 URL，普通 `image` 不会被当作闪照。不从历史查询补缓存，不查询其他账号或其他协议的消息。元数据仅存内存，最多保留 2 分钟、256 条消息；重复投递不延长已有缓存，重登或框架重启后失效。这个期限是本地元数据保留上限，不是 QQ 闪照的有效期承诺。

## 错误

- `flash_image_unavailable`：当前账号协议没有收到此闪照、元数据已过期或登录会话变更。
- `flash_image_url_unavailable`：消息没有提供可用原图地址或受支持的私聊下载路径；不会根据 MD5、文件 ID 或缩略图猜测原图地址。
- `flash_image_index_out_of_range`：下标超出此消息的闪照数量。
- 参数、服务 Token 和账号权限检查失败时按现有 action 错误契约返回。

协议字段参考：[MiraiGo 消息结构](https://github.com/Mrs4s/MiraiGo/blob/master/client/pb/msg/msg.proto)。这仅证明结构定义，不代表 QQ 当前所有客户端均返回可下载地址。
