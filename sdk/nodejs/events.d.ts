export type EventPostType = 'group_message' | 'friend_message' | 'group_temp_message' | 'message_sent' | 'group_notice' | 'friend_notice' | 'bot_online' | 'bot_offline' | 'system_event';
export interface EventUser { user_id?: number; uid?: string; nickname: string; remark?: string; card?: string; [field: string]: unknown }
export interface MessageSender { user_id: number; nickname: string; remark?: string; card?: string; role?: number; title?: string; level?: number }
export interface MessageIdentity { /** Decimal string: never coerce to Number. */ uid: string; seq: number; random: number; time: number }
export interface Segment { type: string; data: unknown }
export interface AccountEvent { self_id: number; protocol_id: number; [field: string]: unknown }
export interface MessageFields extends AccountEvent { message_id?: number; msg: MessageIdentity; sender: MessageSender; message?: Segment[]; alt_message?: string; source?: string }
export interface GroupMessageEvent extends MessageFields { post_type: 'group_message'; group_id: number; group_name?: string }
export interface FriendMessageEvent extends MessageFields { post_type: 'friend_message'; receiver: MessageSender }
export interface GroupTempMessageEvent extends MessageFields { post_type: 'group_temp_message'; group_id?: number; group_known: boolean; receiver: MessageSender }
export interface MessageSentEvent extends MessageFields { post_type: 'message_sent'; message_type: 'group' | 'friend' | 'group_temp'; group_id?: number; group_name?: string; group_known?: boolean; receiver?: MessageSender; source: string }
export interface GroupNoticeEvent extends AccountEvent { post_type: 'group_notice'; sub_type: string; group_id: number; group_name?: string; operator?: EventUser; target?: EventUser; body?: unknown; source?: string; confirmed_at?: number }
export interface FriendNoticeEvent extends AccountEvent { post_type: 'friend_notice'; sub_type: string; user_id?: number; user_uid?: string; operator?: EventUser; target?: EventUser; body?: unknown }
export interface FriendRequestEvent extends AccountEvent { post_type: 'friend_notice'; sub_type: 'apply'; user_id: number; user_uid?: string; nickname: string; comment?: string; /** Decimal string: never coerce to Number. */ request_id: string; request_time: number; request_type: number; request_sub_type?: number; source_id: number; sub_source_id: number; msg_type: number; group_msg_type: number; actions: unknown[] }
export interface GroupRequestEvent extends AccountEvent { post_type: 'group_notice'; sub_type: 'apply'; group_id: number; group_name?: string; user_id: number; nickname: string; card?: string; comment?: string; request_id: number; request_type: number; request_extra?: number; invitor_id?: number; invitor_nickname?: string; invitor_card?: string }
export interface GroupMemberEvent extends AccountEvent { post_type: 'group_notice'; sub_type: 'increase' | 'decrease'; group_id: number; group_name?: string; user_id?: number; user_uid?: string; nickname: string; card?: string; invitor_id?: number; invitor_uid?: string; invitor_nickname?: string; invitor_card?: string; handler_id?: number; handler_uid?: string; handler_nickname?: string; handler_card?: string; operator_id?: number; operator_uid?: string; operator_nickname?: string; operator_card?: string; reason?: string; request_id?: number; request_type?: number }
export interface BotOnlineEvent extends AccountEvent { post_type: 'bot_online' }
export interface BotOfflineEvent extends AccountEvent { post_type: 'bot_offline'; err_msg: string; offline_reason: unknown }
/** Connection-level event; no QQ account identity is present. */
export interface SystemEvent { post_type: 'system_event'; sub_type: 'lifecycle' | 'heartbeat'; node_id: number; time: number; interval: number; status: string; [field: string]: unknown }
export type FrameworkEvent = GroupMessageEvent | FriendMessageEvent | GroupTempMessageEvent | MessageSentEvent | GroupNoticeEvent | FriendNoticeEvent | FriendRequestEvent | GroupRequestEvent | GroupMemberEvent | BotOnlineEvent | BotOfflineEvent | SystemEvent;
