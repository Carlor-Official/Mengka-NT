import type { ActionName, ActionParams, ActionMethods, CallOptions } from './contracts.js'
import type { FrameworkEvent } from './events.js'
export type * from './events.js'
export type { ActionName, ActionParams, CallOptions } from './contracts.js'
export type EventPermission = 'group_message' | 'friend_message' | 'group_event' | 'friend_event' | 'bot_online' | 'bot_offline' | 'system_event'
export interface APIBase {
  call<K extends ActionName>(action: K, params: ActionParams[K], options?: CallOptions): Promise<unknown>;
}
export interface Connection extends APIBase {
  readonly ready: boolean;
  on(name: 'event', handler: (event: FrameworkEvent) => void | Promise<void>): this;
  on(name: string, handler: (...args: any[]) => void | Promise<void>): this;
  off(name: string, handler: (...args: any[]) => void): this;
  once(name: string, handler: (...args: any[]) => void): this;
}
export interface Identity { name: string; version: string; author: string; permissions?: Partial<Record<EventPermission, boolean>>; handshakeTimeoutMs?: number }
export type API = Connection & ActionMethods & { connect(): Promise<API>; close(): void }
export function createAPI(options: Identity & { url?: string; host?: string; port?: number; token: string }): API;
export type ReverseAPI = Connection & ActionMethods & { listen(): Promise<ReverseAPI>; close(): Promise<void>; address(): unknown }
export function createReverseAPI(options: Identity & { host?: string; port?: number; path?: string; token: string }): ReverseAPI;
export function createHTTPAPI(options: { url: string; token: string }): APIBase & ActionMethods;
export interface NativePlugin {
  api: Connection & ActionMethods;
  call: APIBase['call'];
  on(name: 'event', handler: (event: FrameworkEvent) => void | Promise<void>): () => void;
  on(name: string, handler: (...args: any[]) => void | Promise<void>): () => void;
  readonly dataPath: string; readonly nodeId?: number; readonly instanceId?: string;
  logger: Record<'debug'|'info'|'warn'|'error', (...values: unknown[]) => void>;
  start(): Promise<NativePlugin>; close(): void;
}
export function createNativePlugin(options: { pluginId: string; version: string; actions: ActionName[]; connectionFile?: string; input?: NodeJS.ReadableStream; output?: NodeJS.WritableStream; handshakeTimeoutMs?: number }): NativePlugin;
export class SDKError extends Error { code?: string | number; action?: ActionName; status?: string; response?: Record<string, unknown>; requiredLevel?: number; currentLevel?: number; errCode?: number; uncertain?: boolean; httpStatus?: number }
export const API_ACTIONS: readonly ActionName[];
export const EVENT_PERMISSIONS: readonly EventPermission[];
