# 框架访问与反向代理

框架的登录和管理接口共用来源校验，Windows 与 Linux 行为一致。可以使用 HTTP 或 HTTPS、域名或 IP，以及默认端口或自定义端口；HTTPS 需要与访问地址匹配的证书。

## 直连与代理

HTTP 直连示例：`http://192.0.2.10:7878`。通过代理启用 HTTPS 后，可以使用 `https://panel.example.com` 或带自定义端口的地址。

代理应保留完整 Host（包含非默认端口），并传递浏览器连接到入口时使用的协议。单层 Nginx 代理示例：

```nginx
location / {
    proxy_pass http://127.0.0.1:7878;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

多层代理中，最外层可信入口应覆盖客户端传入的协议头；后续受限的内部代理应保留该入口协议，不能用内部 HTTP 覆盖外部 HTTPS。不要直接信任任意客户端传入的转发头。

## 来源识别修复

来源校验优先使用浏览器自动提供的 `Sec-Fetch-Site: same-origin`。即使云平台终止 HTTPS、改写内部 Host 或丢失转发协议，也能识别浏览器向框架自身发出的请求。登录 Cookie 的 Secure 标记同步按这个可信浏览器上下文识别外部协议。

**不要在代理或前端中自行添加或固定 `Sec-Fetch-Site`。** 该信息必须来自浏览器，否则会破坏框架和独立插件之间的隔离。

HTTP 非安全上下文、旧浏览器或移除浏览器元数据的代理可能不提供该头。此时仍严格比较 Origin 与框架地址，代理必须保留正确的 Host 和协议；不同端口不会被当作同一来源。显式默认端口（HTTP 80、HTTPS 443）、域名大小写和等价 IPv6 写法会进行标准化比较。

来源校验通过不代表登录成功：登录仍需要原有验证码和身份验证；管理接口仍需要有效管理员会话。同域名不同端口的插件属于不同来源，不能借助框架 Cookie 调用框架管理接口。

该修复不增加必填配置项，也不要求重建数据库、删除账号或重新初始化。已有 2.1.0 / 2.1.3 数据目录可保留；仅升级前端文件不能修复后端来源校验，需要替换并启动包含修复的框架程序。

相关标准：[OWASP Fetch Metadata 防护建议](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-fetch-metadata-headers-to-verify-nature-of-the-request)。
