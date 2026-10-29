// Explicit standalone ZIP input list. Do not archive the private source repository.
export const publicFiles = Object.freeze([
  'package.json', 'package-lock.json', 'README.md',
  'index.js', 'index.d.ts', 'sdk.js', 'sdk.d.ts', 'reverse-sdk.js', 'reverse-sdk.d.ts',
  'native-plugin.js', 'native-plugin.d.ts', 'http.js', 'common.js',
  'contracts.js', 'contracts.d.ts', 'events.d.ts', 'contract-source.json',
  'examples-v3/forward.mjs', 'examples-v3/http.mjs', 'examples-v3/native.mjs',
  'public-api-policy.json', 'scripts/public-files.mjs',
  'tests-v3/distribution.test.mjs', 'tests-v3/transport.test.mjs', 'tests-v3/removed-actions.test.mjs', 'tests-v3/types.mts',
])
