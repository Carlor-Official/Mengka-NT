# stop_account_login

停止指定 QQ 与协议当前正在进行的登录会话或下线已登录账号。

## 调用方式

```js
const result = await api.stop_account_login(self_id, 'android')
// { stopped: true, status: 0 }
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 目标 QQ |
| `protocol` | string | 否 | `android` 或 `linux`，默认 `android` |

该接口用于取消等待扫码、滑块、短信或安全验证的流程，不删除账号或缓存。若会话已经结束，`stopped` 可能为 `false`。

## 返回值

返回 `{ stopped: boolean, status: number }`。`stopped` 表示是否停止了登录或在线会话，`status` 为操作后的账号状态。
