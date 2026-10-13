# get_protocol_list

获取可用于创建或更新账号的协议列表。

## 调用方式

```js
const protocols = await api.get_protocol_list()
```

## 参数

无。

## 返回值

返回协议对象数组。每项包含 `id`（协议 ID）、`type`（设备类型）、`ver`（协议版本）及其他协议字段。创建或更新账号时，将所选项目的 `id` 作为 `protocol_id`，不要使用返回数组的位置代替 ID。

```js
const protocol = protocols.find(
  item => item.type === 'Pad' && item.ver === '9.2.70'
)
if (!protocol) throw new Error('目标协议不可用')
const protocol_id = protocol.id
```

同一设备类型可能提供多个协议版本，应同时匹配 `type` 和 `ver`。可用项目以接口实际返回为准。
