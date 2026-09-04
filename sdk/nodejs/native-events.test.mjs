import assert from 'node:assert/strict'
import { once } from 'node:events'
import test from 'node:test'
import { WebSocketServer } from 'ws'

import { createAPI, NATIVE_EVENTS as forwardEvents } from './sdk.js'
import { NATIVE_EVENTS as reverseEvents } from './reverse-sdk.js'

const expected = [
  'group_message_received', 'private_message_received', 'message_sent',
  'friend_added', 'friend_message_recalled', 'group_message_recalled',
  'group_member_joined', 'group_member_left', 'group_admin_changed', 'group_member_muted',
  'group_file_uploaded', 'group_card_changed', 'group_name_changed', 'group_title_changed',
  'group_essence_changed', 'group_system_tip', 'message_reaction_changed', 'user_poked',
  'profile_liked', 'typing_status_changed', 'friend_request_received', 'group_request_received',
  'account_offline', 'system_heartbeat', 'system_lifecycle',
]

test('forward and reverse SDK expose the same native event catalog', () => {
  assert.deepEqual(forwardEvents, reverseEvents)
  for (const eventName of expected) {
    assert.ok(forwardEvents.includes(eventName), `missing ${eventName}`)
  }
})

test('native event catalog does not contain duplicate listener names', () => {
  assert.equal(new Set(forwardEvents).size, forwardEvents.length)
})

test('request events reach both broad and precise listeners', async () => {
  const server = new WebSocketServer({ host: '127.0.0.1', port: 0 })
  await once(server, 'listening')
  let socket
  server.on('connection', connected => {
    socket = connected
    connected.on('message', raw => {
      const message = JSON.parse(String(raw))
      if (message.type === 'auth') connected.send(JSON.stringify({ type: 'auth_ok' }))
    })
  })
  const api = createAPI({
    host: '127.0.0.1',
    port: server.address().port,
    token: 'native-event-test',
    name: 'native-event-test',
    version: '2.0.4',
    author: 'test',
  })
  const delivered = []
  api.on('request', event => delivered.push(['request', event.event_id]))
  api.on('group_request_received', event => delivered.push(['group_request_received', event.event_id]))
  try {
    await api.connect()
    socket.send(JSON.stringify({
      type: 'event',
      data: {
        post_type: 'group_notice',
        category: 'request',
        event_type: 'group_request_received',
        event_id: 'evt_test',
      },
    }))
    await new Promise(resolve => setTimeout(resolve, 25))
    assert.deepEqual(delivered, [
      ['request', 'evt_test'],
      ['group_request_received', 'evt_test'],
    ])
  } finally {
    api.disconnect()
    await new Promise(resolve => server.close(resolve))
  }
})
