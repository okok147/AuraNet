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

    const defaultView = { center: [18, 10], zoom: 2 };
    map.setView(defaultView.center, defaultView.zoom);

    const markers = [];
    let myMarker = null;
    let myAccuracyRing = null;

    const renderLocations = (locations) => {
      const bounds = [];
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
        bounds.push([loc.lat, loc.lng]);
      }

      if (els.mapCount) {
        els.mapCount.textContent = `MARKERS: ${markers.length}`;
      }

      if (bounds.length > 0) {
        map.fitBounds(bounds, {
          padding: [44, 44],
          maxZoom: 6
        });
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

    const layersForBounds = () => {
      const layers = [...markers];
      if (myAccuracyRing) layers.push(myAccuracyRing);
      if (myMarker) layers.push(myMarker);
      return layers;
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
        setMapStatus(`Loaded ${payload.locations.length} location(s).`);
      } catch (err) {
        console.error(err);
        setGpsBadge("GPS: ERROR", "warn");
        setMapStatus("Map loaded, but location data fetch failed.", true);
      }
    };

    if (els.mapReset) {
      els.mapReset.addEventListener("click", () => {
        const layers = layersForBounds();
        if (layers.length > 0) {
          const group = L.featureGroup(layers);
          map.fitBounds(group.getBounds(), { padding: [44, 44], maxZoom: 6 });
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
