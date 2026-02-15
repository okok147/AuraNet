(() => {
  const MAX_SESSIONS = 120;
  const STORAGE_KEY = "auranet-neuro-sim-v1";

  const scenarioMeta = {
    correct: {
      summary:
        "Correct practice quickly reinforces the intended route, then keeps adding stable gains.",
      coach:
        "Prioritize precision and fast error correction so activity repeatedly lands on the target circuit.",
    },
    wrong: {
      summary:
        "Wrong practice repeatedly activates competing pathways and lowers signal quality.",
      coach:
        "Slow down, rebuild the movement pattern, and stop repeating incorrect reps.",
    },
    plateau: {
      summary:
        "Repetitive low-challenge practice creates early adaptation but plateaus without progression.",
      coach:
        "Add progressive difficulty to reopen plasticity and prevent flatlining.",
    },
    progressive: {
      summary:
        "Progressive repetition sustains plasticity, increases myelin efficiency, and improves reliability.",
      coach:
        "Use deliberate reps with gradual challenge increases and enough recovery.",
    },
  };

  const targetPoints = [
    { x: 90, y: 190 },
    { x: 250, y: 125 },
    { x: 430, y: 96 },
    { x: 620, y: 126 },
    { x: 790, y: 190 },
  ];

  const offPoints = [
    { x: 90, y: 190 },
    { x: 250, y: 258 },
    { x: 430, y: 286 },
    { x: 620, y: 258 },
    { x: 790, y: 190 },
  ];

  const chartBounds = {
    xMin: 56,
    xMax: 820,
    yMin: 28,
    yMax: 210,
    minValue: 0.05,
    maxValue: 1.6,
  };

  const playPauseButton = document.getElementById("playPauseButton");
  const resetButton = document.getElementById("resetButton");
  const playbackRange = document.getElementById("playbackRange");
  const playbackValue = document.getElementById("playbackValue");
  const sessionRange = document.getElementById("sessionRange");
  const sessionValue = document.getElementById("sessionValue");

  const conductionValue = document.getElementById("conductionValue");
  const fidelityValue = document.getElementById("fidelityValue");
  const targetValue = document.getElementById("targetValue");
  const offValue = document.getElementById("offValue");
  const myelinValue = document.getElementById("myelinValue");
  const growthValue = document.getElementById("growthValue");

  const conductionBar = document.getElementById("conductionBar");
  const fidelityBar = document.getElementById("fidelityBar");
  const targetBar = document.getElementById("targetBar");
  const offBar = document.getElementById("offBar");
  const myelinBar = document.getElementById("myelinBar");
  const growthBar = document.getElementById("growthBar");

  const pathNarration = document.getElementById("pathNarration");
  const coachNote = document.getElementById("coachNote");
  const scenarioNarration = document.getElementById("scenarioNarration");
  const chartInsight = document.getElementById("chartInsight");

  const targetStrengthLine = document.getElementById("targetStrengthLine");
  const offStrengthLine = document.getElementById("offStrengthLine");
  const myelinLine = document.getElementById("myelinLine");
  const sessionMarker = document.getElementById("sessionMarker");

  const signalPulse = document.getElementById("signalPulse");
  const signalHalo = document.getElementById("signalHalo");
  const signalTrail = document.getElementById("signalTrail");

  const scenarioCards = Array.from(document.querySelectorAll(".scenario-card"));
  const targetConnections = Array.from(document.querySelectorAll("#targetConnections .connection"));
  const offConnections = Array.from(document.querySelectorAll("#offConnections .connection"));
  const targetMyelinBands = Array.from(document.querySelectorAll("#targetMyelinBands .myelin-band"));
  const offMyelinBands = Array.from(document.querySelectorAll("#offMyelinBands .myelin-band"));
  const nodeRings = Array.from(document.querySelectorAll(".node-ring"));

  if (
    !playPauseButton ||
    !resetButton ||
    !playbackRange ||
    !playbackValue ||
    !sessionRange ||
    !sessionValue ||
    !conductionValue ||
    !fidelityValue ||
    !targetValue ||
    !offValue ||
    !myelinValue ||
    !growthValue ||
    !conductionBar ||
    !fidelityBar ||
    !targetBar ||
    !offBar ||
    !myelinBar ||
    !growthBar ||
    !pathNarration ||
    !coachNote ||
    !scenarioNarration ||
    !chartInsight ||
    !targetStrengthLine ||
    !offStrengthLine ||
    !myelinLine ||
    !sessionMarker ||
    !signalPulse ||
    !signalHalo ||
    !signalTrail ||
    scenarioCards.length === 0 ||
    targetConnections.length === 0 ||
    offConnections.length === 0 ||
    targetMyelinBands.length === 0 ||
    offMyelinBands.length === 0 ||
    nodeRings.length === 0
  ) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    scenario: "correct",
    session: 0,
    playing: !prefersReducedMotion,
    playbackRate: Number(playbackRange.value),
    pulseProgress: 0,
    trail: [],
    activeRoute: "target",
    lastTimestamp: null,
    chartScenario: "",
    cache: new Map(),
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (start, end, t) => start + (end - start) * t;

  function normalize(value, min, max) {
    if (max === min) {
      return 0;
    }
    return clamp((value - min) / (max - min), 0, 1);
  }

  function formatPercent(value) {
    return `${Math.round(value)}%`;
  }

  function formatSpeed(value) {
    return `${value.toFixed(1)}x`;
  }

  function readStoredState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (typeof parsed !== "object" || parsed === null) {
        return;
      }

      if (parsed.scenario && scenarioMeta[parsed.scenario]) {
        state.scenario = parsed.scenario;
      }
      if (typeof parsed.playbackRate === "number") {
        state.playbackRate = clamp(parsed.playbackRate, 0.6, 3);
      }
      if (typeof parsed.playing === "boolean" && !prefersReducedMotion) {
        state.playing = parsed.playing;
      }
    } catch {
      // Ignore malformed localStorage state.
    }
  }

  function writeStoredState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          scenario: state.scenario,
          playbackRate: state.playbackRate,
          playing: state.playing,
        })
      );
    } catch {
      // Ignore storage failures.
    }
  }

  function advanceSession(prev, scenario, sessionIndex) {
    const t = sessionIndex / MAX_SESSIONS;
    const rhythm = Math.sin(sessionIndex * 0.29);

    let activity;
    let deliberate;
    let challenge;
    let feedback;
    let recovery;
    let baselineError;
    let plasticityScale;
    let stagnation = 0;

    if (scenario === "correct") {
      activity = clamp(0.68 + rhythm * 0.07, 0.48, 0.91);
      deliberate = 0.82;
      challenge = clamp(0.48 + t * 0.22, 0.35, 0.8);
      feedback = 0.9;
      recovery = 0.75;
      baselineError = 0.22 - t * 0.08;
      plasticityScale = 1;
    } else if (scenario === "wrong") {
      activity = clamp(0.74 + rhythm * 0.05, 0.56, 0.93);
      deliberate = 0.38;
      challenge = 0.42;
      feedback = 0.2;
      recovery = 0.62;
      baselineError = 0.63 - t * 0.03;
      plasticityScale = 0.82;
    } else if (scenario === "plateau") {
      activity = clamp(0.84 + rhythm * 0.04, 0.64, 0.96);
      deliberate = 0.64;
      challenge = 0.2;
      feedback = 0.56;
      recovery = 0.67;
      baselineError = 0.28 - t * 0.02;
      stagnation = clamp((sessionIndex - 20) / 55, 0, 0.72);
      plasticityScale = 1 - stagnation;
    } else {
      activity = clamp(0.82 + rhythm * 0.06, 0.6, 0.96);
      deliberate = 0.86;
      challenge = clamp(0.3 + t * 0.52, 0.3, 0.9);
      feedback = 0.93;
      recovery = 0.78;
      baselineError = 0.3 - t * 0.16;
      plasticityScale = 1.16;
    }

    const errorRate = clamp(
      baselineError + (1 - deliberate) * 0.15 + prev.offSynapse * 0.08 - prev.targetSynapse * 0.06,
      0.06,
      0.86
    );

    const fatigue = clamp(prev.fatigue + activity * 0.055 + challenge * 0.03 - recovery * 0.082, 0.04, 0.88);

    const plasticity = clamp(
      (0.2 + deliberate * 0.35 + challenge * 0.38 + feedback * 0.16 - fatigue * 0.45) *
        plasticityScale,
      0.03,
      1.25
    );

    const targetFire = clamp(activity * deliberate * (1 - errorRate) + feedback * 0.18, 0, 1.2);
    const offFire = clamp(activity * (errorRate + (1 - deliberate) * 0.3) + (1 - feedback) * 0.2, 0, 1.2);

    let targetSynapse =
      prev.targetSynapse + targetFire * plasticity * 0.07 - offFire * 0.026 - prev.targetSynapse * 0.009 * (1 - recovery);

    let offSynapse =
      prev.offSynapse + offFire * plasticity * 0.063 + (1 - feedback) * 0.018 - targetFire * 0.013 - prev.offSynapse * 0.008 * recovery;

    let targetMyelin =
      prev.targetMyelin +
      targetFire * (0.041 + challenge * 0.02) +
      activity * 0.012 -
      (1 - recovery) * 0.011 -
      prev.targetMyelin * 0.0035;

    let offMyelin =
      prev.offMyelin + offFire * 0.036 + activity * 0.008 - recovery * 0.006 - prev.offMyelin * 0.0032;

    if (scenario === "wrong") {
      targetSynapse -= 0.01;
      offSynapse += 0.018;
      offMyelin += 0.008;
    }

    if (scenario === "plateau") {
      targetSynapse -= stagnation * 0.009;
      targetMyelin -= stagnation * 0.005;
    }

    if (scenario === "progressive") {
      targetSynapse += challenge * 0.012;
      targetMyelin += challenge * 0.01;
    }

    targetSynapse = clamp(targetSynapse, 0.1, 1.6);
    offSynapse = clamp(offSynapse, 0.08, 1.5);
    targetMyelin = clamp(targetMyelin, 0.07, 1.45);
    offMyelin = clamp(offMyelin, 0.05, 1.35);

    const conductionSpeed = clamp(
      26 + targetMyelin * 48 + targetSynapse * 19 - offSynapse * 10 - fatigue * 17,
      8,
      120
    );

    const fidelity = clamp(
      33 + targetSynapse * 28 + targetMyelin * 23 - offSynapse * 19 - offMyelin * 9 - errorRate * 26 - fatigue * 12,
      4,
      99
    );

    const growthScore = clamp(
      targetSynapse + targetMyelin * 1.1 - (offSynapse * 0.95 + offMyelin * 0.7),
      -1.8,
      2.6
    );

    const dominance = targetSynapse * 0.66 + targetMyelin * 0.88 - (offSynapse * 0.67 + offMyelin * 0.72);

    return {
      targetSynapse,
      offSynapse,
      targetMyelin,
      offMyelin,
      fatigue,
      challenge,
      activity,
      errorRate,
      plasticity,
      conductionSpeed,
      fidelity,
      growthScore,
      dominance,
    };
  }

  function generateHistory(scenario) {
    const history = [];
    let current = {
      targetSynapse: 0.44,
      offSynapse: 0.27,
      targetMyelin: 0.33,
      offMyelin: 0.22,
      fatigue: 0.18,
      challenge: 0.4,
      activity: 0.65,
      errorRate: 0.28,
      plasticity: 0.5,
      conductionSpeed: 30,
      fidelity: 54,
      growthScore: 0.35,
      dominance: 0.2,
    };

    history.push({ session: 0, ...current });

    for (let i = 1; i <= MAX_SESSIONS; i += 1) {
      current = advanceSession(current, scenario, i);
      history.push({ session: i, ...current });
    }

    return history;
  }

  function historyForScenario(scenario) {
    if (!state.cache.has(scenario)) {
      state.cache.set(scenario, generateHistory(scenario));
    }
    return state.cache.get(scenario);
  }

  function interpolateMetrics(history, session) {
    const lowerIndex = Math.floor(session);
    const upperIndex = Math.min(MAX_SESSIONS, lowerIndex + 1);
    const t = session - lowerIndex;
    const a = history[lowerIndex];
    const b = history[upperIndex];

    return {
      session,
      targetSynapse: lerp(a.targetSynapse, b.targetSynapse, t),
      offSynapse: lerp(a.offSynapse, b.offSynapse, t),
      targetMyelin: lerp(a.targetMyelin, b.targetMyelin, t),
      offMyelin: lerp(a.offMyelin, b.offMyelin, t),
      fatigue: lerp(a.fatigue, b.fatigue, t),
      challenge: lerp(a.challenge, b.challenge, t),
      activity: lerp(a.activity, b.activity, t),
      errorRate: lerp(a.errorRate, b.errorRate, t),
      plasticity: lerp(a.plasticity, b.plasticity, t),
      conductionSpeed: lerp(a.conductionSpeed, b.conductionSpeed, t),
      fidelity: lerp(a.fidelity, b.fidelity, t),
      growthScore: lerp(a.growthScore, b.growthScore, t),
      dominance: lerp(a.dominance, b.dominance, t),
    };
  }

  function valueToChartX(session) {
    return lerp(chartBounds.xMin, chartBounds.xMax, session / MAX_SESSIONS);
  }

  function valueToChartY(value) {
    const ratio = normalize(value, chartBounds.minValue, chartBounds.maxValue);
    return lerp(chartBounds.yMax, chartBounds.yMin, ratio);
  }

  function buildPolyline(history, key) {
    return history
      .map((item) => `${valueToChartX(item.session).toFixed(2)},${valueToChartY(item[key]).toFixed(2)}`)
      .join(" ");
  }

  function pointAlongPath(points, progress) {
    const segments = points.length - 1;
    const scaled = clamp(progress, 0, 0.999999) * segments;
    const index = Math.min(segments - 1, Math.floor(scaled));
    const localT = scaled - index;
    const start = points[index];
    const end = points[index + 1];

    return {
      x: lerp(start.x, end.x, localT),
      y: lerp(start.y, end.y, localT),
      segmentIndex: index,
      localT,
    };
  }

  function combinedTargetScore(metrics) {
    return normalize(metrics.targetSynapse * 0.64 + metrics.targetMyelin * 0.36, 0.2, 1.35) * 100;
  }

  function combinedOffScore(metrics) {
    return normalize(metrics.offSynapse * 0.68 + metrics.offMyelin * 0.32, 0.15, 1.25) * 100;
  }

  function myelinEfficiency(metrics) {
    return normalize(metrics.targetMyelin - metrics.offMyelin * 0.45, 0.02, 1.2) * 100;
  }

  function growthDirection(metrics) {
    return normalize(metrics.growthScore, -1.8, 2.6) * 100;
  }

  function updateMetricReadouts(metrics) {
    const targetScore = combinedTargetScore(metrics);
    const offScore = combinedOffScore(metrics);
    const efficiency = myelinEfficiency(metrics);
    const growth = growthDirection(metrics);

    conductionValue.textContent = `${Math.round(metrics.conductionSpeed)} m/s`;
    fidelityValue.textContent = formatPercent(metrics.fidelity);
    targetValue.textContent = formatPercent(targetScore);
    offValue.textContent = formatPercent(offScore);
    myelinValue.textContent = formatPercent(efficiency);

    const growthSigned = Math.round(lerp(-100, 100, growth / 100));
    growthValue.textContent = growthSigned >= 0 ? `+${growthSigned}%` : `${growthSigned}%`;

    conductionBar.style.width = `${normalize(metrics.conductionSpeed, 8, 120) * 100}%`;
    fidelityBar.style.width = `${normalize(metrics.fidelity, 0, 100) * 100}%`;
    targetBar.style.width = `${targetScore}%`;
    offBar.style.width = `${offScore}%`;
    myelinBar.style.width = `${efficiency}%`;
    growthBar.style.width = `${growth}%`;
  }

  function updateTextNarration(metrics) {
    const sessionNumber = Math.round(metrics.session);
    const dominance = metrics.dominance;

    if (dominance > 0.2) {
      pathNarration.textContent = `Session ${sessionNumber}: signal strongly favors the target pathway with efficient saltatory conduction.`;
    } else if (dominance < -0.1) {
      pathNarration.textContent = `Session ${sessionNumber}: competing pathways are capturing activity and reducing output reliability.`;
    } else {
      pathNarration.textContent = `Session ${sessionNumber}: both routes are active, so the signal remains inconsistent.`;
    }

    scenarioNarration.textContent = scenarioMeta[state.scenario].summary;
    coachNote.textContent = scenarioMeta[state.scenario].coach;

    const fatiguePct = Math.round(metrics.fatigue * 100);
    const plasticityPct = Math.round(metrics.plasticity * 100);
    chartInsight.textContent = `Plasticity ${plasticityPct}% | Fatigue ${fatiguePct}% | Error pressure ${Math.round(
      metrics.errorRate * 100
    )}%`;
  }

  function updateConnectionStyle(metrics, route, activeSegment) {
    const targetWidth = 2.7 + metrics.targetSynapse * 5.2;
    const offWidth = 2.7 + metrics.offSynapse * 5.2;

    for (let i = 0; i < targetConnections.length; i += 1) {
      const line = targetConnections[i];
      const emphasis = route === "target" && i === activeSegment ? 0.98 : route === "target" ? 0.74 : 0.4;
      line.style.strokeWidth = `${(targetWidth + i * 0.24).toFixed(2)}`;
      line.style.opacity = emphasis.toFixed(2);
    }

    for (let i = 0; i < offConnections.length; i += 1) {
      const line = offConnections[i];
      const emphasis = route === "off" && i === activeSegment ? 0.96 : route === "off" ? 0.68 : 0.34;
      line.style.strokeWidth = `${(offWidth + i * 0.22).toFixed(2)}`;
      line.style.opacity = emphasis.toFixed(2);
    }

    const targetBandRy = 6.8 + metrics.targetMyelin * 6.2;
    const offBandRy = 5.6 + metrics.offMyelin * 5.1;

    for (const band of targetMyelinBands) {
      band.setAttribute("ry", targetBandRy.toFixed(2));
      band.style.opacity = clamp(0.22 + metrics.targetMyelin / 1.35, 0.2, 0.98).toFixed(2);
    }

    for (const band of offMyelinBands) {
      band.setAttribute("ry", offBandRy.toFixed(2));
      band.style.opacity = clamp(0.14 + metrics.offMyelin / 1.55, 0.15, 0.74).toFixed(2);
    }
  }

  function updatePulse(metrics, deltaSeconds) {
    const targetWeight = metrics.targetSynapse * 0.66 + metrics.targetMyelin * 0.88;
    const offWeight = metrics.offSynapse * 0.67 + metrics.offMyelin * 0.72;
    const route = targetWeight >= offWeight ? "target" : "off";

    if (route !== state.activeRoute) {
      state.activeRoute = route;
      state.trail = [];
      signalTrail.setAttribute("d", "");
    }

    if (state.playing) {
      const pulseVelocity =
        (0.14 + (metrics.conductionSpeed / 120) * 0.45) * (0.58 + state.playbackRate * 0.36);
      state.pulseProgress = (state.pulseProgress + deltaSeconds * pulseVelocity) % 1;
    }

    const pathPoints = route === "target" ? targetPoints : offPoints;
    const point = pointAlongPath(pathPoints, state.pulseProgress);

    let pulseY = point.y;
    if (route === "target") {
      const jumpHeight = clamp((metrics.targetMyelin - metrics.offMyelin) * 7, 0, 7);
      pulseY -= Math.sin(point.localT * Math.PI) * jumpHeight;
    } else {
      pulseY += Math.sin(point.localT * Math.PI) * 2.8;
    }

    const pulseX = point.x;
    const fidelityFactor = normalize(metrics.fidelity, 0, 100);
    const coreRadius = 7 + fidelityFactor * 3;
    const haloRadius = 14 + fidelityFactor * 10;

    signalPulse.setAttribute("cx", pulseX.toFixed(2));
    signalPulse.setAttribute("cy", pulseY.toFixed(2));
    signalPulse.setAttribute("r", coreRadius.toFixed(2));

    signalHalo.setAttribute("cx", pulseX.toFixed(2));
    signalHalo.setAttribute("cy", pulseY.toFixed(2));
    signalHalo.setAttribute("r", haloRadius.toFixed(2));

    signalPulse.style.opacity = (0.56 + fidelityFactor * 0.44).toFixed(2);
    signalHalo.style.opacity = (0.2 + fidelityFactor * 0.45).toFixed(2);

    state.trail.push(`${pulseX.toFixed(2)},${pulseY.toFixed(2)}`);
    if (state.trail.length > 22) {
      state.trail.shift();
    }
    signalTrail.setAttribute("d", `M${state.trail.join(" L")}`);
    signalTrail.style.opacity = (0.18 + fidelityFactor * 0.52).toFixed(2);

    for (const ring of nodeRings) {
      const nodeX = Number(ring.getAttribute("cx"));
      const nodeY = Number(ring.getAttribute("cy"));
      const distance = Math.hypot(nodeX - pulseX, nodeY - pulseY);
      const activation = clamp(1 - distance / 150, 0, 1);
      const ringRoute = ring.dataset.route;
      const routeMultiplier =
        ringRoute === "shared" ? 1 : ringRoute === route ? 1 : 0.55;

      ring.style.opacity = (0.12 + activation * 0.74 * routeMultiplier).toFixed(2);
      ring.style.strokeWidth = (1.2 + activation * 2.1).toFixed(2);
      ring.setAttribute("r", (12 + activation * 8).toFixed(2));
    }

    updateConnectionStyle(metrics, route, point.segmentIndex);
  }

  function updateChart(history, metrics) {
    if (state.chartScenario !== state.scenario) {
      targetStrengthLine.setAttribute("points", buildPolyline(history, "targetSynapse"));
      offStrengthLine.setAttribute("points", buildPolyline(history, "offSynapse"));
      myelinLine.setAttribute("points", buildPolyline(history, "targetMyelin"));
      state.chartScenario = state.scenario;
    }

    const markerX = valueToChartX(metrics.session);
    sessionMarker.setAttribute("x1", markerX.toFixed(2));
    sessionMarker.setAttribute("x2", markerX.toFixed(2));
  }

  function render(deltaSeconds) {
    const history = historyForScenario(state.scenario);
    const metrics = interpolateMetrics(history, state.session);

    updateMetricReadouts(metrics);
    updateTextNarration(metrics);
    updatePulse(metrics, deltaSeconds);
    updateChart(history, metrics);

    const sliderValue = Number(sessionRange.value);
    if (Math.abs(sliderValue - state.session) > 0.11) {
      sessionRange.value = state.session.toFixed(1);
    }
    sessionValue.textContent = `${Math.round(state.session)} / ${MAX_SESSIONS}`;
  }

  function setPlaying(playing) {
    state.playing = playing;
    playPauseButton.textContent = playing ? "Pause" : "Play";
    playPauseButton.setAttribute("aria-pressed", playing ? "true" : "false");
    writeStoredState();
  }

  function setScenario(scenario) {
    state.scenario = scenario;
    state.session = 0;
    state.pulseProgress = 0;
    state.trail = [];
    state.activeRoute = "target";
    signalTrail.setAttribute("d", "");

    for (const card of scenarioCards) {
      card.classList.toggle("is-selected", card.dataset.scenario === scenario);
    }

    sessionRange.value = "0";
    sessionValue.textContent = `0 / ${MAX_SESSIONS}`;

    render(0);
    writeStoredState();
  }

  function animate(timestamp) {
    if (state.lastTimestamp === null) {
      state.lastTimestamp = timestamp;
    }

    const deltaSeconds = clamp((timestamp - state.lastTimestamp) / 1000, 0, 0.05);
    state.lastTimestamp = timestamp;

    if (state.playing) {
      state.session += deltaSeconds * (0.95 + state.playbackRate * 2.15);
      if (state.session > MAX_SESSIONS) {
        state.session = 0;
        state.pulseProgress = 0;
        state.trail = [];
        signalTrail.setAttribute("d", "");
      }
    }

    render(deltaSeconds);
    window.requestAnimationFrame(animate);
  }

  for (const card of scenarioCards) {
    card.addEventListener("click", () => {
      if (card.dataset.scenario && card.dataset.scenario !== state.scenario) {
        setScenario(card.dataset.scenario);
      }
    });
  }

  playPauseButton.addEventListener("click", () => {
    setPlaying(!state.playing);
  });

  resetButton.addEventListener("click", () => {
    state.session = 0;
    state.pulseProgress = 0;
    state.trail = [];
    signalTrail.setAttribute("d", "");
    render(0);
  });

  playbackRange.addEventListener("input", () => {
    state.playbackRate = Number(playbackRange.value);
    playbackValue.textContent = formatSpeed(state.playbackRate);
    writeStoredState();
  });

  sessionRange.addEventListener("input", () => {
    state.session = clamp(Number(sessionRange.value), 0, MAX_SESSIONS);
    if (!state.playing) {
      render(0);
    }
  });

  readStoredState();

  playbackRange.value = state.playbackRate.toFixed(1);
  playbackValue.textContent = formatSpeed(state.playbackRate);

  setPlaying(state.playing);
  setScenario(state.scenario);

  window.requestAnimationFrame(animate);
})();
