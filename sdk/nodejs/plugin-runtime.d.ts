import type { IncomingMessage } from 'node:http'
export type ManualConnection = { mode?: 'forward' | 'reverse'; host?: string; port?: number; token?: string }
export type Connection = Required<ManualConnection>
export type ManagedRuntime = { managed: true; instanceId: string; connection: Connection; dataDirectory: string; allowedDirectories: string[]; resolveFile(path: string): string; adminHost: string; adminPort: number; adminOrigin: string; adminToken: string }
export type PluginRuntime = ManagedRuntime | { managed: false; connection: Connection }
export function resolvePluginRuntime(manual?: ManualConnection, env?: NodeJS.ProcessEnv): PluginRuntime
export function authorizeManagedRequest(runtime: PluginRuntime, req: IncomingMessage): boolean
export function managedAdminPrincipal(runtime: ManagedRuntime): Readonly<{ subject: string; instanceId: string; displayName: string; role: 'admin'; source: 'framework_managed'; passwordLogin: false }>
export function createManagedLifecycle(runtime: PluginRuntime, checks?: { connected?: () => boolean; configured?: () => boolean }): { readonly active: boolean; health(): { ready: boolean; connected: boolean; configured: boolean }; control(action: string): { active: boolean } }
