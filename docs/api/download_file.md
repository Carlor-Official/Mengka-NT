# download_file

将公开 HTTP(S) 地址的文件下载到萌卡 NT 框架目录下，并返回后端可直接读取的本地绝对路径。该接口是框架级接口，不需要 `self_id`。

## 调用方式

```js
const result = await api.download_file({
  url: 'https://example.com/files/example.zip',
  headers: {
    Authorization: 'Bearer example-token',
  },
})
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `url` | string | 是 | 仅支持公开的 HTTP(S) 地址 |
| `thread_count` | number | 否 | 兼容字段；使用单连接下载 |
| `headers` | object \| string[] | 否 | 下载请求头；数组格式为 `Header-Name: value` |

## 返回值

```js
{
  file: '/framework/data/plugin-downloads/随机前缀-example.zip',
}
```

文件始终保存在框架目录的 `data/plugin-downloads` 中，不会写入系统临时目录或框架目录之外。单个文件最大 128 MiB，最多跟随 5 次重定向；本机、内网和保留网段地址会被拒绝，防止插件借下载接口访问框架内部服务。

下载失败时会返回明确的 HTTP 状态、文件大小或地址安全错误，不会保留未完成的 `.part` 文件。
