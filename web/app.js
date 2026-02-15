(() => {
  const STORAGE_KEY = "auranet:v2";
  const STORAGE_PROFILE_PREFIX = `${STORAGE_KEY}:profile:`;
  const GUEST_PROFILE_ID = "guest";

  const $ = (id) => document.getElementById(id);

  const els = {
    mainContent: $("mainContent"),
    storagePill: $("storagePill"),
    authPill: $("authPill"),
    authLogin: $("authLogin"),
    authLogout: $("authLogout"),
    netPill: $("netPill"),
    clock: $("clock"),
    sectionTabs: $("sectionTabs"),
    sectionTabActivity: $("sectionTabActivity"),
    sectionTabMap: $("sectionTabMap"),
    sectionTabMarket: $("sectionTabMarket"),
    quickActions: $("quickActions"),
    qaStartActivity: $("qaStartActivity"),
    qaLocateMap: $("qaLocateMap"),
    qaPostTask: $("qaPostTask"),
    qaPostService: $("qaPostService"),
    qaScheduleEvent: $("qaScheduleEvent"),
    mapSection: $("mapSection"),
    appInstallBtn: $("appInstallBtn"),
    dataExportBtn: $("dataExportBtn"),
    dataImportBtn: $("dataImportBtn"),
    dataImportInput: $("dataImportInput"),

    paperMap: $("paperMap"),
    mapStatus: $("mapStatus"),
    mapReset: $("mapReset"),
    mapLocate: $("mapLocate"),
    mapGps: $("mapGps"),
    mapVis: $("mapVis"),
    mapAuraCount: $("mapAuraCount"),
    mapLayerFilters: $("mapLayerFilters"),
    mapFilterPeople: $("mapFilterPeople"),
    mapFilterEvents: $("mapFilterEvents"),
    mapFilterServices: $("mapFilterServices"),
    mapHud: $("mapHud"),
    mapHudText: $("mapHudText"),
    mapHudCancel: $("mapHudCancel"),

    auraPill: $("auraPill"),
    activityForm: $("activityForm"),
    activityText: $("activityText"),
    onboardPanel: $("onboardPanel"),
    activitySuggest: $("activitySuggest"),
    activityColorPreview: $("activityColorPreview"),
    activityShowAura: $("activityShowAura"),
    idleShowAura: $("idleShowAura"),
    visibilitySeg: $("visibilitySeg"),
    visArea: $("visArea"),
    visRoom: $("visRoom"),
    visRoomCode: $("visRoomCode"),
    visRoomJoin: $("visRoomJoin"),
    visRoomLeave: $("visRoomLeave"),
    visRoomState: $("visRoomState"),
    visApproved: $("visApproved"),
    approvedInput: $("approvedInput"),
    approvedAdd: $("approvedAdd"),
    approvedList: $("approvedList"),
    blockedList: $("blockedList"),
    activityTime: $("activityTime"),
    activityHint: $("activityHint"),
    activityStart: $("activityStart"),
    activityStop: $("activityStop"),
    auraSwatch: $("auraSwatch"),
    auraValue: $("auraValue"),
    auraHex: $("auraHex"),
    auraChart: $("auraChart"),
    auraLegend: $("auraLegend"),
    activityList: $("activityList"),
    langSelect: $("langSelect"),
    toast: $("toast"),

    areaRadius: $("areaRadius"),
    areaRadiusValue: $("areaRadiusValue"),
    visAreaNote: $("visAreaNote"),

    taskFeePill: $("taskFeePill"),
    marketTabs: $("marketTabs"),
    tabTasks: $("tabTasks"),
    tabMarket: $("tabMarket"),
    tabEvents: $("tabEvents"),
    marketTabTasksCount: $("marketTabTasksCount"),
    marketTabMarketCount: $("marketTabMarketCount"),
    marketTabEventsCount: $("marketTabEventsCount"),
    dropTasksPost: $("dropTasksPost"),
    dropTasksList: $("dropTasksList"),
    taskListCount: $("taskListCount"),
    taskSearchInput: $("taskSearchInput"),
    taskStatusFilter: $("taskStatusFilter"),
    taskFilterClear: $("taskFilterClear"),
    taskFilterMeta: $("taskFilterMeta"),
    taskForm: $("taskForm"),
    taskText: $("taskText"),
    taskReward: $("taskReward"),
    taskPickStart: $("taskPickStart"),
    taskUseMyStart: $("taskUseMyStart"),
    taskPickDest: $("taskPickDest"),
    taskClearRoute: $("taskClearRoute"),
    taskStartMeta: $("taskStartMeta"),
    taskDestMeta: $("taskDestMeta"),
    taskTimeLimit: $("taskTimeLimit"),
    taskTimeLimitValue: $("taskTimeLimitValue"),
    taskDistanceLimit: $("taskDistanceLimit"),
    taskDistanceLimitValue: $("taskDistanceLimitValue"),
    taskList: $("taskList"),

    marketPill: $("marketPill"),
    dropMarketPost: $("dropMarketPost"),
    dropMarketList: $("dropMarketList"),
    marketListCount: $("marketListCount"),
    marketSearchInput: $("marketSearchInput"),
    marketKindFilter: $("marketKindFilter"),
    marketStatusFilter: $("marketStatusFilter"),
    marketFilterClear: $("marketFilterClear"),
    marketFilterMeta: $("marketFilterMeta"),
    marketForm: $("marketForm"),
    marketKind: $("marketKind"),
    marketText: $("marketText"),
    marketPrice: $("marketPrice"),
    marketPickLocation: $("marketPickLocation"),
    marketUseMyLocation: $("marketUseMyLocation"),
    marketClearLocation: $("marketClearLocation"),
    marketLocMeta: $("marketLocMeta"),
    marketTimeLimit: $("marketTimeLimit"),
    marketTimeLimitValue: $("marketTimeLimitValue"),
    marketDistanceLimit: $("marketDistanceLimit"),
    marketDistanceLimitValue: $("marketDistanceLimitValue"),
    marketList: $("marketList"),

    eventsPill: $("eventsPill"),
    dropEventsPost: $("dropEventsPost"),
    dropEventsList: $("dropEventsList"),
    eventsListCount: $("eventsListCount"),
    eventsSearchInput: $("eventsSearchInput"),
    eventsStateFilter: $("eventsStateFilter"),
    eventsFilterClear: $("eventsFilterClear"),
    eventsFilterMeta: $("eventsFilterMeta"),
    eventsForm: $("eventsForm"),
    eventsText: $("eventsText"),
    eventsPickLocation: $("eventsPickLocation"),
    eventsUseMyLocation: $("eventsUseMyLocation"),
    eventsClearLocation: $("eventsClearLocation"),
    eventsLocMeta: $("eventsLocMeta"),
    eventsStartsIn: $("eventsStartsIn"),
    eventsStartsInValue: $("eventsStartsInValue"),
    eventsDuration: $("eventsDuration"),
    eventsDurationValue: $("eventsDurationValue"),
    eventsList: $("eventsList"),

    roomModal: $("roomModal"),
    roomClose: $("roomClose"),
    roomTitle: $("roomTitle"),
    roomMeta: $("roomMeta"),
    roomControls: $("roomControls"),
    roomVisibility: $("roomVisibility"),
    roomBody: $("roomBody"),
    roomForm: $("roomForm"),
    roomMessage: $("roomMessage"),
    roomPhoto: $("roomPhoto"),
    roomPhotoBtn: $("roomPhotoBtn"),
    roomLocBtn: $("roomLocBtn"),
    roomSend: $("roomSend"),

    reviewModal: $("reviewModal"),
    reviewClose: $("reviewClose"),
    reviewMeta: $("reviewMeta"),
    reviewForm: $("reviewForm"),
    reviewStars: $("reviewStars"),
    reviewNote: $("reviewNote"),
    reviewSubmit: $("reviewSubmit"),
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

  const randomSubset = (items, count) => {
    const source = Array.isArray(items) ? items : [];
    const n = source.length;
    const k = clampInt(count, 0, n, 0);
    if (k <= 0 || n <= 0) return [];
    const pool = source.slice();
    for (let i = 0; i < k; i++) {
      const j = i + Math.floor(Math.random() * (n - i));
      const tmp = pool[i];
      pool[i] = pool[j];
      pool[j] = tmp;
    }
    return pool.slice(0, k);
  };

  const todayISO = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const dayISOFromMs = (ms) => {
    const d = new Date(ms);
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

  const MAX_ACTIVITY_LOG_ENTRIES = 900;
  const AURA_RECOMPUTE_MS = 30_000;
  const AURA_STRENGTH_RECOMPUTE_MS = 60_000;
  const SAVE_DEBOUNCE_MS = 220;

  // --- i18n ---

  const SUPPORTED_LANGS = ["en", "zh-Hant", "ja"];

  const normalizeLang = (value) => {
    const v = String(value || "").trim();
    return SUPPORTED_LANGS.includes(v) ? v : "en";
  };

  const normalizeMapLayerFilters = (value) => {
    const raw = value && typeof value === "object" ? value : {};
    return {
      people: raw.people !== false,
      events: raw.events !== false,
      services: raw.services !== false
    };
  };

  const normalizeFilterQuery = (value, maxLen = 72) =>
    String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, Math.max(0, clampInt(maxLen, 0, 400, 72)));

  const queryTokens = (value) =>
    normalizeFilterQuery(value, 72)
      .toLowerCase()
      .split(" ")
      .filter((x) => x)
      .slice(0, 8);

  const queryMatchesText = (tokens, value) => {
    if (!Array.isArray(tokens) || tokens.length <= 0) return true;
    const hay = String(value || "").toLowerCase();
    return tokens.every((token) => hay.includes(token));
  };

  const TASK_LIST_FILTER_STATUS = ["all", "open", "accepted", "completed", "closed"];
  const MARKET_LIST_FILTER_KIND = ["all", "product", "service"];
  const MARKET_LIST_FILTER_STATUS = ["all", "open", "sold", "closed"];
  const EVENTS_LIST_FILTER_STATE = ["all", "scheduled", "live", "ended", "cancelled"];

  const normalizeTaskListFilterStatus = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return TASK_LIST_FILTER_STATUS.includes(v) ? v : "all";
  };

  const normalizeMarketListFilterKind = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return MARKET_LIST_FILTER_KIND.includes(v) ? v : "all";
  };

  const normalizeMarketListFilterStatus = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return MARKET_LIST_FILTER_STATUS.includes(v) ? v : "all";
  };

  const normalizeEventsListFilterState = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return EVENTS_LIST_FILTER_STATE.includes(v) ? v : "all";
  };

  const defaultUiListFilters = () => ({
    tasks: { q: "", status: "all" },
    market: { q: "", kind: "all", status: "all" },
    events: { q: "", state: "all" }
  });

  const normalizeUiListFilters = (value) => {
    const raw = value && typeof value === "object" ? value : {};
    const out = defaultUiListFilters();
    const tasks = raw.tasks && typeof raw.tasks === "object" ? raw.tasks : {};
    const market = raw.market && typeof raw.market === "object" ? raw.market : {};
    const events = raw.events && typeof raw.events === "object" ? raw.events : {};

    out.tasks.q = normalizeFilterQuery(tasks.q, 72);
    out.tasks.status = normalizeTaskListFilterStatus(tasks.status);

    out.market.q = normalizeFilterQuery(market.q, 72);
    out.market.kind = normalizeMarketListFilterKind(market.kind);
    out.market.status = normalizeMarketListFilterStatus(market.status);

    out.events.q = normalizeFilterQuery(events.q, 72);
    out.events.state = normalizeEventsListFilterState(events.state);

    return out;
  };

  const I18N = {
    en: {
      ui_language: "Language",
      auth_not_configured: "Firebase login not configured",
      auth_signed_out: "Not signed in",
      auth_signed_in_as: "Signed in: {name}",
      auth_login_google: "Sign in with Google",
      auth_logout: "Sign out",
      skip_main: "Skip to main content",
      section_activity: "Activity Logger",
      section_map: "Live Map",
      section_marketplace: "Tasks & Market",
      quick_actions_label: "Quick actions",
      quick_start_activity: "Start activity",
      quick_locate_me: "Center map",
      quick_post_task: "Post task",
      quick_post_service: "Post service",
      quick_schedule_event: "Schedule event",
      net_online: "ONLINE",
      net_offline: "OFFLINE",
      install_app: "Install app",
      data_export: "Export data",
      data_import: "Import data",
      activity_title: "Activity Logger",
      activity_hint_idle: "Log what you’re doing. Each activity generates a unique color over time.",
      onboard_title: "Quick start",
      onboard_desc: "Core flow in less than a minute.",
      onboard_step_1: "Log an activity and let your aura blend automatically.",
      onboard_step_2: "Choose aura visibility: everyone, nearby area, or trusted contacts.",
      onboard_step_3: "Use map filters to focus on people, events, or services.",
      onboard_step_4: "Post tasks or services and manage responses in one place.",
      activity_tracking: "Tracking: {text}",
      activity_label: "Activity",
      activity_placeholder: "Work, commute, gym, coffee…",
      activity_color_label: "Color",
      activity_show_aura_toggle: "Show my aura on map while active",
      idle_show_aura_toggle: "Show my aura on map while idle",
      visibility_label: "Visibility",
      visibility_everyone: "Everyone",
      visibility_area: "Nearby radius",
      visibility_area_radius_label: "Visible area",
      visibility_area_badge: "Nearby ({m}m)",
      visibility_area_note: "Visible to people within {m} of you.",
      visibility_connected: "Trusted contacts",
      room_label: "Room",
      room_placeholder: "Room code",
      room_join: "Join",
      room_leave: "Leave",
      room_state_on: "ROOM: ON",
      room_state_off: "ROOM: OFF",
      area_room_label: "Event room",
      area_room_placeholder: "Room code",
      area_join: "Join",
      area_leave: "Leave",
      approved_label: "Approved contacts",
      approved_placeholder: "@handle",
      approved_add: "Add",
      approved_empty: "No approved contacts yet",
      approved_remove: "Remove",
      blocked_label: "Blocked contacts",
      blocked_empty: "No blocked contacts",
      blocked_remove: "Unblock",
      area_room_state_on: "ROOM: ON",
      area_room_state_off: "ROOM: OFF",
      toast_room_code_empty: "Room code can’t be empty.",
      toast_room_joined: "Joined room.",
      toast_room_left: "Left room.",
      toast_contact_added: "Approved contact added.",
      toast_contact_exists: "Already approved.",
      toast_contact_removed: "Approved contact removed.",
      toast_contact_blocked: "Blocked {handle}.",
      toast_contact_unblocked: "Unblocked {handle}.",
      toast_dm_saved: "Message saved for {handle}.",
      toast_dm_empty: "Message can’t be empty.",
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
      popup_action_message: "Message",
      popup_action_add_friend: "Add friend",
      popup_action_block: "Block",
      popup_message_prompt: "Message to {handle}",
      gps_unsupported: "Geolocation not supported.",
      gps_denied: "Location permission denied.",
      gps_unavailable: "Location unavailable.",
      gps_timeout: "Location request timed out.",
      gps_error: "Unable to get your location.",
      gps_ready: "GPS ready.",
      map_lib_failed: "Map library failed to load.",
      map_title: "Live Aura Map",
      map_loading: "Loading map…",
      map_locate: "My location",
      map_reset: "Reset view",
      map_filters_label: "Available on map",
      map_filter_people: "People",
      map_filter_events: "Event",
      map_filter_services: "Service",
      map_pick_cancel: "Cancel",
      map_pick_hud_start: "Tap map: start area",
      map_pick_hud_dest: "Tap map: destination area",
      map_pick_hud_market: "Tap map: market location",
      map_pick_hud_events: "Tap map: scheduled location",
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
      map_status_sim_failed: "Street simulation failed to load routes.",
      sim_doing_eating: "Eating",
      sim_doing_transit: "Transit",
      sim_doing_resting: "Resting",

      marketplace_title: "Marketplace",
      marketplace_sub: "Post tasks, listings, and scheduled activities.",
      tab_tasks: "Tasks",
      tab_market: "Market",
      tab_events: "Scheduled",
      drop_post_task: "Create task",
      drop_task_list: "Open tasks",
      drop_post_market: "Create listing",
      drop_market_list: "Open listings",
      drop_post_events: "Create schedule",
      drop_events_list: "Upcoming activities",
      filter_clear: "Clear",
      filter_results: "Showing {shown} / {total}",
      filter_results_none: "No matches. Adjust filters.",

      filter_search_tasks_label: "Search tasks",
      filter_task_search_placeholder: "Search tasks…",
      filter_task_status_label: "Task status",
      filter_task_status_all: "All status",
      filter_task_status_open: "Open",
      filter_task_status_accepted: "Accepted",
      filter_task_status_completed: "Completed",
      filter_task_status_closed: "Closed",

      filter_search_market_label: "Search listings",
      filter_market_search_placeholder: "Search listings…",
      filter_market_kind_label: "Listing type",
      filter_market_kind_all: "All types",
      filter_market_kind_product: "Product",
      filter_market_kind_service: "Service",
      filter_market_status_label: "Listing status",
      filter_market_status_all: "All status",
      filter_market_status_open: "Open",
      filter_market_status_sold: "Sold",
      filter_market_status_closed: "Closed",

      filter_search_events_label: "Search activities",
      filter_events_search_placeholder: "Search activities…",
      filter_events_state_label: "Activity state",
      filter_events_state_all: "All state",
      filter_events_state_scheduled: "Scheduled",
      filter_events_state_live: "Live",
      filter_events_state_ended: "Ended",
      filter_events_state_cancelled: "Cancelled",

      tasks_title: "Tasks",
      task_label: "Task",
      task_placeholder: "Pick up coffee, deliver package…",
      task_reward_label: "Reward (USD)",
      task_time_limit_label: "Time limit",
      task_distance_limit_label: "Distance limit",
      task_pick_start: "Pick start",
      task_pick_dest: "Pick destination",
      task_use_my_area: "Use my area",
      task_clear_route: "Clear",
      task_start_unset: "Start: not set",
      task_dest_unset: "Destination: not set",
      task_start_set: "Start: set",
      task_dest_set: "Destination: set",
      task_time_left: "{t} left",
      task_post: "Post task",
      task_list_empty: "No tasks yet.",
      task_status_open: "Open",
      task_status_accepted: "Accepted",
      task_status_completed: "Completed",
      task_status_expired: "Expired",
      task_status_cancelled: "Cancelled",
      task_apply: "Apply",
      task_assign: "Accept",
      task_finish: "Finish",
      task_cancel: "Cancel",
      task_offers_title: "Offers",
      task_offers_empty: "No offers yet.",
      task_applied: "Applied",
      task_room: "Room",
      task_verified: "Verified",
      task_not_verified: "Not verified",
      task_fee: "Fee",
      task_payout: "Payout",
      toast_task_posted: "Task posted.",
      toast_task_applied: "Applied.",
      toast_task_accepted: "Task accepted.",
      toast_task_completed: "Task completed.",
      toast_task_expired: "Task expired.",
      toast_task_not_verified: "Verified worker required.",
      toast_task_need_gps: "Enable GPS to accept tasks.",
      toast_task_too_far: "Too far for this task.",
      toast_task_pick_route: "Pick start and destination first.",
      toast_task_pick_on_map: "Click the map to pick a location.",
      toast_task_worker_unavailable: "Worker location unavailable. Zoom in or wait for street activity.",
      toast_task_poster_unavailable: "Task location unavailable. Tap My location first.",

      market_title: "Market",
      market_pill: "LOCAL",
      market_kind_product: "Product",
      market_kind_service: "Service",
      market_label: "Post",
      market_placeholder: "Sell a bike, offer tutoring…",
      market_price_label: "Price (USD)",
      market_pick_location: "Pick location",
      market_use_my_area: "Use my area",
      market_clear_location: "Clear",
      market_loc_unset: "Location: not set",
      market_loc_set: "Location: set",
      market_time_limit_label: "Time limit",
      market_distance_limit_label: "Distance limit",
      market_post: "Post",
      market_list_empty: "No market posts yet.",
      toast_market_posted: "Market post published.",
      toast_market_need_location: "Pick a location first.",

      events_title: "Scheduled",
      events_pill: "AURAS",
      events_label: "Activity",
      events_placeholder: "Group coffee, sketch walk…",
      events_pick_location: "Pick location",
      events_use_my_area: "Use my area",
      events_clear_location: "Clear",
      events_loc_unset: "Location: not set",
      events_loc_set: "Location: set",
      events_starts_in_label: "Starts in",
      events_duration_label: "Duration",
      events_post: "Schedule",
      events_list_empty: "No scheduled activities yet.",
      events_join: "Book",
      events_leave: "Leave",
      events_cancel: "Cancel",
      events_state_scheduled: "Scheduled",
      events_state_live: "Live",
      events_state_ended: "Ended",
      events_state_cancelled: "Cancelled",
      toast_events_posted: "Scheduled.",
      toast_events_need_location: "Pick a location first.",
      toast_events_joined: "Booked.",
      toast_events_left: "Left.",

      review_title: "Review",
      review_note_label: "Note",
      review_submit: "Submit",
      review_open: "Review",
      toast_review_pick_rating: "Select a rating.",
      toast_review_submitted: "Review submitted.",
      toast_review_already: "Already reviewed.",

      room_visibility_label: "Room visibility",
      room_vis_participants: "Participants",
      room_vis_public: "Public",

      room_title: "Task room",
      room_close: "Close",
      room_message_placeholder: "Message…",
      room_photo: "Photo",
      room_location: "Location",
      room_send: "Send",
      room_view_on_map: "View",
      toast_room_photo_too_large: "Photo too large. Try a smaller image.",
      toast_room_only_accepted: "Room is available only to accepted task participants.",
      toast_export_ready: "Backup exported.",
      toast_import_done: "Backup imported.",
      toast_import_invalid: "Invalid backup file.",
      toast_import_failed: "Could not import backup.",
      toast_app_installed: "App installed.",
      toast_pwa_unavailable: "Install prompt is not available right now.",
      toast_pwa_update_ready: "App update ready. Refresh to use the latest version.",
      toast_pwa_update_applied: "App updated.",
      toast_auth_signed_in: "Signed in with Google.",
      toast_auth_signed_out: "Signed out.",
      toast_auth_unavailable: "Firebase login is unavailable.",
      toast_auth_sign_in_failed: "Could not sign in with Google.",
      toast_auth_sign_out_failed: "Could not sign out."
    },
    "zh-Hant": {
      ui_language: "語言",
      auth_not_configured: "Firebase 登入尚未設定",
      auth_signed_out: "尚未登入",
      auth_signed_in_as: "已登入：{name}",
      auth_login_google: "使用 Google 登入",
      auth_logout: "登出",
      skip_main: "跳到主要內容",
      section_activity: "活動記錄",
      section_map: "即時地圖",
      section_marketplace: "任務與市集",
      quick_actions_label: "快捷操作",
      quick_start_activity: "開始活動",
      quick_locate_me: "地圖置中",
      quick_post_task: "發布任務",
      quick_post_service: "發布服務",
      quick_schedule_event: "建立排程",
      net_online: "連線中",
      net_offline: "離線",
      install_app: "安裝 App",
      data_export: "匯出資料",
      data_import: "匯入資料",
      activity_title: "活動紀錄",
      activity_hint_idle: "紀錄你正在做的事，每個活動都會生成獨特的顏色並隨時間混合。",
      onboard_title: "快速上手",
      onboard_desc: "不到一分鐘完成核心流程。",
      onboard_step_1: "記錄活動，氣場會自動長期混色。",
      onboard_step_2: "設定氣場可見性：所有人、附近範圍或信任聯絡人。",
      onboard_step_3: "使用地圖篩選，快速查看人物、活動與服務。",
      onboard_step_4: "發布任務或服務，並在同一區塊管理回應。",
      activity_tracking: "追蹤中：{text}",
      activity_label: "活動",
      activity_placeholder: "工作、通勤、健身、咖啡…",
      activity_color_label: "顏色",
      activity_show_aura_toggle: "活動進行中在地圖顯示我的氣場",
      idle_show_aura_toggle: "待機時也在地圖顯示我的氣場",
      visibility_label: "可見性",
      visibility_everyone: "所有人",
      visibility_area: "附近範圍",
      visibility_area_radius_label: "可見範圍",
      visibility_area_badge: "附近範圍（{m} 公尺）",
      visibility_area_note: "只有距離你 {m} 公尺內的人能看到你的氣場。",
      visibility_connected: "信任聯絡人",
      room_label: "房間",
      room_placeholder: "房間代碼",
      room_join: "加入",
      room_leave: "離開",
      room_state_on: "房間：開",
      room_state_off: "房間：關",
      area_room_label: "活動房間",
      area_room_placeholder: "房間代碼",
      area_join: "加入",
      area_leave: "離開",
      approved_label: "已核准聯絡人",
      approved_placeholder: "@帳號",
      approved_add: "新增",
      approved_empty: "尚無已核准聯絡人",
      approved_remove: "移除",
      blocked_label: "封鎖聯絡人",
      blocked_empty: "尚無封鎖聯絡人",
      blocked_remove: "解除封鎖",
      area_room_state_on: "房間：開",
      area_room_state_off: "房間：關",
      toast_room_code_empty: "房間代碼不能為空。",
      toast_room_joined: "已加入房間。",
      toast_room_left: "已離開房間。",
      toast_contact_added: "已新增核准聯絡人。",
      toast_contact_exists: "已在核准名單中。",
      toast_contact_removed: "已移除核准聯絡人。",
      toast_contact_blocked: "已封鎖 {handle}。",
      toast_contact_unblocked: "已解除封鎖 {handle}。",
      toast_dm_saved: "已儲存給 {handle} 的訊息。",
      toast_dm_empty: "訊息內容不能為空。",
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
      popup_action_message: "訊息",
      popup_action_add_friend: "加好友",
      popup_action_block: "封鎖",
      popup_message_prompt: "傳送訊息給 {handle}",
      gps_unsupported: "此瀏覽器不支援定位。",
      gps_denied: "定位權限被拒絕。",
      gps_unavailable: "無法取得定位。",
      gps_timeout: "定位請求逾時。",
      gps_error: "無法取得你的定位。",
      gps_ready: "定位已就緒。",
      map_lib_failed: "地圖套件載入失敗。",
      map_title: "即時氣場地圖",
      map_loading: "載入地圖中…",
      map_locate: "我的位置",
      map_reset: "重置視角",
      map_filters_label: "地圖顯示",
      map_filter_people: "人物",
      map_filter_events: "活動",
      map_filter_services: "服務",
      map_pick_cancel: "取消",
      map_pick_hud_start: "點選地圖：起點範圍",
      map_pick_hud_dest: "點選地圖：目的地範圍",
      map_pick_hud_market: "點選地圖：市集位置",
      map_pick_hud_events: "點選地圖：活動位置",
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
      map_status_sim_failed: "街道模擬載入路線失敗。",
      sim_doing_eating: "用餐中",
      sim_doing_transit: "移動中",
      sim_doing_resting: "休息中",

      marketplace_title: "市集",
      marketplace_sub: "發布任務、商品服務、以及排程活動。",
      tab_tasks: "任務",
      tab_market: "市集",
      tab_events: "排程",
      drop_post_task: "建立任務",
      drop_task_list: "公開任務",
      drop_post_market: "建立刊登",
      drop_market_list: "公開刊登",
      drop_post_events: "建立排程",
      drop_events_list: "即將開始",
      filter_clear: "清除",
      filter_results: "顯示 {shown} / {total}",
      filter_results_none: "沒有符合結果，請調整篩選。",

      filter_search_tasks_label: "搜尋任務",
      filter_task_search_placeholder: "搜尋任務…",
      filter_task_status_label: "任務狀態",
      filter_task_status_all: "全部狀態",
      filter_task_status_open: "開放",
      filter_task_status_accepted: "已接受",
      filter_task_status_completed: "已完成",
      filter_task_status_closed: "已結案",

      filter_search_market_label: "搜尋刊登",
      filter_market_search_placeholder: "搜尋刊登…",
      filter_market_kind_label: "刊登類型",
      filter_market_kind_all: "全部類型",
      filter_market_kind_product: "商品",
      filter_market_kind_service: "服務",
      filter_market_status_label: "刊登狀態",
      filter_market_status_all: "全部狀態",
      filter_market_status_open: "開放",
      filter_market_status_sold: "已成交",
      filter_market_status_closed: "已關閉",

      filter_search_events_label: "搜尋活動",
      filter_events_search_placeholder: "搜尋活動…",
      filter_events_state_label: "活動狀態",
      filter_events_state_all: "全部狀態",
      filter_events_state_scheduled: "排程",
      filter_events_state_live: "進行中",
      filter_events_state_ended: "已結束",
      filter_events_state_cancelled: "已取消",

      tasks_title: "任務",
      task_label: "任務",
      task_placeholder: "取咖啡、送包裹…",
      task_reward_label: "報酬（美元）",
      task_time_limit_label: "時限",
      task_distance_limit_label: "距離限制",
      task_pick_start: "選起點",
      task_pick_dest: "選終點",
      task_use_my_area: "用我的範圍",
      task_clear_route: "清除",
      task_start_unset: "起點：尚未設定",
      task_dest_unset: "終點：尚未設定",
      task_start_set: "起點：已設定",
      task_dest_set: "終點：已設定",
      task_time_left: "剩餘 {t}",
      task_post: "發布任務",
      task_list_empty: "目前沒有任務。",
      task_status_open: "開放",
      task_status_accepted: "已接受",
      task_status_completed: "已完成",
      task_status_expired: "已過期",
      task_status_cancelled: "已取消",
      task_apply: "申請",
      task_assign: "接受",
      task_finish: "完成",
      task_cancel: "取消",
      task_offers_title: "應徵",
      task_offers_empty: "尚無應徵。",
      task_applied: "已申請",
      task_room: "房間",
      task_verified: "已驗證",
      task_not_verified: "未驗證",
      task_fee: "平台費",
      task_payout: "實得",
      toast_task_posted: "任務已發布。",
      toast_task_applied: "已申請。",
      toast_task_accepted: "已接受任務。",
      toast_task_completed: "任務已完成。",
      toast_task_expired: "任務已過期。",
      toast_task_not_verified: "需要已驗證的接單者。",
      toast_task_need_gps: "請開啟 GPS 才能接單。",
      toast_task_too_far: "距離超過此任務限制。",
      toast_task_pick_route: "請先設定起點與終點。",
      toast_task_pick_on_map: "請在地圖點選位置。",
      toast_task_worker_unavailable: "無法取得接單者位置，請縮放到街道活動或稍後再試。",
      toast_task_poster_unavailable: "無法取得任務位置，請先按「我的位置」。",

      market_title: "市集",
      market_pill: "本機",
      market_kind_product: "商品",
      market_kind_service: "服務",
      market_label: "發布",
      market_placeholder: "賣腳踏車、提供家教…",
      market_price_label: "價格（美元）",
      market_pick_location: "選位置",
      market_use_my_area: "用我的範圍",
      market_clear_location: "清除",
      market_loc_unset: "位置：尚未設定",
      market_loc_set: "位置：已設定",
      market_time_limit_label: "時限",
      market_distance_limit_label: "距離限制",
      market_post: "發布",
      market_list_empty: "目前沒有市集貼文。",
      toast_market_posted: "市集貼文已發布。",
      toast_market_need_location: "請先選擇位置。",

      events_title: "排程活動",
      events_pill: "氣場",
      events_label: "活動",
      events_placeholder: "揪咖啡、素描散步…",
      events_pick_location: "選位置",
      events_use_my_area: "用我的範圍",
      events_clear_location: "清除",
      events_loc_unset: "位置：尚未設定",
      events_loc_set: "位置：已設定",
      events_starts_in_label: "多久後開始",
      events_duration_label: "持續時間",
      events_post: "排程",
      events_list_empty: "目前沒有排程活動。",
      events_join: "預約",
      events_leave: "退出",
      events_cancel: "取消",
      events_state_scheduled: "排程",
      events_state_live: "進行中",
      events_state_ended: "已結束",
      events_state_cancelled: "已取消",
      toast_events_posted: "已排程。",
      toast_events_need_location: "請先選擇位置。",
      toast_events_joined: "已預約。",
      toast_events_left: "已退出。",

      review_title: "評價",
      review_note_label: "備註",
      review_submit: "送出",
      review_open: "評價",
      toast_review_pick_rating: "請選擇星等。",
      toast_review_submitted: "評價已送出。",
      toast_review_already: "已評價過。",

      room_visibility_label: "房間可見性",
      room_vis_participants: "僅參與者",
      room_vis_public: "公開",

      room_title: "任務房間",
      room_close: "關閉",
      room_message_placeholder: "輸入訊息…",
      room_photo: "照片",
      room_location: "位置",
      room_send: "送出",
      room_view_on_map: "查看",
      toast_room_photo_too_large: "照片太大，請改用較小的圖片。",
      toast_room_only_accepted: "只有已接受任務的參與者可開啟房間。",
      toast_export_ready: "已匯出備份。",
      toast_import_done: "已匯入備份。",
      toast_import_invalid: "備份檔格式無效。",
      toast_import_failed: "無法匯入備份。",
      toast_app_installed: "App 已安裝。",
      toast_pwa_unavailable: "目前無法顯示安裝提示。",
      toast_pwa_update_ready: "已有新版可用，重新整理即可更新。",
      toast_pwa_update_applied: "應用程式已更新。",
      toast_auth_signed_in: "已使用 Google 登入。",
      toast_auth_signed_out: "已登出。",
      toast_auth_unavailable: "Firebase 登入目前無法使用。",
      toast_auth_sign_in_failed: "無法使用 Google 登入。",
      toast_auth_sign_out_failed: "無法登出。"
    },
    ja: {
      ui_language: "言語",
      auth_not_configured: "Firebase ログイン未設定",
      auth_signed_out: "未ログイン",
      auth_signed_in_as: "ログイン中: {name}",
      auth_login_google: "Google でログイン",
      auth_logout: "ログアウト",
      skip_main: "メインコンテンツへスキップ",
      section_activity: "アクティビティ記録",
      section_map: "ライブマップ",
      section_marketplace: "タスクとマーケット",
      quick_actions_label: "クイック操作",
      quick_start_activity: "活動を開始",
      quick_locate_me: "地図を中央へ",
      quick_post_task: "タスク投稿",
      quick_post_service: "サービス投稿",
      quick_schedule_event: "予定を作成",
      net_online: "オンライン",
      net_offline: "オフライン",
      install_app: "アプリをインストール",
      data_export: "データをエクスポート",
      data_import: "データをインポート",
      activity_title: "アクティビティ記録",
      activity_hint_idle: "いまの行動を記録。各アクティビティが固有の色を作り、時間で混ざります。",
      onboard_title: "クイックスタート",
      onboard_desc: "1分以内で主要フローを開始できます。",
      onboard_step_1: "アクティビティを記録すると、オーラが長期的に自動ブレンドされます。",
      onboard_step_2: "公開範囲を設定: 全員、近距離、または信頼済み連絡先。",
      onboard_step_3: "地図フィルターで人、イベント、サービスを素早く切替。",
      onboard_step_4: "タスクやサービスを投稿し、反応を一箇所で管理。",
      activity_tracking: "追跡中: {text}",
      activity_label: "アクティビティ",
      activity_placeholder: "仕事、通勤、ジム、コーヒー…",
      activity_color_label: "色",
      activity_show_aura_toggle: "アクティブ中に地図で自分のオーラを表示",
      idle_show_aura_toggle: "アイドル中も地図で自分のオーラを表示",
      visibility_label: "公開範囲",
      visibility_everyone: "全員",
      visibility_area: "近距離",
      visibility_area_radius_label: "表示範囲",
      visibility_area_badge: "近距離（{m}m）",
      visibility_area_note: "あなたから{m}m以内の人にだけオーラを表示します。",
      visibility_connected: "信頼済み連絡先",
      room_label: "ルーム",
      room_placeholder: "ルームコード",
      room_join: "参加",
      room_leave: "退出",
      room_state_on: "ROOM: ON",
      room_state_off: "ROOM: OFF",
      area_room_label: "イベントルーム",
      area_room_placeholder: "ルームコード",
      area_join: "参加",
      area_leave: "退出",
      approved_label: "承認済み連絡先",
      approved_placeholder: "@handle",
      approved_add: "追加",
      approved_empty: "承認済みはまだありません",
      approved_remove: "削除",
      blocked_label: "ブロック済み連絡先",
      blocked_empty: "ブロック済みはありません",
      blocked_remove: "解除",
      area_room_state_on: "ROOM: ON",
      area_room_state_off: "ROOM: OFF",
      toast_room_code_empty: "ルームコードを入力してください。",
      toast_room_joined: "ルームに参加しました。",
      toast_room_left: "ルームから退出しました。",
      toast_contact_added: "承認済みに追加しました。",
      toast_contact_exists: "すでに承認済みです。",
      toast_contact_removed: "承認済みから削除しました。",
      toast_contact_blocked: "{handle} をブロックしました。",
      toast_contact_unblocked: "{handle} のブロックを解除しました。",
      toast_dm_saved: "{handle} へのメッセージを保存しました。",
      toast_dm_empty: "メッセージを入力してください。",
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
      popup_action_message: "メッセージ",
      popup_action_add_friend: "友だち追加",
      popup_action_block: "ブロック",
      popup_message_prompt: "{handle} へのメッセージ",
      gps_unsupported: "位置情報に対応していません。",
      gps_denied: "位置情報の許可が拒否されました。",
      gps_unavailable: "位置情報を取得できません。",
      gps_timeout: "位置情報の取得がタイムアウトしました。",
      gps_error: "位置情報を取得できませんでした。",
      gps_ready: "GPS 準備完了。",
      map_lib_failed: "地図ライブラリの読み込みに失敗しました。",
      map_title: "ライブオーラマップ",
      map_loading: "地図を読み込み中…",
      map_locate: "現在地",
      map_reset: "表示を戻す",
      map_filters_label: "地図に表示",
      map_filter_people: "人",
      map_filter_events: "イベント",
      map_filter_services: "サービス",
      map_pick_cancel: "キャンセル",
      map_pick_hud_start: "地図をタップ: 出発エリア",
      map_pick_hud_dest: "地図をタップ: 目的地エリア",
      map_pick_hud_market: "地図をタップ: マーケット位置",
      map_pick_hud_events: "地図をタップ: 予定の場所",
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
      map_status_sim_failed: "ルートの読み込みに失敗しました。",
      sim_doing_eating: "食事中",
      sim_doing_transit: "移動中",
      sim_doing_resting: "休憩中",

      marketplace_title: "マーケット",
      marketplace_sub: "タスク、商品/サービス、予定アクティビティ。",
      tab_tasks: "タスク",
      tab_market: "マーケット",
      tab_events: "予定",
      drop_post_task: "タスクを作成",
      drop_task_list: "公開タスク",
      drop_post_market: "掲載を作成",
      drop_market_list: "公開掲載",
      drop_post_events: "予定を作成",
      drop_events_list: "まもなく開始",
      filter_clear: "クリア",
      filter_results: "{shown} / {total} を表示",
      filter_results_none: "一致なし。フィルターを調整してください。",

      filter_search_tasks_label: "タスク検索",
      filter_task_search_placeholder: "タスクを検索…",
      filter_task_status_label: "タスク状態",
      filter_task_status_all: "すべての状態",
      filter_task_status_open: "募集中",
      filter_task_status_accepted: "受諾済み",
      filter_task_status_completed: "完了",
      filter_task_status_closed: "クローズ",

      filter_search_market_label: "掲載検索",
      filter_market_search_placeholder: "掲載を検索…",
      filter_market_kind_label: "掲載タイプ",
      filter_market_kind_all: "すべてのタイプ",
      filter_market_kind_product: "商品",
      filter_market_kind_service: "サービス",
      filter_market_status_label: "掲載状態",
      filter_market_status_all: "すべての状態",
      filter_market_status_open: "公開中",
      filter_market_status_sold: "成約済み",
      filter_market_status_closed: "クローズ",

      filter_search_events_label: "予定検索",
      filter_events_search_placeholder: "予定を検索…",
      filter_events_state_label: "予定状態",
      filter_events_state_all: "すべての状態",
      filter_events_state_scheduled: "予定",
      filter_events_state_live: "開催中",
      filter_events_state_ended: "終了",
      filter_events_state_cancelled: "キャンセル",

      tasks_title: "タスク",
      task_label: "タスク",
      task_placeholder: "コーヒー受取、荷物配達…",
      task_reward_label: "報酬（USD）",
      task_time_limit_label: "制限時間",
      task_distance_limit_label: "距離制限",
      task_pick_start: "開始地点",
      task_pick_dest: "目的地",
      task_use_my_area: "自分の範囲",
      task_clear_route: "クリア",
      task_start_unset: "開始: 未設定",
      task_dest_unset: "目的地: 未設定",
      task_start_set: "開始: 設定済み",
      task_dest_set: "目的地: 設定済み",
      task_time_left: "残り {t}",
      task_post: "投稿",
      task_list_empty: "タスクはまだありません。",
      task_status_open: "募集中",
      task_status_accepted: "受諾済み",
      task_status_completed: "完了",
      task_status_expired: "期限切れ",
      task_status_cancelled: "キャンセル",
      task_apply: "応募",
      task_assign: "受諾",
      task_finish: "完了",
      task_cancel: "キャンセル",
      task_offers_title: "応募",
      task_offers_empty: "応募はまだありません。",
      task_applied: "応募済み",
      task_room: "ルーム",
      task_verified: "認証済み",
      task_not_verified: "未認証",
      task_fee: "手数料",
      task_payout: "受取",
      toast_task_posted: "タスクを投稿しました。",
      toast_task_applied: "応募しました。",
      toast_task_accepted: "タスクを受けました。",
      toast_task_completed: "タスク完了。",
      toast_task_expired: "タスクは期限切れです。",
      toast_task_not_verified: "認証済みユーザーが必要です。",
      toast_task_need_gps: "GPS を有効にしてください。",
      toast_task_too_far: "距離制限を超えています。",
      toast_task_pick_route: "開始と目的地を設定してください。",
      toast_task_pick_on_map: "地図をクリックして選択してください。",
      toast_task_worker_unavailable: "受諾者の位置を取得できません。ズームインするか、少し待ってください。",
      toast_task_poster_unavailable: "タスク位置を取得できません。先に「現在地」を押してください。",

      market_title: "マーケット",
      market_pill: "ローカル",
      market_kind_product: "商品",
      market_kind_service: "サービス",
      market_label: "投稿",
      market_placeholder: "自転車を売る、家庭教師…",
      market_price_label: "価格（USD）",
      market_pick_location: "場所を選ぶ",
      market_use_my_area: "自分の範囲",
      market_clear_location: "クリア",
      market_loc_unset: "場所: 未設定",
      market_loc_set: "場所: 設定済み",
      market_time_limit_label: "制限時間",
      market_distance_limit_label: "距離制限",
      market_post: "投稿",
      market_list_empty: "投稿はまだありません。",
      toast_market_posted: "投稿しました。",
      toast_market_need_location: "場所を選んでください。",

      events_title: "予定",
      events_pill: "オーラ",
      events_label: "アクティビティ",
      events_placeholder: "コーヒー会、スケッチ散歩…",
      events_pick_location: "場所を選ぶ",
      events_use_my_area: "自分の範囲",
      events_clear_location: "クリア",
      events_loc_unset: "場所: 未設定",
      events_loc_set: "場所: 設定済み",
      events_starts_in_label: "開始まで",
      events_duration_label: "時間",
      events_post: "予約",
      events_list_empty: "予定はまだありません。",
      events_join: "参加",
      events_leave: "退出",
      events_cancel: "キャンセル",
      events_state_scheduled: "予定",
      events_state_live: "開催中",
      events_state_ended: "終了",
      events_state_cancelled: "キャンセル",
      toast_events_posted: "予定を追加しました。",
      toast_events_need_location: "場所を選んでください。",
      toast_events_joined: "参加しました。",
      toast_events_left: "退出しました。",

      review_title: "レビュー",
      review_note_label: "メモ",
      review_submit: "送信",
      review_open: "レビュー",
      toast_review_pick_rating: "評価を選択してください。",
      toast_review_submitted: "レビューを送信しました。",
      toast_review_already: "すでに評価済みです。",

      room_visibility_label: "ルーム公開範囲",
      room_vis_participants: "参加者のみ",
      room_vis_public: "公開",

      room_title: "タスクルーム",
      room_close: "閉じる",
      room_message_placeholder: "メッセージ…",
      room_photo: "写真",
      room_location: "位置情報",
      room_send: "送信",
      room_view_on_map: "見る",
      toast_room_photo_too_large: "写真が大きすぎます。小さい画像で試してください。",
      toast_room_only_accepted: "ルームは受諾済みタスクの参加者のみ利用できます。",
      toast_export_ready: "バックアップを出力しました。",
      toast_import_done: "バックアップを読み込みました。",
      toast_import_invalid: "バックアップファイルの形式が無効です。",
      toast_import_failed: "バックアップを読み込めませんでした。",
      toast_app_installed: "アプリをインストールしました。",
      toast_pwa_unavailable: "今はインストールできません。",
      toast_pwa_update_ready: "新しいバージョンを利用できます。再読み込みしてください。",
      toast_pwa_update_applied: "アプリを更新しました。",
      toast_auth_signed_in: "Google でログインしました。",
      toast_auth_signed_out: "ログアウトしました。",
      toast_auth_unavailable: "Firebase ログインは現在利用できません。",
      toast_auth_sign_in_failed: "Google でログインできませんでした。",
      toast_auth_sign_out_failed: "ログアウトできませんでした。"
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
    if (els.mapLayerFilters) {
      els.mapLayerFilters.setAttribute("aria-label", t("map_filters_label"));
    }
    if (els.quickActions) {
      els.quickActions.setAttribute("aria-label", t("quick_actions_label"));
    }

    // Update any draft helpers that include translated labels.
    if (typeof renderActivityAssist === "function") renderActivityAssist();
    if (typeof renderMarketplaceTabs === "function") renderMarketplaceTabs();
    if (typeof renderTasks === "function") renderTasks();
    if (typeof renderMarket === "function") renderMarket();
    if (typeof renderEvents === "function") renderEvents();
    if (typeof renderTaskRoom === "function") renderTaskRoom();
    if (typeof renderNetworkPill === "function") renderNetworkPill();
    if (typeof renderAuthUi === "function") renderAuthUi();
    if (typeof syncInstallButton === "function") syncInstallButton();
  };

  const defaultState = () => ({
    version: 1,
    ui: {
      rev: 2,
      section: "mapSection",
      marketTab: "tasks",
      mapFilters: {
        people: true,
        events: true,
        services: true
      },
      listFilters: defaultUiListFilters(),
      onboardingOpen: true,
      drops: {
        tasksPost: false,
        tasksList: false,
        marketPost: false,
        marketList: false,
        eventsPost: false,
        eventsList: false
      }
    },
    activity: {
      active: null,
      log: [],
      prefs: {
        showAuraOnMap: false,
        idleShowAuraOnMap: false,
        visibilityMode: "everyone",
        areaRadiusM: 100,
        allowlist: [],
        room: { code: "", joined: false, joinedAtMs: 0, leftAtMs: 0 },
        lang: "en",
        lingerUntil: 0
      }
    },
    tasks: {
      list: [],
      rooms: {},
      prefs: {
        feeBps: 1000,
        userVerified: true,
        routeDraft: {
          from: null,
          to: null,
          gridM: 0
        }
      },
      reputation: {}
    },
    market: {
      list: [],
      prefs: {
        kind: "product",
        draftLoc: null,
        draftGridM: 0
      }
    },
    events: {
      list: [],
      prefs: {
        draftLoc: null,
        draftGridM: 0
      }
    },
    auth: {
      user: null
    },
    social: {
      sent: [],
      blocked: []
    }
  });

  const normalizeAuthUser = (value) => {
    if (!value || typeof value !== "object") return null;
    const sub = String(value.sub || value.id || "").trim();
    if (!sub) return null;
    const name = String(value.name || value.displayName || "").trim().slice(0, 80);
    const email = String(value.email || "").trim().slice(0, 120);
    const picture = String(value.picture || "").trim().slice(0, 600);
    const issuedAt = Number(value.issuedAt || value.iat || 0) || 0;
    return {
      sub,
      name: name || "Google User",
      email,
      picture,
      issuedAt
    };
  };

  const sanitizeProfileId = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return GUEST_PROFILE_ID;
    return raw.replace(/[^a-zA-Z0-9_.:-]/g, "_").slice(0, 96) || GUEST_PROFILE_ID;
  };

  const storageKeyForProfile = (profileId) => `${STORAGE_PROFILE_PREFIX}${sanitizeProfileId(profileId)}`;

  const profileIdForAuthUser = (authUser) => {
    const user = normalizeAuthUser(authUser);
    if (!user || !user.sub) return GUEST_PROFILE_ID;
    return `user:${sanitizeProfileId(user.sub)}`;
  };

  let activeProfileId = GUEST_PROFILE_ID;
  let activeStorageKey = storageKeyForProfile(activeProfileId);

  const migrateLegacyGuestStorage = () => {
    try {
      const legacyRaw = localStorage.getItem(STORAGE_KEY);
      if (!legacyRaw) return;
      const guestKey = storageKeyForProfile(GUEST_PROFILE_ID);
      const guestRaw = localStorage.getItem(guestKey);
      if (!guestRaw) localStorage.setItem(guestKey, legacyRaw);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore migration failures; app still works with defaults.
    }
  };

  const loadState = (storageKey = activeStorageKey) => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1) return defaultState();
      const base = defaultState();
      const merged = {
        ...base,
        ...parsed,
        ui: {
          ...base.ui,
          ...((parsed.ui && typeof parsed.ui === "object") ? parsed.ui : {})
        },
        activity: {
          ...base.activity,
          ...(parsed.activity || {}),
          prefs: {
            ...base.activity.prefs,
            ...((parsed.activity && parsed.activity.prefs) || {})
          }
        },
        tasks: {
          ...base.tasks,
          ...(parsed.tasks || {}),
          prefs: {
            ...base.tasks.prefs,
            ...((parsed.tasks && parsed.tasks.prefs) || {})
          }
        },
        market: {
          ...base.market,
          ...(parsed.market || {}),
          prefs: {
            ...base.market.prefs,
            ...((parsed.market && parsed.market.prefs) || {})
          }
        },
        events: {
          ...base.events,
          ...(parsed.events || {}),
          prefs: {
            ...base.events.prefs,
            ...((parsed.events && parsed.events.prefs) || {})
          }
        },
        auth: {
          ...base.auth,
          ...((parsed.auth && typeof parsed.auth === "object") ? parsed.auth : {})
        },
        social: {
          ...base.social,
          ...((parsed.social && typeof parsed.social === "object") ? parsed.social : {})
        }
      };
      // Drop legacy timer state (previous versions).
      delete merged.timer;
      // Normalize shapes.
      if (!Array.isArray(merged.activity.log)) merged.activity.log = [];
      merged.activity.log = merged.activity.log
        .filter((entry) => entry && typeof entry === "object")
        .map((entry) => ({
          id: String(entry.id || ""),
          text: String(entry.text || "").slice(0, 60),
          key: String(entry.key || "").slice(0, 80),
          colorHex: String(entry.colorHex || entry.color || "").slice(0, 16),
          startedAt: Number(entry.startedAt) || 0,
          endedAt: Number(entry.endedAt) || 0
        }))
        .filter((entry) => entry.endedAt > 0 && entry.startedAt >= 0 && entry.endedAt >= entry.startedAt)
        .sort((a, b) => (Number(b && b.endedAt) || 0) - (Number(a && a.endedAt) || 0))
        .slice(0, MAX_ACTIVITY_LOG_ENTRIES);
      // Normalize allowlist.
      if (!Array.isArray(merged.activity.prefs.allowlist)) merged.activity.prefs.allowlist = [];
      merged.activity.prefs.allowlist = merged.activity.prefs.allowlist
        .map((x) => String(x || "").trim())
        .filter((x) => x);

      merged.activity.prefs.areaRadiusM = clampInt(
        merged.activity.prefs.areaRadiusM,
        10,
        500,
        100
      );

      // Normalize room shape (used under Approved aura).
      const room = merged.activity.prefs.room;
      if (!room || typeof room !== "object") {
        merged.activity.prefs.room = { code: "", joined: false, joinedAtMs: 0, leftAtMs: 0 };
      } else {
        merged.activity.prefs.room = {
          code: String(room.code || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 36),
          joined: Boolean(room.joined),
          joinedAtMs: Number(room.joinedAtMs) || 0,
          leftAtMs: Number(room.leftAtMs) || 0
        };
      }

      // Tasks (local-only demo).
      if (!merged.tasks || typeof merged.tasks !== "object") merged.tasks = defaultState().tasks;
      if (!Array.isArray(merged.tasks.list)) merged.tasks.list = [];
      if (!merged.tasks.rooms || typeof merged.tasks.rooms !== "object") merged.tasks.rooms = {};
      if (!merged.tasks.prefs || typeof merged.tasks.prefs !== "object") merged.tasks.prefs = defaultState().tasks.prefs;
      merged.tasks.prefs.feeBps = clampInt(merged.tasks.prefs.feeBps, 0, 5000, 1000);
      merged.tasks.prefs.userVerified = Boolean(merged.tasks.prefs.userVerified);

      // UI prefs.
      if (!merged.ui || typeof merged.ui !== "object") merged.ui = defaultState().ui;
      merged.ui.rev = clampInt(merged.ui.rev, 1, 999, 1);
      merged.ui.section = ["activitySection", "mapSection", "marketplaceSection"].includes(String(merged.ui.section || ""))
        ? String(merged.ui.section || "")
        : "mapSection";
      merged.ui.marketTab = ["tasks", "market", "events"].includes(String(merged.ui.marketTab || ""))
        ? String(merged.ui.marketTab || "")
        : "tasks";
      merged.ui.mapFilters = normalizeMapLayerFilters(merged.ui.mapFilters);
      merged.ui.listFilters = normalizeUiListFilters(merged.ui.listFilters);
      merged.ui.onboardingOpen = merged.ui.onboardingOpen !== false;
      merged.ui.drops = { ...defaultState().ui.drops, ...(merged.ui.drops && typeof merged.ui.drops === "object" ? merged.ui.drops : {}) };

      // Task draft route (stored as blurred area anchors).
      {
        const draft = merged.tasks.prefs.routeDraft;
        const normPt = (pt) => {
          if (!pt || typeof pt !== "object") return null;
          const lat = Number(pt.lat);
          const lng = Number(pt.lng);
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
          return { lat, lng };
        };
        if (!draft || typeof draft !== "object") {
          merged.tasks.prefs.routeDraft = { from: null, to: null, gridM: 0 };
        } else {
          merged.tasks.prefs.routeDraft = {
            from: normPt(draft.from),
            to: normPt(draft.to),
            gridM: clampInt(draft.gridM, 50, 2000, 0)
          };
        }
      }

      // Reputation map from reviews.
      if (!merged.tasks.reputation || typeof merged.tasks.reputation !== "object") merged.tasks.reputation = {};
      {
        const out = {};
        for (const [kRaw, v] of Object.entries(merged.tasks.reputation || {})) {
          const k = String(kRaw || "").trim();
          if (!k) continue;
          const sum = Number(v && v.sum);
          const count = Number(v && v.count);
          if (!Number.isFinite(sum) || !Number.isFinite(count)) continue;
          out[k] = { sum: Math.max(0, sum), count: clampInt(count, 0, 99999, 0) };
        }
        merged.tasks.reputation = out;
      }

      // Market posts.
      if (!merged.market || typeof merged.market !== "object") merged.market = defaultState().market;
      if (!Array.isArray(merged.market.list)) merged.market.list = [];
      if (!merged.market.prefs || typeof merged.market.prefs !== "object") merged.market.prefs = defaultState().market.prefs;
      merged.market.prefs.kind = ["product", "service"].includes(String(merged.market.prefs.kind || ""))
        ? String(merged.market.prefs.kind || "")
        : "product";
      merged.market.prefs.draftGridM = clampInt(merged.market.prefs.draftGridM, 50, 2000, 0);
      {
        const pt = merged.market.prefs.draftLoc;
        if (!pt || typeof pt !== "object") merged.market.prefs.draftLoc = null;
        else {
          const lat = Number(pt.lat);
          const lng = Number(pt.lng);
          merged.market.prefs.draftLoc =
            Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
        }
      }

      // Scheduled activities.
      if (!merged.events || typeof merged.events !== "object") merged.events = defaultState().events;
      if (!Array.isArray(merged.events.list)) merged.events.list = [];
      if (!merged.events.prefs || typeof merged.events.prefs !== "object") merged.events.prefs = defaultState().events.prefs;
      merged.events.prefs.draftGridM = clampInt(merged.events.prefs.draftGridM, 50, 2000, 0);
      {
        const pt = merged.events.prefs.draftLoc;
        if (!pt || typeof pt !== "object") merged.events.prefs.draftLoc = null;
        else {
          const lat = Number(pt.lat);
          const lng = Number(pt.lng);
          merged.events.prefs.draftLoc =
            Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
        }
      }

      if (!merged.auth || typeof merged.auth !== "object") merged.auth = defaultState().auth;
      merged.auth.user = normalizeAuthUser(merged.auth.user);

      if (!merged.social || typeof merged.social !== "object") merged.social = defaultState().social;
      if (!Array.isArray(merged.social.sent)) merged.social.sent = [];
      if (!Array.isArray(merged.social.blocked)) merged.social.blocked = [];
      merged.social.sent = merged.social.sent
        .filter((m) => m && typeof m === "object")
        .map((m) => ({
          id: String(m.id || ""),
          to: normalizeContactHandle(m.to),
          text: String(m.text || "").slice(0, 280),
          from: String(m.from || "").slice(0, 64),
          sentAt: Number(m.sentAt) || 0
        }))
        .filter((m) => m.id && m.to && m.text)
        .slice(0, 400);
      merged.social.blocked = merged.social.blocked
        .map((h) => normalizeContactHandle(h))
        .filter(Boolean)
        .slice(0, 400);

      // Normalize task rooms (messages).
      {
        const roomsIn = merged.tasks.rooms;
        const roomsOut = {};
        for (const [taskIdRaw, room] of Object.entries(roomsIn || {})) {
          const taskId = String(taskIdRaw || "").trim();
          if (!taskId) continue;
          if (!room || typeof room !== "object") continue;
          const messages = Array.isArray(room.messages) ? room.messages : [];
          const norm = messages
            .filter((m) => m && typeof m === "object")
            .map((m) => ({
              id: String(m.id || ""),
              type: String(m.type || "text"),
              text: String(m.text || "").slice(0, 2000),
              photo: typeof m.photo === "string" ? m.photo.slice(0, 2_000_000) : "",
              lat: Number(m.lat),
              lng: Number(m.lng),
              accuracyM: Number(m.accuracyM) || 0,
              from: m.from && typeof m.from === "object" ? { kind: String(m.from.kind || ""), id: String(m.from.id || "") } : null,
              sentAt: Number(m.sentAt) || 0
            }))
            .filter((m) => m.id && m.from && m.from.kind && m.from.id)
            .slice(-200);
          const visibility = String(room.visibility || "participants");
          const ownerKey = String(room.ownerKey || "").trim();
          roomsOut[taskId] = {
            messages: norm,
            visibility: visibility === "public" ? "public" : "participants",
            ownerKey
          };
        }
        merged.tasks.rooms = roomsOut;
      }

      merged.tasks.list = merged.tasks.list
        .filter((x) => x && typeof x === "object")
        .map((x) => ({
          id: String(x.id || ""),
          title: String(x.title || "").slice(0, 72),
          rewardCents: clampInt(x.rewardCents, 0, 999900, 0),
          feeBps: clampInt(x.feeBps, 0, 5000, merged.tasks.prefs.feeBps),
          distanceLimitM: clampInt(x.distanceLimitM, 50, 5000, 800),
          createdAt: Number(x.createdAt) || 0,
          expiresAt: Number(x.expiresAt) || 0,
          status: String(x.status || "open"),
          poster: x.poster && typeof x.poster === "object" ? { kind: String(x.poster.kind || ""), id: String(x.poster.id || "") } : null,
          posterLabel: String(x.posterLabel || "").slice(0, 32),
          posterVerified: Boolean(x.posterVerified),
          acceptedBy:
            x.acceptedBy && typeof x.acceptedBy === "object"
              ? { kind: String(x.acceptedBy.kind || ""), id: String(x.acceptedBy.id || "") }
              : null,
          workerLabel: String(x.workerLabel || "").slice(0, 32),
          workerVerified: Boolean(x.workerVerified),
          acceptedAt: Number(x.acceptedAt) || 0,
          completedAt: Number(x.completedAt) || 0,
          review:
            x.review && typeof x.review === "object"
              ? {
                  rating: clampInt(x.review.rating, 0, 5, 0),
                  note: String(x.review.note || "").slice(0, 240),
                  by: x.review.by && typeof x.review.by === "object" ? { kind: String(x.review.by.kind || ""), id: String(x.review.by.id || "") } : null,
                  at: Number(x.review.at) || 0
                }
              : null,
          applicants: Array.isArray(x.applicants)
            ? x.applicants
                .filter((a) => a && typeof a === "object")
                .map((a) => ({
                  id: String(a.id || ""),
                  actor:
                    a.actor && typeof a.actor === "object"
                      ? { kind: String(a.actor.kind || ""), id: String(a.actor.id || "") }
                      : null,
                  label: String(a.label || "").slice(0, 32),
                  appliedAt: Number(a.appliedAt) || 0,
                  distanceM: Math.max(0, Math.round(Number(a.distanceM) || 0)),
                  etaMin: clampInt(a.etaMin, 1, 999, 10),
                  anchor:
                    a.anchor && typeof a.anchor === "object"
                      ? { lat: Number(a.anchor.lat), lng: Number(a.anchor.lng) }
                      : null,
                  skills: Array.isArray(a.skills)
                    ? a.skills
                        .map((s) => String(s || "").trim())
                        .filter((s) => s)
                        .slice(0, 8)
                    : [],
                  rating: Math.max(0, Math.min(5, Number(a.rating) || 0)),
                  tasksDone: clampInt(a.tasksDone, 0, 9999, 0),
                  onTimePct: clampInt(a.onTimePct, 0, 100, 0),
                  verified: Boolean(a.verified)
                }))
                .filter((a) => a.id && a.actor && a.actor.kind && a.actor.id)
                .slice(0, 24)
            : [],
          tetherFrom:
            x.tetherFrom && typeof x.tetherFrom === "object"
              ? { lat: Number(x.tetherFrom.lat), lng: Number(x.tetherFrom.lng) }
              : null,
          tetherTo:
            x.tetherTo && typeof x.tetherTo === "object" ? { lat: Number(x.tetherTo.lat), lng: Number(x.tetherTo.lng) } : null,
          tetherGridM: clampInt(x.tetherGridM, 50, 2000, 0)
        }))
        .filter((x) => x.id && x.title && x.poster && x.poster.kind && x.poster.id);

      merged.tasks.list = merged.tasks.list.slice(0, 50);

      // Normalize market posts.
      merged.market.list = (Array.isArray(merged.market.list) ? merged.market.list : [])
        .filter((x) => x && typeof x === "object")
        .map((x) => ({
          id: String(x.id || ""),
          kind: String(x.kind || "product"),
          title: String(x.title || "").slice(0, 72),
          priceCents: clampInt(x.priceCents, 0, 9_999_900, 0),
          distanceLimitM: clampInt(x.distanceLimitM, 50, 5000, 1200),
          createdAt: Number(x.createdAt) || 0,
          expiresAt: Number(x.expiresAt) || 0,
          status: String(x.status || "open"),
          seller: x.seller && typeof x.seller === "object" ? { kind: String(x.seller.kind || ""), id: String(x.seller.id || "") } : null,
          sellerLabel: String(x.sellerLabel || "").slice(0, 32),
          sellerVerified: Boolean(x.sellerVerified),
          loc: x.loc && typeof x.loc === "object" ? { lat: Number(x.loc.lat), lng: Number(x.loc.lng) } : null,
          gridM: clampInt(x.gridM, 50, 2000, 0)
        }))
        .filter((x) => x.id && x.title && x.seller && x.seller.kind && x.seller.id)
        .slice(0, 50);

      // Normalize scheduled activities.
      merged.events.list = (Array.isArray(merged.events.list) ? merged.events.list : [])
        .filter((x) => x && typeof x === "object")
        .map((x) => ({
          id: String(x.id || ""),
          title: String(x.title || "").slice(0, 72),
          createdAt: Number(x.createdAt) || 0,
          startAt: Number(x.startAt) || 0,
          endsAt: Number(x.endsAt) || 0,
          status: String(x.status || "scheduled"),
          host: x.host && typeof x.host === "object" ? { kind: String(x.host.kind || ""), id: String(x.host.id || "") } : null,
          hostLabel: String(x.hostLabel || "").slice(0, 32),
          loc: x.loc && typeof x.loc === "object" ? { lat: Number(x.loc.lat), lng: Number(x.loc.lng) } : null,
          joinCount: clampInt(x.joinCount, 0, 99999, 0),
          joinedBy: Array.isArray(x.joinedBy)
            ? x.joinedBy
                .map((s) => String(s || "").trim())
                .filter((s) => s)
                .slice(0, 500)
            : []
        }))
        .filter((x) => x.id && x.title && x.host && x.host.kind && x.host.id)
        .slice(0, 50);

      // Drop legacy "area room" model (area visibility is now proximity-based).
      if (merged.activity.prefs && "areaRoom" in merged.activity.prefs) {
        delete merged.activity.prefs.areaRoom;
      }
      return merged;
    } catch {
      return defaultState();
    }
  };

  migrateLegacyGuestStorage();
  let state = loadState(activeStorageKey);
  const trimActivityLogInPlace = () => {
    if (!state.activity || typeof state.activity !== "object") state.activity = defaultState().activity;
    if (!Array.isArray(state.activity.log)) state.activity.log = [];
    const log = state.activity.log;
    if (log.length <= MAX_ACTIVITY_LOG_ENTRIES) return false;
    log.length = MAX_ACTIVITY_LOG_ENTRIES;
    return true;
  };
  const trimmedActivityLogOnBoot = trimActivityLogInPlace();

  let saveTimer = null;
  let savePending = false;
  let lastSerializedState = null;

  const flushSaveState = () => {
    if (!savePending) return;
    savePending = false;
    try {
      const payload = JSON.stringify(state);
      if (payload === lastSerializedState) {
        setStoragePill(true);
        return;
      }
      localStorage.setItem(activeStorageKey, payload);
      lastSerializedState = payload;
      setStoragePill(true);
    } catch {
      setStoragePill(false);
    }
  };

  const cancelSaveTimer = () => {
    if (saveTimer == null) return;
    if (saveTimer.kind === "timeout") window.clearTimeout(saveTimer.id);
    else if (saveTimer.kind === "idle" && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(saveTimer.id);
    }
    saveTimer = null;
  };

  const scheduleSaveFlush = () => {
    if (saveTimer != null) return;
    const run = () => {
      saveTimer = null;
      flushSaveState();
    };
    if (typeof window.requestIdleCallback === "function") {
      saveTimer = {
        kind: "idle",
        id: window.requestIdleCallback(run, { timeout: SAVE_DEBOUNCE_MS })
      };
      return;
    }
    saveTimer = { kind: "timeout", id: window.setTimeout(run, SAVE_DEBOUNCE_MS) };
  };

  const saveState = (opts = {}) => {
    const immediate =
      typeof opts === "boolean" ? opts : Boolean(opts && typeof opts === "object" && opts.immediate);
    savePending = true;
    if (immediate) {
      cancelSaveTimer();
      flushSaveState();
      return;
    }
    scheduleSaveFlush();
  };

  try {
    lastSerializedState = localStorage.getItem(activeStorageKey);
  } catch {
    lastSerializedState = null;
  }

  window.addEventListener("pagehide", () => saveState({ immediate: true }));
  window.addEventListener("beforeunload", () => saveState({ immediate: true }));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveState({ immediate: true });
  });

  let activityLogRevision = 1;
  const ACTIVITY_SIM_CACHE_MAX = 3200;
  const BIGRAM_MEMO_MAX = 1200;
  const TOKEN_MEMO_MAX = 1200;
  const derivedCache = {
    lastEndedAt: { rev: -1, value: 0 },
    knownActivities: { rev: -1, data: [] },
    longTermAura: { rev: -1, bucket: -1, data: { hex: "#FF6A00", byActivity: [] } },
    auraStrength: { rev: -1, bucket: -1, data: { strength: 0, counts: [] } },
    auraLegendSig: "",
    similarity: new Map(),
    bigrams: new Map(),
    tokens: new Map()
  };

  const bumpActivityLogRevision = () => {
    activityLogRevision += 1;
    derivedCache.lastEndedAt.rev = -1;
    derivedCache.knownActivities.rev = -1;
    derivedCache.longTermAura.rev = -1;
    derivedCache.auraStrength.rev = -1;
    derivedCache.similarity.clear();
    derivedCache.bigrams.clear();
    derivedCache.tokens.clear();
  };

  const onActivityLogMutated = () => {
    if (trimActivityLogInPlace()) saveState();
    bumpActivityLogRevision();
  };

  if (trimmedActivityLogOnBoot) saveState();

  const switchProfileState = (profileId, authUser) => {
    const nextProfileId = sanitizeProfileId(profileId);
    const nextStorageKey = storageKeyForProfile(nextProfileId);
    const nextAuthUser = normalizeAuthUser(authUser);
    const changed = nextStorageKey !== activeStorageKey;
    if (changed) {
      saveState({ immediate: true });
      cancelSaveTimer();
      savePending = false;
      activeProfileId = nextProfileId;
      activeStorageKey = nextStorageKey;
      state = loadState(activeStorageKey);
      trimActivityLogInPlace();
      bumpActivityLogRevision();
      i18nLang = normalizeLang(state.activity && state.activity.prefs && state.activity.prefs.lang);
      try {
        lastSerializedState = localStorage.getItem(activeStorageKey);
      } catch {
        lastSerializedState = null;
      }
    }
    state.auth = state.auth && typeof state.auth === "object" ? state.auth : defaultState().auth;
    state.auth.user = nextAuthUser;
    if (nextAuthUser && state.tasks && state.tasks.prefs) state.tasks.prefs.userVerified = true;
    return changed;
  };

  let mapApi = null;
  let i18nLang = normalizeLang(state.activity && state.activity.prefs && state.activity.prefs.lang);
  let firebaseAuthConfig = null;
  let firebaseAuth = null;
  let firebaseAuthReady = false;
  let firebaseAuthBootstrapped = false;

  const sameAuthUser = (a, b) => {
    const left = normalizeAuthUser(a);
    const right = normalizeAuthUser(b);
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.sub === right.sub &&
      left.name === right.name &&
      left.email === right.email &&
      left.picture === right.picture
    );
  };

  const readFirebaseAuthConfig = () => {
    const cfg = window.AURANET_FIREBASE_CONFIG || window.firebaseConfig || null;
    if (!cfg || typeof cfg !== "object") return null;

    const pick = (...keys) => {
      for (const key of keys) {
        const value = String(cfg[key] || "").trim();
        if (!value) continue;
        if (/YOUR_|REPLACE_ME|PLACEHOLDER/i.test(value)) continue;
        return value;
      }
      return "";
    };

    const out = {
      apiKey: pick("apiKey", "api_key"),
      authDomain: pick("authDomain", "auth_domain"),
      projectId: pick("projectId", "project_id"),
      appId: pick("appId", "app_id"),
      messagingSenderId: pick("messagingSenderId", "messaging_sender_id"),
      storageBucket: pick("storageBucket", "storage_bucket"),
      measurementId: pick("measurementId", "measurement_id")
    };

    if (!out.apiKey || !out.authDomain || !out.projectId || !out.appId) return null;
    return out;
  };

  const getFirebaseNamespace = () => {
    const fb = window.firebase;
    if (!fb || typeof fb.initializeApp !== "function" || typeof fb.auth !== "function") return null;
    return fb;
  };

  const createGoogleProvider = () => {
    const fb = getFirebaseNamespace();
    if (!fb || !fb.auth || typeof fb.auth.GoogleAuthProvider !== "function") return null;
    const provider = new fb.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return provider;
  };

  const renderAuthUi = () => {
    const user = normalizeAuthUser(state && state.auth && state.auth.user);
    state.auth = state.auth && typeof state.auth === "object" ? state.auth : defaultState().auth;
    state.auth.user = user;

    if (els.authPill) {
      if (!firebaseAuthConfig) {
        els.authPill.textContent = t("auth_not_configured");
      } else if (user) {
        const display = normalizeActivityText(user.name || user.email || "").slice(0, 24) || "Google";
        els.authPill.textContent = t("auth_signed_in_as", { name: display });
      } else {
        els.authPill.textContent = t("auth_signed_out");
      }
    }

    if (els.authLogout) els.authLogout.hidden = !firebaseAuthConfig || !Boolean(user);
    if (els.authLogin) {
      els.authLogin.hidden = !firebaseAuthConfig || Boolean(user);
      els.authLogin.disabled = !firebaseAuthReady;
    }
  };

  const syncSignedInUser = (firebaseUser, opts = {}) => {
    const showToast = Boolean(opts && opts.showToast);
    const prevUser = normalizeAuthUser(state && state.auth && state.auth.user);
    const nextUser = firebaseUser
      ? normalizeAuthUser({
          sub: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          picture: firebaseUser.photoURL,
          issuedAt: nowMs()
        })
      : null;
    const changed = !sameAuthUser(prevUser, nextUser);
    const nextProfileId = profileIdForAuthUser(nextUser);
    const profileChanged = switchProfileState(nextProfileId, nextUser);

    if (profileChanged) {
      saveState({ immediate: true });
      applyI18n();
      render();
      if (mapApi && typeof mapApi.refreshI18n === "function") mapApi.refreshI18n();
    } else if (changed) {
      saveState();
      if (typeof renderTasks === "function") renderTasks();
    }
    renderAuthUi();

    if (showToast && changed) {
      toast(nextUser ? t("toast_auth_signed_in") : t("toast_auth_signed_out"));
    }
  };

  const signInWithFirebase = async () => {
    if (!firebaseAuthConfig || !firebaseAuth || !firebaseAuthReady) {
      toast(t("toast_auth_unavailable"));
      return;
    }
    const provider = createGoogleProvider();
    if (!provider) {
      toast(t("toast_auth_unavailable"));
      return;
    }
    try {
      await firebaseAuth.signInWithPopup(provider);
    } catch (err) {
      const code = String((err && err.code) || "");
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return;
      if (code === "auth/popup-blocked" && typeof firebaseAuth.signInWithRedirect === "function") {
        try {
          const redirectProvider = createGoogleProvider();
          if (redirectProvider) {
            await firebaseAuth.signInWithRedirect(redirectProvider);
            return;
          }
        } catch {
          // falls through to shared error handling below
        }
      }
      toast(t("toast_auth_sign_in_failed"));
    }
  };

  const signOutFirebase = async () => {
    if (!firebaseAuth || typeof firebaseAuth.signOut !== "function") {
      syncSignedInUser(null, { showToast: true });
      return;
    }
    try {
      await firebaseAuth.signOut();
    } catch {
      toast(t("toast_auth_sign_out_failed"));
    }
  };

  const initFirebaseAuth = () => {
    firebaseAuthConfig = readFirebaseAuthConfig();
    firebaseAuthReady = false;
    firebaseAuthBootstrapped = false;
    renderAuthUi();
    if (!firebaseAuthConfig) return;

    const fb = getFirebaseNamespace();
    if (!fb) {
      toast(t("toast_auth_unavailable"));
      return;
    }

    try {
      if (!Array.isArray(fb.apps) || !fb.apps.length) {
        fb.initializeApp(firebaseAuthConfig);
      }
      const app = typeof fb.app === "function" ? fb.app() : null;
      firebaseAuth = app && typeof app.auth === "function" ? app.auth() : fb.auth();
      if (!firebaseAuth || typeof firebaseAuth.onAuthStateChanged !== "function") {
        throw new Error("firebase_auth_unavailable");
      }
      firebaseAuthReady = true;
      renderAuthUi();
      firebaseAuth.onAuthStateChanged(
        (firebaseUser) => {
          syncSignedInUser(firebaseUser, { showToast: firebaseAuthBootstrapped });
          firebaseAuthBootstrapped = true;
        },
        () => {
          toast(t("toast_auth_unavailable"));
        }
      );
    } catch {
      firebaseAuth = null;
      firebaseAuthReady = false;
      renderAuthUi();
      toast(t("toast_auth_unavailable"));
    }
  };

  // --- Toast ---

  let lastToastAt = 0;

  const toast = (msg) => {
    if (!els.toast) return;
    const text = String(msg || "").trim();
    if (!text) return;

    const tNow = nowMs();
    if (tNow - lastToastAt < 180 && els.toast.textContent === text) return;
    lastToastAt = tNow;

    els.toast.hidden = false;
    els.toast.textContent = text;
    els.toast.classList.add("toast--show");

    window.clearTimeout(toast._t);
    window.clearTimeout(toast._h);
    toast._t = window.setTimeout(() => {
      if (!els.toast) return;
      els.toast.classList.remove("toast--show");
      toast._h = window.setTimeout(() => {
        if (!els.toast) return;
        els.toast.hidden = true;
        if (els.toast.textContent === text) els.toast.textContent = "";
      }, 220);
    }, 3400);
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

  const normalizeAreaRadiusM = (value) => {
    return clampInt(value, 10, 500, 100);
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
    const bucket = Math.floor((Number(now) || 0) / AURA_RECOMPUTE_MS);
    if (
      derivedCache.longTermAura.rev === activityLogRevision &&
      derivedCache.longTermAura.bucket === bucket &&
      derivedCache.longTermAura.data
    ) {
      return derivedCache.longTermAura.data;
    }

    // Habit-first weighting:
    // - Aggregate by (activity key, day).
    // - Each day contributes up to ~1 with a saturating curve (so one long session doesn't dominate).
    // - Older days decay with a half-life.
    const halfLifeDays = 12;
    const maxLookbackDays = 120;
    const minDurMs = 30_000;
    const minutesSaturation = 30;

    const dayScore = (minutes) => 1 - Math.exp(-Math.max(0, minutes) / minutesSaturation); // 0..1

    const buckets = new Map(); // key -> Map(dayISO -> bucket)
    for (const entry of state.activity.log) {
      if (!entry || !entry.endedAt || !entry.startedAt) continue;
      const endedAt = Number(entry.endedAt) || 0;
      const startedAt = Number(entry.startedAt) || 0;
      if (endedAt <= 0 || startedAt <= 0) continue;

      const ageDays = Math.max(0, (now - endedAt) / 86_400_000);
      if (ageDays > maxLookbackDays) continue;

      const durMs = Math.max(0, endedAt - startedAt);
      if (durMs < minDurMs) continue;

      const text = normalizeActivityText(entry.text || "");
      const legacyType = entry.type ? normalizeActivityType(entry.type) : null;
      const fallbackLabel = text || (legacyType ? typeLabel(legacyType) : "");
      const key = activityKeyFromText(entry.key || text || fallbackLabel);
      if (!key) continue;

      const legacyColor = legacyType && ACTIVITY_TYPES[legacyType] ? ACTIVITY_TYPES[legacyType].color : null;
      const colorHex = String(entry.colorHex || entry.color || legacyColor || activityColorHex(key)).trim();

      const dayId = dayISOFromMs(endedAt);
      const perKey = buckets.get(key) || new Map();
      const prev = perKey.get(dayId) || {
        key,
        label: fallbackLabel || "—",
        colorHex,
        minutes: 0,
        lastAt: 0
      };
      prev.minutes += durMs / 60_000;
      if (endedAt >= prev.lastAt) {
        prev.lastAt = endedAt;
        prev.label = fallbackLabel || prev.label;
        prev.colorHex = colorHex;
      }
      perKey.set(dayId, prev);
      buckets.set(key, perKey);
    }

    let wSum = 0;
    let lr = 0;
    let lg = 0;
    let lb = 0;
    const byActivity = new Map(); // key -> {key,label,colorHex,weight}

    for (const [key, perDay] of buckets.entries()) {
      let weight = 0;
      let label = "—";
      let colorHex = activityColorHex(key);

      for (const bucket of perDay.values()) {
        if (!bucket) continue;
        label = bucket.label || label;
        colorHex = bucket.colorHex || colorHex;
        const ageDays = Math.max(0, (now - (bucket.lastAt || now)) / 86_400_000);
        const decay = Math.pow(0.5, ageDays / halfLifeDays);
        weight += decay * dayScore(bucket.minutes || 0);
      }

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

      byActivity.set(key, { key, label, colorHex, weight });
    }

    if (wSum <= 0) {
      const empty = { hex: "#FF6A00", byActivity: [] };
      derivedCache.longTermAura = { rev: activityLogRevision, bucket, data: empty };
      return empty;
    }

    const rr = linearToSrgb(lr / wSum) * 255;
    const gg = linearToSrgb(lg / wSum) * 255;
    const bb = linearToSrgb(lb / wSum) * 255;
    const hex = rgbToHex(rr, gg, bb);

    const byActivityArr = Array.from(byActivity.values())
      .sort((a, b) => b.weight - a.weight)
      .map(({ key, label, colorHex, weight }) => ({ key, label, colorHex, weight }));

    const result = { hex, byActivity: byActivityArr };
    derivedCache.longTermAura = { rev: activityLogRevision, bucket, data: result };
    return result;
  };

  const computeAuraStrength = (now) => {
    const bucket = Math.floor((Number(now) || 0) / AURA_STRENGTH_RECOMPUTE_MS);
    if (
      derivedCache.auraStrength.rev === activityLogRevision &&
      derivedCache.auraStrength.bucket === bucket &&
      derivedCache.auraStrength.data
    ) {
      return derivedCache.auraStrength.data;
    }

    // Strength is based on daily repetition (habit), not a single long session.
    // We look at distinct active days per activity key in a recent window,
    // then apply a saturating curve and blend the top few habits.
    const windowDays = 21;
    const minDurMs = 30_000;
    const perKeyDays = new Map(); // key -> Set(dayISO)

    for (const entry of state.activity.log) {
      if (!entry || !entry.endedAt || !entry.startedAt) continue;
      const endedAt = Number(entry.endedAt) || 0;
      const startedAt = Number(entry.startedAt) || 0;
      if (endedAt <= 0 || startedAt <= 0) continue;
      if (endedAt > now) continue;
      const ageDays = Math.max(0, (now - endedAt) / 86_400_000);
      if (ageDays > windowDays) continue;

      const durMs = Math.max(0, endedAt - startedAt);
      if (durMs < minDurMs) continue;

      const text = normalizeActivityText(entry.text || "");
      const legacyType = entry.type ? normalizeActivityType(entry.type) : null;
      const fallbackLabel = text || (legacyType ? typeLabel(legacyType) : "");
      const key = activityKeyFromText(entry.key || text || fallbackLabel);
      if (!key) continue;

      const dayId = dayISOFromMs(endedAt);
      const set = perKeyDays.get(key) || new Set();
      set.add(dayId);
      perKeyDays.set(key, set);
    }

    const counts = Array.from(perKeyDays.values())
      .map((s) => s.size)
      .sort((a, b) => b - a);

    const curve = (days) => 1 - Math.exp(-Math.max(0, days) / 3); // 0..1, fast saturation
    const c0 = curve(counts[0] || 0);
    const c1 = curve(counts[1] || 0);
    const c2 = curve(counts[2] || 0);
    const strength = clamp(c0 * 0.62 + c1 * 0.26 + c2 * 0.12, 0, 1);
    const result = { strength, counts };
    derivedCache.auraStrength = { rev: activityLogRevision, bucket, data: result };
    return result;
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
        colorHex: "#201812",
        strokeOpacity: 0.28,
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
        "stroke-opacity": Number.isFinite(Number(entry && entry.strokeOpacity)) ? Number(entry.strokeOpacity) : 1,
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
      const raw = String((entry && entry.colorHex) || "#FF6A00").trim();
      const rgb = hexToRgb(raw);
      const tint = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)` : raw;
      li.style.setProperty("--auraTint", tint);

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
    const entries = Array.isArray(longTerm.byActivity) ? longTerm.byActivity : [];
    const sig = `${i18nLang}|${longTerm.hex}|${entries.length}|${entries
      .slice(0, 7)
      .map((e) => `${String(e && e.key)}:${Math.round((Number(e && e.weight) || 0) * 1000)}`)
      .join("|")}`;
    if (sig !== derivedCache.auraLegendSig) {
      derivedCache.auraLegendSig = sig;
      renderAuraComposition(longTerm);
    }

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

  const userAuraAgeMs = (now) => {
    if (state.activity.active) return 0;
    if (derivedCache.lastEndedAt.rev !== activityLogRevision) {
      let lastEndedAt = 0;
      for (const entry of state.activity.log) {
        const t = Number(entry && entry.endedAt) || 0;
        if (t > lastEndedAt) lastEndedAt = t;
      }
      derivedCache.lastEndedAt = { rev: activityLogRevision, value: lastEndedAt };
    }
    const lastEndedAt = Number(derivedCache.lastEndedAt.value) || 0;
    if (!lastEndedAt) return 0;
    return Math.max(0, now - lastEndedAt);
  };

  const shouldShowUserAura = (now) => {
    const active = state.activity.active;
    if (active) return Boolean(active.showAuraOnMap);
    return Boolean(state.activity.prefs.idleShowAuraOnMap) || hasAuraLinger(now);
  };

  const syncUserAuraOnMap = (now, auraHex) => {
    if (!mapApi) return;
    const enabled = shouldShowUserAura(now);
    const strength = computeAuraStrength(now).strength;
    mapApi.setUserAura({
      enabled,
      color: auraHex,
      verified: Boolean(state.tasks && state.tasks.prefs && state.tasks.prefs.userVerified),
      visibilityMode: normalizeVisibilityMode(state.activity.prefs.visibilityMode),
      areaRadiusM: normalizeAreaRadiusM(state.activity.prefs.areaRadiusM),
      ageMs: userAuraAgeMs(now),
      strength
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
      if (!hasAuraLinger(now) && !state.activity.prefs.idleShowAuraOnMap) stopActivityTicker();
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
    if (active || hasAuraLinger(now) || state.activity.prefs.idleShowAuraOnMap) ensureActivityTicker();
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

  const memoSetBounded = (map, key, value, max) => {
    if (!map || typeof map.set !== "function") return;
    if (map.has(key)) map.delete(key);
    map.set(key, value);
    if (map.size > max) {
      const first = map.keys().next();
      if (!first.done) map.delete(first.value);
    }
  };

  const tokensForKey = (value) => {
    const key = String(value || "");
    const memo = derivedCache.tokens;
    if (memo.has(key)) return memo.get(key);
    const tokens = key
      .split(/[_\s-]+/g)
      .map((x) => String(x || "").trim())
      .filter(Boolean);
    memoSetBounded(memo, key, tokens, TOKEN_MEMO_MAX);
    return tokens;
  };

  const bigramCounts = (value) => {
    const key = String(value || "");
    const memo = derivedCache.bigrams;
    if (memo.has(key)) return memo.get(key);

    const map = new Map();
    for (let i = 0; i < key.length - 1; i++) {
      const bg = key.slice(i, i + 2);
      map.set(bg, (map.get(bg) || 0) + 1);
    }
    memoSetBounded(memo, key, map, BIGRAM_MEMO_MAX);
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

  const tokenJaccard = (a, b) => {
    const aa = tokensForKey(a);
    const bb = tokensForKey(b);
    if (!aa.length || !bb.length) return 0;

    const setA = new Set(aa);
    const setB = new Set(bb);
    let inter = 0;
    for (const tok of setA) {
      if (setB.has(tok)) inter += 1;
    }
    const union = setA.size + setB.size - inter;
    if (union <= 0) return 0;
    return inter / union;
  };

  const similarityScore = (queryKey, candidateKey) => {
    const q = String(queryKey || "");
    const c = String(candidateKey || "");
    if (!q || !c) return 0;
    if (c === q) return 100;

    const cacheKey = q < c ? `${q}|${c}` : `${c}|${q}`;
    if (derivedCache.similarity.has(cacheKey)) {
      return derivedCache.similarity.get(cacheKey);
    }

    let score = 0;
    if (c.startsWith(q)) score = 90;
    else if (c.includes(q)) score = 74;

    const dice = diceCoefficient(q, c);
    const jac = tokenJaccard(q, c);
    const qTokens = tokensForKey(q);
    const cTokens = tokensForKey(c);
    const cSet = new Set(cTokens);
    const tokenCover = qTokens.length ? qTokens.every((tok) => cSet.has(tok)) : false;

    const blended = Math.round((dice * 58) + (jac * 42));
    score = Math.max(score, blended);
    if (tokenCover) score = Math.max(score, 80);

    // Keep short inputs permissive while preventing weak noisy matches.
    if (q.length <= 2 && !c.startsWith(q)) score = Math.min(score, 58);
    score = clamp(score, 0, 100);

    memoSetBounded(derivedCache.similarity, cacheKey, score, ACTIVITY_SIM_CACHE_MAX);
    return score;
  };

  const collectKnownActivities = () => {
    if (derivedCache.knownActivities.rev === activityLogRevision && Array.isArray(derivedCache.knownActivities.data)) {
      return derivedCache.knownActivities.data;
    }

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
    const result = Array.from(seen.values()).sort((a, b) => b.lastAt - a.lastAt);
    derivedCache.knownActivities = { rev: activityLogRevision, data: result };
    return result;
  };

  const topKSimilarActivities = (known, draftKey, limit = 5) => {
    const top = [];
    for (const item of known) {
      if (!item || item.key === draftKey) continue;
      const score = similarityScore(draftKey, item.key);
      if (score < 22) continue;
      const candidate = {
        key: item.key,
        label: item.label,
        colorHex: item.colorHex,
        lastAt: Number(item.lastAt) || 0,
        score
      };

      let inserted = false;
      for (let i = 0; i < top.length; i++) {
        const cur = top[i];
        if (candidate.score > cur.score || (candidate.score === cur.score && candidate.lastAt > cur.lastAt)) {
          top.splice(i, 0, candidate);
          inserted = true;
          break;
        }
      }
      if (!inserted) top.push(candidate);
      if (top.length > limit) top.length = limit;
    }

    return top.map(({ key, label, colorHex }) => ({ key, label, colorHex }));
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
    const scored = topKSimilarActivities(known, draftKey, 5);

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

    if (els.visArea) els.visArea.hidden = mode !== "area";
    if (els.visApproved) els.visApproved.hidden = mode !== "connected";

    const areaM = normalizeAreaRadiusM(state.activity.prefs.areaRadiusM);
    state.activity.prefs.areaRadiusM = areaM;
    if (els.areaRadius) els.areaRadius.value = String(areaM);
    if (els.areaRadiusValue) els.areaRadiusValue.textContent = `${areaM}m`;
    if (els.visAreaNote) els.visAreaNote.textContent = t("visibility_area_note", { m: areaM });

    const room = state.activity.prefs.room || { code: "", joined: false };
    const roomCode = normalizeRoomCode(room.code);
    const joined = Boolean(room.joined);
    if (els.visRoom) els.visRoom.hidden = mode !== "connected";
    if (els.visRoomCode) els.visRoomCode.value = roomCode;
    if (els.visRoomJoin) els.visRoomJoin.hidden = joined;
    if (els.visRoomLeave) els.visRoomLeave.hidden = !joined;
    if (els.visRoomState) {
      els.visRoomState.textContent = joined ? t("room_state_on") : t("room_state_off");
      els.visRoomState.classList.toggle("badge--ok", joined);
      els.visRoomState.classList.toggle("badge--warn", !joined);
    }

    renderApprovedList();
    renderBlockedList();
  };

  const renderBlockedList = () => {
    if (!els.blockedList) return;
    els.blockedList.replaceChildren();

    const items = state.social && Array.isArray(state.social.blocked) ? state.social.blocked.slice() : [];
    if (!items.length) {
      const li = document.createElement("li");
      li.className = "approvedEmpty";
      li.textContent = t("blocked_empty");
      els.blockedList.appendChild(li);
      return;
    }

    for (const handle of items) {
      const li = document.createElement("li");
      li.className = "approvedItem";

      const dot = document.createElement("span");
      dot.className = "approvedDot";
      dot.style.background = mixHex(activityColorHex(handle), "#8f8580", 0.45);

      const name = document.createElement("span");
      name.className = "approvedName";
      name.textContent = handle;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "iconBtn";
      remove.textContent = t("blocked_remove").toUpperCase();
      remove.addEventListener("click", () => {
        unblockContact(handle, { notify: true, rerender: true });
      });

      li.appendChild(dot);
      li.appendChild(name);
      li.appendChild(remove);
      els.blockedList.appendChild(li);
    }
  };

  const ensureApprovedContact = (value, { notify = true, rerender = true } = {}) => {
    const handle = normalizeContactHandle(value);
    if (!handle) return { ok: false, reason: "invalid", handle: "" };
    if (state.social && Array.isArray(state.social.blocked) && state.social.blocked.includes(handle)) {
      state.social.blocked = state.social.blocked.filter((x) => x !== handle);
      if (mapApi && typeof mapApi.refreshBlocked === "function") mapApi.refreshBlocked();
    }
    if (!Array.isArray(state.activity.prefs.allowlist)) state.activity.prefs.allowlist = [];
    if (state.activity.prefs.allowlist.includes(handle)) {
      if (notify) toast(t("toast_contact_exists"));
      return { ok: false, reason: "exists", handle };
    }
    state.activity.prefs.allowlist.unshift(handle);
    state.activity.prefs.allowlist = state.activity.prefs.allowlist.slice(0, 200);
    saveState();
    if (rerender) renderActivity(false);
    if (notify) toast(t("toast_contact_added"));
    return { ok: true, reason: "added", handle };
  };

  const isBlockedContact = (value) => {
    const handle = normalizeContactHandle(value);
    if (!handle) return false;
    const blocked = state.social && Array.isArray(state.social.blocked) ? state.social.blocked : [];
    return blocked.includes(handle);
  };

  const blockContact = (value, { notify = true, rerender = true } = {}) => {
    const handle = normalizeContactHandle(value);
    if (!handle) return { ok: false, reason: "invalid", handle: "" };
    if (!state.social || typeof state.social !== "object") state.social = { sent: [], blocked: [] };
    if (!Array.isArray(state.social.blocked)) state.social.blocked = [];
    if (state.social.blocked.includes(handle)) return { ok: false, reason: "exists", handle };
    state.social.blocked.unshift(handle);
    state.social.blocked = state.social.blocked.slice(0, 400);
    if (Array.isArray(state.activity.prefs.allowlist)) {
      state.activity.prefs.allowlist = state.activity.prefs.allowlist.filter((x) => x !== handle);
    }
    saveState();
    if (mapApi && typeof mapApi.refreshBlocked === "function") mapApi.refreshBlocked();
    if (rerender) renderActivity(false);
    if (notify) toast(t("toast_contact_blocked", { handle }));
    return { ok: true, reason: "blocked", handle };
  };

  const unblockContact = (value, { notify = true, rerender = true } = {}) => {
    const handle = normalizeContactHandle(value);
    if (!handle) return { ok: false, reason: "invalid", handle: "" };
    if (!state.social || typeof state.social !== "object") state.social = { sent: [], blocked: [] };
    if (!Array.isArray(state.social.blocked)) state.social.blocked = [];
    const before = state.social.blocked.length;
    state.social.blocked = state.social.blocked.filter((x) => x !== handle);
    if (state.social.blocked.length === before) return { ok: false, reason: "missing", handle };
    saveState();
    if (mapApi && typeof mapApi.refreshBlocked === "function") mapApi.refreshBlocked();
    if (rerender) renderActivity(false);
    if (notify) toast(t("toast_contact_unblocked", { handle }));
    return { ok: true, reason: "unblocked", handle };
  };

  const saveDirectMessage = (toHandleRaw, messageRaw) => {
    const to = normalizeContactHandle(toHandleRaw);
    if (!to) return { ok: false, reason: "invalid_handle", handle: "" };
    const text = normalizeActivityText(messageRaw).slice(0, 280);
    if (!text) return { ok: false, reason: "empty", handle: to };
    if (!state.social || typeof state.social !== "object") state.social = { sent: [] };
    if (!Array.isArray(state.social.sent)) state.social.sent = [];
    state.social.sent.unshift({
      id: uid(),
      to,
      text,
      from: userKey,
      sentAt: nowMs()
    });
    state.social.sent = state.social.sent.slice(0, 400);
    saveState();
    return { ok: true, handle: to };
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

  // --- Tasks (Local-Only Marketplace Prototype) ---

  // --- Marketplace Tabs (Tasks / Market / Scheduled) ---

  const MARKET_TABS = ["tasks", "market", "events"];

  const normalizeMarketTab = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return MARKET_TABS.includes(v) ? v : "tasks";
  };

  const ensureUiPrefs = () => {
    const base = defaultState().ui;
    if (!state.ui || typeof state.ui !== "object") state.ui = { ...base };
    const prevRev = clampInt(state.ui.rev, 1, 999, 1);
    state.ui.rev = prevRev;
    state.ui.section = ["activitySection", "mapSection", "marketplaceSection"].includes(String(state.ui.section || ""))
      ? String(state.ui.section)
      : base.section;
    state.ui.mapFilters = normalizeMapLayerFilters(state.ui.mapFilters || base.mapFilters);
    state.ui.listFilters = normalizeUiListFilters(state.ui.listFilters || base.listFilters);
    state.ui.onboardingOpen = state.ui.onboardingOpen !== false;
    if (!state.ui.drops || typeof state.ui.drops !== "object") state.ui.drops = { ...base.drops };
    state.ui.drops = { ...base.drops, ...state.ui.drops };
    if (prevRev < base.rev) {
      state.ui.rev = base.rev;
      state.ui.section = base.section;
      state.ui.drops = { ...base.drops };
      saveState();
    }
  };

  const setDetailsOpen = (el, open) => {
    if (!el) return;
    const want = Boolean(open);
    if (el.open === want) return;
    el.open = want;
  };

  const applyDropStates = () => {
    ensureUiPrefs();
    setDetailsOpen(els.dropTasksPost, state.ui.drops.tasksPost);
    setDetailsOpen(els.dropTasksList, state.ui.drops.tasksList);
    setDetailsOpen(els.dropMarketPost, state.ui.drops.marketPost);
    setDetailsOpen(els.dropMarketList, state.ui.drops.marketList);
    setDetailsOpen(els.dropEventsPost, state.ui.drops.eventsPost);
    setDetailsOpen(els.dropEventsList, state.ui.drops.eventsList);
  };

  const renderOnboarding = () => {
    ensureUiPrefs();
    setDetailsOpen(els.onboardPanel, state.ui.onboardingOpen);
  };

  const renderListFilterMeta = (el, total, shown) => {
    if (!el) return;
    const totalN = Math.max(0, Number(total) || 0);
    const shownN = Math.max(0, Number(shown) || 0);
    if (totalN <= 0) {
      el.textContent = "";
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.textContent = shownN > 0 ? t("filter_results", { shown: shownN, total: totalN }) : t("filter_results_none");
  };

  const patchUiListFilter = (scope, patch) => {
    ensureUiPrefs();
    const s = String(scope || "").trim();
    if (!["tasks", "market", "events"].includes(s)) return null;
    const current = normalizeUiListFilters(state.ui.listFilters);
    const next = {
      ...current,
      [s]: {
        ...(current[s] || {}),
        ...(patch && typeof patch === "object" ? patch : {})
      }
    };
    state.ui.listFilters = normalizeUiListFilters(next);
    saveState();
    return state.ui.listFilters[s];
  };

  const setMarketTabSelected = (tab) => {
    const next = normalizeMarketTab(tab);
    if (els.marketTabs) {
      for (const btn of Array.from(els.marketTabs.querySelectorAll("button[data-tab]"))) {
        const tKey = String(btn.getAttribute("data-tab") || "");
        const selected = tKey === next;
        btn.setAttribute("aria-selected", selected ? "true" : "false");
        btn.tabIndex = selected ? 0 : -1;
      }
    }
    if (els.tabTasks) els.tabTasks.hidden = next !== "tasks";
    if (els.tabMarket) els.tabMarket.hidden = next !== "market";
    if (els.tabEvents) els.tabEvents.hidden = next !== "events";
  };

  const renderMarketplaceTabs = () => {
    ensureUiPrefs();
    state.ui.marketTab = normalizeMarketTab(state.ui.marketTab);
    setMarketTabSelected(state.ui.marketTab);
  };

  const mapFilterEntries = () => [
    { key: "people", el: els.mapFilterPeople },
    { key: "events", el: els.mapFilterEvents },
    { key: "services", el: els.mapFilterServices }
  ];

  const renderMapLayerFilters = () => {
    ensureUiPrefs();
    const filters = normalizeMapLayerFilters(state.ui.mapFilters);
    state.ui.mapFilters = filters;

    for (const entry of mapFilterEntries()) {
      if (!entry.el) continue;
      const on = Boolean(filters[entry.key]);
      entry.el.setAttribute("aria-pressed", on ? "true" : "false");
      entry.el.classList.toggle("mapFilterBtn--on", on);
    }

    if (mapApi && typeof mapApi.setLayerFilters === "function") {
      mapApi.setLayerFilters(filters);
    }
  };

  const toggleMapLayerFilter = (key) => {
    ensureUiPrefs();
    const k = String(key || "").trim();
    if (!["people", "events", "services"].includes(k)) return;
    const current = normalizeMapLayerFilters(state.ui.mapFilters);
    const next = { ...current, [k]: !current[k] };
    state.ui.mapFilters = next;
    saveState();
    renderMapLayerFilters();
  };

  const USER_ACTOR = { kind: "user", id: "you" };
  const TASK_STATUS = ["open", "accepted", "completed", "expired", "cancelled"];

  const normalizeTaskStatus = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return TASK_STATUS.includes(v) ? v : "open";
  };

  const matchesTaskFilterStatus = (status, filterStatus) => {
    const st = normalizeTaskStatus(status);
    const f = normalizeTaskListFilterStatus(filterStatus);
    if (f === "all") return true;
    if (f === "closed") return st === "expired" || st === "cancelled";
    return st === f;
  };

  const normalizeTaskTitle = (value) => {
    const s = normalizeActivityText(value);
    return s.slice(0, 72);
  };

  const usdToCents = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.round(n * 100));
  };

  const fmtUsd = (cents) => {
    const c = Number(cents) || 0;
    const sign = c < 0 ? "-" : "";
    const abs = Math.abs(Math.round(c));
    const dollars = (abs / 100).toFixed(2);
    return `${sign}$${dollars}`;
  };

  const fmtMinutes = (ms) => {
    const m = Math.max(0, Math.round(ms / 60_000));
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return mm ? `${h}h ${mm}m` : `${h}h`;
  };

  const clampIntSafe = (value, min, max, fallback) => clampInt(value, min, max, fallback);
  const randBetween = (min, max) => min + Math.random() * (max - min);

  const haversineM = (a, b) => {
    if (!a || !b) return Infinity;
    const lat1 = (Number(a.lat) || 0) * (Math.PI / 180);
    const lat2 = (Number(b.lat) || 0) * (Math.PI / 180);
    const dLat = lat2 - lat1;
    const dLng = ((Number(b.lng) || 0) - (Number(a.lng) || 0)) * (Math.PI / 180);
    const sin1 = Math.sin(dLat / 2);
    const sin2 = Math.sin(dLng / 2);
    const h = sin1 * sin1 + Math.cos(lat1) * Math.cos(lat2) * sin2 * sin2;
    const R = 6371_000;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  };

  const wrapLng180 = (lng) => ((Number(lng) + 180) % 360 + 360) % 360 - 180;

  const offsetLatLngMeters = (latLng, eastM, northM) => {
    const lat = Number(latLng && latLng.lat);
    const lng = Number(latLng && latLng.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    const latRad = (lat * Math.PI) / 180;
    const mPerDegLat = 111_320;
    const mPerDegLng = Math.max(1, mPerDegLat * Math.cos(latRad));
    const dLat = Number(northM || 0) / mPerDegLat;
    const dLng = Number(eastM || 0) / mPerDegLng;
    return { lat: Math.max(-85, Math.min(85, lat + dLat)), lng: wrapLng180(lng + dLng) };
  };

  const quantizeLatLngToGrid = (latLng, gridM) => {
    const lat = Number(latLng && latLng.lat);
    const lng = Number(latLng && latLng.lng);
    const g = Math.max(1, Number(gridM) || 250);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    const latRad = (lat * Math.PI) / 180;
    const mPerDegLat = 111_320;
    const mPerDegLng = Math.max(1, mPerDegLat * Math.cos(latRad));
    const dLat = g / mPerDegLat;
    const dLng = g / mPerDegLng;
    const qLat = Math.round(lat / dLat) * dLat;
    const qLng = Math.round(lng / dLng) * dLng;
    return { lat: Math.max(-85, Math.min(85, qLat)), lng: wrapLng180(qLng) };
  };

  const taskTetherGridMFor = (distanceLimitM) => {
    const d = Math.max(50, Number(distanceLimitM) || 800);
    // Larger tasks -> blur more, but cap so lines still feel local.
    return clampIntSafe(Math.round(d * 0.25), 80, 500, 250);
  };

  const taskAreaAnchor = (latLng, gridM, seed) => {
    const q = quantizeLatLngToGrid(latLng, gridM);
    if (!q) return null;
    const h = fnv1a32(String(seed || "task"));
    const span = Math.max(8, Math.min(220, (Number(gridM) || 250) * 0.38));
    const east = ((((h & 0xffff) / 0xffff) * 2 - 1) * span);
    const north = (((((h >>> 16) & 0xffff) / 0xffff) * 2 - 1) * span);
    return offsetLatLngMeters(q, east, north);
  };

  const taskFeeBps = () => clampIntSafe(state.tasks && state.tasks.prefs && state.tasks.prefs.feeBps, 0, 5000, 1000);

  const computeFeeCents = (rewardCents, feeBps) => {
    const r = Math.max(0, Math.round(Number(rewardCents) || 0));
    const bps = clampIntSafe(feeBps, 0, 5000, 1000);
    return Math.round((r * bps) / 10_000);
  };

  const actorKeyLocal = (actor) => {
    if (!actor || typeof actor !== "object") return "";
    const kind = String(actor.kind || "").trim();
    const id = String(actor.id || "").trim();
    if (!kind || !id) return "";
    return `${kind}:${id}`;
  };

  const userKey = actorKeyLocal(USER_ACTOR);

  const reputationStatsForKey = (key) => {
    const k = String(key || "").trim();
    const repMap =
      state && state.tasks && state.tasks.reputation && typeof state.tasks.reputation === "object"
        ? state.tasks.reputation
        : null;
    const rec = repMap && k ? repMap[k] : null;
    const sum = rec && Number.isFinite(Number(rec.sum)) ? Number(rec.sum) : 0;
    const count = rec && Number.isFinite(Number(rec.count)) ? Number(rec.count) : 0;
    const safeCount = Math.max(0, Math.round(count));
    const avg = safeCount > 0 ? sum / safeCount : 0;
    return { sum: Math.max(0, sum), count: safeCount, avg };
  };

  const reputationFactorForKey = (key) => {
    const { avg, count } = reputationStatsForKey(key);
    if (count <= 0 || avg <= 0) return 1;
    const avgClamped = clamp(avg, 1, 5);
    const base = clamp(1 + (avgClamped - 3) * 0.08, 0.84, 1.16);
    const conf = clamp(Math.log10(1 + count) / 1.1, 0, 1);
    return 1 + (base - 1) * conf;
  };

  const bumpReputation = (key, rating) => {
    ensureTaskPrefs();
    const k = String(key || "").trim();
    const r = clampIntSafe(rating, 1, 5, 0);
    if (!k || !r) return;
    const prev = state.tasks.reputation[k] || { sum: 0, count: 0 };
    const sum = (Number(prev.sum) || 0) + r;
    const count = (Number(prev.count) || 0) + 1;
    state.tasks.reputation[k] = { sum, count };
  };

  const isUserVerified = () => Boolean(state.tasks && state.tasks.prefs && state.tasks.prefs.userVerified);

  const getActorInfoSafe = (actor) => {
    const base = mapApi && typeof mapApi.getActorInfo === "function" ? mapApi.getActorInfo(actor) : null;
    if (actor && actor.kind === "user") {
      return { label: (base && base.label) || "@you", verified: isUserVerified() };
    }
    if (base) return base;
    return { label: "@sim", verified: false };
  };

  const getActorLatLngSafe = (actor) => {
    if (mapApi && typeof mapApi.getActorLatLng === "function") return mapApi.getActorLatLng(actor);
    return null;
  };

  const ensureUserLatLngSafe = async () => {
    let ll = getActorLatLngSafe(USER_ACTOR);
    if (ll) return ll;
    if (mapApi && typeof mapApi.requestGpsOnce === "function") {
      try {
        await mapApi.requestGpsOnce();
      } catch {
        // ignore
      }
    }
    ll = getActorLatLngSafe(USER_ACTOR);
    return ll || null;
  };

  const syncTasksOnMap = () => {
    if (!mapApi || typeof mapApi.setTasks !== "function") return;
    mapApi.setTasks(state.tasks && Array.isArray(state.tasks.list) ? state.tasks.list : []);
  };

  // --- Task Room (Conversation) ---

  let openRoomTaskId = "";

  const ensureRoom = (taskId) => {
    ensureTaskPrefs();
    const id = String(taskId || "");
    if (!id) return null;
    if (!state.tasks.rooms[id]) state.tasks.rooms[id] = { messages: [], visibility: "participants", ownerKey: "" };
    if (!Array.isArray(state.tasks.rooms[id].messages)) state.tasks.rooms[id].messages = [];
    if (!state.tasks.rooms[id].visibility) state.tasks.rooms[id].visibility = "participants";
    if (!state.tasks.rooms[id].ownerKey) state.tasks.rooms[id].ownerKey = "";
    return state.tasks.rooms[id];
  };

  const formatMsgTime = (ms) => {
    const t = Number(ms) || 0;
    if (!t) return "";
    try {
      return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const renderTaskRoom = () => {
    if (!els.roomModal || !els.roomBody || !els.roomMeta) return;
    if (!openRoomTaskId) return;
    ensureTaskPrefs();
    const task = state.tasks.list.find((x) => x && x.id === openRoomTaskId) || null;
    const room = state.tasks.rooms[openRoomTaskId] || { messages: [], visibility: "participants", ownerKey: "" };

    const posterInfo = task ? getActorInfoSafe(task.poster) : { label: "—", verified: false };
    const workerInfo = task && task.acceptedBy ? getActorInfoSafe(task.acceptedBy) : { label: "—", verified: false };
    const title = task ? normalizeTaskTitle(task.title) : "";
    const posterLabel = task ? String(task.posterLabel || posterInfo.label || "—") : "—";
    const workerLabel = task ? String(task.workerLabel || workerInfo.label || "—") : "—";

    if (els.roomTitle) els.roomTitle.textContent = t("room_title");
    els.roomMeta.textContent = title ? `${posterLabel} ↔ ${workerLabel} • ${title}` : `${posterLabel} ↔ ${workerLabel}`;

    const vis = room && room.visibility === "public" ? "public" : "participants";
    const ownerKey = room && typeof room.ownerKey === "string" ? room.ownerKey : "";
    const isOwner = ownerKey && ownerKey === userKey;
    if (els.roomControls) els.roomControls.hidden = !isOwner;
    if (els.roomVisibility) {
      for (const btn of Array.from(els.roomVisibility.querySelectorAll("button[data-room-vis]"))) {
        const v = String(btn.getAttribute("data-room-vis") || "");
        btn.setAttribute("aria-selected", v === vis ? "true" : "false");
      }
    }

    els.roomBody.replaceChildren();
    const msgs = Array.isArray(room.messages) ? room.messages.slice(-200) : [];
    for (const m of msgs) {
      if (!m || !m.from) continue;
      const fromKey = actorKeyLocal(m.from);
      const isMe = fromKey === userKey;
      const info = getActorInfoSafe(m.from);

      const wrap = document.createElement("div");
      wrap.className = `msg${isMe ? " msg--me" : ""}`;

      const bubble = document.createElement("div");
      bubble.className = "msg__bubble";

      const from = document.createElement("div");
      from.className = "msg__from";
      from.textContent = (info && info.label) || "@";
      bubble.appendChild(from);

      const type = String(m.type || "text");
      if (type === "photo" && m.photo) {
        if (m.text) {
          const tEl = document.createElement("div");
          tEl.className = "msg__text";
          tEl.textContent = String(m.text);
          bubble.appendChild(tEl);
        }
        const ph = document.createElement("div");
        ph.className = "msg__photo";
        const img = document.createElement("img");
        img.alt = "photo";
        img.loading = "lazy";
        img.decoding = "async";
        img.src = String(m.photo);
        ph.appendChild(img);
        bubble.appendChild(ph);
      } else if (type === "location" && Number.isFinite(Number(m.lat)) && Number.isFinite(Number(m.lng))) {
        if (m.text) {
          const tEl = document.createElement("div");
          tEl.className = "msg__text";
          tEl.textContent = String(m.text);
          bubble.appendChild(tEl);
        }
        const loc = document.createElement("div");
        loc.className = "msg__loc";
        const coords = document.createElement("span");
        const lat = Number(m.lat);
        const lng = Number(m.lng);
        coords.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        loc.appendChild(coords);
        const viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.className = "btn btn--ghost";
        viewBtn.textContent = t("room_view_on_map");
        viewBtn.addEventListener("click", () => {
          if (mapApi && typeof mapApi.focusLatLng === "function") {
            mapApi.focusLatLng({ lat, lng, zoom: 16 });
          }
        });
        loc.appendChild(viewBtn);
        bubble.appendChild(loc);
      } else {
        const tEl = document.createElement("div");
        tEl.className = "msg__text";
        tEl.textContent = String(m.text || "");
        bubble.appendChild(tEl);
      }

      const meta = document.createElement("div");
      meta.className = "msg__meta";
      meta.textContent = formatMsgTime(m.sentAt);
      bubble.appendChild(meta);

      wrap.appendChild(bubble);
      els.roomBody.appendChild(wrap);
    }

    els.roomBody.scrollTop = els.roomBody.scrollHeight;
  };

  const canCurrentUserOpenRoomForTask = (task) => {
    if (!task || !task.id) return false;
    if (normalizeTaskStatus(task.status) !== "accepted") return false;
    const posterKey = actorKeyLocal(task.poster);
    const workerKey = task.acceptedBy ? actorKeyLocal(task.acceptedBy) : "";
    return posterKey === userKey || workerKey === userKey;
  };

  const openTaskRoom = (taskId) => {
    if (!els.roomModal) return;
    const id = String(taskId || "");
    if (!id) return;
    ensureTaskPrefs();
    const task = state.tasks.list.find((x) => x && x.id === id) || null;
    if (!canCurrentUserOpenRoomForTask(task)) {
      toast(t("toast_room_only_accepted"));
      return;
    }
    openRoomTaskId = id;
    const room = ensureRoom(id);
    if (room && !room.ownerKey) {
      room.ownerKey = userKey;
      saveState();
    }
    els.roomModal.hidden = false;
    renderTaskRoom();
    if (els.roomMessage) els.roomMessage.focus();
  };

  const closeTaskRoom = () => {
    if (!els.roomModal) return;
    openRoomTaskId = "";
    els.roomModal.hidden = true;
  };

  const pushRoomMessage = (taskId, msg) => {
    const room = ensureRoom(taskId);
    if (!room) return;
    room.messages.push(msg);
    room.messages = room.messages.slice(-200);
    saveState();
    if (openRoomTaskId === String(taskId || "")) renderTaskRoom();
  };

  // --- Reviews (after task completion) ---

  let openReviewTaskId = "";
  let reviewRating = 0;

  const renderReviewStars = () => {
    if (!els.reviewStars) return;
    els.reviewStars.replaceChildren();
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "reviewStar";
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", i === reviewRating ? "true" : "false");
      b.textContent = `${i}★`;
      b.addEventListener("click", () => {
        reviewRating = i;
        renderReviewStars();
      });
      els.reviewStars.appendChild(b);
    }
  };

  const renderReviewModal = () => {
    if (!els.reviewModal || !els.reviewMeta) return;
    if (!openReviewTaskId) return;
    ensureTaskPrefs();
    const task = state.tasks.list.find((x) => x && x.id === openReviewTaskId) || null;
    if (!task) return;
    const title = normalizeTaskTitle(task.title || "");
    const worker = task.acceptedBy;
    const workerInfo = worker ? getActorInfoSafe(worker) : null;
    const workerLabel = workerInfo ? String(task.workerLabel || workerInfo.label || "—") : "—";
    els.reviewMeta.textContent = `${workerLabel} • ${title}`;
    renderReviewStars();
  };

  const openReviewModal = (taskId) => {
    if (!els.reviewModal) return;
    const id = String(taskId || "");
    if (!id) return;
    ensureTaskPrefs();
    const task = state.tasks.list.find((x) => x && x.id === id) || null;
    if (!task) return;
    if (normalizeTaskStatus(task.status) !== "completed") return;
    if (actorKeyLocal(task.poster) !== userKey) return;
    if (task.review && task.review.rating) {
      toast(t("toast_review_already"));
      return;
    }
    openReviewTaskId = id;
    reviewRating = 0;
    if (els.reviewNote) els.reviewNote.value = "";
    els.reviewModal.hidden = false;
    renderReviewModal();
  };

  const closeReviewModal = () => {
    if (!els.reviewModal) return;
    openReviewTaskId = "";
    els.reviewModal.hidden = true;
  };

  const submitReview = () => {
    if (!openReviewTaskId) return;
    ensureTaskPrefs();
    const task = state.tasks.list.find((x) => x && x.id === openReviewTaskId) || null;
    if (!task) return;
    if (actorKeyLocal(task.poster) !== userKey) return;
    if (task.review && task.review.rating) {
      toast(t("toast_review_already"));
      closeReviewModal();
      return;
    }
    const rating = clampIntSafe(reviewRating, 1, 5, 0);
    if (!rating) {
      toast(t("toast_review_pick_rating"));
      return;
    }
    const note = normalizeActivityText(els.reviewNote && els.reviewNote.value).slice(0, 240);
    const now = nowMs();
    task.review = { rating, note, by: USER_ACTOR, at: now };
    const workerKey = task.acceptedBy ? actorKeyLocal(task.acceptedBy) : "";
    if (workerKey) bumpReputation(workerKey, rating);
    saveState();
    closeReviewModal();
    renderTasks();
    if (mapApi && typeof mapApi.refreshReputation === "function") mapApi.refreshReputation();
    toast(t("toast_review_submitted"));
  };

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("read"));
      reader.onload = () => resolve(String(reader.result || ""));
      reader.readAsDataURL(file);
    });
  };

  const downscaleImageDataUrl = async (dataUrl, maxSide = 1100, quality = 0.82) => {
    if (!dataUrl) return "";
    const img = new Image();
    img.decoding = "async";
    img.src = dataUrl;
    try {
      await img.decode();
    } catch {
      // Fallback: allow browser to render without decode promise.
    }

    const w = Number(img.naturalWidth || img.width) || 0;
    const h = Number(img.naturalHeight || img.height) || 0;
    if (w <= 0 || h <= 0) return dataUrl;

    const scale = Math.min(1, maxSide / Math.max(w, h));
    if (scale >= 1) return dataUrl;

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  };

  const sendRoomText = () => {
    if (!openRoomTaskId) return;
    if (!els.roomMessage) return;
    const text = normalizeActivityText(els.roomMessage.value);
    if (!text) return;
    els.roomMessage.value = "";
    pushRoomMessage(openRoomTaskId, {
      id: uid(),
      type: "text",
      text,
      photo: "",
      lat: NaN,
      lng: NaN,
      accuracyM: 0,
      from: USER_ACTOR,
      sentAt: nowMs()
    });
  };

  const sendRoomPhoto = async (file) => {
    if (!openRoomTaskId) return;
    if (!file) return;
    const maxFileBytes = 6_000_000;
    if (file.size > maxFileBytes) {
      toast(t("toast_room_photo_too_large"));
      return;
    }
    let dataUrl = "";
    try {
      dataUrl = await readFileAsDataUrl(file);
      dataUrl = await downscaleImageDataUrl(dataUrl);
    } catch {
      toast(t("toast_room_photo_too_large"));
      return;
    }
    if (!dataUrl || dataUrl.length > 2_000_000) {
      toast(t("toast_room_photo_too_large"));
      return;
    }
    pushRoomMessage(openRoomTaskId, {
      id: uid(),
      type: "photo",
      text: "",
      photo: dataUrl,
      lat: NaN,
      lng: NaN,
      accuracyM: 0,
      from: USER_ACTOR,
      sentAt: nowMs()
    });
  };

  const sendRoomLocation = () => {
    if (!openRoomTaskId) return;
    if (!navigator.geolocation) {
      toast(t("gps_unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = Number(pos.coords.accuracy) || 0;
        pushRoomMessage(openRoomTaskId, {
          id: uid(),
          type: "location",
          text: "",
          photo: "",
          lat,
          lng,
          accuracyM: accuracy,
          from: USER_ACTOR,
          sentAt: nowMs()
        });
      },
      () => {
        toast(t("gps_error"));
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 20_000 }
    );
  };

  const renderTaskForm = () => {
    ensureTaskPrefs();
    if (els.taskFeePill) {
      const pct = (taskFeeBps() / 100).toFixed(taskFeeBps() % 100 ? 2 : 0);
      els.taskFeePill.textContent = `${t("task_fee").toUpperCase()}: ${pct}%`;
    }
    if (els.taskTimeLimit && els.taskTimeLimitValue) {
      const min = clampIntSafe(els.taskTimeLimit.value, 15, 360, 60);
      els.taskTimeLimitValue.textContent = fmtMinutes(min * 60_000);
    }
    if (els.taskDistanceLimit && els.taskDistanceLimitValue) {
      els.taskDistanceLimitValue.textContent = `${clampIntSafe(els.taskDistanceLimit.value, 50, 5000, 800)}m`;
    }

    const draft = state.tasks.prefs.routeDraft || { from: null, to: null };
    if (els.taskStartMeta) els.taskStartMeta.textContent = draft.from ? t("task_start_set") : t("task_start_unset");
    if (els.taskDestMeta) els.taskDestMeta.textContent = draft.to ? t("task_dest_set") : t("task_dest_unset");

    if (mapApi && typeof mapApi.setDraftRoute === "function") {
      mapApi.setDraftRoute({ from: draft.from, to: draft.to });
    }
  };

  const taskDraftGridMFromForm = () => {
    const dist = els.taskDistanceLimit ? clampIntSafe(els.taskDistanceLimit.value, 50, 5000, 800) : 800;
    return taskTetherGridMFor(dist);
  };

  const setTaskDraftPoint = (which, latLng) => {
    ensureTaskPrefs();
    const w = which === "to" ? "to" : "from";
    const gridM = taskDraftGridMFromForm();
    const seed = `draft:route:${w}`;
    const anchor = taskAreaAnchor(latLng, gridM, seed);
    if (!anchor) return;
    state.tasks.prefs.routeDraft.gridM = gridM;
    state.tasks.prefs.routeDraft[w] = anchor;
    saveState();
    renderTaskForm();
  };

  const clearTaskDraftRoute = () => {
    ensureTaskPrefs();
    state.tasks.prefs.routeDraft = { from: null, to: null, gridM: 0 };
    saveState();
    renderTaskForm();
  };

  const beginPickOnMap = (onPick, { hudKey = "" } = {}) => {
    if (!mapApi || typeof mapApi.beginPick !== "function") {
      toast(t("toast_task_pick_on_map"));
      return;
    }
    const hudText = hudKey ? t(hudKey) : t("toast_task_pick_on_map");
    mapApi.beginPick(onPick, { hudText });
    scrollToSection("mapSection");
    if (typeof mapApi.focusForPick === "function") {
      mapApi.focusForPick({ durationMs: 2300 });
    }
    toast(t("toast_task_pick_on_map"));
  };

  const pickTaskStart = () => {
    beginPickOnMap((ll) => setTaskDraftPoint("from", ll), { hudKey: "map_pick_hud_start" });
  };

  const pickTaskDest = () => {
    beginPickOnMap((ll) => setTaskDraftPoint("to", ll), { hudKey: "map_pick_hud_dest" });
  };

  const useMyAreaForTaskStart = async () => {
    const ll = await ensureUserLatLngSafe();
    if (!ll) {
      toast(t("toast_task_poster_unavailable"));
      return;
    }
    setTaskDraftPoint("from", ll);
  };

  const renderTaskList = () => {
    if (!els.taskList) return;
    els.taskList.replaceChildren();

    const now = nowMs();
    ensureUiPrefs();
    const baseTaskFilter = state.ui && state.ui.listFilters && state.ui.listFilters.tasks ? state.ui.listFilters.tasks : {};
    const taskFilter = {
      q: normalizeFilterQuery(baseTaskFilter.q, 72),
      status: normalizeTaskListFilterStatus(baseTaskFilter.status)
    };
    if (els.taskSearchInput && els.taskSearchInput.value !== taskFilter.q) els.taskSearchInput.value = taskFilter.q;
    if (els.taskStatusFilter && els.taskStatusFilter.value !== taskFilter.status) els.taskStatusFilter.value = taskFilter.status;
    if (els.taskFilterClear) {
      els.taskFilterClear.disabled = !taskFilter.q && taskFilter.status === "all";
    }

    const tokens = queryTokens(taskFilter.q);
    const allItems = (state.tasks && Array.isArray(state.tasks.list) ? state.tasks.list : [])
      .slice()
      .sort((a, b) => {
        const order = (s) => (s === "accepted" ? 0 : s === "open" ? 1 : s === "completed" ? 2 : s === "expired" ? 3 : 4);
        const sa = order(normalizeTaskStatus(a && a.status));
        const sb = order(normalizeTaskStatus(b && b.status));
        if (sa !== sb) return sa - sb;
        return (Number(b && b.createdAt) || 0) - (Number(a && a.createdAt) || 0);
      });
    const filteredItems = allItems
      .filter((task) => {
        if (!task || !task.id) return false;
        if (!matchesTaskFilterStatus(task.status, taskFilter.status)) return false;
        if (!tokens.length) return true;
        const hay = `${String(task.title || "")} ${String(task.posterLabel || "")} ${String(task.workerLabel || "")}`;
        return queryMatchesText(tokens, hay);
      });
    const items = filteredItems.slice(0, 14);
    renderListFilterMeta(els.taskFilterMeta, allItems.length, items.length);

    if (!items.length) {
      const li = document.createElement("li");
      li.className = "taskItem taskItem--empty";
      li.textContent = allItems.length > 0 ? t("filter_results_none") : t("task_list_empty");
      els.taskList.appendChild(li);
      return;
    }

    for (const task of items) {
      if (!task || !task.id) continue;
      const status = normalizeTaskStatus(task.status);
      const poster = task.poster;
      const worker = task.acceptedBy;
      const posterInfo = getActorInfoSafe(poster);
      const workerInfo = worker ? getActorInfoSafe(worker) : null;
      const posterLabel = String(task.posterLabel || (posterInfo && posterInfo.label) || "—");
      const workerLabel = workerInfo ? String(task.workerLabel || workerInfo.label || "—") : "";

      const li = document.createElement("li");
      li.className = "taskItem";

      const top = document.createElement("div");
      top.className = "taskItem__top";

      const title = document.createElement("div");
      title.className = "taskItem__title";
      title.textContent = normalizeTaskTitle(task.title || "") || "—";

      const who = document.createElement("div");
      who.className = "taskItem__who";
      who.textContent = workerInfo ? `${posterLabel} → ${workerLabel}` : `${posterLabel}`;

      top.appendChild(title);
      top.appendChild(who);

      const meta = document.createElement("div");
      meta.className = "taskItem__meta";
      const rewardCents = Number(task.rewardCents) || 0;
      const feeCents = computeFeeCents(rewardCents, task.feeBps || taskFeeBps());
      const payoutCents = Math.max(0, rewardCents - feeCents);
      const leftMs = Math.max(0, (Number(task.expiresAt) || 0) - now);
      meta.textContent = `${fmtUsd(rewardCents)} • ${t("task_fee")}: ${fmtUsd(feeCents)} • ${t("task_payout")}: ${fmtUsd(payoutCents)}`;

      const badges = document.createElement("div");
      badges.className = "taskItem__badges";

      const statusChip = document.createElement("span");
      statusChip.className = `taskChip ${status === "accepted" ? "taskChip--ok" : status === "open" ? "taskChip--warn" : status === "completed" ? "taskChip--ok" : "taskChip--bad"}`;
      const statusKey =
        status === "accepted"
          ? "task_status_accepted"
          : status === "completed"
            ? "task_status_completed"
            : status === "expired"
              ? "task_status_expired"
              : status === "cancelled"
                ? "task_status_cancelled"
              : "task_status_open";
      statusChip.textContent = t(statusKey);
      badges.appendChild(statusChip);

      const distChip = document.createElement("span");
      distChip.className = "taskChip";
      distChip.textContent = `<= ${clampIntSafe(task.distanceLimitM, 50, 5000, 800)}m`;
      badges.appendChild(distChip);

      if (workerInfo) {
        const v = document.createElement("span");
        const verified = typeof task.workerVerified === "boolean" ? task.workerVerified : Boolean(workerInfo.verified);
        v.className = `taskChip ${verified ? "taskChip--ok" : "taskChip--bad"}`;
        v.textContent = verified ? t("task_verified") : t("task_not_verified");
        badges.appendChild(v);
      }

      const actions = document.createElement("div");
      actions.className = "taskItem__actions";

      const posterKey = actorKeyLocal(poster);
      const workerKey = worker ? actorKeyLocal(worker) : "";
      const isPosterMe = posterKey === userKey;
      const isWorkerMe = workerKey === userKey;
      const applicants = Array.isArray(task.applicants) ? task.applicants : [];
      const hasApplied = applicants.some((a) => actorKeyLocal(a && a.actor) === userKey);

      const addBtn = (label, kind, onClick) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = kind === "primary" ? "btn btn--primary" : "btn btn--ghost";
        b.textContent = label;
        b.addEventListener("click", onClick);
        actions.appendChild(b);
      };

      if (status === "open") {
        if (isPosterMe) {
          addBtn(t("task_cancel"), "ghost", () => cancelTask(task.id));
        } else {
          const label = hasApplied ? t("task_applied") : t("task_apply");
          addBtn(label, hasApplied ? "ghost" : "primary", () => {
            if (hasApplied) return;
            applyToTask(task.id, USER_ACTOR);
          });
          if (hasApplied) {
            const last = actions.lastChild;
            if (last && "disabled" in last) last.disabled = true;
          }
        }
      } else if (status === "accepted") {
        if (canCurrentUserOpenRoomForTask(task)) {
          addBtn(t("task_room"), "ghost", () => openTaskRoom(task.id));
        }
        if (isPosterMe || isWorkerMe) {
          addBtn(t("task_finish"), "primary", () => finishTask(task.id));
        }
      } else if (status === "completed") {
        if (isPosterMe && worker && !(task.review && task.review.rating)) {
          addBtn(t("review_open"), "primary", () => openReviewModal(task.id));
        }
      }

      li.appendChild(top);
      li.appendChild(meta);
      li.appendChild(badges);

      // Time remaining bar (instead of a numeric counter).
      if (status === "open" || status === "accepted") {
        const totalMs = Math.max(1, (Number(task.expiresAt) || 0) - (Number(task.createdAt) || 0));
        const frac = clamp(leftMs / totalMs, 0, 1);
        const bar = document.createElement("div");
        bar.className = "timeBar";
        bar.title = t("task_time_left", { t: fmtMinutes(leftMs) });
        const fill = document.createElement("div");
        fill.className = "timeBar__fill";
        fill.style.width = `${Math.round(frac * 100)}%`;
        bar.appendChild(fill);
        li.appendChild(bar);
      }
      if (actions.childNodes.length) li.appendChild(actions);

      // Poster view: show applicants (offers) with skills and attributes.
      if (status === "open" && isPosterMe) {
        const wrap = document.createElement("div");
        wrap.className = "taskOffers";

        const titleEl = document.createElement("div");
        titleEl.className = "taskOffers__title";
        titleEl.textContent = t("task_offers_title");
        wrap.appendChild(titleEl);

        const offers = applicants
          .slice()
          .sort((a, b) => {
            const av = Boolean(a && a.verified);
            const bv = Boolean(b && b.verified);
            if (av !== bv) return av ? -1 : 1;
            const ad = Number(a && a.distanceM) || 0;
            const bd = Number(b && b.distanceM) || 0;
            if (ad !== bd) return ad - bd;
            const ar = Number(a && a.rating) || 0;
            const br = Number(b && b.rating) || 0;
            return br - ar;
          })
          .slice(0, 8);

        if (!offers.length) {
          const empty = document.createElement("div");
          empty.className = "taskItem__meta";
          empty.textContent = t("task_offers_empty");
          wrap.appendChild(empty);
        } else {
          for (const off of offers) {
            if (!off || !off.actor) continue;
            const info = getActorInfoSafe(off.actor);
            const whoTxt = (off.label && String(off.label)) || (info && info.label) || "@sim";
            const verified = typeof off.verified === "boolean" ? off.verified : Boolean(info && info.verified);

            const item = document.createElement("div");
            item.className = "offerItem";

            const topRow = document.createElement("div");
            topRow.className = "offerItem__top";

            const whoEl = document.createElement("div");
            whoEl.className = "offerItem__who";
            whoEl.textContent = verified ? `${whoTxt} • ${t("task_verified")}` : `${whoTxt} • ${t("task_not_verified")}`;

            const metaEl = document.createElement("div");
            metaEl.className = "offerItem__meta";
            const r = Number(off.rating) || 0;
            const ot = clampIntSafe(off.onTimePct, 0, 100, 0);
            const done = clampIntSafe(off.tasksDone, 0, 9999, 0);
            const eta = clampIntSafe(off.etaMin, 1, 999, 10);
            const dist = Math.max(0, Math.round(Number(off.distanceM) || 0));
            metaEl.textContent = `R ${r ? r.toFixed(1) : "—"} • OT ${ot || "—"}% • DONE ${done || "—"} • ETA ${eta}m • ${dist}m`;

            topRow.appendChild(whoEl);
            topRow.appendChild(metaEl);
            item.appendChild(topRow);

            const skillsEl = document.createElement("div");
            skillsEl.className = "offerItem__skills";
            const skills = Array.isArray(off.skills) ? off.skills.slice(0, 8) : [];
            for (const s of skills) {
              const chip = document.createElement("span");
              chip.className = "skillChip";
              chip.textContent = String(s || "").slice(0, 18);
              skillsEl.appendChild(chip);
            }
            if (skillsEl.childNodes.length) item.appendChild(skillsEl);

            const act = document.createElement("div");
            act.className = "offerItem__actions";
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = verified ? "btn btn--primary" : "btn btn--ghost";
            btn.textContent = t("task_assign");
            btn.disabled = !verified;
            btn.addEventListener("click", () => acceptTask(task.id, off.actor));
            act.appendChild(btn);
            item.appendChild(act);

            wrap.appendChild(item);
          }
        }

        li.appendChild(wrap);
      }

      els.taskList.appendChild(li);
    }
  };

  const renderTasks = () => {
    renderTaskForm();
    renderTaskList();
    const n = state.tasks && Array.isArray(state.tasks.list) ? state.tasks.list.length : 0;
    if (els.taskListCount) els.taskListCount.textContent = String(n);
    if (els.marketTabTasksCount) {
      els.marketTabTasksCount.textContent = String(n);
      els.marketTabTasksCount.hidden = n <= 0;
    }
    syncTasksOnMap();
    renderTaskRoom();
  };

  const ensureTaskPrefs = () => {
    if (!state.tasks || typeof state.tasks !== "object") state.tasks = defaultState().tasks;
    if (!Array.isArray(state.tasks.list)) state.tasks.list = [];
    if (!state.tasks.rooms || typeof state.tasks.rooms !== "object") state.tasks.rooms = {};
    if (!state.tasks.prefs || typeof state.tasks.prefs !== "object") state.tasks.prefs = defaultState().tasks.prefs;
    if (!state.tasks.reputation || typeof state.tasks.reputation !== "object") state.tasks.reputation = {};
    state.tasks.prefs.feeBps = taskFeeBps();
    state.tasks.prefs.userVerified = Boolean(state.tasks.prefs.userVerified);
    const draft = state.tasks.prefs.routeDraft;
    if (!draft || typeof draft !== "object") {
      state.tasks.prefs.routeDraft = { from: null, to: null, gridM: 0 };
    } else {
      state.tasks.prefs.routeDraft = {
        from: draft.from && typeof draft.from === "object" ? { lat: Number(draft.from.lat), lng: Number(draft.from.lng) } : null,
        to: draft.to && typeof draft.to === "object" ? { lat: Number(draft.to.lat), lng: Number(draft.to.lng) } : null,
        gridM: clampIntSafe(draft.gridM, 50, 2000, 0)
      };
      if (!Number.isFinite(Number(state.tasks.prefs.routeDraft.from && state.tasks.prefs.routeDraft.from.lat))) state.tasks.prefs.routeDraft.from = null;
      if (!Number.isFinite(Number(state.tasks.prefs.routeDraft.from && state.tasks.prefs.routeDraft.from.lng))) state.tasks.prefs.routeDraft.from = null;
      if (!Number.isFinite(Number(state.tasks.prefs.routeDraft.to && state.tasks.prefs.routeDraft.to.lat))) state.tasks.prefs.routeDraft.to = null;
      if (!Number.isFinite(Number(state.tasks.prefs.routeDraft.to && state.tasks.prefs.routeDraft.to.lng))) state.tasks.prefs.routeDraft.to = null;
    }
  };

  const postTaskFromForm = () => {
    ensureTaskPrefs();
    if (!els.taskText || !els.taskReward || !els.taskTimeLimit || !els.taskDistanceLimit) return;
    const title = normalizeTaskTitle(els.taskText.value);
    if (!title) return;

    const rewardCents = usdToCents(els.taskReward.value);
    const timeLimitMin = clampIntSafe(els.taskTimeLimit.value, 15, 360, 60);
    const distanceLimitM = clampIntSafe(els.taskDistanceLimit.value, 50, 5000, 800);

    const now = nowMs();
    const draft = state.tasks.prefs.routeDraft || { from: null, to: null, gridM: 0 };
    if (!draft.from || !draft.to) {
      toast(t("toast_task_pick_route"));
      return;
    }
    const task = {
      id: uid(),
      title,
      rewardCents,
      feeBps: taskFeeBps(),
      distanceLimitM,
      createdAt: now,
      expiresAt: now + timeLimitMin * 60_000,
      status: "open",
      poster: USER_ACTOR,
      posterLabel: "@you",
      posterVerified: isUserVerified(),
      acceptedBy: null,
      workerLabel: "",
      workerVerified: false,
      acceptedAt: 0,
      completedAt: 0,
      applicants: [],
      tetherFrom: null,
      tetherTo: null,
      tetherGridM: 0
    };

    // Store only blurred task endpoints (pickup -> destination), not exact coordinates.
    const gridM = clampIntSafe(draft.gridM || taskTetherGridMFor(distanceLimitM), 80, 500, taskTetherGridMFor(distanceLimitM));
    task.tetherGridM = gridM;
    task.tetherFrom = { lat: Number(draft.from.lat), lng: Number(draft.from.lng) };
    task.tetherTo = { lat: Number(draft.to.lat), lng: Number(draft.to.lng) };

    // Clear draft route after posting.
    state.tasks.prefs.routeDraft = { from: null, to: null, gridM: 0 };

    state.tasks.list.unshift(task);
    state.tasks.list = state.tasks.list.slice(0, 50);
    els.taskText.value = "";
    saveState();
    renderTasks();
    toast(t("toast_task_posted"));
  };

  const upsertApplicant = (task, applicant) => {
    if (!task || !applicant) return false;
    if (!Array.isArray(task.applicants)) task.applicants = [];
    const key = actorKeyLocal(applicant.actor);
    if (!key) return false;
    const idx = task.applicants.findIndex((a) => actorKeyLocal(a && a.actor) === key);
    if (idx >= 0) {
      const prev = task.applicants[idx] || {};
      task.applicants[idx] = { ...prev, ...applicant, id: String(prev.id || applicant.id || "") };
      return true;
    }
    task.applicants.unshift(applicant);
    task.applicants = task.applicants.slice(0, 24);
    return true;
  };

  const userOfferProfile = () => {
    const tasksDone = state.activity.log.filter((e) => e && typeof e.text === "string" && e.text.startsWith("Task: ")).length;
    return {
      skills: ["photo", "fast", "trusted"],
      rating: 4.9,
      tasksDone,
      onTimePct: 98
    };
  };

  const applyToTask = async (taskId, actor) => {
    ensureTaskPrefs();
    const id = String(taskId || "");
    const task = state.tasks.list.find((x) => x && x.id === id);
    if (!task) return;
    if (normalizeTaskStatus(task.status) !== "open") return;

    const now = nowMs();
    if (task.expiresAt && now > task.expiresAt) {
      task.status = "expired";
      saveState();
      renderTasks();
      toast(t("toast_task_expired"));
      return;
    }

    let llActor = getActorLatLngSafe(actor);
    if (!llActor && actor && actor.kind === "user") {
      llActor = await ensureUserLatLngSafe();
    }
    const gridM = clampIntSafe(task.tetherGridM || taskTetherGridMFor(task.distanceLimitM), 80, 500, 250);
    task.tetherGridM = gridM;

    // Start endpoint (pickup). Store only an area anchor.
    let startArea = task && task.tetherFrom ? task.tetherFrom : null;
    if (!startArea || !Number.isFinite(Number(startArea.lat)) || !Number.isFinite(Number(startArea.lng))) {
      // Legacy fallback: use poster area as pickup when route wasn't defined.
      const llPoster = getActorLatLngSafe(task.poster);
      if (llPoster) {
        startArea = taskAreaAnchor(llPoster, gridM, `task:${task.id}:from`);
        task.tetherFrom = startArea;
      }
    }

    if (!llActor) {
      toast(t("toast_task_need_gps"));
      return;
    }
    if (!startArea) {
      toast(t("toast_task_poster_unavailable"));
      return;
    }

    const d = haversineM(llActor, startArea);
    if (d > (Number(task.distanceLimitM) || 0)) {
      toast(t("toast_task_too_far"));
      return;
    }

    if (Array.isArray(task.applicants) && task.applicants.some((a) => actorKeyLocal(a && a.actor) === actorKeyLocal(actor))) {
      toast(t("toast_task_applied"));
      return;
    }

    // Create/update the offer entry.
    const info = getActorInfoSafe(actor);
    const prof = actor && actor.kind === "user" ? userOfferProfile() : { skills: [], rating: 0, tasksDone: 0, onTimePct: 0 };
    const speedMps = actor && actor.kind === "user" ? 1.9 : 1.6;
    const etaMin = Math.max(1, Math.round((d / Math.max(0.8, speedMps)) / 60));
    const aKey = actorKeyLocal(actor) || String(info && info.label) || "actor";
    const anchor = taskAreaAnchor(llActor, gridM, `task:${task.id}:app:${aKey}`);

    const ok = upsertApplicant(task, {
      id: uid(),
      actor,
      label: (info && info.label) || "@you",
      appliedAt: now,
      distanceM: Math.max(0, Math.round(d)),
      etaMin,
      anchor,
      skills: Array.isArray(prof.skills) ? prof.skills.slice(0, 8) : [],
      rating: Number(prof.rating) || 0,
      tasksDone: Number(prof.tasksDone) || 0,
      onTimePct: clampIntSafe(prof.onTimePct, 0, 100, 0),
      verified: Boolean(info.verified)
    });

    if (!ok) return;
    saveState();
    renderTasks();
    toast(t("toast_task_applied"));
  };

  const acceptTask = (taskId, actor) => {
    ensureTaskPrefs();
    const id = String(taskId || "");
    const task = state.tasks.list.find((x) => x && x.id === id);
    if (!task) return;
    if (normalizeTaskStatus(task.status) !== "open") return;

    const now = nowMs();
    if (task.expiresAt && now > task.expiresAt) {
      task.status = "expired";
      saveState();
      renderTasks();
      toast(t("toast_task_expired"));
      return;
    }

    const info = getActorInfoSafe(actor);
    if (!info.verified) {
      toast(t("toast_task_not_verified"));
      return;
    }

    const gridM = clampIntSafe(task.tetherGridM || taskTetherGridMFor(task.distanceLimitM), 80, 500, 250);
    task.tetherGridM = gridM;

    // Start endpoint (pickup).
    let startArea = task && task.tetherFrom ? task.tetherFrom : null;
    if (!startArea || !Number.isFinite(Number(startArea.lat)) || !Number.isFinite(Number(startArea.lng))) {
      const llPoster = getActorLatLngSafe(task.poster);
      if (llPoster) {
        startArea = taskAreaAnchor(llPoster, gridM, `task:${task.id}:from`);
        task.tetherFrom = startArea;
      }
    }

    // Worker location: prefer live position, otherwise use the stored offer anchor.
    let llWorker = getActorLatLngSafe(actor);
    if (!llWorker) {
      const off = Array.isArray(task.applicants)
        ? task.applicants.find((a) => actorKeyLocal(a && a.actor) === actorKeyLocal(actor))
        : null;
      if (off && off.anchor && typeof off.anchor === "object") {
        const lat = Number(off.anchor.lat);
        const lng = Number(off.anchor.lng);
        if (Number.isFinite(lat) && Number.isFinite(lng)) llWorker = { lat, lng };
      }
    }

    if (!startArea) {
      toast(t("toast_task_poster_unavailable"));
      return;
    }
    if (!llWorker) {
      toast(t("toast_task_worker_unavailable"));
      return;
    }

    const d = haversineM(llWorker, startArea);
    if (d > (Number(task.distanceLimitM) || 0)) {
      toast(t("toast_task_too_far"));
      return;
    }

    task.status = "accepted";
    task.acceptedBy = actor;
    task.workerLabel = (info && info.label) || task.workerLabel || "";
    task.workerVerified = Boolean(info && info.verified);
    task.acceptedAt = now;

    // Ensure a conversation room exists for handoff.
    if (!state.tasks.rooms[task.id]) {
      state.tasks.rooms[task.id] = {
        messages: [],
        visibility: "participants",
        ownerKey: actorKeyLocal(task.poster) || actorKeyLocal(USER_ACTOR)
      };
    } else {
      const room = state.tasks.rooms[task.id];
      if (!room.ownerKey) room.ownerKey = actorKeyLocal(task.poster) || actorKeyLocal(USER_ACTOR);
      if (!room.visibility) room.visibility = "participants";
      if (!Array.isArray(room.messages)) room.messages = [];
    }

    saveState();
    renderTasks();
    toast(t("toast_task_accepted"));
  };

  const finishTask = (taskId) => {
    ensureTaskPrefs();
    const id = String(taskId || "");
    const task = state.tasks.list.find((x) => x && x.id === id);
    if (!task) return;
    if (normalizeTaskStatus(task.status) !== "accepted") return;
    const now = nowMs();

    if (task.expiresAt && now > task.expiresAt) {
      task.status = "expired";
      saveState();
      renderTasks();
      toast(t("toast_task_expired"));
      return;
    }

    task.status = "completed";
    task.completedAt = now;
    saveState();

    // Completion boosts the worker aura like an activity log.
    if (task.acceptedBy && task.acceptedBy.kind === "user") {
      const text = `Task: ${normalizeTaskTitle(task.title)}`;
      const key = activityKeyFromText(text);
      const colorHex = activityColorHex(key);
      const durMs = 6 * 60_000;
      state.activity.log.unshift({
        id: uid(),
        text,
        key,
        colorHex,
        startedAt: now - durMs,
        endedAt: now
      });
      onActivityLogMutated();
      saveState();
      renderActivity(true);
    } else if (mapApi && typeof mapApi.applyTaskCompletion === "function") {
      mapApi.applyTaskCompletion({ actor: task.acceptedBy, title: task.title, rewardCents: task.rewardCents });
    }

    // Poster gets a minor boost for supporting the platform.
    if (task.poster && task.poster.kind === "user") {
      const text = `Support: ${normalizeTaskTitle(task.title)}`;
      const key = activityKeyFromText(text);
      const colorHex = activityColorHex(key);
      const durMs = 2 * 60_000;
      state.activity.log.unshift({
        id: uid(),
        text,
        key,
        colorHex,
        startedAt: now - durMs,
        endedAt: now
      });
      onActivityLogMutated();
      saveState();
      renderActivity(true);
    } else if (mapApi && typeof mapApi.applyTaskSupportBoost === "function") {
      mapApi.applyTaskSupportBoost({ actor: task.poster });
    }

    renderTasks();
    toast(t("toast_task_completed"));
  };

  const cancelTask = (taskId) => {
    ensureTaskPrefs();
    const id = String(taskId || "");
    const task = state.tasks.list.find((x) => x && x.id === id);
    if (!task) return;
    if (normalizeTaskStatus(task.status) !== "open") return;
    task.status = "cancelled";
    saveState();
    renderTasks();
  };

  const sweepExpiredTasks = () => {
    ensureTaskPrefs();
    const now = nowMs();
    let changed = false;
    for (const task of state.tasks.list) {
      if (!task) continue;
      const status = normalizeTaskStatus(task.status);
      if (status === "completed" || status === "cancelled" || status === "expired") continue;
      if (task.expiresAt && now > task.expiresAt) {
        task.status = "expired";
        changed = true;
      }
    }
    if (!changed) return;
    saveState();
    renderTasks();
  };

  const seedOffersForUserTasks = () => {
    if (!mapApi || typeof mapApi.listAgents !== "function") return;
    ensureTaskPrefs();
    const agents = mapApi.listAgents();
    if (!agents.length) return;

    const now = nowMs();
    let changed = false;

    for (const task of state.tasks.list) {
      if (!task) continue;
      if (normalizeTaskStatus(task.status) !== "open") continue;
      if (actorKeyLocal(task.poster) !== userKey) continue;

      const gridM = clampIntSafe(task.tetherGridM || taskTetherGridMFor(task.distanceLimitM), 80, 500, 250);
      task.tetherGridM = gridM;

      // Ensure the poster area anchor exists.
      let posterArea = task && task.tetherFrom ? task.tetherFrom : null;
      if (!posterArea || !Number.isFinite(Number(posterArea.lat)) || !Number.isFinite(Number(posterArea.lng))) {
        const llPoster = getActorLatLngSafe(task.poster);
        if (!llPoster) continue;
        posterArea = taskAreaAnchor(llPoster, gridM, `task:${task.id}:from`);
        task.tetherFrom = posterArea;
        changed = true;
      }
      if (!posterArea) continue;

      if (!Array.isArray(task.applicants)) task.applicants = [];
      if (task.applicants.length >= 10) continue;

      const existing = new Set(task.applicants.map((a) => actorKeyLocal(a && a.actor)).filter((x) => x));

      const candidates = [];
      for (const a of agents) {
        if (!a || !a.id) continue;
        const key = `agent:${String(a.id)}`;
        if (existing.has(key)) continue;
        const d = haversineM({ lat: a.lat, lng: a.lng }, posterArea);
        if (d > (Number(task.distanceLimitM) || 0)) continue;
        candidates.push({ a, d });
      }

      candidates.sort((x, y) => {
        const xv = Boolean(x.a && x.a.verified);
        const yv = Boolean(y.a && y.a.verified);
        if (xv !== yv) return xv ? -1 : 1;
        return x.d - y.d;
      });

      const want = Math.min(2, 10 - task.applicants.length);
      if (want <= 0) continue;

      // Don't spam: add offers gradually.
      const p = task.applicants.length === 0 ? 0.78 : 0.42;
      if (Math.random() > p) continue;

      const pickBand = Math.min(candidates.length, 6);
      for (let i = 0; i < want && i < candidates.length; i++) {
        const cand = candidates[Math.floor(Math.random() * Math.max(1, pickBand))];
        if (!cand) continue;
        const a = cand.a;
        const d = cand.d;
        const speed = Math.max(0.9, Number(a.speedMps) || 2.2);
        const etaMin = Math.max(1, Math.round((d / speed) / 60));
        upsertApplicant(task, {
          id: uid(),
          actor: { kind: "agent", id: String(a.id) },
          label: String(a.handle || "@sim"),
          verified: Boolean(a.verified),
          appliedAt: now - Math.round(randBetween(10_000, 70_000)),
          distanceM: Math.max(0, Math.round(d)),
          etaMin,
          anchor: taskAreaAnchor({ lat: a.lat, lng: a.lng }, gridM, `task:${task.id}:app:agent:${String(a.id)}`),
          skills: Array.isArray(a.skills) ? a.skills.slice(0, 8) : [],
          rating: Math.max(0, Math.min(5, Number(a.rating) || 0)),
          tasksDone: clampIntSafe(a.tasksDone, 0, 9999, 0),
          onTimePct: clampIntSafe(a.onTimePct, 0, 100, 0)
        });
        changed = true;
        existing.add(`agent:${String(a.id)}`);
      }
    }

    if (!changed) return;
    saveState();
    renderTasks();
  };

  const seedOffersForSimTasks = () => {
    if (!mapApi || typeof mapApi.listAgents !== "function") return;
    ensureTaskPrefs();
    const agents = mapApi.listAgents();
    if (!agents.length) return;

    const now = nowMs();
    let changed = false;

    for (const task of state.tasks.list) {
      if (!task) continue;
      if (normalizeTaskStatus(task.status) !== "open") continue;
      if (actorKeyLocal(task.poster) === userKey) continue;

      // Ensure poster area anchor exists (spawnSimTask sets it, but keep safe).
      const gridM = clampIntSafe(task.tetherGridM || taskTetherGridMFor(task.distanceLimitM), 80, 500, 250);
      task.tetherGridM = gridM;
      let posterArea = task && task.tetherFrom ? task.tetherFrom : null;
      if (!posterArea || !Number.isFinite(Number(posterArea.lat)) || !Number.isFinite(Number(posterArea.lng))) continue;

      if (!Array.isArray(task.applicants)) task.applicants = [];
      if (task.applicants.length >= 6) continue;

      const age = now - (Number(task.createdAt) || now);
      if (age < 7_000) continue; // leave time for the user to apply first

      if (Math.random() > 0.25) continue;

      const existing = new Set(task.applicants.map((a) => actorKeyLocal(a && a.actor)).filter((x) => x));
      const candidates = agents
        .filter((a) => a && a.id && !existing.has(`agent:${String(a.id)}`))
        .map((a) => ({ a, d: haversineM({ lat: a.lat, lng: a.lng }, posterArea) }))
        .filter((x) => x.d <= (Number(task.distanceLimitM) || 0))
        .sort((x, y) => x.d - y.d)
        .slice(0, 4);

      if (!candidates.length) continue;
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      if (!pick) continue;
      const a = pick.a;
      const d = pick.d;
      const speed = Math.max(0.9, Number(a.speedMps) || 2.2);
      const etaMin = Math.max(1, Math.round((d / speed) / 60));

      upsertApplicant(task, {
        id: uid(),
        actor: { kind: "agent", id: String(a.id) },
        label: String(a.handle || "@sim"),
        verified: Boolean(a.verified),
        appliedAt: now - Math.round(randBetween(10_000, 60_000)),
        distanceM: Math.max(0, Math.round(d)),
        etaMin,
        anchor: taskAreaAnchor({ lat: a.lat, lng: a.lng }, gridM, `task:${task.id}:app:agent:${String(a.id)}`),
        skills: Array.isArray(a.skills) ? a.skills.slice(0, 8) : [],
        rating: Math.max(0, Math.min(5, Number(a.rating) || 0)),
        tasksDone: clampIntSafe(a.tasksDone, 0, 9999, 0),
        onTimePct: clampIntSafe(a.onTimePct, 0, 100, 0)
      });
      changed = true;
    }

    if (!changed) return;
    saveState();
    renderTasks();
  };

  const simPosterDecide = () => {
    ensureTaskPrefs();
    const now = nowMs();
    const agents = mapApi && typeof mapApi.listAgents === "function" ? mapApi.listAgents() : [];
    const aliveAgents = new Set(agents.map((a) => (a && a.id ? String(a.id) : "")).filter((x) => x));

    for (const task of state.tasks.list) {
      if (!task) continue;
      if (normalizeTaskStatus(task.status) !== "open") continue;
      if (actorKeyLocal(task.poster) === userKey) continue; // user decides for their own tasks

      const posterArea = task && task.tetherFrom ? task.tetherFrom : null;
      if (!posterArea || !Number.isFinite(Number(posterArea.lat)) || !Number.isFinite(Number(posterArea.lng))) continue;

      const age = now - (Number(task.createdAt) || now);
      const applicants = Array.isArray(task.applicants) ? task.applicants : [];
      if (!applicants.length) continue;

      const userApplied = applicants.some((a) => actorKeyLocal(a && a.actor) === userKey);
      const minWait = userApplied ? 3_500 : 12_000;
      if (age < minWait) continue;

      // Choose the best verified applicant.
      let best = null;
      let bestScore = -Infinity;
      for (const off of applicants) {
        if (!off || !off.actor) continue;
        const actor = off.actor;
        const key = actorKeyLocal(actor);
        const verified = key === userKey ? isUserVerified() : Boolean(off.verified);
        if (!verified) continue;
        if (actor.kind === "agent" && !aliveAgents.has(String(actor.id))) continue;

        const dist = Math.max(0, Number(off.distanceM) || 0);
        const rating = Math.max(0, Math.min(5, Number(off.rating) || 0));
        const onTime = clampIntSafe(off.onTimePct, 0, 100, 0);
        const done = clampIntSafe(off.tasksDone, 0, 9999, 0);
        const score =
          (key === userKey ? 50 : 0) +
          rating * 10 +
          onTime * 0.08 +
          Math.log10(1 + done) * 6 +
          800 / (150 + dist);
        if (score > bestScore) {
          bestScore = score;
          best = actor;
        }
      }

      if (!best) continue;
      acceptTask(task.id, best);
    }
  };

  const spawnSimTask = () => {
    if (!mapApi || typeof mapApi.listAgents !== "function") return;
    ensureTaskPrefs();
    const agents = mapApi.listAgents().filter((a) => a && a.id);
    if (!agents.length) return;

    const poster = agents[Math.floor(Math.random() * agents.length)];
    const ideas = [
      "Coffee pickup",
      "Grocery run",
      "Package drop-off",
      "Find a charger",
      "Quick document scan",
      "Borrow an umbrella"
    ];
    const title = normalizeTaskTitle(ideas[Math.floor(Math.random() * ideas.length)]);
    const now = nowMs();
    const timeLimitMin = [30, 45, 60, 90, 120][Math.floor(Math.random() * 5)];
    const distanceLimitM = [300, 500, 800, 1200, 2000, 3500][Math.floor(Math.random() * 6)];
    const rewardUsd = [8, 12, 15, 20, 25, 35][Math.floor(Math.random() * 6)];

    const id = uid();
    const gridM = taskTetherGridMFor(distanceLimitM);
    const startRaw = { lat: Number(poster.lat), lng: Number(poster.lng) };
    const tetherFrom = taskAreaAnchor(startRaw, gridM, `task:${id}:from`);
    const routeM = randBetween(350, Math.min(6200, distanceLimitM * 3));
    const ang = Math.random() * Math.PI * 2;
    const destRaw = offsetLatLngMeters(startRaw, Math.cos(ang) * routeM, Math.sin(ang) * routeM);
    const tetherTo = taskAreaAnchor(destRaw, gridM, `task:${id}:to`);

    state.tasks.list.unshift({
      id,
      title,
      rewardCents: rewardUsd * 100,
      feeBps: taskFeeBps(),
      distanceLimitM,
      createdAt: now,
      expiresAt: now + timeLimitMin * 60_000,
      status: "open",
      poster: { kind: "agent", id: String(poster.id) },
      posterLabel: String(poster.handle || "@sim"),
      posterVerified: Boolean(poster.verified),
      acceptedBy: null,
      workerLabel: "",
      workerVerified: false,
      acceptedAt: 0,
      completedAt: 0,
      applicants: [],
      tetherFrom,
      tetherTo,
      tetherGridM: gridM
    });

    state.tasks.list = state.tasks.list.slice(0, 50);
    saveState();
    renderTasks();
  };

  let taskEngineTimer = null;

  const startTaskEngine = () => {
    if (taskEngineTimer) return;
    taskEngineTimer = window.setInterval(() => {
      sweepExpiredTasks();
      sweepExpiredMarket();
      seedOffersForUserTasks();
      seedOffersForSimTasks();
      simPosterDecide();
      seedEventBookings();
      spawnSimMarketPost();
      spawnSimEvent();
      const openSim = state.tasks.list.filter((x) => x && normalizeTaskStatus(x.status) === "open" && actorKeyLocal(x.poster) !== userKey);
      if (openSim.length < 3) spawnSimTask();
    }, 2_500);
  };

  // --- Market (Product / Service Posts) ---

  const MARKET_KINDS = ["product", "service"];
  const MARKET_STATUS = ["open", "sold", "expired", "cancelled"];

  const normalizeMarketKind = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return MARKET_KINDS.includes(v) ? v : "product";
  };

  const normalizeMarketStatus = (value) => {
    const v = String(value || "").trim().toLowerCase();
    return MARKET_STATUS.includes(v) ? v : "open";
  };

  const matchesMarketFilterStatus = (status, filterStatus) => {
    const st = normalizeMarketStatus(status);
    const f = normalizeMarketListFilterStatus(filterStatus);
    if (f === "all") return true;
    if (f === "closed") return st === "expired" || st === "cancelled";
    return st === f;
  };

  const ensureMarketPrefs = () => {
    if (!state.market || typeof state.market !== "object") state.market = defaultState().market;
    if (!Array.isArray(state.market.list)) state.market.list = [];
    if (!state.market.prefs || typeof state.market.prefs !== "object") state.market.prefs = defaultState().market.prefs;
    state.market.prefs.kind = normalizeMarketKind(state.market.prefs.kind);
    state.market.prefs.draftGridM = clampIntSafe(state.market.prefs.draftGridM, 50, 2000, 0);
    const pt = state.market.prefs.draftLoc;
    if (!pt || typeof pt !== "object") state.market.prefs.draftLoc = null;
    else {
      const lat = Number(pt.lat);
      const lng = Number(pt.lng);
      state.market.prefs.draftLoc = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
    }
  };

  const setMarketKindSelected = (kind) => {
    ensureMarketPrefs();
    const next = normalizeMarketKind(kind);
    state.market.prefs.kind = next;
    if (els.marketKind) {
      for (const btn of Array.from(els.marketKind.querySelectorAll("button[data-kind]"))) {
        const k = String(btn.getAttribute("data-kind") || "");
        btn.setAttribute("aria-selected", k === next ? "true" : "false");
      }
    }
  };

  const marketDraftGridMFromForm = () => {
    const dist = els.marketDistanceLimit ? clampIntSafe(els.marketDistanceLimit.value, 50, 5000, 1200) : 1200;
    return taskTetherGridMFor(dist);
  };

  const setMarketDraftLoc = (latLng) => {
    ensureMarketPrefs();
    const gridM = marketDraftGridMFromForm();
    const anchor = taskAreaAnchor(latLng, gridM, "draft:market:loc");
    if (!anchor) return;
    state.market.prefs.draftGridM = gridM;
    state.market.prefs.draftLoc = anchor;
    saveState();
    renderMarket();
  };

  const clearMarketDraftLoc = () => {
    ensureMarketPrefs();
    state.market.prefs.draftLoc = null;
    state.market.prefs.draftGridM = 0;
    saveState();
    renderMarket();
  };

  const useMyAreaForMarket = async () => {
    const ll = await ensureUserLatLngSafe();
    if (!ll) {
      toast(t("toast_task_poster_unavailable"));
      return;
    }
    setMarketDraftLoc(ll);
  };

  const renderMarketForm = () => {
    ensureMarketPrefs();
    setMarketKindSelected(state.market.prefs.kind);
    if (els.marketPill) els.marketPill.textContent = t("market_pill");

    if (els.marketTimeLimit && els.marketTimeLimitValue) {
      const min = clampIntSafe(els.marketTimeLimit.value, 15, 360, 180);
      els.marketTimeLimitValue.textContent = fmtMinutes(min * 60_000);
    }
    if (els.marketDistanceLimit && els.marketDistanceLimitValue) {
      els.marketDistanceLimitValue.textContent = `${clampIntSafe(els.marketDistanceLimit.value, 50, 5000, 1200)}m`;
    }

    if (els.marketLocMeta) {
      els.marketLocMeta.textContent = state.market.prefs.draftLoc ? t("market_loc_set") : t("market_loc_unset");
    }
  };

  const sweepExpiredMarket = () => {
    ensureMarketPrefs();
    const now = nowMs();
    let changed = false;
    for (const it of state.market.list) {
      if (!it) continue;
      const st = normalizeMarketStatus(it.status);
      if (st !== "open") continue;
      if (it.expiresAt && now > it.expiresAt) {
        it.status = "expired";
        changed = true;
      }
    }
    if (!changed) return;
    saveState();
    renderMarket();
  };

  const postMarketFromForm = () => {
    ensureMarketPrefs();
    if (!els.marketText || !els.marketPrice || !els.marketTimeLimit || !els.marketDistanceLimit) return;
    const title = normalizeTaskTitle(els.marketText.value);
    if (!title) return;
    const loc = state.market.prefs.draftLoc;
    if (!loc) {
      toast(t("toast_market_need_location"));
      return;
    }

    const kind = normalizeMarketKind(state.market.prefs.kind);
    const priceCents = usdToCents(els.marketPrice.value);
    const timeLimitMin = clampIntSafe(els.marketTimeLimit.value, 15, 360, 180);
    const distanceLimitM = clampIntSafe(els.marketDistanceLimit.value, 50, 5000, 1200);
    const now = nowMs();
    const gridM = clampIntSafe(state.market.prefs.draftGridM || taskTetherGridMFor(distanceLimitM), 80, 500, taskTetherGridMFor(distanceLimitM));

    state.market.list.unshift({
      id: uid(),
      kind,
      title,
      priceCents,
      distanceLimitM,
      createdAt: now,
      expiresAt: now + timeLimitMin * 60_000,
      status: "open",
      seller: USER_ACTOR,
      sellerLabel: "@you",
      sellerVerified: isUserVerified(),
      loc: { lat: Number(loc.lat), lng: Number(loc.lng) },
      gridM
    });

    state.market.list = state.market.list.slice(0, 50);
    els.marketText.value = "";
    saveState();
    renderMarket();
    toast(t("toast_market_posted"));
  };

  const cancelMarketPost = (postId) => {
    ensureMarketPrefs();
    const id = String(postId || "");
    const it = state.market.list.find((x) => x && x.id === id);
    if (!it) return;
    if (normalizeMarketStatus(it.status) !== "open") return;
    if (actorKeyLocal(it.seller) !== userKey) return;
    it.status = "cancelled";
    saveState();
    renderMarket();
  };

  const spawnSimMarketPost = () => {
    if (!mapApi || typeof mapApi.listAgents !== "function") return;
    ensureMarketPrefs();
    const agents = mapApi.listAgents().filter((a) => a && a.id);
    if (!agents.length) return;
    const openSim = state.market.list.filter((x) => x && normalizeMarketStatus(x.status) === "open" && actorKeyLocal(x.seller) !== userKey);
    if (openSim.length >= 4) return;
    if (Math.random() > 0.33) return;

    const seller = agents[Math.floor(Math.random() * agents.length)];
    const kind = Math.random() < 0.55 ? "service" : "product";
    const ideas =
      kind === "service"
        ? ["Tutoring", "Photo help", "Delivery help", "Repair assist", "Language swap"]
        : ["Used bike", "Headphones", "Umbrella", "Sketchbook", "Phone charger"];
    const title = normalizeTaskTitle(ideas[Math.floor(Math.random() * ideas.length)]);
    const now = nowMs();
    const timeLimitMin = [45, 60, 90, 120, 180, 240, 360][Math.floor(Math.random() * 7)];
    const distanceLimitM = [300, 500, 800, 1200, 2000, 3500][Math.floor(Math.random() * 6)];
    const priceUsd = kind === "service" ? [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)] : [8, 12, 18, 24, 40][Math.floor(Math.random() * 5)];
    const gridM = taskTetherGridMFor(distanceLimitM);
    const loc = taskAreaAnchor({ lat: seller.lat, lng: seller.lng }, gridM, `market:${uid()}:loc`);

    state.market.list.unshift({
      id: uid(),
      kind,
      title,
      priceCents: priceUsd * 100,
      distanceLimitM,
      createdAt: now,
      expiresAt: now + timeLimitMin * 60_000,
      status: "open",
      seller: { kind: "agent", id: String(seller.id) },
      sellerLabel: String(seller.handle || "@sim"),
      sellerVerified: Boolean(seller.verified),
      loc,
      gridM
    });
    state.market.list = state.market.list.slice(0, 50);
    saveState();
    renderMarket();
  };

  const renderMarketList = () => {
    if (!els.marketList) return;
    ensureMarketPrefs();
    ensureUiPrefs();
    els.marketList.replaceChildren();

    const now = nowMs();
    const baseFilter = state.ui && state.ui.listFilters && state.ui.listFilters.market ? state.ui.listFilters.market : {};
    const marketFilter = {
      q: normalizeFilterQuery(baseFilter.q, 72),
      kind: normalizeMarketListFilterKind(baseFilter.kind),
      status: normalizeMarketListFilterStatus(baseFilter.status)
    };
    if (els.marketSearchInput && els.marketSearchInput.value !== marketFilter.q) els.marketSearchInput.value = marketFilter.q;
    if (els.marketKindFilter && els.marketKindFilter.value !== marketFilter.kind) els.marketKindFilter.value = marketFilter.kind;
    if (els.marketStatusFilter && els.marketStatusFilter.value !== marketFilter.status) els.marketStatusFilter.value = marketFilter.status;
    if (els.marketFilterClear) {
      els.marketFilterClear.disabled = !marketFilter.q && marketFilter.kind === "all" && marketFilter.status === "all";
    }
    const tokens = queryTokens(marketFilter.q);

    const allItems = state.market.list
      .slice()
      .sort((a, b) => (Number(b && b.createdAt) || 0) - (Number(a && a.createdAt) || 0));
    const filtered = allItems
      .filter((it) => {
        if (!it || !it.id) return false;
        if (marketFilter.kind !== "all" && normalizeMarketKind(it.kind) !== marketFilter.kind) return false;
        if (!matchesMarketFilterStatus(it.status, marketFilter.status)) return false;
        if (!tokens.length) return true;
        const hay = `${String(it.title || "")} ${String(it.sellerLabel || "")} ${String(it.kind || "")}`;
        return queryMatchesText(tokens, hay);
      });
    const items = filtered.slice(0, 14);
    renderListFilterMeta(els.marketFilterMeta, allItems.length, items.length);

    if (!items.length) {
      const li = document.createElement("li");
      li.className = "marketItem marketItem--empty";
      li.textContent = allItems.length > 0 ? t("filter_results_none") : t("market_list_empty");
      els.marketList.appendChild(li);
      return;
    }

    for (const it of items) {
      if (!it || !it.id) continue;
      const kind = normalizeMarketKind(it.kind);
      const status = normalizeMarketStatus(it.status);
      const sellerKey = actorKeyLocal(it.seller);
      const isMine = sellerKey === userKey;
      const title = normalizeTaskTitle(it.title || "");
      const leftMs = Math.max(0, (Number(it.expiresAt) || 0) - now);

      const li = document.createElement("li");
      li.className = "marketItem";

      const top = document.createElement("div");
      top.className = "marketItem__top";

      const titleEl = document.createElement("div");
      titleEl.className = "marketItem__title";
      titleEl.textContent = `${kind === "service" ? t("market_kind_service") : t("market_kind_product")} • ${title}`;

      const priceEl = document.createElement("div");
      priceEl.className = "marketItem__meta";
      priceEl.textContent = fmtUsd(Number(it.priceCents) || 0);

      top.appendChild(titleEl);
      top.appendChild(priceEl);

      const meta = document.createElement("div");
      meta.className = "marketItem__meta";
      meta.textContent = `${String(it.sellerLabel || getActorInfoSafe(it.seller).label || "@").trim()} • <= ${clampIntSafe(it.distanceLimitM, 50, 5000, 1200)}m`;

      const actions = document.createElement("div");
      actions.className = "marketItem__actions";

      const viewBtn = document.createElement("button");
      viewBtn.type = "button";
      viewBtn.className = "btn btn--ghost";
      viewBtn.textContent = t("room_view_on_map");
      viewBtn.addEventListener("click", () => {
        if (!mapApi || typeof mapApi.focusLatLng !== "function") return;
        const ll = it.loc;
        if (!ll) return;
        mapApi.focusLatLng({ lat: ll.lat, lng: ll.lng, zoom: 16 });
      });
      actions.appendChild(viewBtn);

      if (status === "open" && isMine) {
        const cancelBtn = document.createElement("button");
        cancelBtn.type = "button";
        cancelBtn.className = "btn btn--ghost";
        cancelBtn.textContent = t("task_cancel");
        cancelBtn.addEventListener("click", () => cancelMarketPost(it.id));
        actions.appendChild(cancelBtn);
      }

      li.appendChild(top);
      li.appendChild(meta);

      if (status === "open") {
        const totalMs = Math.max(1, (Number(it.expiresAt) || 0) - (Number(it.createdAt) || 0));
        const frac = clamp(leftMs / totalMs, 0, 1);
        const bar = document.createElement("div");
        bar.className = "timeBar";
        bar.title = fmtMinutes(leftMs);
        const fill = document.createElement("div");
        fill.className = "timeBar__fill";
        fill.style.width = `${Math.round(frac * 100)}%`;
        bar.appendChild(fill);
        li.appendChild(bar);
      }

      li.appendChild(actions);
      els.marketList.appendChild(li);
    }
  };

  const syncMarketOnMap = () => {
    if (!mapApi || typeof mapApi.setMarketPosts !== "function") return;
    ensureMarketPrefs();
    mapApi.setMarketPosts(state.market.list.slice());
  };

  const renderMarket = () => {
    renderMarketForm();
    renderMarketList();
    const n = state.market && Array.isArray(state.market.list) ? state.market.list.length : 0;
    if (els.marketListCount) els.marketListCount.textContent = String(n);
    if (els.marketTabMarketCount) {
      els.marketTabMarketCount.textContent = String(n);
      els.marketTabMarketCount.hidden = n <= 0;
    }
    syncMarketOnMap();
  };

  // --- Scheduled Activities (Event Auras) ---

  const ensureEventsPrefs = () => {
    if (!state.events || typeof state.events !== "object") state.events = defaultState().events;
    if (!Array.isArray(state.events.list)) state.events.list = [];
    if (!state.events.prefs || typeof state.events.prefs !== "object") state.events.prefs = defaultState().events.prefs;
    state.events.prefs.draftGridM = clampIntSafe(state.events.prefs.draftGridM, 50, 2000, 0);
    const pt = state.events.prefs.draftLoc;
    if (!pt || typeof pt !== "object") state.events.prefs.draftLoc = null;
    else {
      const lat = Number(pt.lat);
      const lng = Number(pt.lng);
      state.events.prefs.draftLoc = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
    }
  };

  const eventsGridMFromDraft = () => 120;

  const setEventsDraftLoc = (latLng) => {
    ensureEventsPrefs();
    const gridM = eventsGridMFromDraft();
    const anchor = taskAreaAnchor(latLng, gridM, "draft:events:loc");
    if (!anchor) return;
    state.events.prefs.draftGridM = gridM;
    state.events.prefs.draftLoc = anchor;
    saveState();
    renderEvents();
  };

  const clearEventsDraftLoc = () => {
    ensureEventsPrefs();
    state.events.prefs.draftLoc = null;
    state.events.prefs.draftGridM = 0;
    saveState();
    renderEvents();
  };

  const useMyAreaForEvents = async () => {
    const ll = await ensureUserLatLngSafe();
    if (!ll) {
      toast(t("toast_task_poster_unavailable"));
      return;
    }
    setEventsDraftLoc(ll);
  };

  const renderEventsForm = () => {
    ensureEventsPrefs();
    if (els.eventsPill) els.eventsPill.textContent = t("events_pill");
    if (els.eventsStartsIn && els.eventsStartsInValue) {
      const min = clampIntSafe(els.eventsStartsIn.value, 0, 360, 30);
      els.eventsStartsInValue.textContent = fmtMinutes(min * 60_000);
    }
    if (els.eventsDuration && els.eventsDurationValue) {
      const min = clampIntSafe(els.eventsDuration.value, 15, 180, 60);
      els.eventsDurationValue.textContent = fmtMinutes(min * 60_000);
    }
    if (els.eventsLocMeta) {
      els.eventsLocMeta.textContent = state.events.prefs.draftLoc ? t("events_loc_set") : t("events_loc_unset");
    }
  };

  const computeEventState = (ev, now) => {
    const statusRaw = String(ev && ev.status ? ev.status : "");
    if (statusRaw === "cancelled") return "cancelled";
    const startAt = Number(ev && ev.startAt) || 0;
    const endsAt = Number(ev && ev.endsAt) || 0;
    if (startAt && now < startAt) return "scheduled";
    if (startAt && endsAt && now >= startAt && now <= endsAt) return "live";
    if (endsAt && now > endsAt) return "ended";
    return "scheduled";
  };

  const postEventFromForm = () => {
    ensureEventsPrefs();
    if (!els.eventsText || !els.eventsStartsIn || !els.eventsDuration) return;
    const title = normalizeActivityText(els.eventsText.value).slice(0, 60);
    if (!title) return;
    const loc = state.events.prefs.draftLoc;
    if (!loc) {
      toast(t("toast_events_need_location"));
      return;
    }

    const startsInMin = clampIntSafe(els.eventsStartsIn.value, 0, 360, 30);
    const durMin = clampIntSafe(els.eventsDuration.value, 15, 180, 60);
    const now = nowMs();
    const startAt = now + startsInMin * 60_000;
    const endsAt = startAt + durMin * 60_000;

    state.events.list.unshift({
      id: uid(),
      title,
      createdAt: now,
      startAt,
      endsAt,
      status: "scheduled",
      host: USER_ACTOR,
      hostLabel: "@you",
      loc: { lat: Number(loc.lat), lng: Number(loc.lng) },
      joinCount: 0,
      joinedBy: []
    });
    state.events.list = state.events.list.slice(0, 50);
    els.eventsText.value = "";
    saveState();
    renderEvents();
    toast(t("toast_events_posted"));
  };

  const toggleJoinEvent = (eventId) => {
    ensureEventsPrefs();
    const id = String(eventId || "");
    const ev = state.events.list.find((x) => x && x.id === id);
    if (!ev) return;
    const now = nowMs();
    const st = computeEventState(ev, now);
    if (st !== "scheduled" && st !== "live") return;
    if (!Array.isArray(ev.joinedBy)) ev.joinedBy = [];
    const has = ev.joinedBy.includes(userKey);
    if (has) {
      ev.joinedBy = ev.joinedBy.filter((k) => k !== userKey);
      ev.joinCount = Math.max(0, clampIntSafe(ev.joinCount, 0, 99999, 0) - 1);
      saveState();
      renderEvents();
      toast(t("toast_events_left"));
      return;
    }
    ev.joinedBy.unshift(userKey);
    ev.joinCount = Math.max(0, clampIntSafe(ev.joinCount, 0, 99999, 0) + 1);
    saveState();
    renderEvents();
    toast(t("toast_events_joined"));
  };

  const cancelEvent = (eventId) => {
    ensureEventsPrefs();
    const id = String(eventId || "");
    const ev = state.events.list.find((x) => x && x.id === id);
    if (!ev) return;
    if (actorKeyLocal(ev.host) !== userKey) return;
    if (String(ev.status || "") === "cancelled") return;
    ev.status = "cancelled";
    saveState();
    renderEvents();
  };

  const seedEventBookings = () => {
    if (!mapApi || typeof mapApi.listAgents !== "function") return;
    ensureEventsPrefs();
    const now = nowMs();
    let changed = false;
    for (const ev of state.events.list) {
      if (!ev) continue;
      const st = computeEventState(ev, now);
      if (st !== "scheduled" && st !== "live") continue;
      const joinCount = clampIntSafe(ev.joinCount, 0, 99999, 0);
      if (joinCount >= 28) continue;
      // Gradually fill. Live events are more active.
      const p = st === "live" ? 0.35 : 0.22;
      if (Math.random() > p) continue;
      ev.joinCount = joinCount + 1;
      changed = true;
    }
    if (!changed) return;
    saveState();
    renderEvents();
  };

  const spawnSimEvent = () => {
    if (!mapApi || typeof mapApi.listAgents !== "function") return;
    ensureEventsPrefs();
    const open = state.events.list.filter((x) => x && String(x.status || "") !== "cancelled");
    if (open.length >= 4) return;
    if (Math.random() > 0.25) return;

    const agents = mapApi.listAgents().filter((a) => a && a.id);
    if (!agents.length) return;
    const host = agents[Math.floor(Math.random() * agents.length)];
    const ideas = ["Coffee club", "Sketch walk", "Lunch meetup", "Night ride", "Study sprint"];
    const title = String(ideas[Math.floor(Math.random() * ideas.length)]);
    const now = nowMs();
    const startsInMin = [0, 15, 30, 45, 60, 90, 120][Math.floor(Math.random() * 7)];
    const durMin = [30, 45, 60, 90, 120][Math.floor(Math.random() * 5)];
    const startAt = now + startsInMin * 60_000;
    const endsAt = startAt + durMin * 60_000;
    const gridM = eventsGridMFromDraft();
    const loc = taskAreaAnchor({ lat: host.lat, lng: host.lng }, gridM, `event:${uid()}:loc`);
    state.events.list.unshift({
      id: uid(),
      title,
      createdAt: now,
      startAt,
      endsAt,
      status: "scheduled",
      host: { kind: "agent", id: String(host.id) },
      hostLabel: String(host.handle || "@sim"),
      loc,
      joinCount: clampIntSafe(Math.round(randBetween(0, 8)), 0, 28, 0),
      joinedBy: []
    });
    state.events.list = state.events.list.slice(0, 50);
    saveState();
    renderEvents();
  };

  const renderEventsList = () => {
    if (!els.eventsList) return;
    ensureEventsPrefs();
    ensureUiPrefs();
    els.eventsList.replaceChildren();

    const now = nowMs();
    const baseFilter = state.ui && state.ui.listFilters && state.ui.listFilters.events ? state.ui.listFilters.events : {};
    const eventsFilter = {
      q: normalizeFilterQuery(baseFilter.q, 72),
      state: normalizeEventsListFilterState(baseFilter.state)
    };
    if (els.eventsSearchInput && els.eventsSearchInput.value !== eventsFilter.q) els.eventsSearchInput.value = eventsFilter.q;
    if (els.eventsStateFilter && els.eventsStateFilter.value !== eventsFilter.state) els.eventsStateFilter.value = eventsFilter.state;
    if (els.eventsFilterClear) {
      els.eventsFilterClear.disabled = !eventsFilter.q && eventsFilter.state === "all";
    }

    const tokens = queryTokens(eventsFilter.q);
    const allItems = state.events.list
      .slice()
      .sort((a, b) => (Number(b && b.createdAt) || 0) - (Number(a && a.createdAt) || 0));
    const filtered = allItems.filter((ev) => {
      if (!ev || !ev.id) return false;
      const st = computeEventState(ev, now);
      if (eventsFilter.state !== "all" && st !== eventsFilter.state) return false;
      if (!tokens.length) return true;
      const hay = `${String(ev.title || "")} ${String(ev.hostLabel || "")}`;
      return queryMatchesText(tokens, hay);
    });
    const items = filtered.slice(0, 14);
    renderListFilterMeta(els.eventsFilterMeta, allItems.length, items.length);

    if (!items.length) {
      const li = document.createElement("li");
      li.className = "eventItem eventItem--empty";
      li.textContent = allItems.length > 0 ? t("filter_results_none") : t("events_list_empty");
      els.eventsList.appendChild(li);
      return;
    }

    for (const ev of items) {
      if (!ev || !ev.id) continue;
      const st = computeEventState(ev, now);
      const title = normalizeActivityText(ev.title || "").slice(0, 60);
      const hostLabel = String(ev.hostLabel || getActorInfoSafe(ev.host).label || "@").trim();
      const joined = Array.isArray(ev.joinedBy) && ev.joinedBy.includes(userKey);
      const joinCount = clampIntSafe(ev.joinCount, 0, 99999, 0);

      const li = document.createElement("li");
      li.className = "eventItem";

      const top = document.createElement("div");
      top.className = "eventItem__top";
      const titleEl = document.createElement("div");
      titleEl.className = "eventItem__title";
      titleEl.textContent = title;
      const chip = document.createElement("div");
      chip.className = "eventItem__meta";
      const stKey = st === "live" ? "events_state_live" : st === "ended" ? "events_state_ended" : st === "cancelled" ? "events_state_cancelled" : "events_state_scheduled";
      chip.textContent = t(stKey);
      top.appendChild(titleEl);
      top.appendChild(chip);

      const meta = document.createElement("div");
      meta.className = "eventItem__meta";
      meta.textContent = `${hostLabel} • ${fmtHm(ev.startAt)} • ${fmtMinutes(Math.max(0, (Number(ev.endsAt) || 0) - (Number(ev.startAt) || 0)))} • ${joinCount}`;

      const actions = document.createElement("div");
      actions.className = "eventItem__actions";

      const viewBtn = document.createElement("button");
      viewBtn.type = "button";
      viewBtn.className = "btn btn--ghost";
      viewBtn.textContent = t("room_view_on_map");
      viewBtn.addEventListener("click", () => {
        if (!mapApi || typeof mapApi.focusLatLng !== "function") return;
        const ll = ev.loc;
        if (!ll) return;
        mapApi.focusLatLng({ lat: ll.lat, lng: ll.lng, zoom: 16 });
      });
      actions.appendChild(viewBtn);

      if (st === "scheduled" || st === "live") {
        const joinBtn = document.createElement("button");
        joinBtn.type = "button";
        joinBtn.className = joined ? "btn btn--ghost" : "btn btn--primary";
        joinBtn.textContent = joined ? t("events_leave") : t("events_join");
        joinBtn.addEventListener("click", () => toggleJoinEvent(ev.id));
        actions.appendChild(joinBtn);
      }

      if (st === "scheduled" && actorKeyLocal(ev.host) === userKey) {
        const cancelBtn = document.createElement("button");
        cancelBtn.type = "button";
        cancelBtn.className = "btn btn--ghost";
        cancelBtn.textContent = t("events_cancel");
        cancelBtn.addEventListener("click", () => cancelEvent(ev.id));
        actions.appendChild(cancelBtn);
      }

      li.appendChild(top);
      li.appendChild(meta);
      li.appendChild(actions);
      els.eventsList.appendChild(li);
    }
  };

  const syncEventsOnMap = () => {
    if (!mapApi || typeof mapApi.setEvents !== "function") return;
    ensureEventsPrefs();
    mapApi.setEvents(state.events.list.slice());
  };

  const renderEvents = () => {
    renderEventsForm();
    renderEventsList();
    const n = state.events && Array.isArray(state.events.list) ? state.events.list.length : 0;
    if (els.eventsListCount) els.eventsListCount.textContent = String(n);
    if (els.marketTabEventsCount) {
      els.marketTabEventsCount.textContent = String(n);
      els.marketTabEventsCount.hidden = n <= 0;
    }
    syncEventsOnMap();
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
      onActivityLogMutated();
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
    onActivityLogMutated();
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
    renderOnboarding();
    renderActivity(true);
    renderMapLayerFilters();
    renderMarketplaceTabs();
    applyDropStates();
    renderTasks();
    renderMarket();
    renderEvents();
    startTaskEngine();
  };

  // --- App Shell (section nav, backup, PWA, online state) ---

  const SECTION_TARGETS = ["activitySection", "mapSection", "marketplaceSection"];
  const normalizeSectionTarget = (value) => {
    const v = String(value || "");
    return SECTION_TARGETS.includes(v) ? v : "activitySection";
  };

  const sectionTabElements = () =>
    [
      { id: "activitySection", el: els.sectionTabActivity },
      { id: "mapSection", el: els.sectionTabMap },
      { id: "marketplaceSection", el: els.sectionTabMarket }
    ].filter((x) => x.el);

  const setSectionTabSelected = (sectionId, { persist = false } = {}) => {
    const active = normalizeSectionTarget(sectionId);
    for (const { id, el } of sectionTabElements()) {
      const on = id === active;
      el.setAttribute("aria-pressed", on ? "true" : "false");
    }
    if (persist) {
      ensureUiPrefs();
      if (state.ui.section !== active) {
        state.ui.section = active;
        saveState();
      }
    }
  };

  const scrollToSection = (sectionId) => {
    const id = normalizeSectionTarget(sectionId);
    const target = document.getElementById(id);
    if (!target) return;
    setSectionTabSelected(id, { persist: true });
    try {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.focus({ preventScroll: true });
    } catch {
      target.scrollIntoView(true);
      target.focus();
    }
  };

  const bindSectionTabs = () => {
    if (!els.sectionTabs) return;

    ensureUiPrefs();
    setSectionTabSelected(normalizeSectionTarget(state.ui.section), { persist: false });

    els.sectionTabs.addEventListener("click", (e) => {
      const btn = e && e.target ? e.target.closest("button[data-section-target]") : null;
      if (!btn) return;
      const sectionId = String(btn.getAttribute("data-section-target") || "");
      scrollToSection(sectionId);
    });

    els.sectionTabs.addEventListener("keydown", (e) => {
      if (!e) return;
      const key = String(e.key || "");
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
      const tabs = sectionTabElements().map((x) => x.el).filter(Boolean);
      if (!tabs.length) return;
      const currentIdx = Math.max(
        0,
        tabs.findIndex((x) => String(x.getAttribute("aria-pressed") || "") === "true")
      );

      let nextIdx = currentIdx;
      if (key === "ArrowLeft") nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
      if (key === "ArrowRight") nextIdx = (currentIdx + 1) % tabs.length;
      if (key === "Home") nextIdx = 0;
      if (key === "End") nextIdx = tabs.length - 1;
      const nextBtn = tabs[nextIdx];
      if (!nextBtn) return;
      const sectionId = String(nextBtn.getAttribute("data-section-target") || "");
      setSectionTabSelected(sectionId, { persist: true });
      nextBtn.focus();
      e.preventDefault();
    });

    if (typeof window.IntersectionObserver !== "function") return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((x) => x && x.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (!visible.length) return;
        const id = visible[0].target && visible[0].target.id ? String(visible[0].target.id) : "";
        if (!id) return;
        setSectionTabSelected(id, { persist: true });
      },
      {
        root: null,
        threshold: [0.2, 0.5, 0.8],
        rootMargin: "-18% 0px -55% 0px"
      }
    );

    for (const id of SECTION_TARGETS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  };

  const renderNetworkPill = () => {
    if (!els.netPill) return;
    const online = typeof navigator === "undefined" ? true : navigator.onLine !== false;
    els.netPill.classList.toggle("pill--ok", online);
    els.netPill.classList.toggle("pill--warn", !online);
    els.netPill.textContent = online ? t("net_online") : t("net_offline");
  };

  const bindNetworkPill = () => {
    renderNetworkPill();
    window.addEventListener("online", renderNetworkPill);
    window.addEventListener("offline", renderNetworkPill);
  };

  const readFileText = (file) =>
    new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("no_file"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("read_fail"));
      reader.readAsText(file, "utf-8");
    });

  const downloadJson = (name, obj) => {
    const filename = String(name || "auranet-backup.json");
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    const a = document.createElement("a");
    const href = URL.createObjectURL(blob);
    a.href = href;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 3000);
  };

  const buildBackupPayload = () => ({
    schemaVersion: 1,
    app: "AuraNet",
    exportedAt: new Date().toISOString(),
    profileId: activeProfileId,
    data: state
  });

  const applyImportedState = (candidate) => {
    const currentAuthUser = normalizeAuthUser(state && state.auth && state.auth.user);
    const prevRaw = localStorage.getItem(activeStorageKey);
    try {
      localStorage.setItem(activeStorageKey, JSON.stringify(candidate));
      const next = loadState(activeStorageKey);
      if (!next || Number(next.version) !== 1) throw new Error("invalid");
      state = next;
      state.auth = state.auth && typeof state.auth === "object" ? state.auth : defaultState().auth;
      state.auth.user = currentAuthUser;
      trimActivityLogInPlace();
      bumpActivityLogRevision();
      i18nLang = normalizeLang(state.activity && state.activity.prefs && state.activity.prefs.lang);
      saveState({ immediate: true });
      applyI18n();
      render();
      if (mapApi && typeof mapApi.refreshI18n === "function") mapApi.refreshI18n();
      return true;
    } catch {
      if (prevRaw == null) {
        localStorage.removeItem(activeStorageKey);
        lastSerializedState = null;
      } else {
        localStorage.setItem(activeStorageKey, prevRaw);
        lastSerializedState = prevRaw;
      }
      return false;
    }
  };

  const normalizeBackupPayload = (parsed) => {
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.data && typeof parsed.data === "object") return parsed.data;
    return parsed;
  };

  const bindDataTools = () => {
    if (els.dataExportBtn) {
      els.dataExportBtn.addEventListener("click", () => {
        const stamp = fmtClock().replace(/[^0-9]/g, "").slice(0, 12);
        downloadJson(`auranet-backup-${stamp}.json`, buildBackupPayload());
        toast(t("toast_export_ready"));
      });
    }

    if (els.dataImportBtn && els.dataImportInput) {
      els.dataImportBtn.addEventListener("click", () => {
        try {
          els.dataImportInput.click();
        } catch {
          // ignore
        }
      });

      els.dataImportInput.addEventListener("change", async () => {
        const file = els.dataImportInput.files && els.dataImportInput.files[0] ? els.dataImportInput.files[0] : null;
        els.dataImportInput.value = "";
        if (!file) return;
        try {
          const text = await readFileText(file);
          const parsed = JSON.parse(text);
          const candidate = normalizeBackupPayload(parsed);
          if (!candidate || Number(candidate.version) !== 1) {
            toast(t("toast_import_invalid"));
            return;
          }
          const ok = applyImportedState(candidate);
          toast(ok ? t("toast_import_done") : t("toast_import_failed"));
        } catch {
          toast(t("toast_import_invalid"));
        }
      });
    }
  };

  let deferredInstallPrompt = null;

  const syncInstallButton = () => {
    if (!els.appInstallBtn) return;
    const canPrompt = Boolean(deferredInstallPrompt);
    els.appInstallBtn.hidden = !canPrompt;
    els.appInstallBtn.disabled = !canPrompt;
  };

  const bindPwaFeatures = () => {
    if ("serviceWorker" in navigator) {
      let swUpdatedNoticeShown = false;
      let swControllerChanged = false;
      const notifySwUpdate = () => {
        if (swUpdatedNoticeShown) return;
        swUpdatedNoticeShown = true;
        toast(t("toast_pwa_update_ready"));
      };
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("./sw.js")
          .then((registration) => {
            if (!registration) return;
            if (registration.waiting && navigator.serviceWorker.controller) {
              notifySwUpdate();
            }
            registration.addEventListener("updatefound", () => {
              const installing = registration.installing;
              if (!installing) return;
              installing.addEventListener("statechange", () => {
                if (installing.state === "installed" && navigator.serviceWorker.controller) {
                  notifySwUpdate();
                }
              });
            });
          })
          .catch(() => {
            // Silent fail: app remains usable without offline cache.
          });
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (swControllerChanged) return;
        swControllerChanged = true;
        toast(t("toast_pwa_update_applied"));
      });
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      if (!e) return;
      e.preventDefault();
      deferredInstallPrompt = e;
      syncInstallButton();
    });

    window.addEventListener("appinstalled", () => {
      deferredInstallPrompt = null;
      syncInstallButton();
      toast(t("toast_app_installed"));
    });

    if (els.appInstallBtn) {
      els.appInstallBtn.addEventListener("click", async () => {
        if (!deferredInstallPrompt) {
          toast(t("toast_pwa_unavailable"));
          return;
        }
        const promptEvent = deferredInstallPrompt;
        deferredInstallPrompt = null;
        syncInstallButton();
        try {
          promptEvent.prompt();
          await promptEvent.userChoice;
        } catch {
          // ignore
        }
      });
    }

    syncInstallButton();
  };

  // --- Map ---

  const setMapStatus = (message, isError = false) => {
    if (!els.mapStatus) return;
    els.mapStatus.textContent = message;
    els.mapStatus.style.color = isError ? "rgba(180, 35, 58, 0.9)" : "";
    if (els.mapSection) {
      const txt = String(message || "").toLowerCase();
      const busy = !isError && /(load|request|fetch|載入|請求|取得|読み込み|要求|取得中)/.test(txt);
      els.mapSection.setAttribute("aria-busy", busy ? "true" : "false");
    }
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

    const HOME_VIEW_ZOOM = 12;
    const wrapLng0 = (lng) => ((lng + 180) % 360 + 360) % 360 - 180;
    const readHomeFromState = () => {
      const h = state && state.activity && state.activity.prefs && state.activity.prefs.home;
      if (!h || typeof h !== "object") return null;
      const lat = Number(h.lat);
      const lng = Number(h.lng);
      const zoomRaw = Number(h.zoom);
      const zoom = Number.isFinite(zoomRaw) ? Math.max(2, Math.min(18, Math.round(zoomRaw))) : HOME_VIEW_ZOOM;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return { center: [Math.max(-85, Math.min(85, lat)), wrapLng0(lng)], zoom };
    };

    const guessDefaultView = () => {
      const tz = (() => {
        try {
          return String(Intl.DateTimeFormat().resolvedOptions().timeZone || "").trim();
        } catch {
          return "";
        }
      })();
      const lang = (() => {
        try {
          return String(navigator.language || "").trim().toLowerCase();
        } catch {
          return "";
        }
      })();

      const norm = (center, zoom = HOME_VIEW_ZOOM) => ({
        center: [Math.max(-85, Math.min(85, center[0])), wrapLng0(center[1])],
        zoom: Number.isFinite(Number(zoom)) ? Math.max(2, Math.min(18, Math.round(zoom))) : HOME_VIEW_ZOOM
      });

      const presets = {
        "America/Los_Angeles": norm([37.7749, -122.4194]),
        "America/Vancouver": norm([49.2827, -123.1207]),
        "America/New_York": norm([40.7128, -74.0060]),
        "America/Chicago": norm([41.8781, -87.6298]),
        "America/Denver": norm([39.7392, -104.9903]),
        "America/Phoenix": norm([33.4484, -112.0740]),
        "America/Toronto": norm([43.6532, -79.3832]),
        "Pacific/Honolulu": norm([21.3069, -157.8583]),
        "Europe/London": norm([51.5072, -0.1276]),
        "Europe/Paris": norm([48.8566, 2.3522]),
        "Europe/Berlin": norm([52.5200, 13.4050]),
        "Asia/Taipei": norm([25.0375, 121.5637]),
        "Asia/Hong_Kong": norm([22.3193, 114.1694]),
        "Asia/Tokyo": norm([35.6762, 139.6503]),
        "Asia/Seoul": norm([37.5665, 126.9780]),
        "Asia/Shanghai": norm([31.2304, 121.4737]),
        "Asia/Singapore": norm([1.3521, 103.8198]),
        "Australia/Sydney": norm([-33.8688, 151.2093])
      };

      if (tz && presets[tz]) return presets[tz];

      // Broad fallbacks.
      if (tz.startsWith("America/")) return presets["America/Los_Angeles"];
      if (tz.startsWith("Europe/")) return presets["Europe/London"];
      if (tz.startsWith("Australia/")) return presets["Australia/Sydney"];
      if (tz.startsWith("Asia/")) {
        if (lang.startsWith("ja")) return presets["Asia/Tokyo"];
        if (lang.startsWith("zh")) return presets["Asia/Taipei"];
        return presets["Asia/Singapore"];
      }

      if (lang.startsWith("ja")) return presets["Asia/Tokyo"];
      if (lang.startsWith("zh")) return presets["Asia/Taipei"];
      return presets["America/Los_Angeles"];
    };

    // Default view: your saved coarse "home" (city-ish) when available, otherwise a best-effort guess.
    let homeView = readHomeFromState();
    const defaultView = homeView || guessDefaultView();
    map.setView(defaultView.center, defaultView.zoom);

    let myAccuracyRing = null;
    let userAuraLayers = [];
    let userAuraEnabled = false;
    let userAuraColor = "#FF6A00";
    let userAuraAgeMs = 0;
    let userAuraStrength = 0;
    let userAuraVerified = Boolean(state && state.tasks && state.tasks.prefs && state.tasks.prefs.userVerified);
    let userAuraRequested = false;
    let userWatchId = null;
    let userPrimePending = false;
    let lastUserLatLng = null;
    let lastUserLatLngRaw = null;
    let lastUserLatLngBlurred = null;
    let lastUserAccuracyM = null;
    let selfPreciseMode = false;
    let userVisibilityMode = normalizeVisibilityMode(state.activity.prefs.visibilityMode);
    let userAreaRadiusM = normalizeAreaRadiusM(state.activity.prefs.areaRadiusM);
    let mapLayerFilters = normalizeMapLayerFilters(state && state.ui && state.ui.mapFilters);
    const PRIVACY_GRID_BY_MODE_M = {
      everyone: 5000,
      connected: 250
    };
    const gridForMode = (mode) => {
      const m = normalizeVisibilityMode(mode);
      if (m === "area") return userAreaRadiusM;
      return PRIVACY_GRID_BY_MODE_M[m] || 250;
    };
    const privacyOffsetSpanM = (gridM) => Math.max(6, Math.min(260, (Number(gridM) || 250) * 0.45));
    const randomPrivacyOffsetM = (gridM) => (Math.random() - 0.5) * privacyOffsetSpanM(gridM);
    // Privacy: blur the true GPS coordinate so the aura doesn't pinpoint you.
    const initialGridM = gridForMode(userVisibilityMode);
    const userPrivacy = {
      // Quantize to a grid based on visibility mode.
      gridM: initialGridM,
      // Per-session extra offset (kept stable while the page is open).
      offsetEastM: randomPrivacyOffsetM(initialGridM),
      offsetNorthM: randomPrivacyOffsetM(initialGridM)
    };
    const auraPane = map.createPane("auraPane");
    auraPane.style.zIndex = "450";
    const simRenderer = L.canvas({ padding: 0.5, pane: "auraPane", tolerance: 8 });
    const selfAuraPane = map.createPane("selfAuraPane");
    // Keep self aura above the paper texture overlay so it stays visible.
    selfAuraPane.style.zIndex = "460";
    const selfAuraRenderer = L.canvas({ padding: 0.5, pane: "selfAuraPane", tolerance: 8 });
    const taskPane = map.createPane("taskPane");
    // Above the paper texture + aura haze so accepted-task tethers stay visible.
    taskPane.style.zIndex = "520";
    const taskLines = new Map(); // taskId -> polyline
    let tasksForLines = [];
    let lastLineSyncAt = 0;

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
    const agentsById = new Map();
    let agentSeq = 0;
    let selectedAgentId = "";
    let selectedAgentPopup = null;
    let lastAuraPopupAt = 0;

    const clearSelectedAgentPopupIfMissing = () => {
      if (!selectedAgentPopup || !selectedAgentId) return;
      if (agentsById.has(selectedAgentId)) return;
      try {
        map.closePopup(selectedAgentPopup);
      } catch {
        // ignore
      }
      selectedAgentPopup = null;
      selectedAgentId = "";
    };

    const isAgentBlocked = (agent) => {
      if (!agent) return true;
      return isBlockedContact(agent.handle);
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
          ? t("visibility_area_badge", { m: userAreaRadiusM })
          : m === "connected"
            ? t("visibility_connected")
            : t("visibility_everyone");
      els.mapVis.textContent = `${t("map_vis_prefix")}: ${label}`;
      els.mapVis.classList.toggle("badge--ok", kind === "ok");
      els.mapVis.classList.toggle("badge--warn", kind === "warn");
    };

    const actorKey = (actor) => {
      if (!actor || typeof actor !== "object") return "";
      const kind = String(actor.kind || "").trim();
      const id = String(actor.id || "").trim();
      if (!kind || !id) return "";
      return `${kind}:${id}`;
    };

    const actorLatLngFor = (actor) => {
      if (!actor || typeof actor !== "object") return null;
      if (actor.kind === "user") return lastUserLatLng || null;
      if (actor.kind === "agent") {
        const a = agentsById.get(String(actor.id || "")) || null;
        if (!a || !a.outer) return null;
        try {
          return a.outer.getLatLng();
        } catch {
          return null;
        }
      }
      return null;
    };

    const taskLineStyle = (task) => {
      const status = String(task && task.status ? task.status : "");
      const accepted = status === "accepted";
      return {
        pane: "taskPane",
        color: accepted ? "rgba(255, 106, 0, 0.55)" : "rgba(32, 24, 18, 0.35)",
        weight: accepted ? 2.2 : 1.8,
        opacity: 0.9,
        lineCap: "round",
        dashArray: accepted ? "6 8" : "3 10"
      };
    };

    const ensureTaskLine = (task) => {
      if (!task || !task.id) return null;
      const id = String(task.id);
      const existing = taskLines.get(id) || null;
      if (existing) return existing;
      const line = L.polyline([], taskLineStyle(task)).addTo(map);
      taskLines.set(id, line);
      return line;
    };

    const clearTaskLines = () => {
      for (const [id, line] of taskLines.entries()) {
        try {
          line.remove();
        } catch {
          // ignore
        }
        taskLines.delete(id);
      }
    };

    const syncTaskLines = (now) => {
      const tNow = Number.isFinite(Number(now)) ? Number(now) : simNow();
      if (!mapLayerFilters.services) {
        clearTaskLines();
        lastLineSyncAt = tNow;
        return;
      }

      const asLatLng = (pt) => {
        if (!pt || typeof pt !== "object") return null;
        const lat = Number(pt.lat);
        const lng = Number(pt.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
        return L.latLng(clamp(lat, -85, 85), wrapLng(lng));
      };

      const gridForTask = (task) => {
        const hinted = clampInt(task && task.tetherGridM, 80, 500, 0);
        if (hinted) return hinted;
        const d = Math.max(50, Number(task && task.distanceLimitM) || 800);
        return clampInt(Math.round(d * 0.25), 80, 500, 250);
      };

      const anchorForTask = (task, ll, suffix) => {
        if (!task || !task.id || !ll) return null;
        const gridM = gridForTask(task);
        const q = quantizeLatLng(ll, gridM);
        const h = fnv1a32(`task:${String(task.id)}:${String(suffix || "")}`);
        const span = Math.max(8, Math.min(220, gridM * 0.38));
        const east = ((((h & 0xffff) / 0xffff) * 2 - 1) * span);
        const north = (((((h >>> 16) & 0xffff) / 0xffff) * 2 - 1) * span);
        return offsetLatLngMeters(q, east, north);
      };

      const wantIds = new Set();
      for (const task of tasksForLines) {
        const status = String(task && task.status ? task.status : "");
        if (status !== "accepted") continue;
        const from = asLatLng(task && task.tetherFrom);
        const to = asLatLng(task && task.tetherTo);
        if (!from || !to) continue;
        wantIds.add(String(task.id));
        const line = ensureTaskLine(task);
        if (!line) continue;
        line.setStyle(taskLineStyle(task));
        line.setLatLngs([from, to]);
      }

      for (const [id, line] of taskLines.entries()) {
        if (wantIds.has(id)) continue;
        try {
          line.remove();
        } catch {
          // ignore
        }
        taskLines.delete(id);
      }

      lastLineSyncAt = tNow;
    };

    const protectedAgentIds = () => {
      const ids = new Set();
      for (const task of tasksForLines) {
        const status = String(task && task.status ? task.status : "");
        if (status !== "accepted") continue;
        const a = task && task.poster;
        const b = task && task.acceptedBy;
        if (a && a.kind === "agent" && a.id) ids.add(String(a.id));
        if (b && b.kind === "agent" && b.id) ids.add(String(b.id));
      }
      return ids;
    };

    const layersForBounds = () => {
      const layers = [];
      return layers;
    };

    const STREET_MIN_ZOOM = 12;
    const DIALOG_MIN_ZOOM = STREET_MIN_ZOOM;
    const SHOW_SIM_ACTIVITY_DIALOGS = false;
    const AURA_GRAY_HEX = "#b8b1a5";
    const DECAY_MINUTE_MS = 60_000;
    const DECAY_CURVE = [
      [0, 1.0],
      [1 * DECAY_MINUTE_MS, 0.8],
      [2 * DECAY_MINUTE_MS, 0.5],
      [3 * DECAY_MINUTE_MS, 0.3],
      [4 * DECAY_MINUTE_MS, 0.2],
      [5 * DECAY_MINUTE_MS, 0.1],
      [6 * DECAY_MINUTE_MS, 0.05],
    ];
    const OSRM_BASE = "https://router.project-osrm.org";
    const ROUTE_POINT_LIMIT = 260;
    const ROUTE_CACHE_MAX = 80;
    const ROUTE_FETCH_TIMEOUT_MS = 4500;

    const decayFactor = (ageMs) => {
      const a = Math.max(0, Number(ageMs) || 0);
      // Decay updates in 1-minute steps (not continuous), per product spec.
      let f = DECAY_CURVE[0][1];
      for (let i = 0; i < DECAY_CURVE.length; i++) {
        const t = DECAY_CURVE[i][0];
        const fi = DECAY_CURVE[i][1];
        if (a >= t) f = fi;
        else break;
      }
      return f;
    };

    const radiusScaleFromDecay = (f) => {
      const ff = Math.max(0, Math.min(1, Number(f) || 0));
      return 0.55 + 0.45 * ff;
    };

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

    const buildRouteFromPoints = (profile, points) => {
      const pts = Array.isArray(points) ? points.filter(Boolean) : [];
      if (pts.length < 2) return null;
      const cum = [0];
      for (let i = 1; i < pts.length; i++) {
        cum.push(cum[i - 1] + map.distance(pts[i - 1], pts[i]));
      }
      const totalM = cum[cum.length - 1];
      if (!Number.isFinite(totalM) || totalM <= 0) return null;
      return {
        profile,
        points: pts,
        cum,
        totalM
      };
    };

    const buildFallbackRoute = (profile, start, end) => {
      const a = L.latLng(clamp(start.lat, -85, 85), wrapLng(start.lng));
      const b = L.latLng(clamp(end.lat, -85, 85), wrapLng(end.lng));
      const aPt = map.latLngToContainerPoint(a);
      const bPt = map.latLngToContainerPoint(b);
      const vx = bPt.x - aPt.x;
      const vy = bPt.y - aPt.y;
      const len = Math.max(1, Math.hypot(vx, vy));
      const nx = -vy / len;
      const ny = vx / len;
      const segments = profile === "walking" ? 4 : 5;
      const swayBase = profile === "walking" ? 8 : 14;
      const points = [a];
      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        const wobble = Math.sin(t * Math.PI) * swayBase * (0.65 + Math.random() * 0.8);
        const px = aPt.x + (vx * t) + (nx * wobble);
        const py = aPt.y + (vy * t) + (ny * wobble);
        const ll = map.containerPointToLatLng([px, py]);
        points.push(L.latLng(clamp(ll.lat, -85, 85), wrapLng(ll.lng)));
      }
      points.push(b);
      return buildRouteFromPoints(profile, points);
    };

    const fetchRouteFromOsrm = async (profile, start, end, signal) => {
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
      const ac = new AbortController();
      const abortFromOuter = () => ac.abort();
      let timeoutId = null;
      if (signal) {
        if (signal.aborted) ac.abort();
        else signal.addEventListener("abort", abortFromOuter, { once: true });
      }
      timeoutId = window.setTimeout(() => ac.abort(), ROUTE_FETCH_TIMEOUT_MS);

      try {
        const res = await fetch(url, { signal: ac.signal, cache: "no-store" });
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

        const built = buildRouteFromPoints(profile, points);
        if (!built) throw new Error("route points invalid");
        return built;
      } finally {
        if (timeoutId !== null) window.clearTimeout(timeoutId);
        if (signal) signal.removeEventListener("abort", abortFromOuter);
      }
    };

    const fetchRoute = async (profile, start, end, signal) => {
      const key = routeKey(profile, start, end);
      const cached = sim.routeCache.get(key);
      if (cached) return cached;

      let route = null;
      try {
        route = await fetchRouteFromOsrm(profile, start, end, signal);
      } catch (err) {
        // If the caller cancelled the rebuild, bubble up and stop quickly.
        if (signal && signal.aborted) throw err;
        route = buildFallbackRoute(profile, start, end);
        if (!route) throw err;
      }

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
    // Broadcast/ping cycle: decay towards gray between intermittent updates.
    const nextBroadcastMs = () => randBetween(3 * DECAY_MINUTE_MS, 9 * DECAY_MINUTE_MS);

    const markBroadcast = (agent, now) => {
      agent.lastBroadcastAt = now;
      agent.nextBroadcastAt = now + nextBroadcastMs();
    };

    const agentDialogText = (agent) => {
      if (!agent) return "";
      if (agent.state === "moving") return t("sim_doing_transit");
      if (agent.stopType === "eat") return t("sim_doing_eating");
      if (agent.stopType === "transit") return t("sim_doing_transit");
      return t("sim_doing_resting");
    };

    const syncAgentDialog = (agent) => {
      if (!agent || !agent.outer) return;
      const want = SHOW_SIM_ACTIVITY_DIALOGS && map.getZoom() >= DIALOG_MIN_ZOOM;
      const text = want ? agentDialogText(agent) : "";

      if (!text) {
        if (agent.dialogBound) {
          try {
            agent.outer.unbindTooltip();
          } catch {
            // ignore
          }
          agent.dialogBound = false;
        }
        return;
      }

      if (!agent.dialogBound) {
        const r =
          typeof agent.outer.getRadius === "function"
            ? agent.outer.getRadius()
            : Number(agent.baseOuterRadius) || 18;
        const offsetY = -Math.round(Math.max(16, r + 12));
        agent.outer.bindTooltip(text, {
          permanent: true,
          direction: "top",
          offset: [0, offsetY],
          className: "auraDialog",
          opacity: 0.95
        });
        agent.outer.openTooltip();
        agent.dialogBound = true;
        return;
      }

      try {
        const tt = typeof agent.outer.getTooltip === "function" ? agent.outer.getTooltip() : null;
        if (tt) {
          tt.setContent(text);
          const r =
            typeof agent.outer.getRadius === "function"
              ? agent.outer.getRadius()
              : Number(agent.baseOuterRadius) || 18;
          const wantY = -Math.round(Math.max(16, r + 12));
          const off = tt.options && tt.options.offset ? tt.options.offset : null;
          const prevY = Array.isArray(off) ? Number(off[1]) : off && typeof off === "object" ? Number(off.y) : NaN;
          if (!Number.isFinite(prevY) || Math.abs(prevY - wantY) > 1) {
            if (tt.options) tt.options.offset = [0, wantY];
            if (typeof tt.update === "function") tt.update();
          }
        }
      } catch {
        // ignore
      }
    };

    const refreshAgentDialogs = () => {
      for (const agent of sim.agents) syncAgentDialog(agent);
    };

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

    const createAuraLayer = (latLng, fill, radius, fillOpacity, { renderer = simRenderer } = {}) => {
      return L.circleMarker(latLng, {
        renderer,
        radius,
        stroke: false,
        fillColor: fill,
        fillOpacity,
        interactive: true,
        bubblingMouseEvents: false
      }).addTo(map);
    };

    const removeUserAuraLayers = () => {
      for (const l of userAuraLayers) l.remove();
      userAuraLayers = [];
    };

    const applyUserAuraStyle = () => {
      if (!userAuraLayers.length) return;
      const GRAY_HEX = "#b8b1a5";
      const BOUND_MIX_HEX = "#201812";
      const age = Math.max(0, Number(userAuraAgeMs) || 0);
      const decay = decayFactor(age);
      const strength = clamp(Number(userAuraStrength) || 0, 0, 1);
      const grayT = selfPreciseMode ? 0 : 1 - decay;
      const fill = mixHex(userAuraColor, GRAY_HEX, grayT);
      const bound = mixHex(fill, BOUND_MIX_HEX, 0.28);
      const radiusScale = radiusScaleFromDecay(decay);
      const strengthScale = 0.84 + 0.58 * strength;
      const strengthOpacity = 0.65 + 0.95 * strength;
      const rep = reputationFactorForKey(userKey);
      const repScale = clamp(rep, 0.86, 1.16);
      const repOpacity = clamp(1 + (repScale - 1) * 0.6, 0.86, 1.12);
      // Self view: opacity stays, only size decays.
      const opacityAgeFactor = selfPreciseMode ? 1 : decay;
      // No center dot: layered haze only.
      const baseOpacities = [0.06, 0.09, 0.12];
      const baseRadii = [70, 52, 36];
      for (let i = 0; i < userAuraLayers.length; i++) {
        const isOuter = i === 0;
        const showBound = Boolean(userAuraVerified) && isOuter;
        const o = baseOpacities[i] || 0.08;
        const r = baseRadii[i] || 44;
        userAuraLayers[i].setStyle({
          stroke: showBound,
          color: showBound ? bound : undefined,
          weight: showBound ? 1.7 : 0,
          opacity: showBound ? (selfPreciseMode ? 0.72 : clamp(0.65 * opacityAgeFactor, 0.22, 0.78)) : 0,
          fillColor: fill,
          fillOpacity: clamp(o * strengthOpacity * opacityAgeFactor * repOpacity, 0.012, 0.28)
        });
        userAuraLayers[i].setRadius(Math.max(10, r * strengthScale * radiusScale * repScale));
      }
    };

    const ensureUserAuraLayers = (latLng) => {
      if (!latLng) return;
      if (userAuraLayers.length === 0) {
        userAuraLayers = [
          createAuraLayer(latLng, userAuraColor, 70, 0.06, { renderer: selfAuraRenderer }),
          createAuraLayer(latLng, userAuraColor, 52, 0.09, { renderer: selfAuraRenderer }),
          createAuraLayer(latLng, userAuraColor, 36, 0.12, { renderer: selfAuraRenderer })
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

    const maybeSaveHomeFromRaw = (rawLatLng) => {
      if (!rawLatLng) return;
      // Store only a coarse (city-ish) center, not the exact GPS point.
      const coarse = quantizeLatLng(rawLatLng, 5000);
      const next = [coarse.lat, coarse.lng];
      try {
        if (homeView && Array.isArray(homeView.center) && homeView.center.length === 2) {
          const prev = L.latLng(homeView.center[0], homeView.center[1]);
          const d = map.distance(prev, coarse);
          if (d < 900) return;
        }
      } catch {
        // ignore
      }
      homeView = { center: next, zoom: HOME_VIEW_ZOOM };
      state.activity.prefs.home = { lat: next[0], lng: next[1], zoom: HOME_VIEW_ZOOM, updatedAtMs: nowMs() };
      saveState();
    };

    const setUserVisibilityMode = (mode) => {
      const next = normalizeVisibilityMode(mode);
      if (next === userVisibilityMode) {
        setVisBadge(userVisibilityMode, "ok");
        return;
      }
      userVisibilityMode = next;
      userPrivacy.gridM = gridForMode(userVisibilityMode);
      // Keep the offset proportional to the chosen privacy grid. Otherwise switching to
      // a smaller grid (e.g. 100m) could jump too far.
      userPrivacy.offsetEastM = randomPrivacyOffsetM(userPrivacy.gridM);
      userPrivacy.offsetNorthM = randomPrivacyOffsetM(userPrivacy.gridM);
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

      if (tasksForLines.length) syncTaskLines(simNow());

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

    const primeUserLocationOnce = () => {
      if (lastUserLatLngRaw || userPrimePending) return;
      if (!navigator.geolocation) return;
      userPrimePending = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = Number(pos.coords.accuracy) || 0;
          setUserLatLng(lat, lng, accuracy, { ensureRing: false });
          maybeSaveHomeFromRaw(lastUserLatLngRaw);
          setGpsBadge(t("map_gps_on"), "ok");
          userPrimePending = false;
        },
        () => {
          userPrimePending = false;
        },
        {
          enableHighAccuracy: true,
          timeout: 8_000,
          maximumAge: 0
        }
      );
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
          maybeSaveHomeFromRaw(lastUserLatLngRaw);
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

    const syncUserAuraTracking = () => {
      if (!userAuraRequested) {
        userAuraEnabled = false;
        stopUserWatch();
        removeUserAuraLayers();
        setGpsBadge(t("map_gps_off"), "off");
        return;
      }

      userAuraEnabled = true;
      // Self view should stay precise when user chooses to show their own aura.
      selfPreciseMode = true;
      if (lastUserLatLngRaw) {
        lastUserLatLng = lastUserLatLngRaw;
      }
      if (lastUserLatLng) {
        ensureUserAuraLayers(lastUserLatLng);
        for (const l of userAuraLayers) l.setLatLng(lastUserLatLng);
      }
      primeUserLocationOnce();
      startUserWatch();
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
      const handle = agent && agent.handle ? String(agent.handle) : "@sim";
      const verified = agent && agent.verified ? ` • ${escapeHtml(t("task_verified"))}` : "";
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
      const actions = `<div class="auraPop__actions"><button type="button" class="auraPop__action auraPop__action--primary" data-aura-action="message">${escapeHtml(
        t("popup_action_message")
      )}</button><button type="button" class="auraPop__action" data-aura-action="add-friend">${escapeHtml(
        t("popup_action_add_friend")
      )}</button><button type="button" class="auraPop__action auraPop__action--danger" data-aura-action="block">${escapeHtml(
        t("popup_action_block")
      )}</button></div>`;

      return `<div class="auraPop"><div class="auraPop__title">${escapeHtml(title)}</div><div class="auraPop__sub">${escapeHtml(who)} • ${escapeHtml(handle)}${verified}</div><div class="auraPop__hex">${escapeHtml(agent.auraHex || "#FF6A00")}</div>${rows || empty}${actions}</div>`;
    };

    const bindAgentPopupActions = (popup, agent) => {
      if (!popup || !agent) return;
      const root = typeof popup.getElement === "function" ? popup.getElement() : null;
      if (!root) return;
      const handle = normalizeContactHandle(agent && agent.handle ? agent.handle : "@sim");

      const addFriendBtn = root.querySelector('button[data-aura-action="add-friend"]');
      if (addFriendBtn) {
        addFriendBtn.addEventListener("click", (ev) => {
          if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          }
          ensureApprovedContact(handle, { notify: true, rerender: true });
        });
      }

      const messageBtn = root.querySelector('button[data-aura-action="message"]');
      if (messageBtn) {
        messageBtn.addEventListener("click", (ev) => {
          if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          }
          const msg = window.prompt(t("popup_message_prompt", { handle }), "");
          if (msg === null) return;
          const res = saveDirectMessage(handle, msg);
          if (!res.ok) {
            if (res.reason === "empty") toast(t("toast_dm_empty"));
            return;
          }
          toast(t("toast_dm_saved", { handle: res.handle }));
        });
      }

      const blockBtn = root.querySelector('button[data-aura-action="block"]');
      if (blockBtn) {
        blockBtn.addEventListener("click", (ev) => {
          if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          }
          const res = blockContact(handle, { notify: true, rerender: true });
          if (!res.ok) return;
          try {
            map.closePopup(popup);
          } catch {
            // ignore
          }
        });
      }
    };

    const openAgentPopup = (agent, latLng) => {
      const html = agentPopupHtml(agent);
      const popup = L.popup({ closeButton: true, autoPan: true, closeOnClick: false, offset: [0, -6] })
        .setLatLng(latLng)
        .setContent(html)
        .openOn(map);
      lastAuraPopupAt = simNow();
      selectedAgentId = String(agent && agent.id ? agent.id : "");
      selectedAgentPopup = popup;
      popup.on("remove", () => {
        if (selectedAgentPopup !== popup) return;
        selectedAgentPopup = null;
        selectedAgentId = "";
      });
      window.requestAnimationFrame(() => bindAgentPopupActions(popup, agent));
    };

    const applyAgentStyle = (agent, now) => {
      const tNow = Number.isFinite(Number(now)) ? Number(now) : simNow();
      let fill = agent.auraHex || agent.persona.fill;
      const BOUND_MIX_HEX = "#201812";
      let radiusBoost = 1;
      let opacityBoost = 1;

      if (agent.state === "stopped") {
        opacityBoost = 1.35;
        if (agent.stopType === "eat") {
          fill = mixHex(fill, ACTIVITY_TYPES.food.color, 0.6);
          radiusBoost = 1.14;
        } else if (agent.stopType === "transit") {
          fill = mixHex(fill, ACTIVITY_TYPES.travel.color, 0.55);
          radiusBoost = 1.07;
        } else {
          fill = mixHex(fill, ACTIVITY_TYPES.rest.color, 0.55);
          radiusBoost = 1.04;
        }
      }

      // Time decay: shrink + fade + drift to gray.
      const last = Number(agent.lastBroadcastAt) || tNow;
      const ageMs = Math.max(0, tNow - last);
      const decay = decayFactor(ageMs);
      const grayT = 1 - decay;
      const radiusScale = radiusScaleFromDecay(decay) * radiusBoost;
      fill = mixHex(fill, AURA_GRAY_HEX, grayT);
      const bound = mixHex(fill, BOUND_MIX_HEX, 0.28);
      const opacityScale = decay * opacityBoost;
      const repKey = `agent:${String(agent && agent.id ? agent.id : "")}`;
      const rep = reputationFactorForKey(repKey);
      const repScale = clamp(rep, 0.86, 1.16);
      const repOpacity = clamp(1 + (repScale - 1) * 0.6, 0.86, 1.12);

      const layers = Array.isArray(agent.layers) && agent.layers.length ? agent.layers : [agent.outer].filter(Boolean);
      const baseRadii = Array.isArray(agent.baseRadii) && agent.baseRadii.length
        ? agent.baseRadii
        : [Number(agent.baseOuterRadius) || 36];
      const baseOpacities = Array.isArray(agent.baseOpacities) && agent.baseOpacities.length
        ? agent.baseOpacities
        : [0.08, 0.12, 0.16];

      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (!layer) continue;
        const isOuter = i === 0;
        const showBound = Boolean(agent.verified) && isOuter;
        const baseR = Number(baseRadii[i] != null ? baseRadii[i] : baseRadii[0]) || 36;
        const baseO = Number(baseOpacities[i] != null ? baseOpacities[i] : baseOpacities[0]) || 0.08;
        layer.setStyle({
          stroke: showBound,
          color: showBound ? bound : undefined,
          weight: showBound ? 1.7 : 0,
          opacity: showBound ? clamp(0.65 * opacityScale, 0.18, 0.85) : 0,
          fillColor: fill,
          fillOpacity: clamp(baseO * opacityScale * repOpacity, 0.012, 0.34)
        });
        layer.setRadius(Math.max(10, baseR * radiusScale * repScale));
      }
    };

    const maybeUpdateAgentStyle = (agent, now) => {
      if (!agent) return;
      const tNow = Number.isFinite(Number(now)) ? Number(now) : simNow();
      const last = Number(agent.lastBroadcastAt) || tNow;
      const ageMs = Math.max(0, tNow - last);
      const decay = decayFactor(ageMs);

      const lastDecay = Number.isFinite(Number(agent.lastDecay)) ? Number(agent.lastDecay) : -1;
      const lastStyleAt = Number(agent.lastStyleAt) || 0;
      const needsFadeUpdate = lastDecay < 0 || Math.abs(decay - lastDecay) > 0.03;
      const needsTimeUpdate = tNow - lastStyleAt > 700;
      if (!agent.needsStyle && !needsFadeUpdate && !needsTimeUpdate) return;

      agent.needsStyle = false;
      agent.lastDecay = decay;
      agent.lastStyleAt = tNow;
      applyAgentStyle(agent, tNow);
    };

    const removeAgentLayers = (agent) => {
      if (!agent) return;
      try {
        if (agent.outer) agent.outer.unbindTooltip();
      } catch {
        // ignore
      }
      if (agent.id) agentsById.delete(agent.id);
      if (Array.isArray(agent.layers) && agent.layers.length) {
        for (const l of agent.layers) {
          try {
            l.remove();
          } catch {
            // ignore
          }
        }
      } else if (agent.outer) {
        try {
          agent.outer.remove();
        } catch {
          // ignore
        }
      }
    };

    const removeBlockedAgents = () => {
      if (!sim.agents.length) return;
      const keep = [];
      for (const agent of sim.agents) {
        if (isAgentBlocked(agent)) {
          removeAgentLayers(agent);
          continue;
        }
        keep.push(agent);
      }
      sim.agents = keep;
      clearSelectedAgentPopupIfMissing();
    };

    const clearAgents = () => {
      for (const a of sim.agents) {
        removeAgentLayers(a);
      }
      sim.agents = [];
      clearSelectedAgentPopupIfMissing();
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
      // Aura-only: layered haze (no center dot) to reduce pinpointing.
      const now = simNow();
      const id = uid();
      const handle = `@sim${String(++agentSeq).padStart(3, "0")}`;
      if (isBlockedContact(handle)) return null;
      const verified = Math.random() < 0.42;
      const skillsPool = ["courier", "photo", "fast", "careful", "bilingual", "tools", "trusted", "night"];
      const skillsCount = verified ? clamp(Math.round(randBetween(3, 5)), 3, 5) : clamp(Math.round(randBetween(2, 4)), 2, 4);
      const skills = randomSubset(skillsPool, skillsCount);
      const rating = Math.round(randBetween(verified ? 4.4 : 4.0, 5.0) * 10) / 10;
      const tasksDone = Math.round(randBetween(verified ? 12 : 0, verified ? 220 : 90));
      const onTimePct = Math.round(randBetween(verified ? 92 : 80, 99));
      const baseOuterRadius = randBetween(44, 68);
      const baseRadii = [baseOuterRadius, baseOuterRadius * 0.72, baseOuterRadius * 0.48];
      const baseOpacities = [0.05, 0.08, 0.12];
      const layers = baseRadii.map((r, i) =>
        createAuraLayer(route.points[0], persona.fill, r, baseOpacities[i] || 0.08)
      );
      const outer = layers[0];

      const distM = randBetween(0, route.totalM);
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speedMps = randBetween(persona.speedMps[0], persona.speedMps[1]);
      const jitterPx = randBetween(persona.jitterPx[0], persona.jitterPx[1]);

      const agent = {
        id,
        handle,
        verified,
        skills,
        rating,
        tasksDone,
        onTimePct,
        outer,
        layers,
        route,
        persona,
        mix: agentInitMix(persona),
        auraHex: "#FF6A00",
        needsStyle: true,
        baseOuterRadius,
        baseRadii,
        baseOpacities,
        dir,
        speedMps,
        jitterPx,
        hintIdx: 0,
        state: "moving",
        stopType: "",
        stopUntil: 0,
        lastBroadcastAt: now,
        nextBroadcastAt: now + nextBroadcastMs(),
        lastStyleAt: 0,
        lastDecay: -1,
        dialogBound: false,
        distM
      };

      const pos = routeAtDistance(route, distM, 0);
      agent.hintIdx = pos.idx;
      const ll = jitterLatLng(pos.latLng, agent.jitterPx);
      for (const l of layers) l.setLatLng(ll);
      agent.auraHex = mixWeightedHex(agent.mix);
      applyAgentStyle(agent, now);

      const onClick = (e) => {
        const oe = e && e.originalEvent ? e.originalEvent : null;
        if (oe && L && L.DomEvent && typeof L.DomEvent.stop === "function") {
          try {
            L.DomEvent.stop(oe);
          } catch {
            // ignore
          }
        }
        const llClick = e && e.latlng ? e.latlng : agent.outer.getLatLng();
        openAgentPopup(agent, llClick);
      };
      for (const l of layers) {
        l.on("click", onClick);
      }
      syncAgentDialog(agent);
      agentsById.set(agent.id, agent);
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
      markBroadcast(agent, now);
      agent.needsStyle = true;
      applyAgentStyle(agent, now);
      syncAgentDialog(agent);
      return true;
    };

    const tickAgents = () => {
      if (!sim.enabled || sim.agents.length === 0) return;
      const now = simNow();
      const dtSecRaw = (now - sim.lastTickAt) / 1000;
      const dtSec = clamp(dtSecRaw, 0, 0.2);
      sim.lastTickAt = now;

      for (const agent of sim.agents) {
        if (now >= (Number(agent.nextBroadcastAt) || 0)) {
          markBroadcast(agent, now);
          agent.needsStyle = true;
        }

        updateAgentMix(agent, dtSec);
        if (agent.state === "stopped") {
          if (now < agent.stopUntil) {
            maybeUpdateAgentStyle(agent, now);
            syncAgentDialog(agent);
            continue;
          }
          agent.state = "moving";
          agent.stopType = "";
          markBroadcast(agent, now);
          agent.needsStyle = true;
          maybeUpdateAgentStyle(agent, now);
          syncAgentDialog(agent);
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
          markBroadcast(agent, now);
          agent.needsStyle = true;
          maybeUpdateAgentStyle(agent, now);
          syncAgentDialog(agent);
        }

        const pos = routeAtDistance(agent.route, agent.distM, agent.hintIdx);
        agent.hintIdx = pos.idx;
        const ll = jitterLatLng(pos.latLng, agent.jitterPx);
        if (Array.isArray(agent.layers) && agent.layers.length) {
          for (const l of agent.layers) l.setLatLng(ll);
        } else {
          agent.outer.setLatLng(ll);
        }
        if (selectedAgentPopup && selectedAgentId && selectedAgentId === String(agent.id || "")) {
          try {
            selectedAgentPopup.setLatLng(ll);
          } catch {
            // ignore
          }
        }

        maybeUpdateAgentStyle(agent, now);
      }

      if (tasksForLines.length && now - lastLineSyncAt > 120) {
        syncTaskLines(now);
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
      const protect = protectedAgentIds();

      while (sim.agents.length < nowTarget) {
        const persona = pickPersona();
        const route =
          persona.profile === "walking"
            ? pickOne(routesWalking.length ? routesWalking : routesDriving)
            : pickOne(routesDriving.length ? routesDriving : routesWalking);
        if (!route) break;
        const next = createAgent(route, persona);
        if (!next) continue;
        sim.agents.push(next);
      }

      while (sim.agents.length > nowTarget) {
        const idx = sim.agents.findIndex((a) => a && a.id && !protect.has(a.id));
        if (idx < 0) break;
        const agent = sim.agents.splice(idx, 1)[0];
        if (!agent) break;
        removeAgentLayers(agent);
      }
      clearSelectedAgentPopupIfMissing();
    };

    const rebuildSim = async () => {
      if (!sim.enabled) return;
      if (map.getZoom() < STREET_MIN_ZOOM) return;

      const buildId = ++sim.buildId;
      const protect = protectedAgentIds();
      const prevAgents = sim.agents;
      const keepAgents = prevAgents.filter((a) => a && a.id && protect.has(a.id));

      sim.loading = true;
      setSimUi();
      setMapStatus(t("map_status_fetching"));

      if (sim.abort) sim.abort.abort();
      const ac = new AbortController();
      sim.abort = ac;

      try {
        const agentCount = Math.max(auraTargetCountForZoom(map.getZoom()), keepAgents.length);
        const pool = await buildRoutePool(agentCount, ac.signal);
        if (buildId !== sim.buildId) return;

        const routesDriving = pool.driving;
        const routesWalking = pool.walking.length ? pool.walking : pool.driving;
        if (!routesDriving.length && !routesWalking.length) {
          throw new Error("No routes available for this view.");
        }

        const nextAgents = keepAgents.slice();

        for (let i = nextAgents.length; i < agentCount; i++) {
          const persona = pickPersona();
          const route =
            persona.profile === "walking"
              ? pickOne(routesWalking)
              : pickOne(routesDriving.length ? routesDriving : routesWalking);
          if (!route) continue;
          const next = createAgent(route, persona);
          if (!next) continue;
          nextAgents.push(next);
        }

        sim.routePool = pool;
        sim.agents = nextAgents;
        for (const a of prevAgents) {
          if (a && a.id && protect.has(a.id)) continue;
          removeAgentLayers(a);
        }
        clearSelectedAgentPopupIfMissing();

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
      removeBlockedAgents();
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
      removeBlockedAgents();
      setSimUi();
      syncSimForView();
    };

    const applyPeopleLayerFilter = () => {
      const showPeople = Boolean(mapLayerFilters.people);
      if (!showPeople) {
        stopSimInternal();
        setSimUi();
      } else {
        startSim();
      }

      // Keep self aura independent from the people layer filter.
      syncUserAuraTracking();
    };

    if (els.mapReset) {
      els.mapReset.addEventListener("click", () => {
        if (homeView && Array.isArray(homeView.center) && homeView.center.length === 2) {
          map.flyTo(homeView.center, homeView.zoom || HOME_VIEW_ZOOM, { duration: 0.8 });
          return;
        }

        // If we have GPS (even if home wasn't saved yet), reset to a coarse "city-ish" view.
        if (lastUserLatLngRaw) {
          const coarse = quantizeLatLng(lastUserLatLngRaw, 5000);
          map.flyTo([coarse.lat, coarse.lng], HOME_VIEW_ZOOM, { duration: 0.8 });
          return;
        }

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
          maybeSaveHomeFromRaw(lastUserLatLngRaw);
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

    map.on("zoomend", () => {
      if (sim.enabled) refreshAgentDialogs();
      syncMarketPosts();
      syncEvents();
    });

    // --- Map picking + marketplace overlays (tasks route draft, market posts, scheduled auras) ---

    let pickCb = null;
    let pickFocusTimer = null;
    const mapWrapEl = () => {
      if (!els.paperMap || typeof els.paperMap.closest !== "function") return null;
      return els.paperMap.closest(".mapWrap");
    };
    const setPickFocusUi = (on) => {
      const wrap = mapWrapEl();
      if (wrap) wrap.classList.toggle("mapWrap--pick-focus", Boolean(on));
      if (els.mapSection) els.mapSection.classList.toggle("card--map-pick-focus", Boolean(on));
    };
    const pulsePickFocus = (durationMs = 2000) => {
      const ms = clamp(Number(durationMs) || 0, 900, 4200);
      if (pickFocusTimer) {
        window.clearTimeout(pickFocusTimer);
        pickFocusTimer = null;
      }
      setPickFocusUi(true);
      pickFocusTimer = window.setTimeout(() => {
        setPickFocusUi(false);
        pickFocusTimer = null;
      }, ms);
    };
    const focusMapForPick = ({ durationMs = 2000 } = {}) => {
      pulsePickFocus(durationMs);
      window.requestAnimationFrame(() => map.invalidateSize());
      window.setTimeout(() => map.invalidateSize(), 280);
    };

    const setPickCursor = (on) => {
      try {
        map.getContainer().style.cursor = on ? "crosshair" : "";
      } catch {
        // ignore
      }
    };
    const setPickHud = (on, text = "") => {
      if (!els.mapHud || !els.mapHudText) return;
      if (!on) {
        els.mapHud.hidden = true;
        els.mapHudText.textContent = "";
        return;
      }
      els.mapHud.hidden = false;
      els.mapHudText.textContent = String(text || "").trim();
    };
    const cancelPick = ({ resetStatus = true } = {}) => {
      pickCb = null;
      setPickCursor(false);
      setPickHud(false);
      setPickFocusUi(false);
      if (pickFocusTimer) {
        window.clearTimeout(pickFocusTimer);
        pickFocusTimer = null;
      }
      if (resetStatus) setMapStatus(t("map_status_ready"));
    };
    if (els.mapHudCancel) {
      els.mapHudCancel.addEventListener("click", () => cancelPick({ resetStatus: true }));
    }
    const nearestAgentForClick = (latLng) => {
      if (!latLng || !sim.agents.length) return null;
      const clickPt = map.latLngToContainerPoint(latLng);
      let best = null;
      let bestDist = Infinity;
      for (const agent of sim.agents) {
        if (!agent || !agent.outer || isAgentBlocked(agent)) continue;
        let ll = null;
        try {
          ll = agent.outer.getLatLng();
        } catch {
          ll = null;
        }
        if (!ll) continue;
        const pt = map.latLngToContainerPoint(ll);
        const d = clickPt.distanceTo(pt);
        const r =
          typeof agent.outer.getRadius === "function"
            ? Number(agent.outer.getRadius()) || Number(agent.baseOuterRadius) || 20
            : Number(agent.baseOuterRadius) || 20;
        const hitPx = Math.max(16, r * 0.66) + 10;
        if (d > hitPx) continue;
        if (d >= bestDist) continue;
        bestDist = d;
        best = agent;
      }
      return best;
    };
    map.on("click", (e) => {
      const ll = e && e.latlng ? e.latlng : null;
      if (pickCb) {
        const cb = pickCb;
        cancelPick({ resetStatus: true });
        if (!ll) return;
        try {
          cb({ lat: ll.lat, lng: ll.lng });
        } catch {
          // ignore
        }
        return;
      }

      if (!ll || !mapLayerFilters.people || !sim.enabled) {
        if (selectedAgentPopup) {
          try {
            map.closePopup(selectedAgentPopup);
          } catch {
            // ignore
          }
        }
        return;
      }

      const now = simNow();
      if (now - lastAuraPopupAt < 140) return;

      const hitAgent = nearestAgentForClick(ll);
      if (hitAgent) {
        let at = ll;
        try {
          at = hitAgent.outer.getLatLng() || ll;
        } catch {
          at = ll;
        }
        openAgentPopup(hitAgent, at);
        return;
      }

      if (selectedAgentPopup) {
        try {
          map.closePopup(selectedAgentPopup);
        } catch {
          // ignore
        }
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e && e.key === "Escape") cancelPick({ resetStatus: true });
    });

    const toLatLngSafe = (pt) => {
      if (!pt || typeof pt !== "object") return null;
      const lat = Number(pt.lat);
      const lng = Number(pt.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return L.latLng(clamp(lat, -85, 85), wrapLng(lng));
    };

    let draftRouteLine = null;
    let draftFromMarker = null;
    let draftToMarker = null;
    const ensureDraftRouteLayers = () => {
      if (!draftRouteLine) {
        draftRouteLine = L.polyline([], {
          pane: "taskPane",
          color: "rgba(255, 106, 0, 0.35)",
          weight: 1.8,
          opacity: 0.85,
          dashArray: "2 10",
          lineCap: "round"
        }).addTo(map);
      }
      if (!draftFromMarker) {
        draftFromMarker = L.circleMarker([0, 0], {
          pane: "taskPane",
          renderer: simRenderer,
          radius: 5.5,
          stroke: true,
          color: "rgba(32, 24, 18, 0.30)",
          weight: 1,
          fillColor: "rgba(255, 106, 0, 0.85)",
          fillOpacity: 0.6
        }).addTo(map);
      }
      if (!draftToMarker) {
        draftToMarker = L.circleMarker([0, 0], {
          pane: "taskPane",
          renderer: simRenderer,
          radius: 5.5,
          stroke: true,
          color: "rgba(32, 24, 18, 0.30)",
          weight: 1,
          fillColor: "rgba(10, 122, 82, 0.85)",
          fillOpacity: 0.55
        }).addTo(map);
      }
    };

    const setDraftRoute = ({ from = null, to = null } = {}) => {
      const a = toLatLngSafe(from);
      const b = toLatLngSafe(to);
      if (!a && !b) {
        if (draftRouteLine) draftRouteLine.setLatLngs([]);
        if (draftFromMarker) draftFromMarker.setStyle({ opacity: 0, fillOpacity: 0 });
        if (draftToMarker) draftToMarker.setStyle({ opacity: 0, fillOpacity: 0 });
        return;
      }
      ensureDraftRouteLayers();
      if (draftFromMarker) {
        if (a) {
          draftFromMarker.setLatLng(a);
          draftFromMarker.setStyle({ opacity: 1, fillOpacity: 0.6 });
        } else {
          draftFromMarker.setStyle({ opacity: 0, fillOpacity: 0 });
        }
      }
      if (draftToMarker) {
        if (b) {
          draftToMarker.setLatLng(b);
          draftToMarker.setStyle({ opacity: 1, fillOpacity: 0.55 });
        } else {
          draftToMarker.setStyle({ opacity: 0, fillOpacity: 0 });
        }
      }
      if (draftRouteLine) {
        draftRouteLine.setLatLngs(a && b ? [a, b] : a ? [a] : b ? [b] : []);
      }
    };

    const marketLayers = new Map(); // id -> { layers: [l0,l1], tooltipBound: bool }
    let marketForMap = [];

    const clearMarketLayers = () => {
      for (const [id, rec] of marketLayers.entries()) {
        for (const l of rec.layers || []) {
          try {
            l.remove();
          } catch {
            // ignore
          }
        }
        marketLayers.delete(id);
      }
    };

    const syncMarketPosts = () => {
      if (!mapLayerFilters.services) {
        clearMarketLayers();
        return;
      }

      const want = new Set();
      const zoomOk = map.getZoom() >= DIALOG_MIN_ZOOM;
      for (const post of marketForMap) {
        if (!post || !post.id) continue;
        const ll = toLatLngSafe(post.loc);
        if (!ll) continue;
        const id = String(post.id);
        const kind = String(post.kind || "product") === "service" ? "service" : "product";
        if (kind !== "service") continue;
        want.add(id);
        const fill = activityColorHex(`${kind}:${String(post.title || "")}`);
        let rec = marketLayers.get(id) || null;
        if (!rec) {
          const layers = [
            createAuraLayer(ll, fill, 18, 0.06),
            createAuraLayer(ll, fill, 12, 0.09)
          ];
          rec = { layers, tooltipBound: false };
          marketLayers.set(id, rec);
        }
        for (const l of rec.layers) l.setLatLng(ll);
        rec.layers[0].setStyle({ fillColor: fill, fillOpacity: 0.06 });
        if (rec.layers[1]) rec.layers[1].setStyle({ fillColor: fill, fillOpacity: 0.09 });

        const label = `${kind === "service" ? t("market_kind_service") : t("market_kind_product")} • ${String(post.title || "").slice(0, 20)}`;
        if (zoomOk) {
          if (!rec.tooltipBound) {
            rec.layers[0].bindTooltip(label, {
              permanent: true,
              direction: "top",
              offset: [0, -28],
              className: "auraDialog",
              opacity: 0.9
            });
            rec.layers[0].openTooltip();
            rec.tooltipBound = true;
          } else {
            const tt = rec.layers[0].getTooltip && rec.layers[0].getTooltip();
            if (tt) tt.setContent(label);
          }
        } else if (rec.tooltipBound) {
          try {
            rec.layers[0].unbindTooltip();
          } catch {
            // ignore
          }
          rec.tooltipBound = false;
        }
      }

      for (const [id, rec] of marketLayers.entries()) {
        if (want.has(id)) continue;
        for (const l of rec.layers || []) {
          try {
            l.remove();
          } catch {
            // ignore
          }
        }
        marketLayers.delete(id);
      }
    };

    const eventLayers = new Map(); // id -> { circles: [c0,c1], tooltipBound: bool }
    let eventsForMap = [];

    const clearEventLayers = () => {
      for (const [id, rec] of eventLayers.entries()) {
        for (const c of rec.circles || []) {
          try {
            c.remove();
          } catch {
            // ignore
          }
        }
        eventLayers.delete(id);
      }
    };

    const eventRadiusM = (joinCount) => {
      const j = Math.max(0, Number(joinCount) || 0);
      const inc = Math.min(55, Math.log1p(j) * 14);
      return clamp(55 + inc, 45, 120);
    };

    const syncEvents = () => {
      if (!mapLayerFilters.events) {
        clearEventLayers();
        return;
      }

      const want = new Set();
      const zoomOk = map.getZoom() >= DIALOG_MIN_ZOOM;
      const now = nowMs();
      for (const ev of eventsForMap) {
        if (!ev || !ev.id) continue;
        const ll = toLatLngSafe(ev.loc);
        if (!ll) continue;
        const id = String(ev.id);
        want.add(id);
        const startAt = Number(ev.startAt) || 0;
        const endsAt = Number(ev.endsAt) || 0;
        const cancelled = String(ev.status || "") === "cancelled";
        const live = startAt && endsAt ? now >= startAt && now <= endsAt : false;
        const ended = endsAt ? now > endsAt : false;
        const fill = activityColorHex(String(ev.title || ""));
        let grayT = ended ? 0.8 : 0.0;
        const rM = eventRadiusM(ev.joinCount);
        let op0 = live ? 0.06 : 0.04;
        let op1 = live ? 0.09 : 0.06;
        if (cancelled) {
          grayT = 0.92;
          op0 = 0.02;
          op1 = 0.03;
        }
        const color = mixHex(fill, AURA_GRAY_HEX, grayT);

        let rec = eventLayers.get(id) || null;
        if (!rec) {
          const c0 = L.circle(ll, { pane: "overlayPane", renderer: simRenderer, radius: rM * 1.22, stroke: false, fillColor: color, fillOpacity: op0 }).addTo(map);
          const c1 = L.circle(ll, { pane: "overlayPane", renderer: simRenderer, radius: rM * 0.86, stroke: false, fillColor: color, fillOpacity: op1 }).addTo(map);
          rec = { circles: [c0, c1], tooltipBound: false };
          eventLayers.set(id, rec);
        }
        for (const c of rec.circles) c.setLatLng(ll);
        if (rec.circles[0]) {
          rec.circles[0].setRadius(rM * 1.22);
          rec.circles[0].setStyle({ fillColor: color, fillOpacity: op0 });
        }
        if (rec.circles[1]) {
          rec.circles[1].setRadius(rM * 0.86);
          rec.circles[1].setStyle({ fillColor: color, fillOpacity: op1 });
        }

        const label = String(ev.title || "").slice(0, 22);
        if (zoomOk && label) {
          if (!rec.tooltipBound) {
            rec.circles[1].bindTooltip(label, {
              permanent: true,
              direction: "top",
              offset: [0, -18],
              className: "auraDialog",
              opacity: 0.9
            });
            rec.circles[1].openTooltip();
            rec.tooltipBound = true;
          } else {
            const tt = rec.circles[1].getTooltip && rec.circles[1].getTooltip();
            if (tt) tt.setContent(label);
          }
        } else if (rec.tooltipBound) {
          try {
            rec.circles[1].unbindTooltip();
          } catch {
            // ignore
          }
          rec.tooltipBound = false;
        }
      }

      for (const [id, rec] of eventLayers.entries()) {
        if (want.has(id)) continue;
        for (const c of rec.circles || []) {
          try {
            c.remove();
          } catch {
            // ignore
          }
        }
        eventLayers.delete(id);
      }
    };

    setGpsBadge(t("map_gps_off"), "off");
    setMapStatus(t("map_status_ready"));
    setVisBadge(userVisibilityMode, "ok");
    if (mapLayerFilters.people) {
      // Simulation is enabled by default when people layer is visible.
      startSim();
    } else {
      stopSimInternal();
      setSimUi();
    }

    const api = {
      setUserAura: ({ enabled, color, verified, visibilityMode, areaRadiusM, ageMs, strength } = {}) => {
        if (typeof verified === "boolean") {
          userAuraVerified = verified;
          applyUserAuraStyle();
        }
        if (typeof visibilityMode === "string" && visibilityMode.trim()) {
          setUserVisibilityMode(visibilityMode);
        }
        if (Number.isFinite(Number(areaRadiusM))) {
          const next = normalizeAreaRadiusM(areaRadiusM);
          if (next !== userAreaRadiusM) {
            userAreaRadiusM = next;
            if (userVisibilityMode === "area") {
              userPrivacy.gridM = gridForMode(userVisibilityMode);
              userPrivacy.offsetEastM = randomPrivacyOffsetM(userPrivacy.gridM);
              userPrivacy.offsetNorthM = randomPrivacyOffsetM(userPrivacy.gridM);
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
            }
            setVisBadge(userVisibilityMode, "ok");
          }
        }
        if (Number.isFinite(Number(ageMs))) {
          userAuraAgeMs = Math.max(0, Number(ageMs));
          applyUserAuraStyle();
        }
        if (Number.isFinite(Number(strength))) {
          userAuraStrength = clamp(Number(strength), 0, 1);
          applyUserAuraStyle();
        }
        if (typeof color === "string" && String(color).trim()) {
          userAuraColor = String(color).trim();
          applyUserAuraStyle();
        }

        userAuraRequested = Boolean(enabled);
        syncUserAuraTracking();
      },
      requestGpsOnce: () => {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            setGpsBadge(t("map_gps_unsupported"), "warn");
            reject(new Error("geolocation unsupported"));
            return;
          }

          setGpsBadge(t("map_gps_request"), "off");
          setMapStatus(t("map_status_requesting_gps"));
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const lat = pos.coords.latitude;
              const lng = pos.coords.longitude;
              const accuracy = Number(pos.coords.accuracy) || 0;
              setUserLatLng(lat, lng, accuracy, { ensureRing: false });
              maybeSaveHomeFromRaw(lastUserLatLngRaw);
              setGpsBadge(t("map_gps_on"), "ok");
              setMapStatus(t("map_status_ready"));
              resolve({ lat, lng, accuracy });
            },
            (err) => {
              const code = err && typeof err.code === "number" ? err.code : 0;
              let msg = t("gps_error");
              if (code === 1) msg = t("gps_denied");
              if (code === 2) msg = t("gps_unavailable");
              if (code === 3) msg = t("gps_timeout");
              setGpsBadge(t("map_gps_off"), "warn");
              setMapStatus(msg, true);
              reject(new Error(msg));
            },
            {
              enableHighAccuracy: true,
              timeout: 10_000,
              maximumAge: 60_000
            }
          );
        });
      },
      setTasks: (tasks) => {
        tasksForLines = Array.isArray(tasks) ? tasks.slice() : [];
        syncTaskLines(simNow());
      },
      setDraftRoute: ({ from = null, to = null } = {}) => {
        setDraftRoute({ from, to });
      },
      beginPick: (cb, { hudText = "" } = {}) => {
        if (typeof cb !== "function") return;
        pickCb = cb;
        setPickCursor(true);
        const label = String(hudText || "").trim() || t("toast_task_pick_on_map");
        setPickHud(true, label);
        setMapStatus(label);
        focusMapForPick({ durationMs: 2300 });
      },
      focusForPick: ({ durationMs = 2000 } = {}) => {
        focusMapForPick({ durationMs });
      },
      setMarketPosts: (posts) => {
        marketForMap = Array.isArray(posts) ? posts.slice() : [];
        syncMarketPosts();
      },
      setEvents: (events) => {
        eventsForMap = Array.isArray(events) ? events.slice() : [];
        syncEvents();
      },
      setLayerFilters: (filters) => {
        mapLayerFilters = normalizeMapLayerFilters(filters);
        applyPeopleLayerFilter();
        syncTaskLines(simNow());
        syncMarketPosts();
        syncEvents();
      },
      getActorInfo: (actor) => {
        if (!actor || typeof actor !== "object") return { label: "—", verified: false };
        if (actor.kind === "user") return { label: "@you", verified: true };
        if (actor.kind === "agent") {
          const a = agentsById.get(String(actor.id || "")) || null;
          return { label: (a && a.handle) || "@sim", verified: Boolean(a && a.verified) };
        }
        return { label: "—", verified: false };
      },
      getActorLatLng: (actor) => {
        const ll = actorLatLngFor(actor);
        if (!ll) return null;
        return { lat: ll.lat, lng: ll.lng };
      },
      listAgents: () => {
        const out = [];
        for (const a of sim.agents) {
          if (!a || !a.outer) continue;
          let ll = null;
          try {
            ll = a.outer.getLatLng();
          } catch {
            ll = null;
          }
          if (!ll) continue;
          out.push({
            id: a.id,
            handle: a.handle,
            verified: Boolean(a.verified),
            skills: Array.isArray(a.skills) ? a.skills.slice(0, 8) : [],
            rating: Number(a.rating) || 0,
            tasksDone: Number(a.tasksDone) || 0,
            onTimePct: Number(a.onTimePct) || 0,
            speedMps: Number(a.speedMps) || 0,
            lat: ll.lat,
            lng: ll.lng
          });
        }
        return out;
      },
      applyTaskCompletion: ({ actor, title = "" } = {}) => {
        if (!actor || typeof actor !== "object") return;
        if (actor.kind !== "agent") return;
        const a = agentsById.get(String(actor.id || "")) || null;
        if (!a) return;
        // Boost the worker aura by injecting "work time" into their mix.
        const boostSec = 12 * 60;
        a.mix.work = (a.mix.work || 0) + boostSec;
        a.tasksDone = (Number(a.tasksDone) || 0) + 1;
        a.onTimePct = clamp(Math.round(Number(a.onTimePct) || 0), 0, 100);
        a.auraHex = mixWeightedHex(a.mix);
        a.needsStyle = true;
        markBroadcast(a, simNow());
        applyAgentStyle(a, simNow());
        syncAgentDialog(a);
      },
      applyTaskSupportBoost: ({ actor } = {}) => {
        if (!actor || typeof actor !== "object") return;
        if (actor.kind !== "agent") return;
        const a = agentsById.get(String(actor.id || "")) || null;
        if (!a) return;
        const boostSec = 4 * 60;
        a.mix.social = (a.mix.social || 0) + boostSec;
        a.auraHex = mixWeightedHex(a.mix);
        a.needsStyle = true;
        markBroadcast(a, simNow());
        applyAgentStyle(a, simNow());
        syncAgentDialog(a);
      },
      focusLatLng: ({ lat, lng, zoom = 16 } = {}) => {
        const la = Number(lat);
        const ln = Number(lng);
        if (!Number.isFinite(la) || !Number.isFinite(ln)) return;
        map.flyTo([clamp(la, -85, 85), wrapLng(ln)], clamp(zoom, 2, 18), { duration: 0.8 });
      },
      refreshReputation: () => {
        applyUserAuraStyle();
        for (const a of sim.agents) {
          if (!a) continue;
          a.needsStyle = true;
          applyAgentStyle(a, simNow());
          syncAgentDialog(a);
        }
      },
      refreshBlocked: () => {
        removeBlockedAgents();
        if (sim.enabled && sim.routePool && map.getZoom() >= STREET_MIN_ZOOM && !sim.loading) {
          ensureAgentCount(auraTargetCountForZoom(map.getZoom()));
        }
        setSimUi();
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
        syncMarketPosts();
        syncEvents();
      }
    };

    return api;
  };

  // --- Events ---

  const focusElementSoon = (el) => {
    if (!el || typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        try {
          if (typeof el.focus === "function") el.focus({ preventScroll: true });
        } catch {
          try {
            el.focus();
          } catch {
            // ignore
          }
        }
      });
    });
  };

  const openMarketplaceComposer = (tab, dropKey, focusEl, beforeOpen) => {
    ensureUiPrefs();
    if (typeof beforeOpen === "function") beforeOpen();
    state.ui.marketTab = normalizeMarketTab(tab);
    if (dropKey && state.ui.drops && Object.prototype.hasOwnProperty.call(state.ui.drops, dropKey)) {
      state.ui.drops[dropKey] = true;
    }
    saveState();
    renderMarketplaceTabs();
    applyDropStates();
    scrollToSection("marketplaceSection");
    focusElementSoon(focusEl);
  };

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

  if (els.taskForm) {
    els.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      postTaskFromForm();
    });
  }

  if (els.taskTimeLimit) {
    const onTaskTime = () => renderTaskForm();
    els.taskTimeLimit.addEventListener("input", onTaskTime);
    els.taskTimeLimit.addEventListener("change", onTaskTime);
  }

  if (els.taskDistanceLimit) {
    const onTaskDist = () => renderTaskForm();
    els.taskDistanceLimit.addEventListener("input", onTaskDist);
    els.taskDistanceLimit.addEventListener("change", onTaskDist);
  }

  if (els.taskSearchInput) {
    els.taskSearchInput.addEventListener("input", () => {
      patchUiListFilter("tasks", { q: els.taskSearchInput.value });
      renderTaskList();
    });
  }

  if (els.taskStatusFilter) {
    els.taskStatusFilter.addEventListener("change", () => {
      patchUiListFilter("tasks", { status: els.taskStatusFilter.value });
      renderTaskList();
    });
  }

  if (els.taskFilterClear) {
    els.taskFilterClear.addEventListener("click", () => {
      patchUiListFilter("tasks", defaultUiListFilters().tasks);
      renderTaskList();
      focusElementSoon(els.taskSearchInput);
    });
  }

  if (els.marketTabs) {
    els.marketTabs.addEventListener("click", (e) => {
      const btn = e && e.target ? e.target.closest("button[data-tab]") : null;
      if (!btn) return;
      const tab = normalizeMarketTab(btn.getAttribute("data-tab"));
      state.ui.marketTab = tab;
      saveState();
      renderMarketplaceTabs();
    });

    els.marketTabs.addEventListener("keydown", (e) => {
      if (!e) return;
      const key = String(e.key || "");
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;

      const buttons = Array.from(els.marketTabs.querySelectorAll("button[data-tab]"));
      if (!buttons.length) return;
      const selectedIdx = Math.max(
        0,
        buttons.findIndex((b) => String(b.getAttribute("aria-selected") || "") === "true")
      );

      let nextIdx = selectedIdx;
      if (key === "ArrowLeft") nextIdx = (selectedIdx - 1 + buttons.length) % buttons.length;
      if (key === "ArrowRight") nextIdx = (selectedIdx + 1) % buttons.length;
      if (key === "Home") nextIdx = 0;
      if (key === "End") nextIdx = buttons.length - 1;

      const nextBtn = buttons[nextIdx];
      if (!nextBtn) return;
      const tab = normalizeMarketTab(nextBtn.getAttribute("data-tab"));
      state.ui.marketTab = tab;
      saveState();
      renderMarketplaceTabs();
      nextBtn.focus();
      e.preventDefault();
    });
  }

  const bindMapLayerFilterBtn = (el, key) => {
    if (!el) return;
    el.addEventListener("click", () => {
      toggleMapLayerFilter(key);
    });
  };

  bindMapLayerFilterBtn(els.mapFilterPeople, "people");
  bindMapLayerFilterBtn(els.mapFilterEvents, "events");
  bindMapLayerFilterBtn(els.mapFilterServices, "services");

  const bindDropToggle = (el, key) => {
    if (!el) return;
    el.addEventListener("toggle", () => {
      ensureUiPrefs();
      const k = String(key || "");
      if (!k) return;
      const next = Boolean(el.open);
      if (Boolean(state.ui.drops[k]) === next) return;
      state.ui.drops[k] = next;
      saveState();
    });
  };

  // Apply persisted dropdown state before binding toggle listeners.
  renderOnboarding();
  if (els.onboardPanel) {
    els.onboardPanel.addEventListener("toggle", () => {
      ensureUiPrefs();
      const next = Boolean(els.onboardPanel.open);
      if (state.ui.onboardingOpen === next) return;
      state.ui.onboardingOpen = next;
      saveState();
    });
  }

  applyDropStates();
  bindDropToggle(els.dropTasksPost, "tasksPost");
  bindDropToggle(els.dropTasksList, "tasksList");
  bindDropToggle(els.dropMarketPost, "marketPost");
  bindDropToggle(els.dropMarketList, "marketList");
  bindDropToggle(els.dropEventsPost, "eventsPost");
  bindDropToggle(els.dropEventsList, "eventsList");

  if (els.qaStartActivity) {
    els.qaStartActivity.addEventListener("click", () => {
      scrollToSection("activitySection");
      focusElementSoon(els.activityText);
    });
  }

  if (els.qaLocateMap) {
    els.qaLocateMap.addEventListener("click", () => {
      scrollToSection("mapSection");
      if (els.mapLocate) els.mapLocate.click();
    });
  }

  if (els.qaPostTask) {
    els.qaPostTask.addEventListener("click", () => {
      openMarketplaceComposer("tasks", "tasksPost", els.taskText);
    });
  }

  if (els.qaPostService) {
    els.qaPostService.addEventListener("click", () => {
      openMarketplaceComposer("market", "marketPost", els.marketText, () => {
        ensureMarketPrefs();
        state.market.prefs.kind = "service";
        renderMarketForm();
      });
    });
  }

  if (els.qaScheduleEvent) {
    els.qaScheduleEvent.addEventListener("click", () => {
      openMarketplaceComposer("events", "eventsPost", els.eventsText);
    });
  }

  if (els.taskPickStart) els.taskPickStart.addEventListener("click", pickTaskStart);
  if (els.taskUseMyStart) els.taskUseMyStart.addEventListener("click", useMyAreaForTaskStart);
  if (els.taskPickDest) els.taskPickDest.addEventListener("click", pickTaskDest);
  if (els.taskClearRoute) els.taskClearRoute.addEventListener("click", clearTaskDraftRoute);

  if (els.marketForm) {
    els.marketForm.addEventListener("submit", (e) => {
      e.preventDefault();
      postMarketFromForm();
    });
  }

  if (els.marketKind) {
    els.marketKind.addEventListener("click", (e) => {
      const btn = e && e.target ? e.target.closest("button[data-kind]") : null;
      if (!btn) return;
      const kind = normalizeMarketKind(btn.getAttribute("data-kind"));
      state.market.prefs.kind = kind;
      saveState();
      renderMarket();
    });
  }

  if (els.marketTimeLimit) {
    const onChange = () => renderMarketForm();
    els.marketTimeLimit.addEventListener("input", onChange);
    els.marketTimeLimit.addEventListener("change", onChange);
  }

  if (els.marketDistanceLimit) {
    const onChange = () => renderMarketForm();
    els.marketDistanceLimit.addEventListener("input", onChange);
    els.marketDistanceLimit.addEventListener("change", onChange);
  }

  if (els.marketSearchInput) {
    els.marketSearchInput.addEventListener("input", () => {
      patchUiListFilter("market", { q: els.marketSearchInput.value });
      renderMarketList();
    });
  }

  if (els.marketKindFilter) {
    els.marketKindFilter.addEventListener("change", () => {
      patchUiListFilter("market", { kind: els.marketKindFilter.value });
      renderMarketList();
    });
  }

  if (els.marketStatusFilter) {
    els.marketStatusFilter.addEventListener("change", () => {
      patchUiListFilter("market", { status: els.marketStatusFilter.value });
      renderMarketList();
    });
  }

  if (els.marketFilterClear) {
    els.marketFilterClear.addEventListener("click", () => {
      patchUiListFilter("market", defaultUiListFilters().market);
      renderMarketList();
      focusElementSoon(els.marketSearchInput);
    });
  }

  if (els.marketPickLocation) {
    els.marketPickLocation.addEventListener("click", () => {
      beginPickOnMap((ll) => setMarketDraftLoc(ll), { hudKey: "map_pick_hud_market" });
    });
  }
  if (els.marketUseMyLocation) {
    els.marketUseMyLocation.addEventListener("click", useMyAreaForMarket);
  }
  if (els.marketClearLocation) {
    els.marketClearLocation.addEventListener("click", clearMarketDraftLoc);
  }

  if (els.eventsForm) {
    els.eventsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      postEventFromForm();
    });
  }

  if (els.eventsStartsIn) {
    const onChange = () => renderEventsForm();
    els.eventsStartsIn.addEventListener("input", onChange);
    els.eventsStartsIn.addEventListener("change", onChange);
  }

  if (els.eventsDuration) {
    const onChange = () => renderEventsForm();
    els.eventsDuration.addEventListener("input", onChange);
    els.eventsDuration.addEventListener("change", onChange);
  }

  if (els.eventsSearchInput) {
    els.eventsSearchInput.addEventListener("input", () => {
      patchUiListFilter("events", { q: els.eventsSearchInput.value });
      renderEventsList();
    });
  }

  if (els.eventsStateFilter) {
    els.eventsStateFilter.addEventListener("change", () => {
      patchUiListFilter("events", { state: els.eventsStateFilter.value });
      renderEventsList();
    });
  }

  if (els.eventsFilterClear) {
    els.eventsFilterClear.addEventListener("click", () => {
      patchUiListFilter("events", defaultUiListFilters().events);
      renderEventsList();
      focusElementSoon(els.eventsSearchInput);
    });
  }

  if (els.eventsPickLocation) {
    els.eventsPickLocation.addEventListener("click", () => {
      beginPickOnMap((ll) => setEventsDraftLoc(ll), { hudKey: "map_pick_hud_events" });
    });
  }
  if (els.eventsUseMyLocation) {
    els.eventsUseMyLocation.addEventListener("click", useMyAreaForEvents);
  }
  if (els.eventsClearLocation) {
    els.eventsClearLocation.addEventListener("click", clearEventsDraftLoc);
  }

  if (els.roomVisibility) {
    els.roomVisibility.addEventListener("click", (e) => {
      const btn = e && e.target ? e.target.closest("button[data-room-vis]") : null;
      if (!btn) return;
      if (!openRoomTaskId) return;
      const vis = String(btn.getAttribute("data-room-vis") || "");
      const room = ensureRoom(openRoomTaskId);
      if (!room) return;
      if (room.ownerKey !== userKey) return;
      room.visibility = vis === "public" ? "public" : "participants";
      saveState();
      renderTaskRoom();
      renderTasks();
    });
  }

  if (els.reviewClose) {
    els.reviewClose.addEventListener("click", closeReviewModal);
  }

  if (els.reviewModal) {
    els.reviewModal.addEventListener("click", (e) => {
      const target = e && e.target ? e.target : null;
      if (!target) return;
      if (target && target.getAttribute && target.getAttribute("data-review-close") === "1") {
        closeReviewModal();
      }
    });
  }

  if (els.reviewForm) {
    els.reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitReview();
    });
  }

  if (els.roomClose) {
    els.roomClose.addEventListener("click", closeTaskRoom);
  }

  if (els.roomModal) {
    els.roomModal.addEventListener("click", (e) => {
      const target = e && e.target ? e.target : null;
      if (!target) return;
      if (target && target.getAttribute && target.getAttribute("data-room-close") === "1") {
        closeTaskRoom();
      }
    });
  }

  if (els.roomForm) {
    els.roomForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sendRoomText();
    });
  }

  if (els.roomPhotoBtn && els.roomPhoto) {
    els.roomPhotoBtn.addEventListener("click", () => {
      try {
        els.roomPhoto.click();
      } catch {
        // ignore
      }
    });
  }

  if (els.roomPhoto) {
    els.roomPhoto.addEventListener("change", async () => {
      const file = els.roomPhoto.files && els.roomPhoto.files[0] ? els.roomPhoto.files[0] : null;
      els.roomPhoto.value = "";
      if (!file) return;
      await sendRoomPhoto(file);
    });
  }

  if (els.roomLocBtn) {
    els.roomLocBtn.addEventListener("click", sendRoomLocation);
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

  if (els.areaRadius) {
    const onChange = () => {
      const m = normalizeAreaRadiusM(els.areaRadius.value);
      state.activity.prefs.areaRadiusM = m;
      saveState();
      renderActivity(false);
    };
    els.areaRadius.addEventListener("input", onChange);
    els.areaRadius.addEventListener("change", onChange);
  }

  if (els.visRoomCode) {
    els.visRoomCode.addEventListener("input", () => {
      const code = normalizeRoomCode(els.visRoomCode.value);
      state.activity.prefs.room.code = code;
      saveState();
      renderVisibility();
    });
  }

  if (els.visRoomJoin) {
    els.visRoomJoin.addEventListener("click", () => {
      const code = normalizeRoomCode((state.activity.prefs.room && state.activity.prefs.room.code) || "");
      if (!code) {
        toast(t("toast_room_code_empty"));
        return;
      }
      state.activity.prefs.room = {
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
      const code = normalizeRoomCode((state.activity.prefs.room && state.activity.prefs.room.code) || "");
      state.activity.prefs.room = {
        code,
        joined: false,
        joinedAtMs: Number(state.activity.prefs.room && state.activity.prefs.room.joinedAtMs) || 0,
        leftAtMs: nowMs()
      };
      saveState();
      renderActivity(false);
      toast(t("toast_room_left"));
    });
  }

  const addApproved = () => {
    if (!els.approvedInput) return;
    const result = ensureApprovedContact(els.approvedInput.value, {
      notify: true,
      rerender: true
    });
    if (!result.ok) return;
    els.approvedInput.value = "";
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

  if (els.authLogin) {
    els.authLogin.addEventListener("click", () => {
      signInWithFirebase();
    });
  }

  if (els.authLogout) {
    els.authLogout.addEventListener("click", () => {
      signOutFirebase();
    });
  }

  if (els.langSelect) {
    els.langSelect.addEventListener("change", () => {
      i18nLang = normalizeLang(els.langSelect.value);
      state.activity.prefs.lang = i18nLang;
      saveState();
      applyI18n();
      renderAuthUi();
      renderActivity(true);
      if (mapApi && typeof mapApi.refreshI18n === "function") mapApi.refreshI18n();
    });
  }

  bindSectionTabs();
  bindNetworkPill();
  bindDataTools();
  bindPwaFeatures();
  initFirebaseAuth();

  mapApi = initPaperMap();
  applyI18n();
  renderClock();
  window.setInterval(renderClock, 10_000);
  render();
})();
