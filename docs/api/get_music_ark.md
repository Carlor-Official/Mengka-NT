# get_music_ark

根据 QQ Android 实际接收的音乐分享结构，生成可由 `send_msg`、`send_group_msg` 或 `send_friend_msg` 发送的 Ark 音乐卡片。

调用方提供歌曲名称、歌手、跳转地址、封面和音频地址；框架向音乐卡片签名服务提交这些公开展示字段，并校验返回值确实包含 `view=music` 和内容绑定 token。框架不会向签名服务发送 QQ 登录凭据、插件令牌或群聊信息。

::: warning 签名依赖
QQ 会校验音乐卡片内容与 token，不能通过复制旧卡片 token 或修改抓包 JSON 生成新歌曲。默认签名服务可由部署环境变量 `MENGKA_MUSIC_SIGN_URL` 替换；服务不可用时接口会明确失败，不会返回必然被 QQ 拦截的伪卡片。
:::

## 调用方式

```js
const { data: musicArk } = await api.get_music_ark(self_id, {
  type: 'qq',
  title: '一半',
  content: '柯基林',
  url: 'https://i.y.qq.com/v8/playsong.html?songid=718815077',
  audio: 'https://example.com/audio/one-half.mp3',
  image: 'https://example.com/image/one-half.jpg',
})

await api.send_group_msg(self_id, group_id, [
  { type: 'ark', data: musicArk },
])
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `self_id` | number | 是 | 在线 Bot QQ 号 |
| `type` | string | 否 | `qq`、`163`（也接受 `netease`）；缺省为 `qq` |
| `title` | string | 是 | 歌曲标题，最多 200 字；也接受 `song` |
| `content` | string | 是 | 歌手或卡片说明，最多 300 字；也接受 `desc`、`artist`、`singer` |
| `url` | string | 是 | 点击卡片后的 HTTP(S) 跳转地址；也接受 `jumpUrl`、`jump_url`、`jump` |
| `audio` | string | 是 | HTTP(S) 音频直链；也接受 `musicUrl`、`music_url`、`audio_url` |
| `image` | string | 是 | HTTP(S) 封面地址；也接受 `image_url`、`picUrl`、`pic_url`、`preview`、`cover` |

`qq` 和 `163` 都生成 `view=music` 可播放卡片，并自动填写对应的来源名称、应用 ID 与图标。

## 返回值

```json
{
  "data": {
    "app": "com.tencent.music.lua",
    "config": {},
    "extra": {},
    "meta": {},
    "prompt": "[分享]一半",
    "ver": "0.0.0.1",
    "view": "music"
  }
}
```

将 `data` 原样放入 `{ "type": "ark", "data": ... }` 消息段。不要把整个返回对象作为消息段的 `data`。

## 错误说明

- `self_id` 必须对应当前调用连接可用的在线账号。
- 所有 URL 必须是带主机名的完整 `http://` 或 `https://` 地址。
- 缺少 `audio` 时会在生成阶段直接报错，不会产生无法播放的卡片。
- 签名服务不可用、返回非 JSON、非音乐卡片或缺少 token 时，接口会返回明确错误。
- `self_id` 只用于选择调用账号和执行插件权限校验，不会被发送给外部签名服务。
