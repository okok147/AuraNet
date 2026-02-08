/*
  Aura visibility / policy evaluator (Phase 1).

  Contract:
    evaluateAuraVisibility({ viewerId, targetId, context, store })
      -> { visible, mode, level, ttlSeconds, payload, permissions, reason? }

  Security posture:
    - Never include precise location (lat/lng/address/POI) in the returned payload.
    - Area mode is only visible when BOTH viewer and target are currently in the same event_room.
    - Connected mode is an allowlist owned by the target user, with immediate revocation.
*/

const MODES = /** @type {const} */ ({
  EVERYONE: "everyone",
  AREA: "area",
  CONNECTED: "connected"
});

const LEVELS = /** @type {const} */ ({
  NONE: "none",
  AURA: "aura",
  AURA_ACTIVITY: "aura_activity",
  AURA_ACTIVITY_CITY: "aura_activity_city",
  AURA_ACTIVITY_ROOM: "aura_activity_room"
});

const COARSE_LOCATION = /** @type {const} */ ({
  NONE: "none",
  CITY: "city",
  EVENT_ROOM: "event_room"
});

/** @returns {number} ms */
function nowMs() {
  return Date.now();
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[match];
  });
}

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Default per-mode policies. Can be overridden by visibility_policies rows.
 * TTLs are conservative and meant for external visibility, not storage retention.
 */
const DEFAULT_POLICIES = {
  [MODES.EVERYONE]: {
    ttlSeconds: 5 * 60,
    searchable: 0,
    shareAllowed: 1,
    screenshotAllowed: 1,
    coarseLocationLevel: COARSE_LOCATION.CITY,
    showActivityType: 1
  },
  [MODES.AREA]: {
    // Visibility should be bounded by in-room presence; ttlSeconds is a safety cap.
    ttlSeconds: 60,
    searchable: 0,
    shareAllowed: 0,
    screenshotAllowed: 0,
    coarseLocationLevel: COARSE_LOCATION.EVENT_ROOM,
    showActivityType: 1
  },
  [MODES.CONNECTED]: {
    ttlSeconds: 30 * 60,
    searchable: 0,
    shareAllowed: 0,
    screenshotAllowed: 0,
    coarseLocationLevel: COARSE_LOCATION.CITY,
    showActivityType: 1
  }
};

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string=} handle
 * @property {string=} displayName
 */

/**
 * One-way allowlist (owner -> contact).
 * @typedef {Object} Connection
 * @property {string} id
 * @property {string} ownerUserId
 * @property {string} contactUserId
 * @property {'allowed'|'revoked'|'blocked'|'pending'} state
 * @property {number} createdAtMs
 * @property {number} updatedAtMs
 * @property {number|null=} revokedAtMs
 */

/**
 * @typedef {Object} EventRoom
 * @property {string} id
 * @property {string} name
 * @property {string=} roomCode
 */

/**
 * Aura session snapshot; intentionally excludes precise location.
 * @typedef {Object} AuraSession
 * @property {string} id
 * @property {string} userId
 * @property {'everyone'|'area'|'connected'} mode
 * @property {string} auraColor
 * @property {string} activityType
 * @property {string|null=} coarseCity
 * @property {string|null=} eventRoomId
 * @property {number} startedAtMs
 * @property {number} lastHeartbeatAtMs
 * @property {number} expiresAtMs
 * @property {number|null=} endedAtMs
 */

/**
 * Per-user, per-mode visibility policy.
 * @typedef {Object} VisibilityPolicy
 * @property {string} id
 * @property {string} userId
 * @property {'everyone'|'area'|'connected'} mode
 * @property {number} ttlSeconds
 * @property {0|1} searchable
 * @property {0|1} shareAllowed
 * @property {0|1} screenshotAllowed
 * @property {'none'|'city'|'event_room'} coarseLocationLevel
 * @property {0|1} showActivityType
 */

/**
 * @typedef {Object} RiskEvent
 * @property {string} id
 * @property {string} eventType
 * @property {string|null=} actorUserId
 * @property {string|null=} targetUserId
 * @property {string|null=} eventRoomId
 * @property {number} severity
 * @property {Object=} metadata
 * @property {number} createdAtMs
 */

/**
 * Minimal in-memory store for unit tests and local simulation.
 * In production this would be backed by a database.
 */
