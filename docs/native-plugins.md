# 萌卡 NT 原生插件协议 v1

原生插件由框架安装、启动和停止，通过匿名进程管道接收事件并调用框架 Action。它不监听端口、不连接 WebSocket，也不需要用户填写框架地址或服务令牌。现有正向、反向 WebSocket 插件继续兼容。

## 安装包

原生插件包是 ZIP、TAR.GZ 或 TGZ 成品包，根目录必须包含 `mengka-plugin.json`：

```json
{
  "schema": 3,
  "plugin_id": "native-example",
  "name": "原生插件示例",
  "version": "1.0.0",
  "min_framework": "2.4.1",
  "author": "Example Developer",
  "description": "使用原生 IPC 接入萌卡 NT",
  "runtime": {
    "entry": "native-example.exe",
    "args": [],
    "transport": "native-ipc-v1",
    "api_version": "1",
    "admin": false,
    "actions": ["get_bot_list", "send_group_msg"],
    "events": ["group_message", "system_event"]
  },
  "config": {
    "schema": 1,
    "fields": [
      {
        "key": "api_token",
        "label": "API 令牌",
        "type": "string",
        "group": "服务连接",
        "required": true,
        "secret": true,
        "description": "只写入框架加密配置，不在管理接口中回显"
      },
      {
        "key": "quality",
        "label": "默认清晰度",
        "type": "select",
        "default": "high",
        "options": [
          { "label": "高清", "value": "high" },
          { "label": "流畅", "value": "low" }
        ]
      }
    ]
  }
}
```

每个操作系统和架构分别提供可直接启动的成品包。`entry` 必须是包内相对路径；Windows 包提供 PE 可执行程序，Linux 包提供 ELF 或带 shebang 的可执行脚本。框架不会假定用户已经安装 Node.js。

原生插件协议从萌卡 NT v2.4.1 开始提供。Schema 3 安装包必须设置 `min_framework` 为 `2.4.1` 或更高版本；v2.4.0 及更早版本不能运行该传输。

上传时框架读取包内名称、ID、版本、最低框架版本、入口和权限。页面中的旧版包信息可以留空。手动填写的 ID 或版本与包内描述不一致时拒绝安装。管理员还必须明确确认安装包来自可信来源；安装完成后框架记录完整程序文件指纹，并在每次启动前复核。任何文件变化都会阻止启动，此时先“卸载并保留数据”，再重新上传安装包。更高版本新增 Action、事件权限、Web 管理端或切换传输方式时，首次上传只展示权限差异，必须由管理员再次确认后才会更新；框架不会自动重试。

## 协议

插件的标准输入和标准输出使用一行一条 JSON。标准输出只允许协议消息，日志必须写入标准错误。

插件启动后首先发送：

```json
{"type":"hello","api_version":"1","plugin_id":"native-example","version":"1.0.0"}
```

框架核对包内身份后返回 `ready`。Action 请求、`action_result`、`action_stream` 和事件数据沿用现有插件契约；具有副作用的失败或超时请求不会自动重放。

只有 `runtime.actions` 中声明且框架实际支持的 Action 可以调用。`runtime.events` 当前使用七类事件权限：`group_message`、`friend_message`、`request`、`group_event`、`friend_event`、`system_event`、`bot_offline`。

## 框架内配置

`config.schema` 当前固定为 `1`。字段按清单顺序展示，并支持 `string`、`text`、`integer`、`number`、`boolean`、`select`、`multiselect`。可选约束包括 `required`、`default`、`group`、`description`、`placeholder`、`min`、`max`、`step`、`min_length`、`max_length`、`pattern` 与 `options`。

敏感文本使用 `secret: true`，且不能在安装包内提供默认值。框架使用实例级修订号防止并发覆盖，在本地数据库中加密保存配置；管理接口只返回该字段是否已设置，不返回原值。插件启动时在 `ready.config` 获得完整快照，运行中更新则收到新的 `config` 消息。

## Node.js SDK

```js
import { createNativePlugin } from './native-plugin.js'

const plugin = createNativePlugin({
  pluginId: 'native-example',
  version: '1.0.0',
  actions: ['send_group_msg'],
  events: ['group_message'],
})

plugin.ctx.events.on('group_message_received', async event => {
  if (event.raw_message !== 'ping') return
  await plugin.ctx.actions.call('send_group_msg', {
    self_id: event.self_id,
    client_type: event.client_type,
    group_id: event.group_id,
    message: 'pong'
  })
})

plugin.ctx.lifecycle.on('activate', () => plugin.ctx.logger.info('插件已激活'))
plugin.ctx.lifecycle.on('stop', () => plugin.ctx.logger.info('插件正在停止'))
plugin.ctx.config.onChange((config, revision) => {
  plugin.ctx.logger.info(`配置已更新到 revision ${revision}`)
  // 原子替换业务侧配置；不要把 config 中的敏感字段写入日志。
})
await plugin.start()

const config = plugin.ctx.config.get()
plugin.ctx.logger.info(`当前配置 revision ${plugin.ctx.config.revision}`)
```

`ctx.dataPath` 是框架为当前实例分配的持久化数据目录。插件升级沿用该目录；卸载默认保留业务数据。当前权限限制保护的是框架 Action 与事件能力，不等于完整操作系统沙箱，因此仍只应安装可信来源的原生程序。

## 可选 WebUI

只有确实需要自定义复杂界面时才设置 `runtime.admin: true`。插件必须监听 `MENGKA_PLUGIN_ADMIN_HOST` 与 `MENGKA_PLUGIN_ADMIN_PORT`，并在管理请求中校验 `MENGKA_PLUGIN_ADMIN_TOKEN_FILE` 指向的令牌。浏览器从框架卡片进入一次性 SSO 入口，由既有插件网关代理到回环端口；不要自行公开该端口，也不要在 URL、HTML 或日志中携带内部令牌。普通选项优先使用上面的 Schema 配置页。

## 生命周期

1. 框架校验并解压安装包。
2. 框架创建插件服务、数据目录和匿名管道。
3. 插件发送 `hello`，框架返回 `ready`。
4. 插件从 `ready.config` 读取配置；缺少必填项时框架保持“待配置”。
5. 健康状态成立后，框架发送 `activate` 生命周期消息。
6. 停止、升级或卸载前发送 `stop`，随后终止独立插件进程。

原生插件崩溃不会直接终止框架；框架沿用托管插件的进程监控、状态卡片、日志轮转、失败重试、升级和数据保留机制。
