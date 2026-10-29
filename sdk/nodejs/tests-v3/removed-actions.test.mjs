import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { Session, validate, SDKError } from '../common.js'
import { API_CONTRACTS } from '../contracts.js'
import { createHTTPAPI } from '../http.js'

const policy = JSON.parse(fs.readFileSync(new URL('../public-api-policy.json', import.meta.url)))
const removedError = action => error => error instanceof SDKError && error.code === 'API_REMOVED' && error.status === 'removed' && error.action === action && error.uncertain === false && error.message === policy.errorMessage

test('all removed methods and generic calls reject before any transport write', async () => {
  assert.equal(policy.removedActions.length, 94)
  for (const transport of ['ws', 'reverse-ws', 'ipc']) {
    const session = new Session(transport); session.ready = true
    let writes = 0; session.sender = () => { writes++ }
    for (const action of policy.removedActions) {
      assert.equal(typeof session[action], 'function', action)
      await assert.rejects(session[action]({}), removedError(action))
      await assert.rejects(session.call(action, {}), removedError(action))
    }
    assert.equal(writes, 0); assert.equal(session.pending.size, 0)
  }
  const original = globalThis.fetch
  let requests = 0; globalThis.fetch = async () => { requests++; throw Error('must not send') }
  try {
    const api = createHTTPAPI({ url: 'https://example.invalid/', token: 'test-only' })
    for (const action of policy.removedActions) {
      await assert.rejects(api[action]({}), removedError(action))
      await assert.rejects(api.call(action, {}), removedError(action))
    }
    assert.equal(requests, 0)
  } finally { globalThis.fetch = original }
})

test('pet operation only allows the reviewed 30 business operations and catalog', () => {
  assert.equal(Object.keys(policy.operationToLegacyAction).length, 30)
  assert.deepEqual(Object.values(policy.operationToLegacyAction).sort(), policy.petAllowed.map(x => x.action).sort())
  for (const operation of policy.allowedOperations) {
    const params = { self_id: 123456789, protocol_id: 0, operation, request: {} }
    for (const transport of ['ws', 'reverse-ws', 'ipc', 'http']) assert.deepEqual(validate('qqpet_operation', params, transport), params)
  }
  for (const operation of [undefined, null, 1, {}, [], 'PROFILE', ' profile', 'profile ', 'get_pet_profile', 'device.set', '__proto__']) {
    assert.throws(() => validate('qqpet_operation', { operation }, 'http'), removedError('qqpet_operation'))
  }
  assert.throws(() => validate('qqpet_operation', { operation: 'profile', toJSON: () => ({ operation: 'device.set' }) }, 'http'), removedError('qqpet_operation'))
  assert.throws(() => { API_CONTRACTS.qqpet_operation.allowedOperations.push('device.set') }, TypeError)
  assert.throws(() => { API_CONTRACTS.send_group_temp_msg.removed = false }, TypeError)
  assert.deepEqual(validate('get_bot_list', {}, 'http'), {})
})
