# get_bot_list

获取当前框架实例中的全部 Bot 账号。插件 WS 服务不绑定账号节点；返回项中的 `node_id` 是账号自己的登录节点。

## 调用方式

```js
const bots = await api.get_bot_list()
```

## 参数

无。

## 返回值

返回账号数组。常用字段：

| 字段 | 说明 |
| --- | --- |
| `self_id` | Bot QQ 号 |
| `protocol_id` | 当前协议 ID |
| `device_profile_id` | 当前设备指纹 ID |
| `node_id` | 账号登录节点 ID |
| `platform` | 框架协议标识：`android` 或 `linux` |
| `client_type` | SDK 协议标识：`android` 或 `linuxqq` |
| `nickname` | Bot 昵称 |
| `status` | `0` 离线、`1` 在线、`2` 登录中 |
| `is_qq_vip` | 是否已开通 QQ 会员 |
| `received`, `sent` | 运行期收发消息计数 |

调用其他账号 API 时同时提交 `self_id` 与 `client_type`。框架会定位对应协议账号，并在该账号配置的登录节点上执行。