class InMemoryStore {
  /**
   * @param {{
   *  users?: User[],
   *  connections?: Connection[],
   *  auraSessions?: AuraSession[],
   *  eventRooms?: EventRoom[],
   *  visibilityPolicies?: VisibilityPolicy[],
   *  riskEvents?: RiskEvent[],
   * }} [seed]
   */
  constructor(seed = {}) {
    this.users = seed.users ? [...seed.users] : [];
    this.connections = seed.connections ? [...seed.connections] : [];
    this.auraSessions = seed.auraSessions ? [...seed.auraSessions] : [];
    this.eventRooms = seed.eventRooms ? [...seed.eventRooms] : [];
    this.visibilityPolicies = seed.visibilityPolicies
      ? [...seed.visibilityPolicies]
      : [];
    this.riskEvents = seed.riskEvents ? [...seed.riskEvents] : [];
  }

  /** @param {string} id */
  getUser(id) {
    return this.users.find((u) => u.id === id) || null;
  }

  /** @param {string} id */
  getEventRoom(id) {
    return this.eventRooms.find((r) => r.id === id) || null;
  }

  /**
   * Returns the newest active aura session (not ended, not expired).
   * @param {string} userId
   * @param {number} atMs
   */
  getActiveAuraSession(userId, atMs) {
    const sessions = this.auraSessions
      .filter((s) => s.userId === userId)
      .filter((s) => !s.endedAtMs)
      .filter((s) => s.expiresAtMs > atMs)
      .sort((a, b) => b.lastHeartbeatAtMs - a.lastHeartbeatAtMs);
    return sessions[0] || null;
  }

  /**
   * @param {string} userId
   * @param {'everyone'|'area'|'connected'} mode
   */
  getVisibilityPolicy(userId, mode) {
    return (
      this.visibilityPolicies.find((p) => p.userId === userId && p.mode === mode) ||
      null
    );
  }

  /**
   * @param {string} ownerUserId
   * @param {string} contactUserId
   */
  getConnection(ownerUserId, contactUserId) {
    return (
      this.connections.find(
        (c) => c.ownerUserId === ownerUserId && c.contactUserId === contactUserId
      ) || null
    );
  }

  /**
   * @param {RiskEvent} event
   */
  addRiskEvent(event) {
    this.riskEvents.push(event);
  }
}

/**
 * @param {string} mode
 * @param {VisibilityPolicy|null} policy
 */
function normalizePolicy(mode, policy) {
  const base = DEFAULT_POLICIES[mode] || DEFAULT_POLICIES[MODES.EVERYONE];
  if (!policy) return base;
  return {
    ttlSeconds:
      typeof policy.ttlSeconds === "number" ? policy.ttlSeconds : base.ttlSeconds,
    searchable:
      policy.searchable === 0 || policy.searchable === 1 ? policy.searchable : base.searchable,
    shareAllowed:
      policy.shareAllowed === 0 || policy.shareAllowed === 1 ? policy.shareAllowed : base.shareAllowed,
    screenshotAllowed:
      policy.screenshotAllowed === 0 || policy.screenshotAllowed === 1
        ? policy.screenshotAllowed
        : base.screenshotAllowed,
    coarseLocationLevel:
      policy.coarseLocationLevel === COARSE_LOCATION.NONE ||
      policy.coarseLocationLevel === COARSE_LOCATION.CITY ||
      policy.coarseLocationLevel === COARSE_LOCATION.EVENT_ROOM
        ? policy.coarseLocationLevel
        : base.coarseLocationLevel,
    showActivityType:
      policy.showActivityType === 0 || policy.showActivityType === 1
        ? policy.showActivityType
        : base.showActivityType
  };
}

/**
 * Core evaluator.
 *
 * @param {{
 *  viewerId: string | null,
 *  targetId: string,
 *  context?: { nowMs?: number, requestType?: string },
 *  store: InMemoryStore,
 * }} args
 */
