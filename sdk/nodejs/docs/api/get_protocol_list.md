# get_protocol_list

获取可用于创建或更新账号的协议列表。

## 调用方式

```js
const protocols = await api.get_protocol_list()
```

## 参数

无。

## 返回值

返回完整协议数组。选择项目的数组下标即为 `protocol_id`。

```js
const protocol_id = protocols.findIndex(item => item.type === 'TARGET_TYPE')
```
