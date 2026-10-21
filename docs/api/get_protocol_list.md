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

下一版本将移除 Android 9.3.70 手机／平板测试协议。编号 5、6 不再返回，也不会重新分配；保留 9.2.70 的 0、1 和 Linux 的 4。已有 9.3.70 账号需手动选择受支持的协议后重新登录，旧账号资料保留。