function evaluateAuraVisibility(args) {
  const atMs = typeof args.context?.nowMs === "number" ? args.context.nowMs : nowMs();
  const viewerId = args.viewerId;
  const targetId = args.targetId;
  const store = args.store;

  const targetUser = store.getUser(targetId);
  if (!targetUser) {
    return {
      visible: false,
      mode: null,
      level: LEVELS.NONE,
      ttlSeconds: 0,
      payload: null,
      permissions: null,
      reason: "target_not_found"
    };
  }

  const targetSession = store.getActiveAuraSession(targetId, atMs);
  if (!targetSession) {
    return {
      visible: false,
      mode: null,
      level: LEVELS.NONE,
      ttlSeconds: 0,
      payload: null,
      permissions: null,
      reason: "target_offline"
    };
  }

  const mode = targetSession.mode;
  const policy = normalizePolicy(mode, store.getVisibilityPolicy(targetId, mode));

  const isSelf = viewerId && viewerId === targetId;

  /** @type {AuraSession|null} */
  const viewerSession =
    viewerId && !isSelf ? store.getActiveAuraSession(viewerId, atMs) : null;

  const allowed = (() => {
    if (isSelf) return true;

    if (mode === MODES.EVERYONE) return true;

    if (!viewerId) return false;

    if (mode === MODES.AREA) {
      if (!targetSession.eventRoomId) return false;
      if (!viewerSession || !viewerSession.eventRoomId) return false;
      return viewerSession.eventRoomId === targetSession.eventRoomId;
    }

    if (mode === MODES.CONNECTED) {
      const c = store.getConnection(targetId, viewerId);
      return Boolean(c && c.state === "allowed" && !c.revokedAtMs);
    }

    return false;
  })();

  if (!allowed) {
    // Optional auditing: log denied attempts without leaking payload.
    store.addRiskEvent({
      id: `re_${atMs}_${Math.random().toString(36).slice(2, 9)}`,
      eventType: "visibility_denied",
      actorUserId: viewerId || null,
      targetUserId: targetId,
      eventRoomId: targetSession.eventRoomId || null,
      severity: 1,
      metadata: {
        mode,
        requestType: args.context?.requestType || "unknown"
      },
      createdAtMs: atMs
    });

    return {
      visible: false,
      mode,
      level: LEVELS.NONE,
      ttlSeconds: 0,
      payload: null,
      permissions: null,
      reason: "not_allowed"
    };
  }

  const remainingTargetSeconds = Math.max(0, (targetSession.expiresAtMs - atMs) / 1000);
  const remainingViewerSeconds = viewerSession
    ? Math.max(0, (viewerSession.expiresAtMs - atMs) / 1000)
    : Number.POSITIVE_INFINITY;

  const ttlSeconds = Math.floor(
    Math.max(
      0,
      Math.min(policy.ttlSeconds, remainingTargetSeconds, remainingViewerSeconds)
    )
  );

  /** @type {any} */
  const payload = {
    // Subject identity is still needed for connected/area UIs; do not include emails/phones.
    subject: {
      id: targetUser.id,
      handle: targetUser.handle ? escapeHtml(targetUser.handle) : undefined,
      displayName: targetUser.displayName ? escapeHtml(targetUser.displayName) : undefined
    },
    aura: {
      color: targetSession.auraColor
    }
  };

  if (policy.showActivityType) {
    payload.activity = {
      type: targetSession.activityType
    };
  }

  // Coarse location only; never emit precise location.
  if (policy.coarseLocationLevel === COARSE_LOCATION.CITY) {
    if (targetSession.coarseCity) {
      payload.location = {
        precision: COARSE_LOCATION.CITY,
        city: targetSession.coarseCity
      };
    } else {
      payload.location = {
        precision: COARSE_LOCATION.CITY,
        city: null
      };
    }
  } else if (policy.coarseLocationLevel === COARSE_LOCATION.EVENT_ROOM) {
    const roomId = targetSession.eventRoomId || null;
    const room = roomId ? store.getEventRoom(roomId) : null;
    payload.location = {
      precision: COARSE_LOCATION.EVENT_ROOM,
      eventRoomId: roomId,
      eventRoomName: room ? escapeHtml(room.name) : null
    };
  }

  /** @type {string} */
  const level = (() => {
    const hasActivity = Boolean(policy.showActivityType);
    if (!hasActivity) return LEVELS.AURA;
    if (policy.coarseLocationLevel === COARSE_LOCATION.CITY) return LEVELS.AURA_ACTIVITY_CITY;
    if (policy.coarseLocationLevel === COARSE_LOCATION.EVENT_ROOM) return LEVELS.AURA_ACTIVITY_ROOM;
    return LEVELS.AURA_ACTIVITY;
  })();

  const permissions = {
    searchable: policy.searchable,
    shareAllowed: policy.shareAllowed,
    screenshotAllowed: policy.screenshotAllowed
  };

  // Hard guard: ensure we never accidentally leak precise coordinates.
  // (This is intentionally strict; if you need location later, add explicit coarse fields only.)
  const asJson = JSON.stringify(payload);
  if (asJson.includes("\"lat\"") || asJson.includes("\"lng\"") || asJson.includes("coordinates")) {
    throw new Error("Policy violation: payload appears to include location coordinates.");
  }

  return {
    visible: true,
    mode,
    level,
    ttlSeconds,
    payload,
    permissions
  };
}

module.exports = {
  MODES,
  LEVELS,
  COARSE_LOCATION,
  DEFAULT_POLICIES,
  InMemoryStore,
  evaluateAuraVisibility
};

