# 初始化协议接口（v2.0.7 起）

## 获取文档

`GET /api/v1/agreement` 返回标准 `code/message/data` 包装，禁止缓存。

`data` 包含：

- `version`：正在运行的服务端版本（不含 `v` 前缀）。
- `documents`：两份文档，`id` 分别为 `terms` / `privacy`；含 `title`、Markdown `content`、小写十六进制 SHA-256 `hash`。
- `accepted`：本地确认记录是否对应当前版本及这两份内容。
- `accepted_at`：已有记录的确认时间；判断当前有效性应使用 `accepted`，不能仅判断时间存在。

内容由服务端嵌入，替换实际软件版本后计算摘要；不要使用前端构建版本替代服务端版本。

## 确认文档

`POST /api/v1/agreement`，`Content-Type: application/json`，请求体最多 8 KiB：

```json
{
  "accepted": true,
  "termsRead": true,
  "privacyRead": true,
  "version": "实际 GET 返回值",
  "termsHash": "terms 文档的 hash",
  "privacyHash": "privacy 文档的 hash"
}
```

请求缺失明确同意／任一阅读标志或 JSON 无效返回 HTTP 400；版本或摘要不符返回 HTTP 409，客户端应重新获取并展示文档。有效确认写入 `data/usage_agreement.json`，同一版本重复确认保持原时间。

阅读状态用于正常界面交互，不构成服务端可以证明用户实际阅读的安全凭据；服务端检查的是明确提交的同意声明及对应文档版本。该接口不是管理员认证接口，确认协议不等于创建管理员或取得账号权限。

## 界面约定

两份文档独立记录阅读位置和完成状态；未读完两份时禁用同意勾选。到达文末不自动勾选；勾选后才可提交。条款或版本变化须重置阅读与勾选状态。已完整显示、无需滚动的短文档可标为已读，隐藏区域不能标为已读。

“暂不初始化”只返回说明页面，不关闭服务、不删除数据。协议中的外部链接另开页面，不打断当前阅读位置。移动端单列，桌面保留初始化双栏；配色取框架主题变量。

## 条款发布前复核

文稿基于当前实现，不代表专业法律审查结论。正式发布前需由实际运营者复核主体、有效联系渠道、真实保存期限、第三方服务和数据出境安排。

参考法律来源：[《民法典》](https://www.court.gov.cn/zixun/xiangqing/233181.html)、[《个人信息保护法》](https://www.samr.gov.cn/wljys/gzzd/art/2023/art_3ef1e889c1e644d4b65b5f5c7f432386.html)。不得使用格式条款不合理免除自身责任，或以自部署为由隐瞒实际外发的数据。
