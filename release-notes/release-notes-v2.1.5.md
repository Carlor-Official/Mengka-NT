# 萌卡 NT v2.1.5

- 修复水印设置保存失败，以及修改网站设置时意外覆盖水印配置的问题。
- 保留原有运行概览布局，优化统计数字、页面切换和菜单展开效果，完善移动端显示与减少动态效果选项的适配。
- 插件访问设置支持直接粘贴 PEM 证书和 KEY 私钥，校验后保存；已有 HTTPS 入口可更新证书。
- 会员任务新增“黄钻每日打卡”，默认关闭；移除已下线的“QQ会员每日签到”和“超级会员成长储值奖励”。
- 新增并完善 30 项 QQ 宠物接口，统一对象参数，修正好友宠物、活动、商品和 PK 相关参数与结果处理。感谢 API 开源贡献者 **星空花海**。
- 支持配套用户系统插件在管理页检查并更新已审核版本，需要插件版本提供对应入口；升级前请备份业务数据。
- 完善插件运行管理与 API 调用提示，同步更新 Node.js SDK 和基础开发文档。

## 升级说明

1. 停止框架并备份现有 `data` 目录，完整替换主程序和 `public`，保留运行数据及配置。
2. 插件开发者请同步使用本版 SDK。QQ 宠物接口采用对象参数，旧调用请按[接口说明](https://github.com/Carlor-Official/Mengka-NT/blob/v2.1.5/docs/qq-pet-apis.md)调整。PK 结算在无法确认完成状态时会返回明确错误。
3. `send_packet` 仅供获准的托管插件版本调用，用户无需逐个配置专属 Key。接入方式见[插件 API 使用说明](https://github.com/Carlor-Official/Mengka-NT/blob/v2.1.5/docs/plugin-api-authorization.md)。
4. 运行托管插件时，Windows 请使用管理员权限；Linux 需要以 root 运行的框架系统服务及 `bubblewrap`、`util-linux`、`useradd` 运行依赖。已有部署请按[托管插件说明](https://github.com/Carlor-Official/Mengka-NT/blob/v2.1.5/docs/managed-plugins.md)检查环境后升级。
5. 本地媒体文件请放在插件允许的数据目录或框架共享媒体目录，并使用结构化消息参数；目录外文件及跨目录链接会返回明确错误。

开发入口：[SDK 快速开始](https://github.com/Carlor-Official/Mengka-NT/blob/v2.1.5/docs/sdk-quickstart.md) · [Node.js SDK](https://github.com/Carlor-Official/Mengka-NT/tree/v2.1.5/sdk/nodejs) · [API 文档](https://mknt.net/api/) · [QQ 宠物接口](https://github.com/Carlor-Official/Mengka-NT/blob/v2.1.5/docs/qq-pet-apis.md)。
