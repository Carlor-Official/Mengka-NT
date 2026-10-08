// Build-time validation only. The framework still checks archive safety,
// executable entries, permissions and upgrade rules when importing a package.
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const version = value => typeof value === 'string' && /^[0-9]+\.[0-9]+\.[0-9]+$/.test(value)

export function validatePluginPackageManifest(manifest) {
  const missing = []
  for (const [key, label] of [['name', '插件名称(name)'], ['plugin_id', '插件ID(plugin_id)'], ['version', '版本(version)'], ['notes', '版本说明(notes)']]) {
    if (typeof manifest?.[key] !== 'string' || !manifest[key].trim()) missing.push(label)
  }
  if (!object(manifest?.runtime) || typeof manifest.runtime.admin !== 'boolean') missing.push('Web管理端标记(runtime.admin，必须明确为true或false)')
  if (missing.length) {
    const error = new Error(`缺少资料：${missing.join('、')}；请联系插件开发者补齐安装包描述后重新导入`)
    error.missing_fields = missing
    throw error
  }
  const allowed = ['schema', 'plugin_id', 'name', 'version', 'min_framework', 'author', 'description', 'notes', 'runtime', 'config']
  if (!object(manifest) || Object.keys(manifest).some(key => !allowed.includes(key)) || manifest.schema !== 3 ||
      !/^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/.test(manifest.plugin_id) || manifest.plugin_id.length > 100 ||
      Buffer.byteLength(manifest.name, 'utf8') > 160 || !version(manifest.version) || !version(manifest.min_framework) ||
      typeof manifest.author !== 'string' || !manifest.author.trim() || Array.from(manifest.notes).length > 4000 ||
      !['native-ipc-v1', 'websocket-v1'].includes(manifest.runtime.transport) ||
      typeof manifest.runtime.entry !== 'string' || !manifest.runtime.entry ||
      (manifest.runtime.transport === 'native-ipc-v1' && manifest.runtime.api_version !== '1')) {
    throw new Error('插件包资料无效，请按 SDK 安装包规范修正')
  }
  return manifest
}
