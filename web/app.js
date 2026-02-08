(() => {
  const STORAGE_KEY = "auranet:v1";

  const $ = (id) => document.getElementById(id);

  const els = {
    storagePill: $("storagePill"),
    clock: $("clock"),
    stats: $("stats"),
    addForm: $("addForm"),
    taskText: $("taskText"),
    taskDue: $("taskDue"),
    list: $("list"),
    empty: $("empty"),
    search: $("search"),
    clearDone: $("clearDone"),
    segButtons: Array.from(document.querySelectorAll("[data-filter]")),

    paperMap: $("paperMap"),
    mapStatus: $("mapStatus"),
    mapReset: $("mapReset"),
    mapLocate: $("mapLocate"),
    mapGps: $("mapGps"),
    mapSimToggle: $("mapSimToggle"),
    mapAuraCount: $("mapAuraCount"),

    auraPill: $("auraPill"),
    activityForm: $("activityForm"),
    activityText: $("activityText"),
    activityType: $("activityType"),
    activityShowAura: $("activityShowAura"),
    activityTime: $("activityTime"),
    activityHint: $("activityHint"),
    activityStart: $("activityStart"),
    activityStop: $("activityStop"),
    activityClear: $("activityClear"),
    auraSwatch: $("auraSwatch"),
    auraValue: $("auraValue"),
    activityList: $("activityList"),
    toast: $("toast"),

    editDialog: $("editDialog"),
    editForm: $("editForm"),
    editText: $("editText"),
    editDue: $("editDue")
  };

  const nowMs = () => Date.now();

  const setStoragePill = (ok) => {
    if (!els.storagePill) return;
    els.storagePill.classList.toggle("pill--ok", ok);
    els.storagePill.classList.toggle("pill--bad", !ok);
    els.storagePill.textContent = ok ? "LOCAL SAVE: OK" : "LOCAL SAVE: BLOCKED";
  };

  const fmtClock = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day} ${hh}:${mm}`;
  };

  const renderClock = () => {
    if (!els.clock) return;
    els.clock.textContent = fmtClock();
  };

  const clampInt = (value, min, max, fallback) => {
    const n = Number.parseInt(String(value), 10);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  };

  const todayISO = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const formatHhMmSs = (ms) => {
    const clamped = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(clamped / 3600);
    const m = Math.floor((clamped % 3600) / 60);
    const s = clamped % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const uid = () => {
    // Enough for local-only IDs.
    return `${nowMs().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
  };

  const defaultState = () => ({
    version: 1,
    tasks: [],
    ui: {
      filter: "inbox",
      q: ""
    },
    activity: {
      active: null,
      log: [],
      prefs: {
        showAuraOnMap: false,
        lastType: "work"
      }
    }
  });

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1) return defaultState();
      const base = defaultState();
      const merged = {
        ...base,
        ...parsed,
        ui: { ...base.ui, ...(parsed.ui || {}) },
        activity: {
          ...base.activity,
          ...(parsed.activity || {}),
          prefs: {
            ...base.activity.prefs,
            ...((parsed.activity && parsed.activity.prefs) || {})
          }
        }
      };
      // Drop legacy timer state (previous versions).
      delete merged.timer;
      // Normalize shapes.
      if (!Array.isArray(merged.tasks)) merged.tasks = [];
      if (!Array.isArray(merged.activity.log)) merged.activity.log = [];
      return merged;
    } catch {
      return defaultState();
    }
  };

  const saveState = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStoragePill(true);
    } catch {
      setStoragePill(false);
    }
  };

  let state = loadState();
  let mapApi = null;

  // --- Tasks ---

  const activeFilter = () => state.ui.filter;

  const setFilter = (filter) => {
    state.ui.filter = filter;
    saveState();
    render();
  };

  const setSearch = (q) => {
    state.ui.q = q;
    saveState();
    render();
  };

  const addTask = ({ text, due }) => {
    const trimmed = String(text || "").trim();
    if (!trimmed) return;

    state.tasks.unshift({
      id: uid(),
      text: trimmed,
      due: due || null,
      done: false,
      createdAt: nowMs(),
      doneAt: null
    });
    saveState();
    render();
  };

  const updateTask = (id, patch) => {
    const idx = state.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return;
    state.tasks[idx] = { ...state.tasks[idx], ...patch };
    saveState();
    render();
  };

  const removeTask = (id) => {
    state.tasks = state.tasks.filter((t) => t.id !== id);
    saveState();
    render();
  };

  const clearDone = () => {
    const before = state.tasks.length;
    state.tasks = state.tasks.filter((t) => !t.done);
    if (state.tasks.length !== before) {
      toast(`${before - state.tasks.length} completed task(s) cleared.`);
    }
    saveState();
    render();
  };

  const isDueToday = (task) => Boolean(task.due && task.due === todayISO());
  const isOverdue = (task) => Boolean(task.due && task.due < todayISO());

  const taskVisible = (task) => {
    const f = activeFilter();
    if (f === "inbox" && task.done) return false;
    if (f === "done" && !task.done) return false;
    if (f === "today" && (!isDueToday(task) || task.done)) return false;

    const q = String(state.ui.q || "").trim().toLowerCase();
    if (!q) return true;
    return task.text.toLowerCase().includes(q);
  };

  const sortTasks = (a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.due && b.due && a.due !== b.due) return a.due < b.due ? -1 : 1;
    if (a.due && !b.due) return -1;
    if (!a.due && b.due) return 1;
    return b.createdAt - a.createdAt;
  };

  let editingId = null;

  const openEdit = (id) => {
    const task = state.tasks.find((t) => t.id === id);
    if (!task) return;
    editingId = id;
    els.editText.value = task.text;
    els.editDue.value = task.due || "";
    els.editDialog.showModal();
    // Autofocus after modal opens.
    setTimeout(() => els.editText.focus(), 0);
  };

  const closeEdit = () => {
    editingId = null;
    if (els.editDialog.open) els.editDialog.close();
  };

  const renderStats = () => {
    const total = state.tasks.length;
    const done = state.tasks.filter((t) => t.done).length;
    const open = total - done;
    els.stats.textContent = total
      ? `${open} open • ${done} done`
      : "No tasks yet";
  };

  const renderFilters = () => {
    els.segButtons.forEach((btn) => {
      const selected = btn.dataset.filter === state.ui.filter;
      btn.setAttribute("aria-selected", selected ? "true" : "false");
    });
  };

  const renderList = () => {
    const visible = state.tasks.filter(taskVisible).sort(sortTasks);
    els.list.replaceChildren();

    if (visible.length === 0) {
      els.empty.hidden = state.tasks.length !== 0 && String(state.ui.q || "").trim() === "";
      return;
    }
    els.empty.hidden = true;

    for (const task of visible) {
      const li = document.createElement("li");
      li.className = `item${task.done ? " item--done" : ""}`;
      li.dataset.id = task.id;

      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "check";
      check.checked = Boolean(task.done);
      check.ariaLabel = task.done ? "Mark as not done" : "Mark as done";
      check.addEventListener("change", () => {
        updateTask(task.id, {
          done: check.checked,
          doneAt: check.checked ? nowMs() : null
        });
      });

      const main = document.createElement("div");

      const title = document.createElement("button");
      title.type = "button";
      title.className = "titleBtn";
      title.textContent = task.text;
      title.addEventListener("click", () => openEdit(task.id));

      const meta = document.createElement("div");
      meta.className = "meta";

      if (task.due) {
        const badge = document.createElement("span");
        const dueLabel = isOverdue(task)
          ? "Overdue"
          : isDueToday(task)
            ? "Due today"
            : "Due";
        badge.className = `badge ${
          isOverdue(task) ? "badge--warn" : "badge--ok"
        }`;
        badge.textContent = `${dueLabel}: ${task.due}`;
        meta.appendChild(badge);
      }

      const created = document.createElement("span");
      created.textContent = `Added ${new Date(task.createdAt).toLocaleDateString()}`;
      meta.appendChild(created);

      main.appendChild(title);
      main.appendChild(meta);

      const actions = document.createElement("div");
      actions.className = "rowActions";

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "iconBtn";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openEdit(task.id));

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "iconBtn danger";
      delBtn.textContent = "Del";
      delBtn.addEventListener("click", () => removeTask(task.id));

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(check);
      li.appendChild(main);
      li.appendChild(actions);
      els.list.appendChild(li);
    }
  };

  // --- Toast ---

  let lastToastAt = 0;

  const toast = (msg) => {
    const t = nowMs();
    if (t - lastToastAt < 250) return;
    lastToastAt = t;
    els.toast.textContent = msg;
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => {
      if (els.toast.textContent === msg) els.toast.textContent = "";
    }, 4200);
  };

  // --- Activity Logger ---

  let activityTicker = null;

  const ACTIVITY_TYPES = {
    work: { label: "Work", color: "#2a5b8a" },
    study: { label: "Study", color: "#0a7a52" },
    exercise: { label: "Exercise", color: "#b4233a" },
    social: { label: "Social", color: "#f1b83a" },
    travel: { label: "Travel", color: "#ff6a00" },
    food: { label: "Food", color: "#7a5a2b" },
    rest: { label: "Rest", color: "#5a6a7a" }
  };

  const normalizeActivityType = (value) => {
    const key = String(value || "").trim().toLowerCase();
    return ACTIVITY_TYPES[key] ? key : "work";
  };

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const hexToRgb = (hex) => {
    const raw = String(hex || "").trim().replace(/^#/, "");
    if (raw.length !== 6) return null;
    const n = Number.parseInt(raw, 16);
    if (!Number.isFinite(n)) return null;
    return {
      r: (n >> 16) & 255,
      g: (n >> 8) & 255,
      b: n & 255
    };
  };

  const rgbToHex = (r, g, b) => {
    const rr = clamp(Math.round(r), 0, 255);
    const gg = clamp(Math.round(g), 0, 255);
    const bb = clamp(Math.round(b), 0, 255);
    return `#${[rr, gg, bb].map((x) => x.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
  };

  const srgbToLinear = (c01) => {
    // https://www.w3.org/TR/WCAG20/#relativeluminancedef
    return c01 <= 0.04045 ? c01 / 12.92 : ((c01 + 0.055) / 1.055) ** 2.4;
  };

  const linearToSrgb = (c01) => {
    const c = clamp(c01, 0, 1);
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  };

  const mixHex = (aHex, bHex, t) => {
    const a = hexToRgb(aHex);
    const b = hexToRgb(bHex);
    if (!a || !b) return String(aHex || "#FF6A00");
    const tt = clamp(t, 0, 1);

    const ar = srgbToLinear(a.r / 255);
    const ag = srgbToLinear(a.g / 255);
    const ab = srgbToLinear(a.b / 255);
    const br = srgbToLinear(b.r / 255);
    const bg = srgbToLinear(b.g / 255);
    const bb = srgbToLinear(b.b / 255);

    const rr = linearToSrgb(ar * (1 - tt) + br * tt) * 255;
    const gg = linearToSrgb(ag * (1 - tt) + bg * tt) * 255;
    const bl = linearToSrgb(ab * (1 - tt) + bb * tt) * 255;
    return rgbToHex(rr, gg, bl);
  };

  const fmtShortDuration = (ms) => {
    const s = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const mm = m % 60;
    if (h <= 0) return `${m}m`;
    return `${h}h ${mm}m`;
  };

  const fmtHm = (ms) => {
    return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const computeLongTermAura = (now) => {
    const halfLifeDays = 7;
    let wSum = 0;
    let lr = 0;
    let lg = 0;
    let lb = 0;
    const byType = {};

    for (const entry of state.activity.log) {
      if (!entry || !entry.endedAt || !entry.startedAt) continue;
      const type = normalizeActivityType(entry.type);
      const cfg = ACTIVITY_TYPES[type];
      if (!cfg) continue;

      const durMs = Math.max(0, entry.endedAt - entry.startedAt);
      if (durMs < 30_000) continue;
      const ageDays = Math.max(0, (now - entry.endedAt) / 86_400_000);
      const decay = Math.pow(0.5, ageDays / halfLifeDays);
      const weight = (durMs / 60_000) * decay; // minutes * decay
      if (weight <= 0) continue;

      const rgb = hexToRgb(cfg.color);
      if (!rgb) continue;
      const r = srgbToLinear(rgb.r / 255);
      const g = srgbToLinear(rgb.g / 255);
      const b = srgbToLinear(rgb.b / 255);

      lr += r * weight;
      lg += g * weight;
      lb += b * weight;
      wSum += weight;
      byType[type] = (byType[type] || 0) + weight;
    }

    if (wSum <= 0) {
      return { hex: "#FF6A00", byType: [] };
    }

    const rr = linearToSrgb(lr / wSum) * 255;
    const gg = linearToSrgb(lg / wSum) * 255;
    const bb = linearToSrgb(lb / wSum) * 255;
    const hex = rgbToHex(rr, gg, bb);

    const byTypeArr = Object.entries(byType).sort((a, b) => b[1] - a[1]);
    return { hex, byType: byTypeArr };
  };

  const computeCurrentAura = (now) => {
    const longTerm = computeLongTermAura(now);
    const active = state.activity.active;
    if (!active) return { hex: longTerm.hex, longTerm };

    const type = normalizeActivityType(active.type);
    const typeHex = ACTIVITY_TYPES[type] ? ACTIVITY_TYPES[type].color : "#FF6A00";
    const elapsed = Math.max(0, now - active.startedAt);
    const t = clamp(elapsed / (30 * 60 * 1000), 0, 1);
    const w = clamp(0.25 + t * 0.35, 0.25, 0.6);
    return { hex: mixHex(longTerm.hex, typeHex, w), longTerm };
  };

  const setAuraUi = (now) => {
    const active = state.activity.active;
    const type = active ? normalizeActivityType(active.type) : null;
    const { hex, longTerm } = computeCurrentAura(now);

    if (els.auraPill) {
      const label = active ? `ACTIVE: ${ACTIVITY_TYPES[type].label}` : "IDLE";
      els.auraPill.textContent = label;
    }

    if (els.auraSwatch) {
      els.auraSwatch.style.background = `linear-gradient(135deg, ${hex}, ${mixHex(hex, "#FFFFFF", 0.35)})`;
      els.auraSwatch.style.borderColor = "rgba(32, 24, 18, 0.18)";
      els.auraSwatch.style.boxShadow = `0 10px 18px rgba(24, 16, 10, 0.10), 0 0 0 6px rgba(255, 106, 0, 0.08) inset`;
    }

    if (els.auraValue) {
      const top = longTerm.byType.slice(0, 2);
      if (top.length === 0) {
        els.auraValue.textContent = `${hex} • No history yet`;
      } else {
        const sum = top.reduce((acc, [, w]) => acc + w, 0);
        const parts = top.map(([k, w]) => `${ACTIVITY_TYPES[k].label} ${Math.round((w / sum) * 100)}%`);
        els.auraValue.textContent = `${hex} • ${parts.join(" / ")}`;
      }
    }

    return hex;
  };

  const activityElapsedMs = (now) => {
    if (!state.activity.active) return 0;
    return Math.max(0, now - state.activity.active.startedAt);
  };

  const stopActivityTicker = () => {
    if (!activityTicker) return;
    window.clearInterval(activityTicker);
    activityTicker = null;
  };

  const renderActivityTimeOnly = () => {
    const now = nowMs();
    const active = state.activity.active;
    const auraHex = setAuraUi(now);
    if (!els.activityTime || !els.activityHint) return auraHex;

    if (!active) {
      els.activityTime.textContent = "00:00:00";
      els.activityHint.textContent = "Log what you’re doing. Your aura blends over time.";
      document.title = "AuraNet";
      stopActivityTicker();
      return auraHex;
    }

    const elapsed = activityElapsedMs(now);
    els.activityTime.textContent = formatHhMmSs(elapsed);
    els.activityHint.textContent = `Tracking: ${active.text}`;
    document.title = `${formatHhMmSs(elapsed)} • ${ACTIVITY_TYPES[normalizeActivityType(active.type)].label} • AuraNet`;
    return auraHex;
  };

  const ensureActivityTicker = () => {
    if (activityTicker) return;
    activityTicker = window.setInterval(renderActivityTimeOnly, 500);
  };

  const syncActivityControls = () => {
    const active = state.activity.active;
    if (els.activityStart) els.activityStart.disabled = Boolean(active);
    if (els.activityStop) els.activityStop.disabled = !active;

    if (els.activityText) els.activityText.disabled = Boolean(active);
    if (els.activityType) els.activityType.disabled = Boolean(active);

    if (els.activityShowAura) {
      els.activityShowAura.checked = active
        ? Boolean(active.showAuraOnMap)
        : Boolean(state.activity.prefs.showAuraOnMap);
    }

    if (!active) stopActivityTicker();
    else ensureActivityTicker();
  };

  const renderActivityList = () => {
    if (!els.activityList) return;
    els.activityList.replaceChildren();

    const items = state.activity.log
      .slice()
      .sort((a, b) => (b.endedAt || 0) - (a.endedAt || 0))
      .slice(0, 10);

    if (items.length === 0) {
      const li = document.createElement("li");
      li.className = "activityItem activityItem--empty";
      li.textContent = "No activities logged yet.";
      els.activityList.appendChild(li);
      return;
    }

    for (const entry of items) {
      const type = normalizeActivityType(entry.type);
      const cfg = ACTIVITY_TYPES[type];
      const dur = Math.max(0, (entry.endedAt || 0) - (entry.startedAt || 0));

      const li = document.createElement("li");
      li.className = "activityItem";

      const left = document.createElement("div");
      left.className = "activityItem__main";

      const title = document.createElement("div");
      title.className = "activityItem__title";
      title.textContent = entry.text || cfg.label;

      const meta = document.createElement("div");
      meta.className = "activityItem__meta";
      const when = `${fmtHm(entry.startedAt)}–${fmtHm(entry.endedAt)} • ${fmtShortDuration(dur)}`;
      meta.textContent = when;

      left.appendChild(title);
      left.appendChild(meta);

      const right = document.createElement("div");
      right.className = "activityItem__right";

      const badge = document.createElement("span");
      badge.className = "badge badge--ok";
      badge.textContent = cfg.label.toUpperCase();
      badge.style.borderColor = "rgba(32, 24, 18, 0.16)";
      badge.style.background = "rgba(255, 255, 255, 0.6)";
      badge.style.boxShadow = `0 0 0 2px ${mixHex(cfg.color, "#FFFFFF", 0.75)} inset`;
      right.appendChild(badge);

      li.appendChild(left);
      li.appendChild(right);
      els.activityList.appendChild(li);
    }
  };

  const startActivity = () => {
    if (state.activity.active) return;
    if (!els.activityText || !els.activityType) return;
    if (els.activityForm && typeof els.activityForm.reportValidity === "function") {
      if (!els.activityForm.reportValidity()) return;
    }

    const text = String(els.activityText.value || "").trim();
    if (!text) {
      toast("Activity can’t be empty.");
      els.activityText.focus();
      return;
    }

    const type = normalizeActivityType(els.activityType.value);
    const showAuraOnMap = Boolean(els.activityShowAura && els.activityShowAura.checked);

    state.activity.prefs.lastType = type;
    state.activity.prefs.showAuraOnMap = showAuraOnMap;

    state.activity.active = {
      id: uid(),
      text,
      type,
      startedAt: nowMs(),
      showAuraOnMap
    };

    saveState();
    renderActivity(true);
    toast("Activity started.");
  };

  const stopAndLogActivity = () => {
    const active = state.activity.active;
    if (!active) return;
    const endedAt = nowMs();
    const durationMs = Math.max(0, endedAt - active.startedAt);

    state.activity.active = null;
    if (durationMs >= 30_000) {
      state.activity.log.unshift({
        id: active.id,
        text: active.text,
        type: normalizeActivityType(active.type),
        startedAt: active.startedAt,
        endedAt
      });
    }

    saveState();
    renderActivity(true);
    toast(durationMs >= 30_000 ? "Activity logged." : "Activity too short (not saved).");
  };

  const clearActivityLog = () => {
    if (!window.confirm("Clear all activity entries?")) return;
    state.activity.active = null;
    state.activity.log = [];
    saveState();
    renderActivity(true);
    toast("Activity log cleared.");
  };

  const renderActivity = (full = false) => {
    const active = state.activity.active;

    if (els.activityText && active) els.activityText.value = active.text;
    if (els.activityType && active) els.activityType.value = normalizeActivityType(active.type);
    if (els.activityType && !active) els.activityType.value = normalizeActivityType(state.activity.prefs.lastType);

    syncActivityControls();
    const auraHex = renderActivityTimeOnly();
    if (mapApi) {
      const enabled = Boolean(active && active.showAuraOnMap);
      mapApi.setUserAura({ enabled, color: auraHex });
    }

    if (full) renderActivityList();
  };

  // --- Render ---

  const render = () => {
    renderStats();
    renderFilters();
    renderList();
    renderActivity(true);
  };

  // --- Map ---

  const setMapStatus = (message, isError = false) => {
    if (!els.mapStatus) return;
    els.mapStatus.textContent = message;
    els.mapStatus.style.color = isError ? "rgba(180, 35, 58, 0.9)" : "";
  };

  const escapeHtml = (value) => {
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
  };

  const initPaperMap = () => {
    if (!els.paperMap) return null;
    if (typeof window.L === "undefined") {
      setMapStatus("Map library failed to load.", true);
      return null;
    }

    const L = window.L;
    const map = L.map(els.paperMap, {
      zoomControl: false,
      minZoom: 2,
      maxZoom: 18,
      worldCopyJump: true,
      attributionControl: true
    });

    L.control
      .zoom({
        position: "topright"
      })
      .addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Street-level default view so the activity simulation has meaningful roads.
    const defaultView = { center: [37.7749, -122.4194], zoom: 13 };
    map.setView(defaultView.center, defaultView.zoom);

    let myAccuracyRing = null;
    let userAuraOuter = null;
    let userAuraInner = null;
    let userAuraEnabled = false;
    let userAuraColor = "#FF6A00";
    let userWatchId = null;
    let lastUserLatLng = null;
    let lastUserAccuracyM = null;
    const simRenderer = L.canvas({ padding: 0.5 });

    const sim = {
      enabled: false,
      rafId: null,
      agents: [],
      routePool: null,
      buildId: 0,
      abort: null,
      lastTickAt: 0,
      loading: false,
      routeCache: new Map(),
      routeCacheKeys: []
    };

    const setGpsBadge = (message, kind = "off") => {
      if (!els.mapGps) return;
      els.mapGps.textContent = message;
      els.mapGps.classList.toggle("badge--ok", kind === "ok");
      els.mapGps.classList.toggle("badge--warn", kind === "warn");
    };

    const setAuraBadge = (message, kind = "off") => {
      if (!els.mapAuraCount) return;
      els.mapAuraCount.textContent = message;
      els.mapAuraCount.classList.toggle("badge--ok", kind === "ok");
      els.mapAuraCount.classList.toggle("badge--warn", kind === "warn");
    };

    const layersForBounds = () => {
      const layers = [];
      if (myAccuracyRing) layers.push(myAccuracyRing);
      return layers;
    };

    const STREET_MIN_ZOOM = 12;
    const OSRM_BASE = "https://router.project-osrm.org";
    const ROUTE_POINT_LIMIT = 260;
    const ROUTE_CACHE_MAX = 80;

    const simNow = () => {
      // Use a monotonic clock. rAF uses the same origin as performance.now().
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        return performance.now();
      }
      return nowMs();
    };

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    const wrapLng = (lng) => {
      const x = ((lng + 180) % 360 + 360) % 360 - 180;
      return x;
    };

    const routeCacheSet = (key, route) => {
      if (sim.routeCache.has(key)) return;
      sim.routeCache.set(key, route);
      sim.routeCacheKeys.push(key);
      if (sim.routeCacheKeys.length > ROUTE_CACHE_MAX) {
        const old = sim.routeCacheKeys.shift();
        if (old) sim.routeCache.delete(old);
      }
    };

    const roundCoord = (n, digits = 4) => {
      const f = 10 ** digits;
      return Math.round(n * f) / f;
    };

    const routeKey = (profile, start, end) => {
      return `${profile}:${roundCoord(start.lat)},${roundCoord(start.lng)}:${roundCoord(end.lat)},${roundCoord(end.lng)}`;
    };

    const fetchRoute = async (profile, start, end, signal) => {
      const key = routeKey(profile, start, end);
      const cached = sim.routeCache.get(key);
      if (cached) return cached;

      const coords = `${start.lng},${start.lat};${end.lng},${end.lat}`;
      const qs = new URLSearchParams({
        overview: "full",
        geometries: "geojson",
        steps: "false",
        alternatives: "false",
        annotations: "false",
        radiuses: "350;350"
      });
      const url = `${OSRM_BASE}/route/v1/${profile}/${coords}?${qs}`;
      const res = await fetch(url, { signal, cache: "no-store" });
      if (!res.ok) throw new Error(`route ${res.status}`);

      const data = await res.json();
      const geometry = data && data.routes && data.routes[0] && data.routes[0].geometry;
      const coordsArr = geometry && geometry.coordinates;
      if (!Array.isArray(coordsArr) || coordsArr.length < 2) {
        throw new Error("route geometry missing");
      }

      let points = coordsArr.map((c) => L.latLng(c[1], c[0]));
      if (points.length > ROUTE_POINT_LIMIT) {
        const step = Math.ceil(points.length / ROUTE_POINT_LIMIT);
        const slim = [];
        for (let i = 0; i < points.length; i += step) slim.push(points[i]);
        if (slim[slim.length - 1] !== points[points.length - 1]) {
          slim.push(points[points.length - 1]);
        }
        points = slim;
      }

      const cum = [0];
      for (let i = 1; i < points.length; i++) {
        cum.push(cum[i - 1] + map.distance(points[i - 1], points[i]));
      }

      const route = {
        profile,
        points,
        cum,
        totalM: cum[cum.length - 1]
      };
      routeCacheSet(key, route);
      return route;
    };

    const randomViewLatLng = (margin = 40) => {
      const size = map.getSize();
      const x = margin + Math.random() * Math.max(1, size.x - margin * 2);
      const y = margin + Math.random() * Math.max(1, size.y - margin * 2);
      const ll = map.containerPointToLatLng([x, y]);
      return L.latLng(clamp(ll.lat, -85, 85), wrapLng(ll.lng));
    };

    const targetFrom = (startLatLng, minPx, maxPx, margin = 40) => {
      const size = map.getSize();
      const pt = map.latLngToContainerPoint(startLatLng);
      const dist = minPx + Math.random() * (maxPx - minPx);
      const ang = Math.random() * Math.PI * 2;
      const x = clamp(pt.x + Math.cos(ang) * dist, margin, Math.max(margin, size.x - margin));
      const y = clamp(pt.y + Math.sin(ang) * dist, margin, Math.max(margin, size.y - margin));
      const ll = map.containerPointToLatLng([x, y]);
      return L.latLng(clamp(ll.lat, -85, 85), wrapLng(ll.lng));
    };

    const routeAtDistance = (route, distM, hintIdx = 0) => {
      const pts = route.points;
      const cum = route.cum;
      if (!pts || pts.length === 0) return { latLng: map.getCenter(), idx: 0 };
      if (pts.length === 1) return { latLng: pts[0], idx: 0 };

      const d = clamp(distM, 0, route.totalM);
      let i = clamp(hintIdx, 0, pts.length - 2);
      while (i < cum.length - 2 && cum[i + 1] < d) i++;
      while (i > 0 && cum[i] > d) i--;

      const d0 = cum[i];
      const d1 = cum[i + 1];
      const t = d1 === d0 ? 0 : (d - d0) / (d1 - d0);
      const a = pts[i];
      const b = pts[i + 1];
      return {
        latLng: L.latLng(a.lat + (b.lat - a.lat) * t, a.lng + (b.lng - a.lng) * t),
        idx: i
      };
    };

    const jitterLatLng = (latLng, jitterPx) => {
      const pt = map.latLngToContainerPoint(latLng);
      const jx = (Math.random() - 0.5) * jitterPx * 2;
      const jy = (Math.random() - 0.5) * jitterPx * 2;
      const ll = map.containerPointToLatLng([pt.x + jx, pt.y + jy]);
      return L.latLng(clamp(ll.lat, -85, 85), wrapLng(ll.lng));
    };

    const randBetween = (min, max) => min + Math.random() * (max - min);
    const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const personas = [
      {
        kind: "WALK",
        profile: "walking",
        fill: "#0a7a52",
        speedMps: [1.3, 2.2],
        jitterPx: [0.7, 1.7],
        microStopPerS: 0.06
      },
      {
        kind: "TRANSIT",
        profile: "driving",
        fill: "#ff6a00",
        speedMps: [5.5, 10.5],
        jitterPx: [0.4, 1.0],
        microStopPerS: 0.045
      },
      {
        kind: "RIDE",
        profile: "driving",
        fill: "#2a5b8a",
        speedMps: [9.5, 16.0],
        jitterPx: [0.25, 0.75],
        microStopPerS: 0.015
      },
      {
        kind: "RUSH",
        profile: "driving",
        fill: "#b4233a",
        speedMps: [12.0, 20.0],
        jitterPx: [0.22, 0.7],
        microStopPerS: 0.01
      }
    ];

    const pickPersona = () => {
      const r = Math.random();
      if (r < 0.36) return personas[0]; // WALK
      if (r < 0.56) return personas[1]; // TRANSIT
      if (r < 0.86) return personas[2]; // RIDE
      return personas[3]; // RUSH
    };

    const auraTargetCountForZoom = (zoom) => {
      // Zoomed-out = wider view = more simulated auras.
      const z = clamp(zoom, STREET_MIN_ZOOM, 18);
      const t = (18 - z) / (18 - STREET_MIN_ZOOM); // 0..1
      const min = 14;
      const max = 60;
      return Math.round(min + t * (max - min));
    };

    const createAuraLayer = (latLng, fill, radius, fillOpacity) => {
      return L.circleMarker(latLng, {
        renderer: simRenderer,
        radius,
        stroke: false,
        fillColor: fill,
        fillOpacity
      }).addTo(map);
    };

    const removeUserAuraLayers = () => {
      if (userAuraOuter) userAuraOuter.remove();
      if (userAuraInner) userAuraInner.remove();
      userAuraOuter = null;
      userAuraInner = null;
    };

    const applyUserAuraStyle = () => {
      if (!userAuraOuter || !userAuraInner) return;
      userAuraOuter.setStyle({ fillColor: userAuraColor, fillOpacity: 0.18 });
      userAuraInner.setStyle({ fillColor: userAuraColor, fillOpacity: 0.26 });
    };

    const ensureUserAuraLayers = (latLng) => {
      if (!latLng) return;
      if (!userAuraOuter) {
        userAuraOuter = createAuraLayer(latLng, userAuraColor, 28, 0.18);
      }
      if (!userAuraInner) {
        userAuraInner = createAuraLayer(latLng, userAuraColor, 16, 0.26);
      }
      applyUserAuraStyle();
    };

    const setUserLatLng = (lat, lng, accuracyM, { ensureRing = false } = {}) => {
      lastUserLatLng = L.latLng(clamp(lat, -85, 85), wrapLng(lng));
      lastUserAccuracyM = Number.isFinite(Number(accuracyM)) ? Number(accuracyM) : lastUserAccuracyM;

      if (userAuraEnabled) {
        ensureUserAuraLayers(lastUserLatLng);
        userAuraOuter.setLatLng(lastUserLatLng);
        userAuraInner.setLatLng(lastUserLatLng);
      }

      if (myAccuracyRing) {
        myAccuracyRing.setLatLng(lastUserLatLng);
        if (lastUserAccuracyM) myAccuracyRing.setRadius(lastUserAccuracyM);
      } else if (ensureRing) {
        myAccuracyRing = L.circle(lastUserLatLng, {
          radius: lastUserAccuracyM || 50,
          color: "rgba(255, 106, 0, 0.55)",
          weight: 2,
          fillColor: "rgba(255, 106, 0, 0.18)",
          fillOpacity: 0.35
        }).addTo(map);
      }
    };

    const stopUserWatch = () => {
      if (userWatchId === null) return;
      try {
        navigator.geolocation.clearWatch(userWatchId);
      } catch {
        // ignore
      }
      userWatchId = null;
    };

    const startUserWatch = () => {
      if (userWatchId !== null) return;
      if (!navigator.geolocation) {
        setGpsBadge("GPS: UNSUPPORTED", "warn");
        toast("Geolocation not supported.");
        return;
      }

      setGpsBadge("GPS: REQUEST", "off");
      userWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = Number(pos.coords.accuracy) || 0;
          setUserLatLng(lat, lng, accuracy, { ensureRing: false });
          setGpsBadge("GPS: ON", "ok");
        },
        (err) => {
          const code = err && typeof err.code === "number" ? err.code : 0;
          let msg = "GPS error.";
          if (code === 1) msg = "Location permission denied.";
          if (code === 2) msg = "Location unavailable.";
          if (code === 3) msg = "Location request timed out.";
          setGpsBadge("GPS: OFF", "warn");
          setMapStatus(msg, true);
          stopUserWatch();
        },
        {
          enableHighAccuracy: false,
          timeout: 10_000,
          maximumAge: 20_000
        }
      );
    };

    const applyAgentStyle = (agent) => {
      let fill = agent.persona.fill;
      let outerRadius = agent.baseOuterRadius;
      let innerRadius = agent.baseInnerRadius;
      let outerOpacity = 0.16;
      let innerOpacity = 0.22;

      if (agent.state === "stopped") {
        outerOpacity = 0.24;
        innerOpacity = 0.32;
        if (agent.stopType === "eat") {
          fill = "#f1b83a";
          outerRadius = agent.baseOuterRadius + 5;
          innerRadius = agent.baseInnerRadius + 2.2;
        } else if (agent.stopType === "transit") {
          fill = "#ff6a00";
          outerRadius = agent.baseOuterRadius + 2.8;
          innerRadius = agent.baseInnerRadius + 1.4;
        } else {
          fill = "#7a5a2b";
          outerRadius = agent.baseOuterRadius + 1.8;
          innerRadius = agent.baseInnerRadius + 1;
        }
      }

      agent.outer.setStyle({ fillColor: fill, fillOpacity: outerOpacity });
      agent.inner.setStyle({ fillColor: fill, fillOpacity: innerOpacity });
      agent.outer.setRadius(outerRadius);
      agent.inner.setRadius(innerRadius);
    };

    const clearAgents = () => {
      for (const a of sim.agents) {
        a.outer.remove();
        a.inner.remove();
      }
      sim.agents = [];
    };

    const stopSimInternal = () => {
      sim.loading = false;
      if (sim.abort) sim.abort.abort();
      sim.abort = null;
      if (sim.rafId) window.cancelAnimationFrame(sim.rafId);
      sim.rafId = null;
      sim.routePool = null;
      clearAgents();
    };

    const buildRoutePool = async (desiredAgents, signal) => {
      const pool = { driving: [], walking: [] };

      const desiredDriving = clamp(Math.round(desiredAgents / 18), 3, 9);
      const desiredWalking = clamp(Math.round(desiredAgents / 28), 2, 7);

      const cfgFor = (profile) => {
        if (profile === "walking") {
          return {
            desired: desiredWalking,
            minM: 220,
            maxM: 2200,
            minPx: 160,
            maxPx: 540
          };
        }
        return {
          desired: desiredDriving,
          minM: 450,
          maxM: 7200,
          minPx: 260,
          maxPx: 980
        };
      };

      const fillPool = async (profile) => {
        const cfg = cfgFor(profile);
        const maxAttempts = cfg.desired * 6;
        for (let i = 0; i < maxAttempts && pool[profile].length < cfg.desired; i++) {
          const start = randomViewLatLng(52);
          const end = targetFrom(start, cfg.minPx, cfg.maxPx, 52);
          try {
            const route = await fetchRoute(profile, start, end, signal);
            if (route.totalM < cfg.minM || route.totalM > cfg.maxM) continue;
            pool[profile].push(route);
          } catch (err) {
            // Ignore and retry with a new pair.
          }
        }
      };

      await fillPool("driving");
      await fillPool("walking");
      return pool;
    };

    const createAgent = (route, persona) => {
      // Aura-only: no central dot.
      const baseOuterRadius = randBetween(14, 22);
      const baseInnerRadius = baseOuterRadius * randBetween(0.48, 0.62);
      const outer = createAuraLayer(route.points[0], persona.fill, baseOuterRadius, 0.16);
      const inner = createAuraLayer(route.points[0], persona.fill, baseInnerRadius, 0.22);

      const distM = randBetween(0, route.totalM);
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speedMps = randBetween(persona.speedMps[0], persona.speedMps[1]);
      const jitterPx = randBetween(persona.jitterPx[0], persona.jitterPx[1]);

      const agent = {
        outer,
        inner,
        route,
        persona,
        baseOuterRadius,
        baseInnerRadius,
        dir,
        speedMps,
        jitterPx,
        hintIdx: 0,
        state: "moving",
        stopType: "",
        stopUntil: 0,
        distM
      };

      const pos = routeAtDistance(route, distM, 0);
      agent.hintIdx = pos.idx;
      const ll = jitterLatLng(pos.latLng, agent.jitterPx);
      agent.outer.setLatLng(ll);
      agent.inner.setLatLng(ll);
      applyAgentStyle(agent);
      return agent;
    };

    const pickStop = (agent) => {
      // Long stops simulate “eating”. Transit gets shorter station-like stops.
      if (Math.random() < 0.18) {
        return { type: "eat", ms: randBetween(7000, 17000) };
      }
      if (agent.persona.kind === "TRANSIT" && Math.random() < 0.55) {
        return { type: "transit", ms: randBetween(1100, 4200) };
      }
      return { type: "idle", ms: randBetween(700, 2400) };
    };

    const maybeMicroStop = (agent, dtSec, now) => {
      const p = agent.persona.microStopPerS * dtSec;
      if (p <= 0) return false;
      if (Math.random() >= p) return false;

      agent.state = "stopped";
      agent.stopType = agent.persona.kind === "TRANSIT" ? "transit" : "idle";
      agent.stopUntil = now + randBetween(650, agent.persona.kind === "WALK" ? 1900 : 1400);
      applyAgentStyle(agent);
      return true;
    };

    const tickAgents = () => {
      if (!sim.enabled || sim.agents.length === 0) return;
      const now = simNow();
      const dtSecRaw = (now - sim.lastTickAt) / 1000;
      const dtSec = clamp(dtSecRaw, 0, 0.2);
      sim.lastTickAt = now;

      for (const agent of sim.agents) {
        if (agent.state === "stopped") {
          if (now < agent.stopUntil) continue;
          agent.state = "moving";
          agent.stopType = "";
          applyAgentStyle(agent);
        }

        if (maybeMicroStop(agent, dtSec, now)) continue;

        agent.distM += agent.dir * agent.speedMps * dtSec;

        if (agent.distM <= 0 || agent.distM >= agent.route.totalM) {
          agent.distM = clamp(agent.distM, 0, agent.route.totalM);
          const stop = pickStop(agent);
          agent.state = "stopped";
          agent.stopType = stop.type;
          agent.stopUntil = now + stop.ms;
          agent.dir *= -1; // bounce back along the same streets
          applyAgentStyle(agent);
        }

        const pos = routeAtDistance(agent.route, agent.distM, agent.hintIdx);
        agent.hintIdx = pos.idx;
        const ll = jitterLatLng(pos.latLng, agent.jitterPx);
        agent.outer.setLatLng(ll);
        agent.inner.setLatLng(ll);
      }

      sim.rafId = window.requestAnimationFrame(tickAgents);
    };

    const setSimUi = () => {
      if (els.mapSimToggle) {
        els.mapSimToggle.textContent = sim.enabled ? "Sim auras: ON" : "Sim auras: OFF";
      }

      if (!sim.enabled) {
        setAuraBadge("AURAS: OFF", "off");
        return;
      }

      if (map.getZoom() < STREET_MIN_ZOOM) {
        setAuraBadge(`AURAS: ZOOM ${STREET_MIN_ZOOM}+`, "warn");
        return;
      }

      if (sim.loading) {
        setAuraBadge("AURAS: LOADING", "off");
        return;
      }

      setAuraBadge(`AURAS: ${sim.agents.length}`, sim.agents.length ? "ok" : "off");
    };

    const ensureAgentCount = (targetCount) => {
      if (!sim.routePool) return;
      const routesDriving = sim.routePool.driving || [];
      const routesWalking = sim.routePool.walking && sim.routePool.walking.length
        ? sim.routePool.walking
        : routesDriving;
      const nowTarget = Math.max(0, Math.round(targetCount));

      while (sim.agents.length < nowTarget) {
        const persona = pickPersona();
        const route =
          persona.profile === "walking"
            ? pickOne(routesWalking.length ? routesWalking : routesDriving)
            : pickOne(routesDriving.length ? routesDriving : routesWalking);
        if (!route) break;
        sim.agents.push(createAgent(route, persona));
      }

      while (sim.agents.length > nowTarget) {
        const agent = sim.agents.pop();
        if (!agent) break;
        agent.outer.remove();
        agent.inner.remove();
      }
    };

    const rebuildSim = async () => {
      if (!sim.enabled) return;
      if (map.getZoom() < STREET_MIN_ZOOM) return;

      const buildId = ++sim.buildId;

      sim.loading = true;
      setSimUi();
      setMapStatus("Fetching street activity…");

      if (sim.abort) sim.abort.abort();
      const ac = new AbortController();
      sim.abort = ac;

      try {
        const agentCount = auraTargetCountForZoom(map.getZoom());
        const pool = await buildRoutePool(agentCount, ac.signal);
        if (buildId !== sim.buildId) return;

        const routesDriving = pool.driving;
        const routesWalking = pool.walking.length ? pool.walking : pool.driving;
        if (!routesDriving.length && !routesWalking.length) {
          throw new Error("No routes available for this view.");
        }

        const nextAgents = [];

        for (let i = 0; i < agentCount; i++) {
          const persona = pickPersona();
          const route =
            persona.profile === "walking"
              ? pickOne(routesWalking)
              : pickOne(routesDriving.length ? routesDriving : routesWalking);
          if (!route) continue;
          nextAgents.push(createAgent(route, persona));
        }

        const prevAgents = sim.agents;
        sim.routePool = pool;
        sim.agents = nextAgents;
        for (const a of prevAgents) {
          a.outer.remove();
          a.inner.remove();
        }

        sim.loading = false;
        setSimUi();
        setMapStatus("Street activity running.");

        if (!sim.rafId) {
          sim.lastTickAt = simNow();
          sim.rafId = window.requestAnimationFrame(tickAgents);
        }
      } catch (err) {
        if (buildId !== sim.buildId) return;
        if (err && err.name !== "AbortError") console.error(err);
        sim.loading = false;
        setMapStatus("Street simulation failed to load routes.", true);
        setSimUi();
      } finally {
        if (buildId === sim.buildId) sim.abort = null;
      }
    };

    let rebuildTimer = null;
    let rebuildAnchor = { center: map.getCenter(), zoom: map.getZoom() };

    const scheduleRebuild = () => {
      if (!sim.enabled) return;
      if (map.getZoom() < STREET_MIN_ZOOM) return;

      if (rebuildTimer) window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(() => {
        rebuildTimer = null;
        rebuildAnchor = { center: map.getCenter(), zoom: map.getZoom() };
        rebuildSim();
      }, 650);
    };

    const syncSimForView = () => {
      if (!sim.enabled) return;
      if (map.getZoom() < STREET_MIN_ZOOM) {
        stopSimInternal();
        setMapStatus(`Zoom to ${STREET_MIN_ZOOM}+ to see street activity.`);
        setSimUi();
        return;
      }
      const targetCount = auraTargetCountForZoom(map.getZoom());
      if (!sim.routePool) {
        if (sim.agents.length === 0 && !sim.loading) rebuildSim();
        return;
      }
      if (!sim.loading) ensureAgentCount(targetCount);
      setSimUi();
    };

    const startSim = () => {
      if (sim.enabled) return;
      sim.enabled = true;
      setSimUi();
      syncSimForView();
    };

    const stopSim = () => {
      if (!sim.enabled) return;
      sim.enabled = false;
      stopSimInternal();
      setSimUi();
      setMapStatus("Street activity paused.");
    };

    const toggleSim = () => {
      if (sim.enabled) stopSim();
      else startSim();
    };

    if (els.mapReset) {
      els.mapReset.addEventListener("click", () => {
        const layers = layersForBounds();
        if (layers.length > 0) {
          const group = L.featureGroup(layers);
          map.fitBounds(group.getBounds(), { padding: [44, 44], maxZoom: 16 });
          return;
        }
        map.setView(defaultView.center, defaultView.zoom);
      });
    }

    const showMyLocation = () => {
      if (!els.mapLocate) return;
      if (!navigator.geolocation) {
        setGpsBadge("GPS: UNSUPPORTED", "warn");
        setMapStatus("Geolocation is not supported in this browser.", true);
        toast("Geolocation not supported.");
        return;
      }

      els.mapLocate.disabled = true;
      setGpsBadge("GPS: REQUEST", "off");
      setMapStatus("Requesting your location…");

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = Number(pos.coords.accuracy) || 0;

          setUserLatLng(lat, lng, accuracy, { ensureRing: true });

          setGpsBadge("GPS: ON", "ok");
          setMapStatus(
            `Showing your aura area (±${Math.round(accuracy || 0)}m).`
          );
          toast("Location shown on map.");

          map.fitBounds(myAccuracyRing.getBounds(), {
            padding: [44, 44],
            maxZoom: 16
          });

          window.requestAnimationFrame(() => map.invalidateSize());
          els.mapLocate.disabled = false;
        },
        (err) => {
          const code = err && typeof err.code === "number" ? err.code : 0;
          let msg = "Unable to get your location.";
          if (code === 1) msg = "Location permission denied.";
          if (code === 2) msg = "Location unavailable.";
          if (code === 3) msg = "Location request timed out.";

          setGpsBadge("GPS: OFF", "warn");
          setMapStatus(msg, true);
          toast(msg);
          els.mapLocate.disabled = false;
        },
        {
          enableHighAccuracy: true,
          timeout: 10_000,
          maximumAge: 60_000
        }
      );
    };

    if (els.mapLocate) {
      els.mapLocate.addEventListener("click", showMyLocation);
    }

    if (els.mapSimToggle) {
      els.mapSimToggle.addEventListener("click", toggleSim);
    }

    map.on("moveend zoomend", () => {
      if (!sim.enabled) return;
      setSimUi();

      if (map.getZoom() < STREET_MIN_ZOOM) {
        syncSimForView();
        return;
      }

      syncSimForView();

      const movedM = map.distance(map.getCenter(), rebuildAnchor.center);
      const zoomChanged = map.getZoom() !== rebuildAnchor.zoom;
      const zoomDelta = Math.abs(map.getZoom() - rebuildAnchor.zoom);
      if (movedM > 1200 || zoomDelta >= 2) {
        scheduleRebuild();
      } else {
        // Minor view change: keep routes and just scale aura count.
      }
    });

    // Default to ON unless the user prefers reduced motion.
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) startSim();
    else setSimUi();
    setGpsBadge("GPS: OFF", "off");
    setMapStatus("Map ready.");

    const api = {
      setUserAura: ({ enabled, color } = {}) => {
        if (typeof color === "string" && String(color).trim()) {
          userAuraColor = String(color).trim();
          applyUserAuraStyle();
        }

        const want = Boolean(enabled);
        if (!want) {
          userAuraEnabled = false;
          stopUserWatch();
          removeUserAuraLayers();
          if (!myAccuracyRing) setGpsBadge("GPS: OFF", "off");
          return;
        }

        userAuraEnabled = true;
        if (lastUserLatLng) {
          ensureUserAuraLayers(lastUserLatLng);
          userAuraOuter.setLatLng(lastUserLatLng);
          userAuraInner.setLatLng(lastUserLatLng);
        }
        startUserWatch();
      }
    };

    return api;
  };

  // --- Events ---

  els.addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask({
      text: els.taskText.value,
      due: els.taskDue.value || null
    });
    els.taskText.value = "";
    els.taskDue.value = "";
    els.taskText.focus();
  });

  els.segButtons.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });

  els.search.value = state.ui.q || "";
  els.search.addEventListener("input", () => setSearch(els.search.value));

  els.clearDone.addEventListener("click", clearDone);

  if (els.activityForm) {
    els.activityForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (state.activity.active) stopAndLogActivity();
      else startActivity();
    });
  }

  if (els.activityStart) {
    els.activityStart.addEventListener("click", startActivity);
  }
  if (els.activityStop) {
    els.activityStop.addEventListener("click", stopAndLogActivity);
  }
  if (els.activityClear) {
    els.activityClear.addEventListener("click", clearActivityLog);
  }

  if (els.activityType) {
    els.activityType.addEventListener("change", () => {
      // Persist the default type for the next session.
      state.activity.prefs.lastType = normalizeActivityType(els.activityType.value);
      saveState();
      renderActivity(false);
    });
  }

  if (els.activityShowAura) {
    els.activityShowAura.addEventListener("change", () => {
      const checked = Boolean(els.activityShowAura.checked);
      state.activity.prefs.showAuraOnMap = checked;
      if (state.activity.active) state.activity.active.showAuraOnMap = checked;
      saveState();
      renderActivity(false);
    });
  }

  els.editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitter = e.submitter ? String(e.submitter.value) : "save";
    if (submitter !== "save") {
      closeEdit();
      return;
    }
    if (!editingId) return closeEdit();

    const text = String(els.editText.value || "").trim();
    if (!text) {
      toast("Task text can’t be empty.");
      els.editText.focus();
      return;
    }
    updateTask(editingId, {
      text,
      due: els.editDue.value || null
    });
    closeEdit();
    toast("Task updated.");
  });

  els.editDialog.addEventListener("cancel", () => {
    closeEdit();
  });

  mapApi = initPaperMap();
  renderClock();
  window.setInterval(renderClock, 10_000);
  render();
})();
