# 官网域名迁移与管理员登录

官网入口调整为 https://mknt.7ml.top。管理员初始化、PAT 登录、密码登录和会话续验通过新域名的 HTTPS 身份 API 完成。生成个人令牌的入口为 https://mknt.7ml.top/uc/profile?tab=pat。

## 现有管理员升级

保留现有 data/config.yaml、data/config.db 和管理员绑定。无需重新初始化，也不要删除数据库或重置 JWT secret。旧 PAT 的加密用途标识保持不变；它是固定的密文兼容标识，不会触发对旧域名的网络请求。仍然有效的官网 PAT 可继续用于既有管理员登录。

密码登录仍须通过官网账号密码验证，并复验绑定的 PAT。PAT 已过期、账号被禁用或身份不匹配时仍拒绝登录；不会因域名变更绕过认证。TLS 证书校验、禁止身份认证重定向、验证码及会话 Cookie 安全设置保持不变。

管理员身份源没有可持久化覆盖的 URL 配置；旧配置中的管理员资料和加密 PAT 自动沿用。插件市场若设置了 MENGKA_PLUGIN_MARKET_URL 或 MENGKA_PLUGIN_MANAGED_CATALOG_URL，读取时将旧官网 http(s)://mknt.net（含标准端口）迁移到新 HTTPS 域名，路径和查询参数保留。其他自定义服务地址不重写；部署人员可同步更新服务环境变量以便维护。

API 路径中的 api.mknt.net、uc.api.mknt.net 及插件签名数据中的 mknt.net/plugin-* 是既有协议命名空间，保持不变。
