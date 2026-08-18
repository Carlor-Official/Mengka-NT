export interface MengkaPluginHost {
  embedded: boolean
  pluginId: string
  basePath: string
  apiVersion: number
}

declare global {
  interface Window {
    __MENGKA_PLUGIN_HOST__?: MengkaPluginHost
  }
}

export function getPluginHost(): MengkaPluginHost | null
export function isFrameworkHosted(): boolean
export function resolvePluginPath(path?: string): string
export function pluginFetch(path: string, options?: RequestInit): Promise<Response>
export function ready(): void
export function setTitle(title: string): void

declare const sdk: {
  getPluginHost: typeof getPluginHost
  isFrameworkHosted: typeof isFrameworkHosted
  resolvePluginPath: typeof resolvePluginPath
  pluginFetch: typeof pluginFetch
  ready: typeof ready
  setTitle: typeof setTitle
}
export default sdk
