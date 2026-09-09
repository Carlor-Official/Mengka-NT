import { readFileSync, realpathSync, statSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path'

/** Server-side only. Call again for each process start; never persist or log the token. */
export function loadManagedConnection(connectionFile = process.env.MENGKA_PLUGIN_CONNECTION_FILE) {
  if (!connectionFile || !isAbsolute(connectionFile)) throw new Error('Missing absolute managed connection file')
  if (statSync(connectionFile).size > 98304) throw new Error('Managed connection file is too large')
  const connection = JSON.parse(readFileSync(connectionFile, 'utf8'))
  if (connection.schema !== 1 || !/^[a-zA-Z0-9._-]+$/.test(connection.instance_id || '')) throw new Error('Unsupported managed connection')
  const url = new URL(connection.websocket_url)
  if (url.protocol !== 'ws:' || url.hostname !== '127.0.0.1' || !url.port || url.username || url.password || url.search || url.hash || !['', '/'].includes(url.pathname)) throw new Error('Managed WebSocket must use loopback')
  if (!isAbsolute(connection.token_file || '') || dirname(resolve(connection.token_file)) !== dirname(resolve(connectionFile))) throw new Error('Token file must remain in the private connection directory')
  if (statSync(connection.token_file).size > 4096) throw new Error('Managed token is too large')
  const token = readFileSync(connection.token_file, 'utf8').trim()
  if (token.length < 24) throw new Error('Managed token is invalid')
  return { host: url.hostname, port: Number(url.port), token }
}

/** Directory policy for cooperating plugins; this does not sandbox a native process. */
export function loadManagedStorage(connectionFile = process.env.MENGKA_PLUGIN_CONNECTION_FILE) {
  if (!connectionFile || !isAbsolute(connectionFile) || statSync(connectionFile).size > 98304) throw new Error('Invalid managed connection file')
  const value = JSON.parse(readFileSync(connectionFile, 'utf8'))
  if (value.schema !== 1 || !isAbsolute(value.data_directory || '')) throw new Error('Invalid managed data directory')
  const extra = value.allowed_directories || []
  if (!Array.isArray(extra) || extra.length > 32 || extra.some(path => typeof path !== 'string' || !isAbsolute(path))) throw new Error('Invalid managed allowed directories')
  const roots = [...new Set([value.data_directory, ...extra].map(path => {
    const actual = realpathSync(path)
    if (!statSync(actual).isDirectory()) throw new Error('Managed path is not a directory')
    return actual
  }))]
  return {
    dataDirectory: roots[0],
    allowedDirectories: roots,
    // Existing-file reads only. Resolve symlinks before the containment check.
    resolveFile(path) {
      const actual = realpathSync(resolve(roots[0], path))
      if (!roots.some(root => {
        const part = relative(root, actual)
        return part !== '..' && !part.startsWith(`..${sep}`) && !isAbsolute(part)
      }) || !statSync(actual).isFile()) throw new Error('File is outside the allowed plugin directories')
      return actual
    },
  }
}
