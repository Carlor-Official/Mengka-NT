# get_group_at_all_remain

查询当前 QQ 在指定群聊中使用 `@全体成员` 的权限与剩余次数。

## 调用方式

```js
const result = await api.get_group_at_all_remain({
  self_id: 106606,
  group_id: 106500,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行查询的在线 Bot QQ 号 |
| `group_id` | number | 是 | 目标群号 |

## 返回值

成功时返回：

```json
{
  "can_at_all": true,
  "remain_at_all_count_for_uin": 20,
  "remain_at_all_count_for_group": 20,
  "prompt_message_for_uin": "剩余20次",
  "prompt_message_for_group": "",
  "show_at_all_label": true
}
```

次数和权限由 QQ 服务端返回。

该接口只读取权限与限额，不会发送 `@全体成员` 消息或修改群设置。当前仅支持 Android QQ。
