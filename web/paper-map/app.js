const statusEl = document.getElementById("status");

const map = L.map("map", {
  zoomControl: false,
  minZoom: 2,
  maxZoom: 17,
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

map.setView([18, 10], 2);

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#7a2e16" : "";
}

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

function renderLocations(locations) {
  const markerBounds = [];

  locations.forEach((location) => {
    const marker = L.circleMarker([location.lat, location.lng], {
      radius: 7,
      color: "#3f2e20",
      weight: 1.4,
      fillColor: "#7c5a3a",
      fillOpacity: 0.9
    });

    const popupTitle = escapeHtml(location.name);
    const popupNote = escapeHtml(location.note);
    marker.bindPopup(`<strong>${popupTitle}</strong><br>${popupNote}`);
    marker.addTo(map);
    markerBounds.push([location.lat, location.lng]);
  });

  if (markerBounds.length > 0) {
    map.fitBounds(markerBounds, {
      padding: [44, 44],
      maxZoom: 5
    });
  }
}

async function loadLocations() {
  const response = await fetch("./data/locations.json", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch locations (${response.status})`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload.locations)) {
    throw new Error("Invalid location payload: expected locations array");
  }

  return payload.locations;
}

async function bootstrap() {
  try {
    const locations = await loadLocations();
    renderLocations(locations);
    setStatus(`Loaded ${locations.length} mapped locations.`);
  } catch (error) {
    setStatus("Map loaded, but location data fetch failed.", true);
    // Keep a console trace for debugging while preserving a clean UI failure state.
    console.error(error);
  }
}

bootstrap();
