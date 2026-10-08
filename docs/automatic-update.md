# 框架自动更新（v2.5.4）

在「设置 → 框架更新」开启「自动更新」。默认关闭，升级旧配置不会自动开启；保存后立即生效，配置会随框架重启保留，不需要浏览器保持打开。

后台每10分钟检查一次官方公开正式版。只在发现更新版本且有当前平台安装包时更新；使用现有更新流程验证SHA-256、解压、替换及重启，不安装草稿或预发布版。检查或下载失败会间隔重试，不反复并发安装；安装失败可在框架日志查看原因。

更新会短暂重启框架。QQ账号是否自动恢复取决于原有「缓存登录」和「自动登录」配置，自动更新不会擅自开启这两项，也不会清空账号缓存、重置设备指纹或代做安全验证。

关闭开关后停止后续更新，并取消尚在下载/准备阶段的自动更新；已经进入文件替换阶段的安装不强行中断。文件已经替换但重启失败时，需要管理员手动重启，不继续重复覆盖运行文件。

管理员设置接口和既有服务管理API中的 `get_account_settings` 返回 `autoUpdate: boolean`；`update_account_settings` 支持只提交 `{ autoUpdate: true }` 或 `{ autoUpdate: false }`。留空保留原值，不增加新的action或改动旧action名称。此设置是框架实例级，不是单账号配置。

```javascript
await api.update_account_settings({ autoUpdate: true })
const settings = await api.get_account_settings()
console.log(settings.autoUpdate)
```

自动更新依赖框架进程对官方更新服务的网络访问及安装目录写入权限；没有权限或网络不可用时仍保持当前版本，不表示更新成功。
