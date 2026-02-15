(() => {
  const diagram = document.getElementById("axonDiagram");
  const playPauseButton = document.getElementById("playPauseButton");
  const speedRange = document.getElementById("speedRange");
  const speedValue = document.getElementById("speedValue");
  const speedReadout = document.getElementById("speedReadout");
  const integrityReadout = document.getElementById("integrityReadout");
  const narrationReadout = document.getElementById("narrationReadout");
  const modeInputs = Array.from(document.querySelectorAll("input[name='mode']"));

  const pulseCore = document.getElementById("pulseCore");
  const pulseGlow = document.getElementById("pulseGlow");
  const pulseTrail = document.getElementById("pulseTrail");
  const nodeRings = Array.from(document.querySelectorAll(".node-ring"));

  if (
    !diagram ||
    !playPauseButton ||
    !speedRange ||
    !speedValue ||
    !speedReadout ||
    !integrityReadout ||
    !narrationReadout ||
    !pulseCore ||
    !pulseGlow ||
    !pulseTrail ||
    nodeRings.length === 0
  ) {
    return;
  }

  const nodePositions = [110, 250, 390, 530, 670, 810];
  const baseY = 160;
  const maxTrailPoints = 24;

  const modeConfig = {
    healthy: {
      velocity: 0.25,
      arcHeight: 30,
      jitter: 0,
      strengthLoss: 0.05,
      speedMessage: "Fast saltatory conduction between nodes.",
      integrityMessage: "Low ion leak. Strong pulse arrival.",
      narration:
        "Signal leaps node-to-node, regenerating quickly at each Node of Ranvier.",
    },
    damaged: {
      velocity: 0.115,
      arcHeight: 12,
      jitter: 2.8,
      strengthLoss: 0.34,
      speedMessage: "Conduction slows where myelin insulation is broken.",
      integrityMessage: "Current leaks across damaged sheath segments.",
      narration:
        "The pulse still moves, but leakage and stutter reduce efficiency.",
    },
    bare: {
      velocity: 0.068,
      arcHeight: 0,
      jitter: 0.8,
      strengthLoss: 0.52,
      speedMessage: "Continuous conduction is much slower.",
      integrityMessage: "No insulation means larger signal decay over distance.",
      narration:
        "Without myelin, the impulse travels continuously instead of jumping.",
    },
  };

  const state = {
    mode: "healthy",
    speedMultiplier: 1,
    progress: 0,
    running: true,
    trail: [],
    lastTimestamp: null,
  };

  const formatSpeed = (value) => `${value.toFixed(1)}x`;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (start, end, t) => start + (end - start) * t;
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

  function setMode(mode) {
    state.mode = mode;
    diagram.dataset.mode = mode;

    const config = modeConfig[mode];
    speedReadout.textContent = config.speedMessage;
    integrityReadout.textContent = config.integrityMessage;
    narrationReadout.textContent = config.narration;

    state.trail = [];
    pulseTrail.setAttribute("d", "");
  }

  function setRunning(running) {
    state.running = running;
    playPauseButton.textContent = running ? "Pause Animation" : "Play Animation";
    playPauseButton.setAttribute("aria-pressed", running ? "true" : "false");
  }

  function buildNarration(segmentIndex, strength) {
    const startNode = segmentIndex + 1;
    const endNode = segmentIndex + 2;
    const strengthPercent = Math.round(strength * 100);

    if (state.mode === "healthy") {
      return `Jumping from node ${startNode} to ${endNode}. Signal strength remains high (${strengthPercent}%).`;
    }
    if (state.mode === "damaged") {
      return `Crossing node ${startNode} to ${endNode} with leakage. Pulse strength now ${strengthPercent}%.`;
    }
    return `Traveling continuously past node ${startNode}. Remaining pulse strength ${strengthPercent}%.`;
  }

  function getPulseState(progressValue) {
    const config = modeConfig[state.mode];

    if (state.mode === "bare") {
      const x = lerp(nodePositions[0], nodePositions[nodePositions.length - 1], progressValue);
      const y = baseY + Math.sin(progressValue * Math.PI * 12) * config.jitter;
      const segmentIndex = clamp(
        Math.floor(progressValue * (nodePositions.length - 1)),
        0,
        nodePositions.length - 2
      );

      return { x, y, segmentIndex };
    }

    const span = nodePositions.length - 1;
    const segmentFloat = progressValue * span;
    const segmentIndex = clamp(Math.floor(segmentFloat), 0, span - 1);
    const local = segmentFloat - segmentIndex;
    const easing = state.mode === "healthy" ? easeInOutCubic(local) : easeInOutSine(local);

    const segmentStart = nodePositions[segmentIndex];
    const segmentEnd = nodePositions[segmentIndex + 1];
    const x = lerp(segmentStart, segmentEnd, easing);
    const y =
      baseY -
      Math.sin(easing * Math.PI) * config.arcHeight +
      Math.sin(progressValue * Math.PI * 18) * config.jitter;

    return { x, y, segmentIndex };
  }

  function render() {
    const config = modeConfig[state.mode];
    const { x, y, segmentIndex } = getPulseState(state.progress);
    const strength = clamp(1 - config.strengthLoss * state.progress, 0.22, 1);

    pulseCore.setAttribute("cx", x.toFixed(2));
    pulseCore.setAttribute("cy", y.toFixed(2));
    pulseGlow.setAttribute("cx", x.toFixed(2));
    pulseGlow.setAttribute("cy", y.toFixed(2));
    pulseCore.setAttribute("r", (7 + strength * 3).toFixed(2));
    pulseGlow.setAttribute("r", (15 + strength * 10).toFixed(2));

    pulseCore.style.opacity = (0.55 + strength * 0.45).toFixed(2);
    pulseGlow.style.opacity = (0.2 + strength * 0.35).toFixed(2);

    const trailPoint = `${x.toFixed(2)},${y.toFixed(2)}`;
    state.trail.push(trailPoint);
    if (state.trail.length > maxTrailPoints) {
      state.trail.shift();
    }
    pulseTrail.setAttribute("d", `M${state.trail.join(" L")}`);
    pulseTrail.style.opacity = (0.22 + strength * 0.45).toFixed(2);

    for (let i = 0; i < nodeRings.length; i += 1) {
      const nodeX = nodePositions[i];
      const distance = Math.abs(x - nodeX);
      const activation = clamp(1 - distance / 120, 0, 1);
      const ring = nodeRings[i];

      ring.setAttribute("r", (10 + activation * 17).toFixed(2));
      ring.style.opacity = (0.15 + activation * 0.65).toFixed(2);
      ring.style.strokeWidth = (1.2 + activation * 1.8).toFixed(2);
    }

    narrationReadout.textContent = buildNarration(segmentIndex, strength);
  }

  function animate(timestamp) {
    if (state.lastTimestamp === null) {
      state.lastTimestamp = timestamp;
    }

    const deltaSeconds = clamp((timestamp - state.lastTimestamp) / 1000, 0, 0.05);
    state.lastTimestamp = timestamp;

    if (state.running) {
      const config = modeConfig[state.mode];
      state.progress += deltaSeconds * config.velocity * state.speedMultiplier;
      if (state.progress >= 1) {
        state.progress -= 1;
        state.trail = [];
      }
    }

    render();
    window.requestAnimationFrame(animate);
  }

  playPauseButton.addEventListener("click", () => {
    setRunning(!state.running);
  });

  speedRange.addEventListener("input", () => {
    state.speedMultiplier = Number(speedRange.value);
    speedValue.textContent = formatSpeed(state.speedMultiplier);
  });

  for (const input of modeInputs) {
    input.addEventListener("change", () => {
      if (input.checked) {
        setMode(input.value);
      }
    });
  }

  setMode("healthy");
  speedValue.textContent = formatSpeed(state.speedMultiplier);
  setRunning(true);
  window.requestAnimationFrame(animate);
})();
