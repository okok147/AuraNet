(() => {
  const STORAGE_KEY = "auranet:v2";

  const $ = (id) => document.getElementById(id);

  const els = {
    storagePill: $("storagePill"),
    clock: $("clock"),

    paperMap: $("paperMap"),
    mapStatus: $("mapStatus"),
    mapReset: $("mapReset"),
    mapLocate: $("mapLocate"),
    mapGps: $("mapGps"),
    mapVis: $("mapVis"),
    mapAuraCount: $("mapAuraCount"),

    auraPill: $("auraPill"),
    activityForm: $("activityForm"),
    activityText: $("activityText"),
    activitySuggest: $("activitySuggest"),
    activityColorPreview: $("activityColorPreview"),
    activityShowAura: $("activityShowAura"),
    idleShowAura: $("idleShowAura"),
    visibilitySeg: $("visibilitySeg"),
    visRoom: $("visRoom"),
    visRoomCode: $("visRoomCode"),
    visRoomJoin: $("visRoomJoin"),
    visRoomLeave: $("visRoomLeave"),
    visRoomState: $("visRoomState"),
    visApproved: $("visApproved"),
    approvedInput: $("approvedInput"),
    approvedAdd: $("approvedAdd"),
    approvedList: $("approvedList"),
    activityTime: $("activityTime"),
    activityHint: $("activityHint"),
    activityStart: $("activityStart"),
    activityStop: $("activityStop"),
    activityClear: $("activityClear"),
    auraSwatch: $("auraSwatch"),
    auraValue: $("auraValue"),
    auraHex: $("auraHex"),
    auraChart: $("auraChart"),
    auraLegend: $("auraLegend"),
    activityList: $("activityList"),
    langSelect: $("langSelect"),
    toast: $("toast"),
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

  // --- i18n ---

  const SUPPORTED_LANGS = ["en", "zh-Hant", "ja"];

  const normalizeLang = (value) => {
    const v = String(value || "").trim();
    return SUPPORTED_LANGS.includes(v) ? v : "en";
  };

  const I18N = {
    en: {
      ui_language: "Language",
      activity_title: "Activity Logger",
      activity_hint_idle: "Log what you’re doing. Each activity generates a unique color over time.",
      activity_tracking: "Tracking: {text}",
      activity_label: "Activity",
      activity_placeholder: "Work, commute, gym, coffee…",
      activity_color_label: "Color",
      activity_show_aura_toggle: "Show my aura on map while active",
      idle_show_aura_toggle: "Show my aura on map while idle",
      visibility_label: "Visibility",
      visibility_everyone: "Everyone",
      visibility_area: "Specific area",
      visibility_connected: "Approved aura",
      area_room_label: "Event room",
      area_room_placeholder: "Room code",
      area_join: "Join",
      area_leave: "Leave",
      approved_label: "Approved contacts",
      approved_placeholder: "@handle",
      approved_add: "Add",
      approved_empty: "No approved contacts yet",
      approved_remove: "Remove",
      area_room_state_on: "ROOM: ON",
      area_room_state_off: "ROOM: OFF",
      toast_room_code_empty: "Room code can’t be empty.",
      toast_room_joined: "Joined area room.",
      toast_room_left: "Left area room.",
      toast_contact_added: "Approved contact added.",
      toast_contact_exists: "Already approved.",
      toast_contact_removed: "Approved contact removed.",
      activity_start: "Start",
      activity_stop_log: "Stop & log",
      activity_clear: "Clear log",
      aura_long_term_title: "Long-term aura",
      aura_chart_label: "Aura",
      aura_legend_empty: "No history yet. Log a few activities to build your aura.",
      aura_no_history_short: "No history yet",
      activity_list_empty: "No activities logged yet.",
      confirm_clear_log: "Clear all activity entries?",
      toast_activity_started: "Activity started.",
      toast_activity_logged: "Activity logged.",
      toast_activity_too_short: "Activity too short (not saved).",
      toast_activity_cleared: "Activity log cleared.",
      toast_activity_empty: "Activity can’t be empty.",
      aura_pill_idle: "IDLE",
      aura_pill_active: "ACTIVE: {activity}",
      popup_aura_components: "Aura components",
      popup_simulated_person: "Simulated person",
      popup_you: "You",
      gps_unsupported: "Geolocation not supported.",
      gps_denied: "Location permission denied.",
      gps_unavailable: "Location unavailable.",
      gps_timeout: "Location request timed out.",
      gps_error: "Unable to get your location.",
      gps_ready: "GPS ready.",
      map_lib_failed: "Map library failed to load.",
      map_title: "Paper Sketch Map",
      map_loading: "Loading map…",
      map_locate: "My location",
      map_reset: "Reset view",
      map_auras_prefix: "AURAS",
      map_auras_off: "AURAS: OFF",
      map_auras_loading: "AURAS: LOADING",
      map_auras_zoom: "AURAS: ZOOM {z}+",
      map_auras_count: "AURAS: {n}",
      map_gps_off: "GPS: OFF",
      map_gps_on: "GPS: ON",
      map_gps_request: "GPS: REQUEST",
      map_gps_error: "GPS: ERROR",
      map_gps_unsupported: "GPS: UNSUPPORTED",
      map_vis_prefix: "VIS",
      map_status_ready: "Map ready.",
      map_status_requesting_gps: "Requesting GPS…",
      map_status_gps_private: "GPS ready. Centered on you (private view).",
      map_status_zoom_to: "Zoom to {z}+ to see street activity.",
      map_status_fetching: "Fetching street activity…",
      map_status_running: "Street activity running.",
      map_status_paused: "Street activity paused.",
      map_status_sim_failed: "Street simulation failed to load routes."
    },
    "zh-Hant": {
      ui_language: "語言",
      activity_title: "活動紀錄",
      activity_hint_idle: "紀錄你正在做的事，每個活動都會生成獨特的顏色並隨時間混合。",
      activity_tracking: "追蹤中：{text}",
      activity_label: "活動",
      activity_placeholder: "工作、通勤、健身、咖啡…",
      activity_color_label: "顏色",
      activity_show_aura_toggle: "活動進行中在地圖顯示我的氣場",
      idle_show_aura_toggle: "待機時也在地圖顯示我的氣場",
      visibility_label: "可見性",
      visibility_everyone: "所有人",
      visibility_area: "同場域",
      visibility_connected: "已核准",
      area_room_label: "活動房間",
      area_room_placeholder: "房間代碼",
      area_join: "加入",
      area_leave: "離開",
      approved_label: "已核准聯絡人",
      approved_placeholder: "@帳號",
      approved_add: "新增",
      approved_empty: "尚無已核准聯絡人",
      approved_remove: "移除",
      area_room_state_on: "房間：開",
      area_room_state_off: "房間：關",
      toast_room_code_empty: "房間代碼不能為空。",
      toast_room_joined: "已加入活動房間。",
      toast_room_left: "已離開活動房間。",
      toast_contact_added: "已新增核准聯絡人。",
      toast_contact_exists: "已在核准名單中。",
      toast_contact_removed: "已移除核准聯絡人。",
      activity_start: "開始",
      activity_stop_log: "結束並紀錄",
      activity_clear: "清除紀錄",
      aura_long_term_title: "長期氣場",
      aura_chart_label: "氣場",
      aura_legend_empty: "尚無紀錄。先記錄一些活動來建立你的氣場。",
      aura_no_history_short: "尚無紀錄",
      activity_list_empty: "目前沒有活動紀錄。",
      confirm_clear_log: "要清除所有活動紀錄嗎？",
      toast_activity_started: "已開始活動。",
      toast_activity_logged: "已紀錄活動。",
      toast_activity_too_short: "活動時間太短（未儲存）。",
      toast_activity_cleared: "已清除活動紀錄。",
      toast_activity_empty: "活動內容不能為空。",
      aura_pill_idle: "待機",
      aura_pill_active: "進行中：{activity}",
      popup_aura_components: "氣場組成",
      popup_simulated_person: "模擬人物",
      popup_you: "你",
      gps_unsupported: "此瀏覽器不支援定位。",
      gps_denied: "定位權限被拒絕。",
      gps_unavailable: "無法取得定位。",
      gps_timeout: "定位請求逾時。",
      gps_error: "無法取得你的定位。",
      gps_ready: "定位已就緒。",
      map_lib_failed: "地圖套件載入失敗。",
      map_title: "紙感素描地圖",
      map_loading: "載入地圖中…",
      map_locate: "我的位置",
      map_reset: "重置視角",
      map_auras_prefix: "氣場",
      map_auras_off: "氣場：關",
      map_auras_loading: "氣場：載入中",
      map_auras_zoom: "氣場：縮放到 {z}+",
      map_auras_count: "氣場：{n}",
      map_gps_off: "GPS：關",
      map_gps_on: "GPS：開",
      map_gps_request: "GPS：請求中",
      map_gps_error: "GPS：錯誤",
      map_gps_unsupported: "GPS：不支援",
      map_vis_prefix: "可見",
      map_status_ready: "地圖已就緒。",
      map_status_requesting_gps: "正在請求定位…",
      map_status_gps_private: "定位已就緒。已置中到你的位置（私人視角）。",
      map_status_zoom_to: "請縮放到 {z}+ 以查看街道活動。",
      map_status_fetching: "正在取得街道活動…",
      map_status_running: "街道活動進行中。",
      map_status_paused: "街道活動已暫停。",
      map_status_sim_failed: "街道模擬載入路線失敗。"
    },
    ja: {
      ui_language: "言語",
      activity_title: "アクティビティ記録",
      activity_hint_idle: "いまの行動を記録。各アクティビティが固有の色を作り、時間で混ざります。",
      activity_tracking: "追跡中: {text}",
      activity_label: "アクティビティ",
      activity_placeholder: "仕事、通勤、ジム、コーヒー…",
      activity_color_label: "色",
      activity_show_aura_toggle: "アクティブ中に地図で自分のオーラを表示",
      idle_show_aura_toggle: "アイドル中も地図で自分のオーラを表示",
      visibility_label: "公開範囲",
      visibility_everyone: "全員",
      visibility_area: "同じ場所",
      visibility_connected: "承認済み",
      area_room_label: "イベントルーム",
      area_room_placeholder: "ルームコード",
      area_join: "参加",
      area_leave: "退出",
      approved_label: "承認済み連絡先",
      approved_placeholder: "@handle",
      approved_add: "追加",
      approved_empty: "承認済みはまだありません",
      approved_remove: "削除",
      area_room_state_on: "ROOM: ON",
      area_room_state_off: "ROOM: OFF",
      toast_room_code_empty: "ルームコードを入力してください。",
      toast_room_joined: "ルームに参加しました。",
      toast_room_left: "ルームから退出しました。",
      toast_contact_added: "承認済みに追加しました。",
      toast_contact_exists: "すでに承認済みです。",
      toast_contact_removed: "承認済みから削除しました。",
      activity_start: "開始",
      activity_stop_log: "停止して記録",
      activity_clear: "ログを消去",
      aura_long_term_title: "長期オーラ",
      aura_chart_label: "オーラ",
      aura_legend_empty: "履歴がありません。いくつか記録してオーラを作りましょう。",
      aura_no_history_short: "履歴なし",
      activity_list_empty: "アクティビティ履歴はまだありません。",
      confirm_clear_log: "すべてのアクティビティ履歴を消去しますか？",
      toast_activity_started: "開始しました。",
      toast_activity_logged: "記録しました。",
      toast_activity_too_short: "短すぎるため保存しませんでした。",
      toast_activity_cleared: "履歴を消去しました。",
      toast_activity_empty: "内容を入力してください。",
      aura_pill_idle: "待機",
      aura_pill_active: "進行中: {activity}",
      popup_aura_components: "オーラ構成",
      popup_simulated_person: "シミュレーション人物",
      popup_you: "あなた",
      gps_unsupported: "位置情報に対応していません。",
      gps_denied: "位置情報の許可が拒否されました。",
      gps_unavailable: "位置情報を取得できません。",
      gps_timeout: "位置情報の取得がタイムアウトしました。",
      gps_error: "位置情報を取得できませんでした。",
      gps_ready: "GPS 準備完了。",
      map_lib_failed: "地図ライブラリの読み込みに失敗しました。",
      map_title: "スケッチ風マップ",
      map_loading: "地図を読み込み中…",
      map_locate: "現在地",
      map_reset: "表示を戻す",
      map_auras_prefix: "オーラ",
      map_auras_off: "オーラ: OFF",
      map_auras_loading: "オーラ: 読み込み中",
      map_auras_zoom: "オーラ: {z}+ へズーム",
      map_auras_count: "オーラ: {n}",
      map_gps_off: "GPS: OFF",
      map_gps_on: "GPS: ON",
      map_gps_request: "GPS: 要求中",
      map_gps_error: "GPS: エラー",
      map_gps_unsupported: "GPS: 非対応",
      map_vis_prefix: "公開",
      map_status_ready: "地図の準備ができました。",
      map_status_requesting_gps: "GPS を要求しています…",
      map_status_gps_private: "GPS 準備完了。あなたの位置に移動しました（プライベート表示）。",
      map_status_zoom_to: "{z}+ までズームすると街の動きが見えます。",
      map_status_fetching: "街の動きを取得中…",
      map_status_running: "街の動きは実行中です。",
      map_status_paused: "街の動きは一時停止中です。",
      map_status_sim_failed: "ルートの読み込みに失敗しました。"
    }
  };

  const t = (key, vars) => {
    const table = I18N[i18nLang] || I18N.en;
    let s = table[key] || I18N.en[key] || key;
    if (vars && typeof vars === "object") {
      for (const [k, v] of Object.entries(vars)) {
        s = s.replaceAll(`{${k}}`, String(v));
      }
    }
    return s;
  };

  const applyI18n = () => {
    // Text nodes.
    for (const el of document.querySelectorAll("[data-i18n]")) {
      const key = el.getAttribute("data-i18n");
      if (!key) continue;
      el.textContent = t(key);
    }
    // Placeholders.
    for (const el of document.querySelectorAll("[data-i18n-placeholder]")) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) continue;
      if ("placeholder" in el) el.placeholder = t(key);
    }

    if (els.langSelect) {
      els.langSelect.value = i18nLang;
      els.langSelect.setAttribute("aria-label", t("ui_language"));
    }

    // Update any draft helpers that include translated labels.
    if (typeof renderActivityAssist === "function") renderActivityAssist();
  };

  const defaultState = () => ({
    version: 1,
    activity: {
      active: null,
      log: [],
      prefs: {
        showAuraOnMap: false,
        idleShowAuraOnMap: false,
        visibilityMode: "everyone",
        areaRoom: { code: "", joined: false, joinedAtMs: 0, leftAtMs: 0 },
        allowlist: [],
        lang: "en",
        lingerUntil: 0
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
      if (!Array.isArray(merged.activity.log)) merged.activity.log = [];
      // Normalize allowlist.
      if (!Array.isArray(merged.activity.prefs.allowlist)) merged.activity.prefs.allowlist = [];
      merged.activity.prefs.allowlist = merged.activity.prefs.allowlist
        .map((x) => String(x || "").trim())
        .filter((x) => x);
      // Normalize area room shape.
      if (!merged.activity.prefs.areaRoom || typeof merged.activity.prefs.areaRoom !== "object") {
        merged.activity.prefs.areaRoom = { code: "", joined: false, joinedAtMs: 0, leftAtMs: 0 };
      } else {
        merged.activity.prefs.areaRoom = {
          code: String(merged.activity.prefs.areaRoom.code || ""),
          joined: Boolean(merged.activity.prefs.areaRoom.joined),
          joinedAtMs: Number(merged.activity.prefs.areaRoom.joinedAtMs) || 0,
          leftAtMs: Number(merged.activity.prefs.areaRoom.leftAtMs) || 0
        };
      }
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
  let i18nLang = normalizeLang(state.activity && state.activity.prefs && state.activity.prefs.lang);

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
    work: {
      label: { en: "Work", "zh-Hant": "工作", ja: "仕事" },
      color: "#2a5b8a"
    },
    study: {
      label: { en: "Study", "zh-Hant": "學習", ja: "勉強" },
      color: "#0a7a52"
    },
    exercise: {
      label: { en: "Exercise", "zh-Hant": "運動", ja: "運動" },
      color: "#b4233a"
    },
    social: {
      label: { en: "Social", "zh-Hant": "社交", ja: "交流" },
      color: "#f1b83a"
    },
    travel: {
      label: { en: "Travel", "zh-Hant": "移動", ja: "移動" },
      color: "#ff6a00"
    },
    food: {
      label: { en: "Food", "zh-Hant": "飲食", ja: "食事" },
      color: "#7a5a2b"
    },
    rest: {
      label: { en: "Rest", "zh-Hant": "休息", ja: "休憩" },
      color: "#5a6a7a"
    }
  };

  const normalizeActivityType = (value) => {
    const key = String(value || "").trim().toLowerCase();
    return ACTIVITY_TYPES[key] ? key : "work";
  };

  const typeLabel = (type) => {
    const key = normalizeActivityType(type);
    const cfg = ACTIVITY_TYPES[key];
    if (!cfg) return "—";
    return (cfg.label && (cfg.label[i18nLang] || cfg.label.en)) || "—";
  };

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const VISIBILITY_MODES = ["everyone", "area", "connected"];

  const normalizeVisibilityMode = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return VISIBILITY_MODES.includes(v) ? v : "everyone";
  };

  const normalizeRoomCode = (value) => {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 36);
  };

  const normalizeContactHandle = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    let v = raw.startsWith("@") ? raw : `@${raw}`;
    v = v.replace(/\s+/g, "");
    v = v.slice(0, 32);
    return v.toLowerCase();
  };

  const normalizeActivityText = (value) => {
    return String(value || "").replace(/\s+/g, " ").trim();
  };

  const activityKeyFromText = (value) => {
    // Lowercase + strip ASCII punctuation so "coffee!" and "coffee" map together.
    const s = normalizeActivityText(value).toLowerCase();
    return s
      .replace(/[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const fnv1a32 = (str) => {
    // Deterministic string hash (FNV-1a 32-bit).
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  };

  const hslToRgb = (h, s, l) => {
    const hh = ((((Number(h) || 0) % 360) + 360) % 360) / 360;
    const ss = clamp((Number(s) || 0) / 100, 0, 1);
    const ll = clamp((Number(l) || 0) / 100, 0, 1);

    if (ss <= 0) {
      const v = ll * 255;
      return { r: v, g: v, b: v };
    }

    const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
    const p = 2 * ll - q;
    const hue2rgb = (pp, qq, tt) => {
      let t = tt;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return pp + (qq - pp) * 6 * t;
      if (t < 1 / 2) return qq;
      if (t < 2 / 3) return pp + (qq - pp) * (2 / 3 - t) * 6;
      return pp;
    };

    return {
      r: hue2rgb(p, q, hh + 1 / 3) * 255,
      g: hue2rgb(p, q, hh) * 255,
      b: hue2rgb(p, q, hh - 1 / 3) * 255
    };
  };

  const activityColorHex = (textOrKey) => {
    const key = activityKeyFromText(textOrKey);
    if (!key) return "#FF6A00";
    const h = fnv1a32(key);
    const hue = h % 360;
    const sat = 58 + ((h >>> 8) % 18); // 58–75
    const lig = 46 + ((h >>> 16) % 16); // 46–61
    const rgb = hslToRgb(hue, sat, lig);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  };

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
    const byActivity = new Map();

    for (const entry of state.activity.log) {
      if (!entry || !entry.endedAt || !entry.startedAt) continue;
      const text = normalizeActivityText(entry.text || "");
      const legacyType = entry.type ? normalizeActivityType(entry.type) : null;
      const fallbackLabel = text || (legacyType ? typeLabel(legacyType) : "");
      const key = activityKeyFromText(entry.key || text || fallbackLabel);
      if (!key) continue;

      const legacyColor = legacyType && ACTIVITY_TYPES[legacyType] ? ACTIVITY_TYPES[legacyType].color : null;
      const colorHex = String(entry.colorHex || entry.color || legacyColor || activityColorHex(key)).trim();

      const durMs = Math.max(0, entry.endedAt - entry.startedAt);
      if (durMs < 30_000) continue;
      const ageDays = Math.max(0, (now - entry.endedAt) / 86_400_000);
      const decay = Math.pow(0.5, ageDays / halfLifeDays);
      const weight = (durMs / 60_000) * decay; // minutes * decay
      if (weight <= 0) continue;

      const rgb = hexToRgb(colorHex);
      if (!rgb) continue;
      const r = srgbToLinear(rgb.r / 255);
      const g = srgbToLinear(rgb.g / 255);
      const b = srgbToLinear(rgb.b / 255);

      lr += r * weight;
      lg += g * weight;
      lb += b * weight;
      wSum += weight;

      const prev = byActivity.get(key) || {
        key,
        label: fallbackLabel || "—",
        colorHex,
        weight: 0,
        lastAt: 0
      };
      prev.weight += weight;
      if ((entry.endedAt || 0) >= prev.lastAt) {
        prev.label = fallbackLabel || prev.label;
        prev.lastAt = entry.endedAt || prev.lastAt;
      }
      prev.colorHex = colorHex;
      byActivity.set(key, prev);
    }

    if (wSum <= 0) {
      return { hex: "#FF6A00", byActivity: [] };
    }

    const rr = linearToSrgb(lr / wSum) * 255;
    const gg = linearToSrgb(lg / wSum) * 255;
    const bb = linearToSrgb(lb / wSum) * 255;
    const hex = rgbToHex(rr, gg, bb);

    const byActivityArr = Array.from(byActivity.values())
      .sort((a, b) => b.weight - a.weight)
      .map(({ key, label, colorHex, weight }) => ({ key, label, colorHex, weight }));
    return { hex, byActivity: byActivityArr };
  };

  const renderAuraComposition = (longTerm) => {
    if (!els.auraChart || !els.auraLegend) return;
    const svg = els.auraChart;
    const legend = els.auraLegend;

    const entries = Array.isArray(longTerm.byActivity) ? longTerm.byActivity.slice() : [];
    const total = entries.reduce((acc, e) => acc + (Number(e && e.weight) || 0), 0);

    // Clear existing nodes.
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    legend.replaceChildren();

    // SVG ring base.
    const NS = "http://www.w3.org/2000/svg";
    const cx = 60;
    const cy = 60;
    const r = 44;
    const strokeW = 12;
    const circ = 2 * Math.PI * r;

    const mkCircle = (attrs) => {
      const el = document.createElementNS(NS, "circle");
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
      return el;
    };

    const base = mkCircle({
      cx,
      cy,
      r,
      fill: "none",
      stroke: "rgba(32, 24, 18, 0.10)",
      "stroke-width": strokeW
    });
    svg.appendChild(base);

    if (total <= 0) {
      const li = document.createElement("li");
      li.className = "auraLegend__empty";
      li.textContent = t("aura_legend_empty");
      legend.appendChild(li);
      return;
    }

    // Keep the chart readable: show top 6 and bucket the rest into OTHER.
    const maxSlices = 6;
    const top = entries.slice(0, maxSlices);
    const rest = entries.slice(maxSlices);
    if (rest.length) {
      const otherW = rest.reduce((acc, e) => acc + (Number(e && e.weight) || 0), 0);
      top.push({
        key: "other",
        label: i18nLang === "zh-Hant" ? "其他" : i18nLang === "ja" ? "その他" : "Other",
        colorHex: "rgba(32, 24, 18, 0.28)",
        weight: otherW
      });
    }

    // Donut segments using stroke-dasharray.
    let offset = 0;
    for (const entry of top) {
      const w = Number(entry && entry.weight) || 0;
      if (w <= 0) continue;
      const frac = w / total;
      const len = Math.max(0, frac * circ);
      if (len < 1.2) continue;

      const seg = mkCircle({
        cx,
        cy,
        r,
        fill: "none",
        stroke: (entry && entry.colorHex) || "#FF6A00",
        "stroke-width": strokeW,
        "stroke-linecap": "butt",
        "stroke-dasharray": `${len} ${circ - len}`,
        "stroke-dashoffset": `${-offset}`,
        transform: `rotate(-90 ${cx} ${cy})`
      });
      svg.appendChild(seg);
      offset += len;
    }

    // Legend.
    for (const entry of top) {
      const w = Number(entry && entry.weight) || 0;
      if (w <= 0) continue;
      const pct = Math.round((w / total) * 100);
      if (pct <= 0) continue;

      const li = document.createElement("li");
      li.className = "auraLegend__item";

      const dot = document.createElement("span");
      dot.className = "auraLegend__dot";
      dot.style.background = (entry && entry.colorHex) || "#FF6A00";

      const name = document.createElement("span");
      name.className = "auraLegend__name";
      name.textContent = (entry && entry.label) || "—";

      const val = document.createElement("span");
      val.className = "auraLegend__val";
      val.textContent = `${pct}%`;

      li.appendChild(dot);
      li.appendChild(name);
      li.appendChild(val);
      legend.appendChild(li);
    }
  };

  const computeCurrentAura = (now) => {
    const longTerm = computeLongTermAura(now);
    const active = state.activity.active;
    if (!active) return { hex: longTerm.hex, longTerm };

    const activityHex = String(active.colorHex || activityColorHex(active.key || active.text)).trim();
    const elapsed = Math.max(0, now - active.startedAt);
    const t = clamp(elapsed / (30 * 60 * 1000), 0, 1);
    const w = clamp(0.25 + t * 0.35, 0.25, 0.6);
    return { hex: mixHex(longTerm.hex, activityHex, w), longTerm };
  };

  const setAuraUi = (now) => {
    const active = state.activity.active;
    const { hex, longTerm } = computeCurrentAura(now);

    if (els.auraPill) {
      els.auraPill.textContent = active
        ? t("aura_pill_active", {
            activity: normalizeActivityText(active.text || "").slice(0, 22) || "—"
          })
        : t("aura_pill_idle");
    }

    if (els.auraSwatch) {
      els.auraSwatch.style.background = `linear-gradient(135deg, ${hex}, ${mixHex(hex, "#FFFFFF", 0.35)})`;
      els.auraSwatch.style.borderColor = "rgba(32, 24, 18, 0.18)";
      els.auraSwatch.style.boxShadow = `0 10px 18px rgba(24, 16, 10, 0.10), 0 0 0 6px rgba(255, 106, 0, 0.08) inset`;
    }

    if (els.auraValue) {
      const entries = Array.isArray(longTerm.byActivity) ? longTerm.byActivity : [];
      const top = entries.slice(0, 2);
      if (top.length === 0) {
        els.auraValue.textContent = `${hex} • ${t("aura_no_history_short")}`;
      } else {
        const sum = top.reduce((acc, e) => acc + (Number(e && e.weight) || 0), 0) || 0;
        const parts = top.map((e) => {
          const w = Number(e && e.weight) || 0;
          const label = normalizeActivityText((e && e.label) || "—").slice(0, 18) || "—";
          const pct = sum > 0 ? Math.round((w / sum) * 100) : 0;
          return `${label} ${pct}%`;
        });
        els.auraValue.textContent = `${hex} • ${parts.join(" / ")}`;
      }
    }

    if (els.auraHex) {
      els.auraHex.textContent = longTerm.hex;
    }
    renderAuraComposition(longTerm);

    return hex;
  };

  const activityElapsedMs = (now) => {
    if (!state.activity.active) return 0;
    return Math.max(0, now - state.activity.active.startedAt);
  };

  const hasAuraLinger = (now) => {
    const until = Number(state.activity.prefs.lingerUntil) || 0;
    return until > now;
  };

  const shouldShowUserAura = (now) => {
    const active = state.activity.active;
    if (active) return Boolean(active.showAuraOnMap);
    return Boolean(state.activity.prefs.idleShowAuraOnMap) || hasAuraLinger(now);
  };

  const syncUserAuraOnMap = (now, auraHex) => {
    if (!mapApi) return;
    const enabled = shouldShowUserAura(now);
    mapApi.setUserAura({
      enabled,
      color: auraHex,
      visibilityMode: normalizeVisibilityMode(state.activity.prefs.visibilityMode)
    });
    if (!enabled && state.activity.prefs.lingerUntil) {
      state.activity.prefs.lingerUntil = 0;
      saveState();
    }
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
      els.activityHint.textContent = t("activity_hint_idle");
      document.title = "AuraNet";
      syncUserAuraOnMap(now, auraHex);
      if (!hasAuraLinger(now)) stopActivityTicker();
      return auraHex;
    }

    const elapsed = activityElapsedMs(now);
    els.activityTime.textContent = formatHhMmSs(elapsed);
    els.activityHint.textContent = t("activity_tracking", { text: active.text });
    document.title = `${formatHhMmSs(elapsed)} • ${normalizeActivityText(active.text || "").slice(0, 28) || "—"} • AuraNet`;
    syncUserAuraOnMap(now, auraHex);
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

    if (els.activityShowAura) {
      els.activityShowAura.checked = active
        ? Boolean(active.showAuraOnMap)
        : Boolean(state.activity.prefs.showAuraOnMap);
    }

    if (els.idleShowAura) {
      els.idleShowAura.checked = Boolean(state.activity.prefs.idleShowAuraOnMap);
    }

    const now = nowMs();
    if (active || hasAuraLinger(now)) ensureActivityTicker();
    else stopActivityTicker();
  };

  // --- Activity Assist (color + similar suggestions) ---

  let suggestIndex = -1;

  const setActivityColorPreview = (hex) => {
    if (!els.activityColorPreview) return;
    const el = els.activityColorPreview;
    if (!hex) {
      el.hidden = true;
      el.replaceChildren();
      return;
    }

    el.hidden = false;
    el.replaceChildren();

    const dot = document.createElement("span");
    dot.className = "activityColorPreview__dot";
    dot.style.background = String(hex);

    const label = document.createElement("span");
    label.textContent = t("activity_color_label");

    const code = document.createElement("span");
    code.className = "activityColorPreview__hex";
    code.textContent = String(hex).toUpperCase();

    el.appendChild(dot);
    el.appendChild(label);
    el.appendChild(code);
  };

  const setSuggestHidden = (hidden) => {
    if (!els.activitySuggest) return;
    els.activitySuggest.hidden = Boolean(hidden);
    if (hidden) {
      suggestIndex = -1;
      els.activitySuggest.replaceChildren();
    }
  };

  const bigramCounts = (s) => {
    const str = String(s || "");
    const map = new Map();
    for (let i = 0; i < str.length - 1; i++) {
      const bg = str.slice(i, i + 2);
      map.set(bg, (map.get(bg) || 0) + 1);
    }
    return map;
  };

  const diceCoefficient = (a, b) => {
    const aa = String(a || "");
    const bb = String(b || "");
    if (aa.length < 2 || bb.length < 2) return 0;
    const a2 = bigramCounts(aa);
    const b2 = bigramCounts(bb);
    let inter = 0;
    for (const [bg, ca] of a2.entries()) {
      const cb = b2.get(bg) || 0;
      inter += Math.min(ca, cb);
    }
    return (2 * inter) / ((aa.length - 1) + (bb.length - 1));
  };

  const similarityScore = (queryKey, candidateKey) => {
    const q = String(queryKey || "");
    const c = String(candidateKey || "");
    if (!q || !c) return 0;
    if (c === q) return 100;
    if (c.startsWith(q)) return 84;
    if (c.includes(q)) return 64;
    return Math.round(diceCoefficient(q, c) * 52);
  };

  const collectKnownActivities = () => {
    const seen = new Map();
    for (const entry of state.activity.log) {
      if (!entry || !entry.endedAt) continue;
      const text = normalizeActivityText(entry.text || "");
      const legacyType = entry.type ? normalizeActivityType(entry.type) : null;
      const fallbackLabel = text || (legacyType ? typeLabel(legacyType) : "");
      const key = activityKeyFromText(entry.key || text || fallbackLabel);
      if (!key) continue;

      const legacyColor = legacyType && ACTIVITY_TYPES[legacyType] ? ACTIVITY_TYPES[legacyType].color : null;
      const colorHex = String(entry.colorHex || entry.color || legacyColor || activityColorHex(key)).trim();

      const prev = seen.get(key) || {
        key,
        label: fallbackLabel || "—",
        colorHex,
        lastAt: 0,
        count: 0
      };
      prev.count += 1;
      if ((entry.endedAt || 0) >= prev.lastAt) {
        prev.label = fallbackLabel || prev.label;
        prev.lastAt = entry.endedAt || prev.lastAt;
      }
      prev.colorHex = colorHex;
      seen.set(key, prev);
    }
    return Array.from(seen.values()).sort((a, b) => b.lastAt - a.lastAt);
  };

  const renderSuggestList = (items) => {
    if (!els.activitySuggest) return;
    els.activitySuggest.replaceChildren();
    suggestIndex = -1;

    if (!items.length) {
      setSuggestHidden(true);
      return;
    }

    setSuggestHidden(false);

    for (const item of items) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "activitySuggest__btn";
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", "false");

      const dot = document.createElement("span");
      dot.className = "activitySuggest__dot";
      dot.style.background = item.colorHex;

      const text = document.createElement("span");
      text.className = "activitySuggest__text";
      text.textContent = item.label;

      const hex = document.createElement("span");
      hex.className = "activitySuggest__hex";
      hex.textContent = item.colorHex.toUpperCase();

      btn.appendChild(dot);
      btn.appendChild(text);
      btn.appendChild(hex);

      btn.addEventListener("click", () => {
        if (!els.activityText) return;
        els.activityText.value = item.label;
        setSuggestHidden(true);
        renderActivityAssist();
        els.activityText.focus();
      });

      els.activitySuggest.appendChild(btn);
    }
  };

  const syncSuggestSelection = () => {
    if (!els.activitySuggest || els.activitySuggest.hidden) return;
    const buttons = Array.from(els.activitySuggest.querySelectorAll("button.activitySuggest__btn"));
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-selected", i === suggestIndex ? "true" : "false");
    }
  };

  const renderActivityAssist = () => {
    if (!els.activityText) return;
    const active = state.activity.active;

    if (active) {
      setSuggestHidden(true);
      setActivityColorPreview(active.colorHex || activityColorHex(active.key || active.text));
      return;
    }

    const draft = normalizeActivityText(els.activityText.value);
    const draftKey = activityKeyFromText(draft);

    if (!draftKey) {
      setActivityColorPreview(null);
      setSuggestHidden(true);
      return;
    }

    setActivityColorPreview(activityColorHex(draftKey));

    const known = collectKnownActivities();
    const scored = known
      .map((a) => ({
        ...a,
        score: similarityScore(draftKey, a.key)
      }))
      .filter((a) => a.score >= 22 && a.key !== draftKey)
      .sort((a, b) => b.score - a.score || b.lastAt - a.lastAt)
      .slice(0, 5)
      .map(({ key, label, colorHex }) => ({ key, label, colorHex }));

    renderSuggestList(scored);
  };

  // --- Visibility (Everyone / Area / Approved) ---

  const setSegSelected = (value) => {
    if (!els.visibilitySeg) return;
    const mode = normalizeVisibilityMode(value);
    for (const btn of Array.from(els.visibilitySeg.querySelectorAll("button[data-vis]"))) {
      const v = btn.getAttribute("data-vis");
      btn.setAttribute("aria-selected", v === mode ? "true" : "false");
    }
  };

  const renderApprovedList = () => {
    if (!els.approvedList) return;
    els.approvedList.replaceChildren();

    const items = Array.isArray(state.activity.prefs.allowlist) ? state.activity.prefs.allowlist.slice() : [];
    if (!items.length) {
      const li = document.createElement("li");
      li.className = "approvedEmpty";
      li.textContent = t("approved_empty");
      els.approvedList.appendChild(li);
      return;
    }

    for (const handle of items) {
      const li = document.createElement("li");
      li.className = "approvedItem";

      const dot = document.createElement("span");
      dot.className = "approvedDot";
      dot.style.background = activityColorHex(handle);

      const name = document.createElement("span");
      name.className = "approvedName";
      name.textContent = handle;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "iconBtn danger";
      remove.textContent = t("approved_remove").toUpperCase();
      remove.addEventListener("click", () => {
        state.activity.prefs.allowlist = state.activity.prefs.allowlist.filter((x) => x !== handle);
        saveState();
        renderVisibility();
        toast(t("toast_contact_removed"));
      });

      li.appendChild(dot);
      li.appendChild(name);
      li.appendChild(remove);
      els.approvedList.appendChild(li);
    }
  };

  const renderVisibility = () => {
    const mode = normalizeVisibilityMode(state.activity.prefs.visibilityMode);
    setSegSelected(mode);

    if (els.visRoom) els.visRoom.hidden = mode !== "area";
    if (els.visApproved) els.visApproved.hidden = mode !== "connected";

    if (els.visRoomCode) {
      els.visRoomCode.value = normalizeRoomCode(state.activity.prefs.areaRoom && state.activity.prefs.areaRoom.code);
    }
    const joined = Boolean(state.activity.prefs.areaRoom && state.activity.prefs.areaRoom.joined);

    if (els.visRoomJoin) els.visRoomJoin.hidden = joined;
    if (els.visRoomLeave) els.visRoomLeave.hidden = !joined;
    if (els.visRoomState) {
      els.visRoomState.textContent = joined ? t("area_room_state_on") : t("area_room_state_off");
      els.visRoomState.classList.toggle("badge--ok", joined);
      els.visRoomState.classList.toggle("badge--warn", !joined);
    }

    renderApprovedList();
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
      li.textContent = t("activity_list_empty");
      els.activityList.appendChild(li);
      return;
    }

    for (const entry of items) {
      if (!entry || !entry.endedAt || !entry.startedAt) continue;
      const text = normalizeActivityText(entry.text || "");
      const legacyType = entry.type ? normalizeActivityType(entry.type) : null;
      const fallbackLabel = text || (legacyType ? typeLabel(legacyType) : "—");
      const key = activityKeyFromText(entry.key || text || fallbackLabel);
      const legacyColor = legacyType && ACTIVITY_TYPES[legacyType] ? ACTIVITY_TYPES[legacyType].color : null;
      const colorHex = String(entry.colorHex || entry.color || legacyColor || activityColorHex(key)).trim();
      const dur = Math.max(0, (entry.endedAt || 0) - (entry.startedAt || 0));

      const li = document.createElement("li");
      li.className = "activityItem";

      const left = document.createElement("div");
      left.className = "activityItem__main";

      const title = document.createElement("div");
      title.className = "activityItem__title";
      title.textContent = fallbackLabel;

      const meta = document.createElement("div");
      meta.className = "activityItem__meta";
      const when = `${fmtHm(entry.startedAt)}–${fmtHm(entry.endedAt)} • ${fmtShortDuration(dur)}`;
      meta.textContent = when;

      left.appendChild(title);
      left.appendChild(meta);

      const right = document.createElement("div");
      right.className = "activityItem__right";

      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = colorHex.toUpperCase();
      badge.style.borderColor = "rgba(32, 24, 18, 0.16)";
      badge.style.background = "rgba(255, 255, 255, 0.6)";
      badge.style.boxShadow = `0 0 0 2px ${mixHex(colorHex, "#FFFFFF", 0.72)} inset`;
      right.appendChild(badge);

      li.appendChild(left);
      li.appendChild(right);
      els.activityList.appendChild(li);
    }
  };

  const startActivity = () => {
    if (state.activity.active) return;
    if (!els.activityText) return;
    if (els.activityForm && typeof els.activityForm.reportValidity === "function") {
      if (!els.activityForm.reportValidity()) return;
    }

    const text = normalizeActivityText(els.activityText.value);
    if (!text) {
      toast(t("toast_activity_empty"));
      els.activityText.focus();
      return;
    }

    const showAuraOnMap = Boolean(els.activityShowAura && els.activityShowAura.checked);
    const key = activityKeyFromText(text);
    const colorHex = activityColorHex(key);

    state.activity.prefs.showAuraOnMap = showAuraOnMap;

    state.activity.active = {
      id: uid(),
      text,
      key,
      colorHex,
      startedAt: nowMs(),
      showAuraOnMap
    };

    saveState();
    renderActivity(true);
    toast(t("toast_activity_started"));
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
        key: active.key || activityKeyFromText(active.text),
        colorHex: active.colorHex || activityColorHex(active.key || active.text),
        startedAt: active.startedAt,
        endedAt
      });
    }

    // Privacy + UX: keep aura visible briefly after logging so the color change is noticeable.
    if (active.showAuraOnMap && !state.activity.prefs.idleShowAuraOnMap) {
      state.activity.prefs.lingerUntil = endedAt + 12_000;
    } else {
      state.activity.prefs.lingerUntil = 0;
    }

    saveState();
    renderActivity(true);
    toast(durationMs >= 30_000 ? t("toast_activity_logged") : t("toast_activity_too_short"));
  };

  const clearActivityLog = () => {
    if (!window.confirm(t("confirm_clear_log"))) return;
    state.activity.active = null;
    state.activity.log = [];
    state.activity.prefs.lingerUntil = 0;
    saveState();
    renderActivity(true);
    toast(t("toast_activity_cleared"));
  };

  const renderActivity = (full = false) => {
    const active = state.activity.active;

    if (els.activityText && active) els.activityText.value = active.text;

    syncActivityControls();
    renderActivityAssist();
    renderVisibility();
    const auraHex = renderActivityTimeOnly();
    syncUserAuraOnMap(nowMs(), auraHex);

    if (full) renderActivityList();
  };

  // --- Render ---

  const render = () => {
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
      setMapStatus(t("map_lib_failed"), true);
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
    let userAuraLayers = [];
    let userAuraEnabled = false;
    let userAuraColor = "#FF6A00";
    let userWatchId = null;
    let lastUserLatLng = null;
    let lastUserLatLngRaw = null;
    let lastUserLatLngBlurred = null;
    let lastUserAccuracyM = null;
    let selfPreciseMode = false;
    let userVisibilityMode = normalizeVisibilityMode(state.activity.prefs.visibilityMode);
    const PRIVACY_GRID_BY_MODE_M = {
      everyone: 5000,
      area: 1200,
      connected: 250
    };
    // Privacy: blur the true GPS coordinate so the aura doesn't pinpoint you.
    const userPrivacy = {
      // Quantize to a grid based on visibility mode.
      gridM: PRIVACY_GRID_BY_MODE_M[userVisibilityMode] || 250,
      // Per-session extra offset (kept stable while the page is open).
      offsetEastM: (Math.random() - 0.5) * 260,
      offsetNorthM: (Math.random() - 0.5) * 260
    };
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

    const setVisBadge = (mode, kind = "off") => {
      if (!els.mapVis) return;
      const m = normalizeVisibilityMode(mode);
      const label =
        m === "area"
          ? t("visibility_area")
          : m === "connected"
            ? t("visibility_connected")
            : t("visibility_everyone");
      els.mapVis.textContent = `${t("map_vis_prefix")}: ${label}`;
      els.mapVis.classList.toggle("badge--ok", kind === "ok");
      els.mapVis.classList.toggle("badge--warn", kind === "warn");
    };

    const layersForBounds = () => {
      const layers = [];
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
      for (const l of userAuraLayers) l.remove();
      userAuraLayers = [];
    };

    const applyUserAuraStyle = () => {
      if (!userAuraLayers.length) return;
      // No center dot: layered haze only.
      const opacities = [0.06, 0.09, 0.12];
      for (let i = 0; i < userAuraLayers.length; i++) {
        userAuraLayers[i].setStyle({
          fillColor: userAuraColor,
          fillOpacity: opacities[i] || 0.08
        });
      }
    };

    const ensureUserAuraLayers = (latLng) => {
      if (!latLng) return;
      if (userAuraLayers.length === 0) {
        userAuraLayers = [
          createAuraLayer(latLng, userAuraColor, 70, 0.06),
          createAuraLayer(latLng, userAuraColor, 52, 0.09),
          createAuraLayer(latLng, userAuraColor, 36, 0.12)
        ];

        const onClick = (e) => {
          const llClick = e && e.latlng ? e.latlng : latLng;
          const longTerm = computeLongTermAura(nowMs());
          const parts = Array.isArray(longTerm.byActivity) ? longTerm.byActivity.slice(0, 6) : [];
          const total = parts.reduce((acc, it) => acc + (Number(it && it.weight) || 0), 0) || 0;

          const rows = total
            ? parts
                .map((it) => {
                  const color = (it && it.colorHex) || "#FF6A00";
                  const name = escapeHtml(normalizeActivityText((it && it.label) || "—"));
                  const pct = Math.round(((Number(it && it.weight) || 0) / total) * 100);
                  return `<div class="auraPop__row"><span class="auraPop__dot" style="background:${color}"></span><span class="auraPop__name">${name}</span><span class="auraPop__val">${pct}%</span></div>`;
                })
                .join("")
            : `<div class="auraPop__empty">${escapeHtml(t("aura_no_history_short"))}</div>`;

          const html = `<div class="auraPop"><div class="auraPop__title">${escapeHtml(
            t("popup_aura_components")
          )}</div><div class="auraPop__sub">${escapeHtml(t("popup_you"))}</div><div class="auraPop__hex">${escapeHtml(
            longTerm.hex
          )}</div>${rows}</div>`;

          L.popup({ closeButton: true, autoPan: true, offset: [0, -6] })
            .setLatLng(llClick)
            .setContent(html)
            .openOn(map);
        };

        for (const l of userAuraLayers) l.on("click", onClick);
      }
      applyUserAuraStyle();
    };

    const offsetLatLngMeters = (latLng, eastM, northM) => {
      const latRad = (latLng.lat * Math.PI) / 180;
      const mPerDegLat = 111_320;
      const mPerDegLng = Math.max(1, mPerDegLat * Math.cos(latRad));
      const dLat = northM / mPerDegLat;
      const dLng = eastM / mPerDegLng;
      return L.latLng(clamp(latLng.lat + dLat, -85, 85), wrapLng(latLng.lng + dLng));
    };

    const quantizeLatLng = (latLng, gridM) => {
      const latRad = (latLng.lat * Math.PI) / 180;
      const mPerDegLat = 111_320;
      const mPerDegLng = Math.max(1, mPerDegLat * Math.cos(latRad));
      const dLat = gridM / mPerDegLat;
      const dLng = gridM / mPerDegLng;
      const qLat = Math.round(latLng.lat / dLat) * dLat;
      const qLng = Math.round(latLng.lng / dLng) * dLng;
      return L.latLng(clamp(qLat, -85, 85), wrapLng(qLng));
    };

    const blurUserLatLng = (latLng) => {
      const q = quantizeLatLng(latLng, userPrivacy.gridM);
      return offsetLatLngMeters(q, userPrivacy.offsetEastM, userPrivacy.offsetNorthM);
    };

    const setUserVisibilityMode = (mode) => {
      const next = normalizeVisibilityMode(mode);
      if (next === userVisibilityMode) {
        setVisBadge(userVisibilityMode, "ok");
        return;
      }
      userVisibilityMode = next;
      userPrivacy.gridM = PRIVACY_GRID_BY_MODE_M[userVisibilityMode] || userPrivacy.gridM;
      setVisBadge(userVisibilityMode, "ok");

      if (lastUserLatLngRaw) {
        lastUserLatLngBlurred = blurUserLatLng(lastUserLatLngRaw);
        if (!selfPreciseMode) {
          lastUserLatLng = lastUserLatLngBlurred;
          if (userAuraEnabled) {
            ensureUserAuraLayers(lastUserLatLng);
            for (const l of userAuraLayers) l.setLatLng(lastUserLatLng);
          }
        }
      }
    };

    const setUserLatLng = (lat, lng, accuracyM, { ensureRing = false } = {}) => {
      lastUserLatLngRaw = L.latLng(clamp(lat, -85, 85), wrapLng(lng));
      lastUserLatLngBlurred = blurUserLatLng(lastUserLatLngRaw);
      lastUserLatLng = selfPreciseMode ? lastUserLatLngRaw : lastUserLatLngBlurred;
      lastUserAccuracyM = Number.isFinite(Number(accuracyM)) ? Number(accuracyM) : lastUserAccuracyM;

      if (userAuraEnabled) {
        ensureUserAuraLayers(lastUserLatLng);
        for (const l of userAuraLayers) l.setLatLng(lastUserLatLng);
      }

      // Privacy: do not render an accuracy ring.
      if (myAccuracyRing) {
        myAccuracyRing.remove();
        myAccuracyRing = null;
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
        setGpsBadge(t("map_gps_unsupported"), "warn");
        toast(t("gps_unsupported"));
        return;
      }

      setGpsBadge(t("map_gps_request"), "off");
      userWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = Number(pos.coords.accuracy) || 0;
          setUserLatLng(lat, lng, accuracy, { ensureRing: false });
          setGpsBadge(t("map_gps_on"), "ok");
        },
        (err) => {
          const code = err && typeof err.code === "number" ? err.code : 0;
          let msg = t("gps_error");
          if (code === 1) msg = t("gps_denied");
          if (code === 2) msg = t("gps_unavailable");
          if (code === 3) msg = t("gps_timeout");
          setGpsBadge(t("map_gps_off"), "warn");
          setMapStatus(msg, true);
          stopUserWatch();
        },
        {
          enableHighAccuracy: true,
          timeout: 10_000,
          maximumAge: 20_000
        }
      );
    };

    const mixWeightedHex = (mix) => {
      let wSum = 0;
      let lr = 0;
      let lg = 0;
      let lb = 0;
      for (const [type, wRaw] of Object.entries(mix || {})) {
        const w = Number(wRaw) || 0;
        if (w <= 0) continue;
        const cfg = ACTIVITY_TYPES[type];
        if (!cfg) continue;
        const rgb = hexToRgb(cfg.color);
        if (!rgb) continue;
        lr += srgbToLinear(rgb.r / 255) * w;
        lg += srgbToLinear(rgb.g / 255) * w;
        lb += srgbToLinear(rgb.b / 255) * w;
        wSum += w;
      }
      if (wSum <= 0) return "#FF6A00";
      return rgbToHex(
        linearToSrgb(lr / wSum) * 255,
        linearToSrgb(lg / wSum) * 255,
        linearToSrgb(lb / wSum) * 255
      );
    };

    const normalizeMixPct = (mix) => {
      const entries = Object.entries(mix || {}).map(([k, v]) => [k, Number(v) || 0]);
      const total = entries.reduce((acc, [, w]) => acc + w, 0);
      if (total <= 0) return [];
      return entries
        .filter(([, w]) => w > 0)
        .map(([k, w]) => [k, (w / total) * 100])
        .sort((a, b) => b[1] - a[1]);
    };

    const agentInitMix = (persona) => {
      const mix = {
        work: randBetween(0.06, 0.24),
        study: randBetween(0.02, 0.18),
        exercise: randBetween(0.04, 0.22),
        social: randBetween(0.03, 0.22),
        travel: randBetween(0.06, 0.32),
        food: randBetween(0.02, 0.18),
        rest: randBetween(0.04, 0.22)
      };

      if (persona.profile === "walking") {
        mix.exercise += randBetween(0.35, 0.85);
        mix.travel += randBetween(0.05, 0.18);
      } else {
        mix.travel += randBetween(0.55, 1.2);
        mix.work += randBetween(0.05, 0.16);
      }

      return mix;
    };

    const agentComponentKey = (agent) => {
      if (agent.state === "moving") {
        return agent.persona.profile === "walking" ? "exercise" : "travel";
      }
      if (agent.stopType === "eat") return "food";
      if (agent.stopType === "transit") return "travel";
      return "rest";
    };

    const updateAgentMix = (agent, dtSec) => {
      // Short memory so components feel "recent".
      const halfLifeSec = 15 * 60;
      const decay = Math.pow(0.5, dtSec / halfLifeSec);
      for (const k of Object.keys(ACTIVITY_TYPES)) {
        agent.mix[k] = (agent.mix[k] || 0) * decay;
      }
      const key = agentComponentKey(agent);
      agent.mix[key] = (agent.mix[key] || 0) + dtSec;

      const hex = mixWeightedHex(agent.mix);
      if (hex !== agent.auraHex) {
        agent.auraHex = hex;
        agent.needsStyle = true;
      }
    };

    const agentPopupHtml = (agent) => {
      const parts = normalizeMixPct(agent.mix).slice(0, 6);
      const title = t("popup_aura_components");
      const who = t("popup_simulated_person");
      const rows = parts.length
        ? parts
            .map(([type, pct]) => {
              const cfg = ACTIVITY_TYPES[type];
              const color = (cfg && cfg.color) || "#FF6A00";
              const name = escapeHtml(typeLabel(type));
              const p = Math.round(pct);
              return `<div class="auraPop__row"><span class="auraPop__dot" style="background:${color}"></span><span class="auraPop__name">${name}</span><span class="auraPop__val">${p}%</span></div>`;
            })
            .join("")
        : "";
      const empty = `<div class="auraPop__empty">${escapeHtml(t("aura_no_history_short"))}</div>`;

      return `<div class="auraPop"><div class="auraPop__title">${escapeHtml(title)}</div><div class="auraPop__sub">${escapeHtml(who)}</div><div class="auraPop__hex">${escapeHtml(agent.auraHex || "#FF6A00")}</div>${rows || empty}</div>`;
    };

    const openAgentPopup = (agent, latLng) => {
      const html = agentPopupHtml(agent);
      L.popup({ closeButton: true, autoPan: true, offset: [0, -6] })
        .setLatLng(latLng)
        .setContent(html)
        .openOn(map);
    };

    const applyAgentStyle = (agent) => {
      let fill = agent.auraHex || agent.persona.fill;
      let outerRadius = agent.baseOuterRadius;
      let innerRadius = agent.baseInnerRadius;
      let outerOpacity = 0.16;
      let innerOpacity = 0.22;

      if (agent.state === "stopped") {
        outerOpacity = 0.24;
        innerOpacity = 0.32;
        if (agent.stopType === "eat") {
          fill = mixHex(fill, ACTIVITY_TYPES.food.color, 0.6);
          outerRadius = agent.baseOuterRadius + 5;
          innerRadius = agent.baseInnerRadius + 2.2;
        } else if (agent.stopType === "transit") {
          fill = mixHex(fill, ACTIVITY_TYPES.travel.color, 0.55);
          outerRadius = agent.baseOuterRadius + 2.8;
          innerRadius = agent.baseInnerRadius + 1.4;
        } else {
          fill = mixHex(fill, ACTIVITY_TYPES.rest.color, 0.55);
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
        mix: agentInitMix(persona),
        auraHex: "#FF6A00",
        needsStyle: true,
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
      agent.auraHex = mixWeightedHex(agent.mix);
      applyAgentStyle(agent);

      const onClick = (e) => {
        const llClick = e && e.latlng ? e.latlng : agent.outer.getLatLng();
        openAgentPopup(agent, llClick);
      };
      outer.on("click", onClick);
      inner.on("click", onClick);
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
        updateAgentMix(agent, dtSec);
        if (agent.state === "stopped") {
          if (now < agent.stopUntil) {
            if (agent.needsStyle) {
              agent.needsStyle = false;
              applyAgentStyle(agent);
            }
            continue;
          }
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

        if (agent.needsStyle) {
          agent.needsStyle = false;
          applyAgentStyle(agent);
        }
      }

      sim.rafId = window.requestAnimationFrame(tickAgents);
    };

    const setSimUi = () => {
      if (!sim.enabled) {
        setAuraBadge(t("map_auras_off"), "off");
        return;
      }

      if (map.getZoom() < STREET_MIN_ZOOM) {
        setAuraBadge(t("map_auras_zoom", { z: STREET_MIN_ZOOM }), "warn");
        return;
      }

      if (sim.loading) {
        setAuraBadge(t("map_auras_loading"), "off");
        return;
      }

      setAuraBadge(t("map_auras_count", { n: sim.agents.length }), sim.agents.length ? "ok" : "off");
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
      setMapStatus(t("map_status_fetching"));

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
        setMapStatus(t("map_status_running"));

        if (!sim.rafId) {
          sim.lastTickAt = simNow();
          sim.rafId = window.requestAnimationFrame(tickAgents);
        }
      } catch (err) {
        if (buildId !== sim.buildId) return;
        if (err && err.name !== "AbortError") console.error(err);
        sim.loading = false;
        setMapStatus(t("map_status_sim_failed"), true);
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
        setMapStatus(t("map_status_zoom_to", { z: STREET_MIN_ZOOM }));
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
        setGpsBadge(t("map_gps_unsupported"), "warn");
        setMapStatus(t("gps_unsupported"), true);
        toast(t("gps_unsupported"));
        return;
      }

      els.mapLocate.disabled = true;
      setGpsBadge(t("map_gps_request"), "off");
      setMapStatus(t("map_status_requesting_gps"));

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = Number(pos.coords.accuracy) || 0;

          selfPreciseMode = true;
          setUserLatLng(lat, lng, accuracy, { ensureRing: false });
          map.flyTo([clamp(lat, -85, 85), wrapLng(lng)], Math.max(map.getZoom(), 16), {
            duration: 0.8
          });

          setGpsBadge(t("map_gps_on"), "ok");
          setMapStatus(t("map_status_gps_private"));
          toast(t("gps_ready"));

          window.requestAnimationFrame(() => map.invalidateSize());
          els.mapLocate.disabled = false;
        },
        (err) => {
          const code = err && typeof err.code === "number" ? err.code : 0;
          let msg = t("gps_error");
          if (code === 1) msg = t("gps_denied");
          if (code === 2) msg = t("gps_unavailable");
          if (code === 3) msg = t("gps_timeout");

          setGpsBadge(t("map_gps_off"), "warn");
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

    setGpsBadge(t("map_gps_off"), "off");
    setMapStatus(t("map_status_ready"));
    setVisBadge(userVisibilityMode, "ok");
    // Simulation is always enabled by default.
    startSim();

    const api = {
      setUserAura: ({ enabled, color, visibilityMode } = {}) => {
        if (typeof visibilityMode === "string" && visibilityMode.trim()) {
          setUserVisibilityMode(visibilityMode);
        }
        if (typeof color === "string" && String(color).trim()) {
          userAuraColor = String(color).trim();
          applyUserAuraStyle();
        }

        const want = Boolean(enabled);
        if (!want) {
          userAuraEnabled = false;
          stopUserWatch();
          removeUserAuraLayers();
          setGpsBadge(t("map_gps_off"), "off");
          return;
        }

        userAuraEnabled = true;
        if (lastUserLatLng) {
          ensureUserAuraLayers(lastUserLatLng);
          for (const l of userAuraLayers) l.setLatLng(lastUserLatLng);
        }
        startUserWatch();
      },
      refreshI18n: () => {
        setSimUi();
        setVisBadge(userVisibilityMode, "ok");
        if (!navigator.geolocation) {
          setGpsBadge(t("map_gps_unsupported"), "warn");
        } else if (userWatchId !== null) {
          setGpsBadge(t("map_gps_on"), "ok");
        } else {
          setGpsBadge(t("map_gps_off"), "off");
        }
      }
    };

    return api;
  };

  // --- Events ---

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

  if (els.activityText) {
    const onDraftChange = () => {
      if (state.activity.active) return;
      renderActivityAssist();
    };

    els.activityText.addEventListener("input", onDraftChange);
    els.activityText.addEventListener("focus", onDraftChange);

    els.activityText.addEventListener("keydown", (e) => {
      if (!els.activitySuggest || els.activitySuggest.hidden) return;
      const buttons = Array.from(els.activitySuggest.querySelectorAll("button.activitySuggest__btn"));
      if (!buttons.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        suggestIndex = suggestIndex < 0 ? 0 : Math.min(buttons.length - 1, suggestIndex + 1);
        syncSuggestSelection();
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        suggestIndex = suggestIndex <= 0 ? -1 : suggestIndex - 1;
        syncSuggestSelection();
        return;
      }

      if (e.key === "Enter" && suggestIndex >= 0) {
        e.preventDefault();
        buttons[suggestIndex].click();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setSuggestHidden(true);
      }
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

  if (els.idleShowAura) {
    els.idleShowAura.addEventListener("change", () => {
      state.activity.prefs.idleShowAuraOnMap = Boolean(els.idleShowAura.checked);
      saveState();
      renderActivity(false);
    });
  }

  if (els.visibilitySeg) {
    els.visibilitySeg.addEventListener("click", (e) => {
      const btn = e && e.target ? e.target.closest("button[data-vis]") : null;
      if (!btn) return;
      const mode = normalizeVisibilityMode(btn.getAttribute("data-vis"));
      state.activity.prefs.visibilityMode = mode;
      saveState();
      renderActivity(false);
    });
  }

  if (els.visRoomCode) {
    els.visRoomCode.addEventListener("input", () => {
      const code = normalizeRoomCode(els.visRoomCode.value);
      state.activity.prefs.areaRoom.code = code;
      saveState();
      renderVisibility();
    });
  }

  if (els.visRoomJoin) {
    els.visRoomJoin.addEventListener("click", () => {
      const code = normalizeRoomCode((state.activity.prefs.areaRoom && state.activity.prefs.areaRoom.code) || "");
      if (!code) {
        toast(t("toast_room_code_empty"));
        return;
      }
      state.activity.prefs.areaRoom = {
        code,
        joined: true,
        joinedAtMs: nowMs(),
        leftAtMs: 0
      };
      saveState();
      renderActivity(false);
      toast(t("toast_room_joined"));
    });
  }

  if (els.visRoomLeave) {
    els.visRoomLeave.addEventListener("click", () => {
      const code = normalizeRoomCode((state.activity.prefs.areaRoom && state.activity.prefs.areaRoom.code) || "");
      state.activity.prefs.areaRoom = {
        code,
        joined: false,
        joinedAtMs: Number(state.activity.prefs.areaRoom && state.activity.prefs.areaRoom.joinedAtMs) || 0,
        leftAtMs: nowMs()
      };
      saveState();
      renderActivity(false);
      toast(t("toast_room_left"));
    });
  }

  const addApproved = () => {
    if (!els.approvedInput) return;
    const handle = normalizeContactHandle(els.approvedInput.value);
    if (!handle) return;
    if (state.activity.prefs.allowlist.includes(handle)) {
      toast(t("toast_contact_exists"));
      return;
    }
    state.activity.prefs.allowlist.unshift(handle);
    els.approvedInput.value = "";
    saveState();
    renderActivity(false);
    toast(t("toast_contact_added"));
  };

  if (els.approvedAdd) {
    els.approvedAdd.addEventListener("click", addApproved);
  }
  if (els.approvedInput) {
    els.approvedInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      addApproved();
    });
  }

  if (els.langSelect) {
    els.langSelect.addEventListener("change", () => {
      i18nLang = normalizeLang(els.langSelect.value);
      state.activity.prefs.lang = i18nLang;
      saveState();
      applyI18n();
      renderActivity(true);
      if (mapApi && typeof mapApi.refreshI18n === "function") mapApi.refreshI18n();
    });
  }

  mapApi = initPaperMap();
  applyI18n();
  renderClock();
  window.setInterval(renderClock, 10_000);
  render();
})();
