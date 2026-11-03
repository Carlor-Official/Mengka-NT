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
  assert.match(readFileSync(new URL('../README.md', import.meta.url), 'utf8'), /`login_account`.*Linux.*未保存密码.*登录二维码.*扫码授权权益/)
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
  for (const action of ['get_qq_classic_farm_code', 'qqpet_operation']) {
    assert.match(API_CONTRACTS[action].usageConditions, /不额外限制 QQ 等级/)
    assert.doesNotMatch(API_CONTRACTS[action].usageConditions, /48|16/)
    assert.ok(!API_CONTRACTS[action].removed)
  }
  for (const action of ['send_packet', 'execute_level_tasks', 'scan_qr', 'grab_red_packet']) {
    assert.match(API_CONTRACTS[action].usageConditions, /Free 不可调用.*Plus.*32 级.*Pro/)
  }
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8')
  assert.match(readme, /自框架 3\.0\.7 起.*不额外限制 QQ 等级/)
  assert.match(readme, /Windows.*amd64 PE.*不需要 Docker/)
  assert.match(readme, /Linux.*Docker.*linux\/amd64.*linux\/arm64/)
})
