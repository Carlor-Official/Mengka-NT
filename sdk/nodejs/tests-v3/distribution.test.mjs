import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { publicFiles } from '../scripts/public-files.mjs'
import { API_ACTIONS } from '../index.js'
import { API_CONTRACTS } from '../contracts.js'

test('standalone public distribution explicitly includes lock/types but excludes private and legacy files', () => {
  assert.equal(new Set(publicFiles).size, publicFiles.length)
  for (const path of publicFiles) { assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), path); assert.doesNotMatch(path, /framework-reference|SOURCE\.json|\.git|node_modules|private|^docs\//) }
  assert.ok(publicFiles.includes('package-lock.json')); assert.ok(publicFiles.includes('events.d.ts'))
  assert.ok(publicFiles.includes('tests-v3/removed-actions.test.mjs')); assert.ok(publicFiles.includes('tests-v3/types.mts'))
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))
  const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url)))
  assert.equal(lock.version, pkg.version); assert.equal(lock.packages[''].version, pkg.version)
  assert.equal(pkg.private, true, 'publishing remains gated until joint acceptance')
})
test('SDK generated contract and retirement metadata are consistent in the standalone distribution', () => {
  const source = JSON.parse(readFileSync(new URL('../contract-source.json', import.meta.url)))
  const policyBytes = readFileSync(new URL('../public-api-policy.json', import.meta.url))
  const policy = JSON.parse(policyBytes)
  assert.equal(source.policySHA256, createHash('sha256').update(policyBytes).digest('hex'))
  assert.equal(source.actionCount, API_ACTIONS.length)
  assert.match(source.sha256, /^[a-f0-9]{64}$/); assert.match(source.managedSHA256, /^[a-f0-9]{64}$/)
  assert.deepEqual(API_ACTIONS.filter(x => API_CONTRACTS[x].removed).sort(), policy.removedActions.slice().sort())
  assert.deepEqual(API_CONTRACTS.qqpet_operation.allowedOperations, policy.allowedOperations)
  assert.deepEqual(API_ACTIONS.filter(x => API_CONTRACTS[x].transport === 'ipc').sort(), ['get_account_delegation', 'release_account_delegation', 'set_account_delegation'])
})
