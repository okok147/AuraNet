-- Phase 1: data model sketch (示意)
-- Notes:
-- - Do not store precise location (no lat/lng/address) for external visibility.
-- - Presence in an event_room is represented via aura_sessions.event_room_id + ended_at/expires_at.

PRAGMA foreign_keys = ON;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  handle TEXT UNIQUE,
  display_name TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One-way allowlist for Connected mode (owner decides who can view)
CREATE TABLE IF NOT EXISTS connections (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  state TEXT NOT NULL CHECK (state IN ('allowed', 'revoked', 'blocked', 'pending')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  revoked_at TEXT,
  UNIQUE (owner_user_id, contact_user_id)
);

-- Event / area rooms (場域)
CREATE TABLE IF NOT EXISTS event_rooms (
  id TEXT PRIMARY KEY,
  room_code TEXT UNIQUE,
  name TEXT NOT NULL,
  starts_at TEXT,
  ends_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Aura sessions are ephemeral snapshots of a user's current Aura.
-- IMPORTANT: external payload must not reveal precise location.
CREATE TABLE IF NOT EXISTS aura_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('everyone', 'area', 'connected')),
  aura_color TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  coarse_city TEXT,
  event_room_id TEXT REFERENCES event_rooms(id) ON DELETE SET NULL,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_heartbeat_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  ended_at TEXT
);

-- Per-user, per-mode visibility policy.
CREATE TABLE IF NOT EXISTS visibility_policies (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('everyone', 'area', 'connected')),
  ttl_seconds INTEGER NOT NULL,
  searchable INTEGER NOT NULL DEFAULT 0,          -- 0/1
  share_allowed INTEGER NOT NULL DEFAULT 0,       -- product policy (UI/ToS), not OS-enforceable
  screenshot_allowed INTEGER NOT NULL DEFAULT 0,  -- product policy (UI/ToS), not OS-enforceable
  coarse_location_level TEXT NOT NULL CHECK (coarse_location_level IN ('none', 'city', 'event_room')),
  show_activity_type INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (user_id, mode)
);

-- Risk/audit events (privacy, abuse, sharing attempts, etc.)
CREATE TABLE IF NOT EXISTS risk_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  actor_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  target_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  event_room_id TEXT REFERENCES event_rooms(id) ON DELETE SET NULL,
  severity INTEGER NOT NULL DEFAULT 1, -- 1 low, 2 medium, 3 high
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

