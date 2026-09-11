# QQ 宠物 API

**API 开源贡献者：星空花海**

仅支持 Android 账号。使用对象参数传入 `self_id`、`client_type` 和接口需要的目标宠物 ID；好友接口另传 `friend_uin`。请使用接口返回的宠物 ID，不要用 QQ 号代替。

喂食和洗护后可通过 `get_pet_vitals` 查询目标数值；写入结果未知时先核对状态。学习、打工和冒险按选项、发起、状态、结算顺序调用。`get_pet_pk_status` 请求成功后，空 body 表示已完成、非空 body 表示进行中；任务无效等错误仍返回失败。PK 结算由调用方按业务时机发起，直接提交一次，不强制查询 PK 状态；提交后复查数值，空响应或超时不自动重发。

## 接口目录

- [获取自身宠物档案](api/get_pet_profile.md) — `get_pet_profile`
- [获取宠物勋章图鉴](api/get_pet_medal_gallery.md) — `get_pet_medal_gallery`
- [获取目标宠物数值](api/get_pet_vitals.md) — `get_pet_vitals`
- [获取宠物成长属性](api/get_pet_attributes.md) — `get_pet_attributes`
- [获取宠物食物库存](api/get_pet_food_catalog.md) — `get_pet_food_catalog`
- [给自身宠物喂食](api/feed_pet.md) — `feed_pet`
- [购买宠物食物](api/buy_pet_food.md) — `buy_pet_food`
- [获取宠物洗护目录](api/get_pet_bath_catalog.md) — `get_pet_bath_catalog`
- [获取宠物洗护库存](api/get_pet_bath_inventory.md) — `get_pet_bath_inventory`
- [给自身宠物洗护](api/bathe_pet.md) — `bathe_pet`
- [购买宠物洗护用品](api/buy_pet_bath_item.md) — `buy_pet_bath_item`
- [获取宠物活动总览](api/get_pet_activity_overview.md) — `get_pet_activity_overview`
- [获取宠物活动选项](api/get_pet_activity_options.md) — `get_pet_activity_options`
- [发起宠物活动](api/start_pet_activity.md) — `start_pet_activity`
- [获取宠物当前活动](api/get_pet_activity_status.md) — `get_pet_activity_status`
- [结算宠物活动](api/settle_pet_activity.md) — `settle_pet_activity`
- [鼓励宠物活动](api/encourage_pet_activity.md) — `encourage_pet_activity`
- [获取学习打工疲劳](api/get_pet_fatigue_status.md) — `get_pet_fatigue_status`
- [获取宠物好友目录](api/get_pet_pk_friends.md) — `get_pet_pk_friends`
- [获取宠物陌生人目录](api/get_pet_pk_strangers.md) — `get_pet_pk_strangers`
- [获取宠物互动消息](api/get_pet_interaction_messages.md) — `get_pet_interaction_messages`
- [获取目标宠物战力](api/get_pet_pk_power.md) — `get_pet_pk_power`
- [踩一踩好友宠物](api/poke_friend_pet.md) — `poke_friend_pet`
- [获取好友宠物档案](api/get_friend_pet_profile.md) — `get_friend_pet_profile`
- [给好友宠物喂食](api/feed_friend_pet.md) — `feed_friend_pet`
- [给好友宠物洗护](api/bathe_friend_pet.md) — `bathe_friend_pet`
- [走访好友宠物](api/visit_friend_pet.md) — `visit_friend_pet`
- [发起宠物 PK](api/start_pet_pk.md) — `start_pet_pk`
- [获取宠物 PK 状态](api/get_pet_pk_status.md) — `get_pet_pk_status`
- [结算宠物 PK](api/settle_pet_pk.md) — `settle_pet_pk`
