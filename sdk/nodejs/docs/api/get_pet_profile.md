# 获取自身宠物档案

**API 开源贡献者：星空花海**

档案、生日、性别、等级经验、勋章、实时 PK 战力、性格属性与当前职业。

- action：`get_pet_profile`
- 支持协议：Android。
- 调用方式：普通插件 API；仅接受对象参数。

> 待下一版本发布：本页包含 v2.2.1 之后的参数或返回字段调整。

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线机器人 QQ 号 |
| `client_type` | string | 是 | 当前实现支持 android；须使用 Android 账号 |

## 调用示例

```js
const result = await api.get_pet_profile({
  "self_id": 123456,
  "client_type": "android"
})
```

## 返回结果

完整档案 `source="profile"` 的返回字段如下。OIDB `0x99f2_1` 请求 body 为空，下表字段号相对于 Pet 对象。

| 字段 | 类型 | 说明 / OIDB 字段 |
| --- | --- | --- |
| `pet_id` | string | 宠物 ID，f8；解码后归属当前账号 |
| `user_id` | string | 当前账号 QQ，f5 |
| `pet_name` | string | 宠物名，f1 |
| `avatar_url` | string | 完整头像 f3，缺失时使用 f18 |
| `birthday_at` | number | 生日时间戳，f4 |
| `gender` | number | f6：1 男、2 女、其他未知 |
| `personality` | string | 性格，f7 |
| `personality_url` | string | 性格图，f9 |
| `species` | string | 物种，f11 |
| `level` / `current_exp` / `level_exp` / `exp_rate` | number | f13 的 f1 / f2 / f3 / f4，经验比例为浮点数 |
| `medals` | object[] | 已获勋章，f14 的重复 f1 |
| `power` | number | 实时 PK 战力，f15 |
| `personality_attributes` | object[] | f16 的重复 f1，每项 `{name, value}` 对应属性名 f1 和浮点数值 f2 |
| `personality_attribute_count` | number | 上游属性数量，f16.f3 |
| `career` | object | `{name, open_url, icon_url}` 对应 f17.f1 / f2 / f3；f2 bytes 按文本链接返回 |
| `pk_power` | object | `{dominant_type, power}` 对应 f20.f1 / f4 |
| `source` | string | 完整档案为 `profile`；缓存档案为 `cache` |

新增返回示例（节选）：

```json
{
  "power": 120,
  "personality_attributes": [{"name": "聪明", "value": 12.5}],
  "personality_attribute_count": 1,
  "career": {"name": "学生", "open_url": "https://example.com/career", "icon_url": "https://example.com/icon.png"},
  "pk_power": {"dominant_type": 1, "power": 120},
  "source": "profile"
}
```

数值字段缺失按 0 返回，字符串缺失为空字符串，性格属性列表缺失为空数组。两处战力分别读取各自协议字段，不用某处战力覆盖另一处。缓存降级仍只包含 `pet_id`、`user_id`、`pet_name`、`avatar_url`、`source="cache"`、`partial=true`，不伪造完整档案字段。

参数或业务错误会使调用失败。写入请求结果未知时，请先读取当前状态确认，勿直接重复提交。
