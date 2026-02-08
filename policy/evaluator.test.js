const test = require("node:test");
const assert = require("node:assert/strict");

const {
  MODES,
  InMemoryStore,
  evaluateAuraVisibility
} = require("./evaluator");

function ms(n) {
  return n;
}

test("Mode A Everyone: anonymous viewer sees aura+activity+city (no precise location)", () => {
  const now = ms(1_000_000);
  const store = new InMemoryStore({
    users: [{ id: "u1", handle: "alice", displayName: "Alice" }],
    auraSessions: [
      {
        id: "s1",
        userId: "u1",
        mode: MODES.EVERYONE,
        auraColor: "orange",
        activityType: "eat",
        coarseCity: "San Francisco",
        eventRoomId: null,
        startedAtMs: now - 10_000,
        lastHeartbeatAtMs: now - 1_000,
        expiresAtMs: now + 200_000,
        endedAtMs: null
      }
    ]
  });

  const res = evaluateAuraVisibility({
    viewerId: null,
    targetId: "u1",
    context: { nowMs: now, requestType: "feed" },
    store
  });

  assert.equal(res.visible, true);
  assert.equal(res.mode, MODES.EVERYONE);
  assert.equal(res.payload.aura.color, "orange");
  assert.equal(res.payload.activity.type, "eat");
  assert.equal(res.payload.location.precision, "city");
  assert.equal(res.payload.location.city, "San Francisco");

  const s = JSON.stringify(res.payload);
  assert.ok(!s.includes("\"lat\""));
  assert.ok(!s.includes("\"lng\""));
  assert.ok(!s.includes("coordinates"));
});

test("Mode C Connected: allowlist grants view; revoke removes immediately", () => {
  const now = ms(2_000_000);
  const store = new InMemoryStore({
    users: [
      { id: "target", handle: "target" },
      { id: "viewer", handle: "viewer" }
    ],
    connections: [
      {
        id: "c1",
        ownerUserId: "target",
        contactUserId: "viewer",
        state: "allowed",
        createdAtMs: now - 1000,
        updatedAtMs: now - 1000,
        revokedAtMs: null
      }
    ],
    auraSessions: [
      {
        id: "s2",
        userId: "target",
        mode: MODES.CONNECTED,
        auraColor: "teal",
        activityType: "commute",
        coarseCity: "New York",
        eventRoomId: null,
        startedAtMs: now - 10_000,
        lastHeartbeatAtMs: now - 500,
        expiresAtMs: now + 100_000,
        endedAtMs: null
      }
    ]
  });

  const ok = evaluateAuraVisibility({
    viewerId: "viewer",
    targetId: "target",
    context: { nowMs: now },
    store
  });
  assert.equal(ok.visible, true);
  assert.equal(ok.mode, MODES.CONNECTED);

  // Revoke.
  store.connections[0].state = "revoked";
  store.connections[0].revokedAtMs = now;
  store.connections[0].updatedAtMs = now;

  const denied = evaluateAuraVisibility({
    viewerId: "viewer",
    targetId: "target",
    context: { nowMs: now + 1 },
    store
  });
  assert.equal(denied.visible, false);
  assert.equal(denied.reason, "not_allowed");
});

test("Mode B Area: only visible when both are in the same event_room; leaving hides", () => {
  const now = ms(3_000_000);
  const store = new InMemoryStore({
    users: [{ id: "alice" }, { id: "bob" }],
    eventRooms: [{ id: "room1", name: "Demo Room" }],
    auraSessions: [
      {
        id: "sa",
        userId: "alice",
        mode: MODES.AREA,
        auraColor: "amber",
        activityType: "work",
        coarseCity: null,
        eventRoomId: "room1",
        startedAtMs: now - 10_000,
        lastHeartbeatAtMs: now - 800,
        expiresAtMs: now + 50_000,
        endedAtMs: null
      },
      {
        id: "sb",
        userId: "bob",
        mode: MODES.AREA,
        auraColor: "blue",
        activityType: "idle",
        coarseCity: null,
        eventRoomId: "room1",
        startedAtMs: now - 9_000,
        lastHeartbeatAtMs: now - 700,
        expiresAtMs: now + 10_000,
        endedAtMs: null
      }
    ]
  });

  const visible = evaluateAuraVisibility({
    viewerId: "bob",
    targetId: "alice",
    context: { nowMs: now },
    store
  });

  assert.equal(visible.visible, true);
  assert.equal(visible.mode, MODES.AREA);
  assert.equal(visible.payload.location.precision, "event_room");
  assert.equal(visible.payload.location.eventRoomId, "room1");
  assert.equal(visible.payload.location.eventRoomName, "Demo Room");
  // TTL should be bounded by viewer session expiry too.
  assert.ok(visible.ttlSeconds <= 10);

  // Bob leaves the room (session ends): should no longer see Area content.
  store.auraSessions[1].endedAtMs = now + 1;
  const hidden = evaluateAuraVisibility({
    viewerId: "bob",
    targetId: "alice",
    context: { nowMs: now + 2 },
    store
  });
  assert.equal(hidden.visible, false);
  assert.equal(hidden.reason, "not_allowed");
});

