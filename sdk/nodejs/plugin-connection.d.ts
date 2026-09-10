import type { ManualConnection, PluginRuntime } from './plugin-runtime.js'
export interface PluginConnection {
  readonly connected: boolean
  readonly runtime: PluginRuntime
  api: { readonly connected: boolean; on(event: string, listener: (event: unknown) => void): void; call<T = unknown>(action: string, params?: Record<string, unknown>, options?: { timeout?: number }): Promise<T>; [key: string]: any }
  start(): Promise<void>
  stop(): Promise<void>
}
export function createPluginConnection(options: { name: string; version: string; author: string; pluginId?: string; runtime?: PluginRuntime; manual?: ManualConnection; env?: NodeJS.ProcessEnv }): PluginConnection
