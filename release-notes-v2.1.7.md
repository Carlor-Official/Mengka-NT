# 萌卡 NT v2.1.7

- 修正 `get_pet_pk_status`：请求成功且业务 body 为空时返回 `finished=true`，body 非空时返回 `finished=false`；`999 / story detail not exist` 等服务端错误仍返回失败。
- 修复 `settle_pet_pk` 无法发出结算请求的问题：取消强制查询 PK 完成状态，直接提交一次结算，并补齐结算来源字段。普通活动结算的完成状态检查保持不变。
- 同步更新调试页说明、Node.js SDK 契约与 QQ 宠物 API 文档。感谢协议资料贡献者 **星空花海**。

## 升级说明

1. 接口名称和请求参数不变。`get_pet_pk_status` 成功时的 `finished` 现为布尔值，可据此判断 PK 是否完成。
2. PK 结算返回 `submitted=true` 仅表示已提交，`effect_verified=false` 表示尚未核验实际效果。提交后请复查宠物数值；空响应、超时或结果未知时不要直接重复提交。
3. 手动升级请先停止框架并备份 `data` 目录，替换主程序和 `public`，保留现有运行数据及配置。更早版本用户请同时查看 [v2.1.5 升级说明](release-notes-v2.1.5.md)。

[QQ 宠物 API 文档](https://github.com/Carlor-Official/Mengka-NT/blob/v2.1.7/docs/qq-pet-apis.md) · [官网 API 文档](https://mknt.net/api/)
