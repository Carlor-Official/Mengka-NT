# get_group_file_system_info

获取群文件数量限制和存储空间使用情况。

## 调用方式

```js
const info = await api.get_group_file_system_info({
  self_id: 1060221,
  group_id: 106500,
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 执行请求的在线 Bot QQ 号 |
| `group_id` | number | 是 | 群号 |

## 返回值

成功时返回：

```js
{
  file_count: 33,
  limit_count: 1500,
  used_space: 207497295,
  total_space: 10737418240,
}
```

空间字段单位为字节，数值来自 QQ 群文件服务端。

该接口只读取容量与文件计数，不会上传、移动、重命名或删除群文件。当前仅支持 Android QQ。
