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
    mapCount: $("mapCount"),
    mapLocate: $("mapLocate"),
    mapGps: $("mapGps"),
    mapSimToggle: $("mapSimToggle"),
    mapDotCount: $("mapDotCount"),

    time: $("time"),
    modePill: $("modePill"),
    timerHint: $("timerHint"),
    toggleTimer: $("toggleTimer"),
    resetTimer: $("resetTimer"),
    switchMode: $("switchMode"),
    focusMin: $("focusMin"),
    breakMin: $("breakMin"),
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

  const formatMmSs = (ms) => {
    const clamped = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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
    timer: {
      mode: "focus",
      running: false,
      endsAt: null,
      remainingMs: 25 * 60 * 1000,
      focusMin: 25,
      breakMin: 5
    }
  });

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1) return defaultState();
      return {
        ...defaultState(),
        ...parsed,
        ui: { ...defaultState().ui, ...(parsed.ui || {}) },
        timer: { ...defaultState().timer, ...(parsed.timer || {}) }
      };
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

  // --- Timer ---

  let ticker = null;
  let lastToastAt = 0;

  const sessionMs = (mode) => {
    const focusMs = clampInt(state.timer.focusMin, 5, 120, 25) * 60 * 1000;
    const breakMs = clampInt(state.timer.breakMin, 1, 60, 5) * 60 * 1000;
    return mode === "break" ? breakMs : focusMs;
  };

  const timerRemaining = () => {
    if (!state.timer.running || !state.timer.endsAt) return state.timer.remainingMs;
    return Math.max(0, state.timer.endsAt - nowMs());
  };

  const syncTimerInputs = () => {
    els.focusMin.value = String(state.timer.focusMin);
    els.breakMin.value = String(state.timer.breakMin);
  };

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

  const stopTicker = () => {
    if (!ticker) return;
    window.clearInterval(ticker);
    ticker = null;
  };

  const ensureTicker = () => {
    if (ticker) return;
    ticker = window.setInterval(() => {
      const remaining = timerRemaining();
      if (remaining <= 0 && state.timer.running) {
        // Finish, switch mode, pause.
        state.timer.running = false;
        state.timer.endsAt = null;
        state.timer.mode = state.timer.mode === "focus" ? "break" : "focus";
        state.timer.remainingMs = sessionMs(state.timer.mode);
        saveState();
        toast(state.timer.mode === "focus" ? "Break done. Back to focus." : "Focus complete. Take a break.");
      }
      renderTimer();
      if (!state.timer.running) stopTicker();
    }, 250);
  };

  const startTimer = () => {
    if (state.timer.running) return;
    const remaining = timerRemaining();
    const fresh = remaining <= 0 ? sessionMs(state.timer.mode) : remaining;
    state.timer.remainingMs = fresh;
    state.timer.endsAt = nowMs() + fresh;
    state.timer.running = true;
    saveState();
    ensureTicker();
    renderTimer();
  };

  const pauseTimer = () => {
    if (!state.timer.running) return;
    state.timer.remainingMs = timerRemaining();
    state.timer.running = false;
    state.timer.endsAt = null;
    saveState();
    renderTimer();
    stopTicker();
  };

  const resetTimer = () => {
    state.timer.running = false;
    state.timer.endsAt = null;
    state.timer.remainingMs = sessionMs(state.timer.mode);
    saveState();
    renderTimer();
    stopTicker();
  };

  const switchMode = () => {
    state.timer.mode = state.timer.mode === "focus" ? "break" : "focus";
    resetTimer();
    toast(state.timer.mode === "focus" ? "Focus mode." : "Break mode.");
  };

  const setMinutes = (focusMin, breakMin) => {
    const f = clampInt(focusMin, 5, 120, 25);
    const b = clampInt(breakMin, 1, 60, 5);
    state.timer.focusMin = f;
    state.timer.breakMin = b;
    resetTimer();
    syncTimerInputs();
    toast("Timer updated.");
  };

  const renderTimer = () => {
    // Repair any stale timer state after load.
    if (state.timer.running && state.timer.endsAt && state.timer.endsAt <= nowMs()) {
      state.timer.running = false;
      state.timer.endsAt = null;
      state.timer.remainingMs = 0;
      saveState();
    }

    const remaining = timerRemaining();
    els.time.textContent = formatMmSs(remaining);
    els.modePill.textContent = state.timer.mode === "focus" ? "Focus" : "Break";

    els.toggleTimer.textContent = state.timer.running ? "Pause" : "Start";
    els.timerHint.textContent = state.timer.running
      ? "Stay with it. Small steps."
      : remaining <= 0
        ? "Session complete. Switch or start again."
        : "Start when you’re ready.";

    // A subtle visual cue: keep the title in sync.
    document.title = `${formatMmSs(remaining)} • AuraNet`;
  };

  // --- Render ---

  const render = () => {
    renderStats();
    renderFilters();
    renderList();
    renderTimer();
    syncTimerInputs();
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
    if (!els.paperMap) return;
    if (typeof window.L === "undefined") {
      setMapStatus("Map library failed to load.", true);
      return;
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

    const markers = [];
    let myMarker = null;
    let myAccuracyRing = null;
    const simRenderer = L.canvas({ padding: 0.5 });

    const sim = {
      enabled: false,
      rafId: null,
      agents: [],
      buildId: 0,
      abort: null,
      lastTickAt: 0,
      loading: false,
      routeCache: new Map(),
      routeCacheKeys: []
    };

    const renderLocations = (locations) => {
      for (const loc of locations) {
        const marker = L.circleMarker([loc.lat, loc.lng], {
          radius: 7,
          color: "rgba(32, 24, 18, 0.92)",
          weight: 1.4,
          fillColor: "#ff6a00",
          fillOpacity: 0.65
        });

        const popupTitle = escapeHtml(loc.name);
        const popupNote = escapeHtml(loc.note || "");
        marker.bindPopup(
          `<strong>${popupTitle}</strong>${popupNote ? `<br>${popupNote}` : ""}`
        );
        marker.addTo(map);

        markers.push(marker);
      }

      if (els.mapCount) {
        els.mapCount.textContent = `MARKERS: ${markers.length}`;
      }

      // If the container’s layout shifted while loading (fonts), re-measure.
      window.requestAnimationFrame(() => map.invalidateSize());
    };

    const clearMarkers = () => {
      for (const m of markers) m.remove();
      markers.length = 0;
      if (els.mapCount) els.mapCount.textContent = "MARKERS: 0";
    };

    const setGpsBadge = (message, kind = "off") => {
      if (!els.mapGps) return;
      els.mapGps.textContent = message;
      els.mapGps.classList.toggle("badge--ok", kind === "ok");
      els.mapGps.classList.toggle("badge--warn", kind === "warn");
    };

    const setDotBadge = (message, kind = "off") => {
      if (!els.mapDotCount) return;
      els.mapDotCount.textContent = message;
      els.mapDotCount.classList.toggle("badge--ok", kind === "ok");
      els.mapDotCount.classList.toggle("badge--warn", kind === "warn");
    };

    const layersForBounds = () => {
      // Reset view should stay street-level; don’t zoom out to fit sample markers.
      const layers = [];
      if (myAccuracyRing) layers.push(myAccuracyRing);
      if (myMarker) layers.push(myMarker);
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

    const applyAgentStyle = (agent) => {
      let fill = agent.persona.fill;
      let radius = agent.baseRadius;
      let fillOpacity = 0.82;

      if (agent.state === "stopped") {
        fillOpacity = 0.9;
        if (agent.stopType === "eat") {
          fill = "#f1b83a";
          radius = agent.baseRadius + 1.6;
        } else if (agent.stopType === "transit") {
          fill = "#ff6a00";
          radius = agent.baseRadius + 0.8;
        } else {
          fill = "#7a5a2b";
          radius = agent.baseRadius + 0.4;
        }
      }

      agent.marker.setStyle({
        color: "rgba(32, 24, 18, 0.92)",
        weight: 1.2,
        opacity: 0.86,
        fillColor: fill,
        fillOpacity
      });
      agent.marker.setRadius(radius);

      if (agent.marker.getPopup()) {
        const label =
          agent.state === "moving"
            ? agent.persona.kind
            : agent.stopType === "eat"
              ? "EATING"
              : agent.stopType === "transit"
                ? "BOARDING"
                : "PAUSED";
        agent.marker.setPopupContent(`<strong>${label}</strong>`);
      }
    };

    const clearAgents = () => {
      for (const a of sim.agents) a.marker.remove();
      sim.agents = [];
    };

    const stopSimInternal = () => {
      sim.loading = false;
      if (sim.abort) sim.abort.abort();
      sim.abort = null;
      if (sim.rafId) window.cancelAnimationFrame(sim.rafId);
      sim.rafId = null;
      clearAgents();
    };

    const buildRoutePool = async (signal) => {
      const pool = { driving: [], walking: [] };

      const cfgFor = (profile) => {
        if (profile === "walking") {
          return { desired: 2, minM: 220, maxM: 2200, minPx: 160, maxPx: 540 };
        }
        return { desired: 3, minM: 450, maxM: 7200, minPx: 260, maxPx: 980 };
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

    const createAgent = (route, persona, now) => {
      const baseRadius = 3.6 + Math.random() * 1.2;
      const marker = L.circleMarker(route.points[0], {
        renderer: simRenderer,
        radius: baseRadius,
        color: "rgba(32, 24, 18, 0.92)",
        weight: 1.2,
        opacity: 0.86,
        fillColor: persona.fill,
        fillOpacity: 0.82
      }).addTo(map);

      marker.bindPopup(`<strong>${persona.kind}</strong>`);

      const distM = randBetween(0, route.totalM);
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speedMps = randBetween(persona.speedMps[0], persona.speedMps[1]);
      const jitterPx = randBetween(persona.jitterPx[0], persona.jitterPx[1]);

      const agent = {
        marker,
        route,
        persona,
        baseRadius,
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
      agent.marker.setLatLng(jitterLatLng(pos.latLng, agent.jitterPx));
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
        agent.marker.setLatLng(jitterLatLng(pos.latLng, agent.jitterPx));
      }

      sim.rafId = window.requestAnimationFrame(tickAgents);
    };

    const setSimUi = () => {
      if (els.mapSimToggle) {
        els.mapSimToggle.textContent = sim.enabled ? "Sim dots: ON" : "Sim dots: OFF";
      }

      if (!sim.enabled) {
        setDotBadge("DOTS: OFF", "off");
        return;
      }

      if (map.getZoom() < STREET_MIN_ZOOM) {
        setDotBadge(`DOTS: ZOOM ${STREET_MIN_ZOOM}+`, "warn");
        return;
      }

      if (sim.loading) {
        setDotBadge("DOTS: LOADING", "off");
        return;
      }

      setDotBadge(`DOTS: ${sim.agents.length}`, sim.agents.length ? "ok" : "off");
    };

    const rebuildSim = async () => {
      if (!sim.enabled) return;
      if (map.getZoom() < STREET_MIN_ZOOM) return;

      const buildId = ++sim.buildId;
      stopSimInternal();

      sim.loading = true;
      setSimUi();
      setMapStatus("Fetching street activity…");

      const ac = new AbortController();
      sim.abort = ac;

      try {
        const pool = await buildRoutePool(ac.signal);
        if (buildId !== sim.buildId) return;

        const routesDriving = pool.driving;
        const routesWalking = pool.walking.length ? pool.walking : pool.driving;
        if (!routesDriving.length && !routesWalking.length) {
          throw new Error("No routes available for this view.");
        }

        const agentCount = 22;
        const now = simNow();
        sim.agents = [];

        for (let i = 0; i < agentCount; i++) {
          const persona = pickPersona();
          const route =
            persona.profile === "walking"
              ? pickOne(routesWalking)
              : pickOne(routesDriving.length ? routesDriving : routesWalking);
          if (!route) continue;
          sim.agents.push(createAgent(route, persona, now));
        }

        sim.loading = false;
        setSimUi();
        setMapStatus("Street activity running.");

        sim.lastTickAt = now;
        sim.rafId = window.requestAnimationFrame(tickAgents);
      } catch (err) {
        console.error(err);
        if (buildId !== sim.buildId) return;
        sim.loading = false;
        setDotBadge("DOTS: OFF", "warn");
        setMapStatus("Street simulation failed to load routes.", true);
        stopSimInternal();
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
      if (sim.agents.length === 0 && !sim.loading) rebuildSim();
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

    const loadLocations = async () => {
      setMapStatus("Loading locations…");
      try {
        const response = await fetch("./data/locations.json", {
          cache: "no-store"
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (!payload || !Array.isArray(payload.locations)) {
          throw new Error("Invalid payload");
        }

        clearMarkers();
        renderLocations(payload.locations);
        setGpsBadge("GPS: OFF", "off");
        setSimUi();
        const base = `Loaded ${payload.locations.length} location(s).`;
        const activity =
          sim.enabled && map.getZoom() >= STREET_MIN_ZOOM
            ? sim.loading
              ? "Fetching street activity…"
              : sim.agents.length
                ? "Street activity running."
                : `Zoom to ${STREET_MIN_ZOOM}+ to see street activity.`
            : "";
        setMapStatus(activity ? `${base} ${activity}` : base);
      } catch (err) {
        console.error(err);
        setGpsBadge("GPS: ERROR", "warn");
        setDotBadge("DOTS: OFF", "warn");
        setMapStatus("Map loaded, but location data fetch failed.", true);
      }
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

          if (!myAccuracyRing) {
            myAccuracyRing = L.circle([lat, lng], {
              radius: accuracy || 50,
              color: "rgba(255, 106, 0, 0.55)",
              weight: 2,
              fillColor: "rgba(255, 106, 0, 0.18)",
              fillOpacity: 0.35
            }).addTo(map);
          } else {
            myAccuracyRing.setLatLng([lat, lng]);
            myAccuracyRing.setRadius(accuracy || myAccuracyRing.getRadius());
          }

          if (!myMarker) {
            myMarker = L.circleMarker([lat, lng], {
              radius: 7,
              color: "rgba(32, 24, 18, 0.92)",
              weight: 1.6,
              fillColor: "#ff6a00",
              fillOpacity: 0.9
            })
              .addTo(map)
              .bindPopup("<strong>Your location</strong>");
          } else {
            myMarker.setLatLng([lat, lng]);
          }

          setGpsBadge("GPS: ON", "ok");
          setMapStatus(
            `Showing your location (±${Math.round(accuracy || 0)}m).`
          );
          toast("Location shown on map.");

          if (myAccuracyRing) {
            map.fitBounds(myAccuracyRing.getBounds(), {
              padding: [44, 44],
              maxZoom: 16
            });
          } else {
            map.setView([lat, lng], 16);
          }

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

      const movedM = map.distance(map.getCenter(), rebuildAnchor.center);
      const zoomChanged = map.getZoom() !== rebuildAnchor.zoom;
      if (zoomChanged || movedM > 1200) {
        scheduleRebuild();
      } else {
        syncSimForView();
      }
    });

    // Default to ON unless the user prefers reduced motion.
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) startSim();
    else setSimUi();

    loadLocations();
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

  els.toggleTimer.addEventListener("click", () => {
    if (state.timer.running) pauseTimer();
    else startTimer();
  });
  els.resetTimer.addEventListener("click", resetTimer);
  els.switchMode.addEventListener("click", switchMode);

  els.focusMin.addEventListener("change", () => {
    setMinutes(els.focusMin.value, els.breakMin.value);
  });
  els.breakMin.addEventListener("change", () => {
    setMinutes(els.focusMin.value, els.breakMin.value);
  });

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

  // Repair timer state on initial load.
  if (state.timer.running && state.timer.endsAt) {
    const remaining = state.timer.endsAt - nowMs();
    if (remaining <= 0) {
      state.timer.running = false;
      state.timer.endsAt = null;
      state.timer.remainingMs = 0;
      saveState();
    } else {
      ensureTicker();
    }
  }

  initPaperMap();
  renderClock();
  window.setInterval(renderClock, 10_000);
  render();
})();
