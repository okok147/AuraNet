const CACHE_VERSION = "v14";
const STATIC_CACHE = `auranet-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `auranet-runtime-${CACHE_VERSION}`;
const TILE_CACHE = `auranet-tiles-${CACHE_VERSION}`;
const OFFLINE_URL = "./offline.html";
const BUILD_ASSET_VERSION = "20260324a";
const TILE_CACHE_MAX_ENTRIES = 180;

const PRECACHE_URLS = [
  "./",
  "./index.html",
  `./styles.css?v=${BUILD_ASSET_VERSION}`,
  `./app.js?v=${BUILD_ASSET_VERSION}`,
  `./app.webmanifest?v=${BUILD_ASSET_VERSION}`,
  "./favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./offline.html",
  "./data/locations.json",
  "./paper-map/index.html",
  "./paper-map/app.js",
  "./paper-map/styles.css"
];

const isSameOrigin = (request) => {
  try {
    const url = new URL(request.url);
    return url.origin === self.location.origin;
  } catch {
    return false;
  }
};

const FONT_HOSTS = new Set(["fonts.googleapis.com", "fonts.gstatic.com"]);
const CDN_HOSTS = new Set(["unpkg.com", "www.gstatic.com"]);
const TILE_HOSTS = new Set([
  "a.tile.openstreetmap.org",
  "b.tile.openstreetmap.org",
  "c.tile.openstreetmap.org",
  "tile.openstreetmap.org"
]);

const isCacheableResponse = (response) =>
  Boolean(response) && (response.ok || response.type === "opaque" || response.status === 0);

const withTimeout = (promise, timeoutMs = 4500) => {
  let timeoutId = null;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("timeout")), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId !== null) clearTimeout(timeoutId);
  });
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(() => null)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE && key !== TILE_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(async () => {
        if (self.registration && self.registration.navigationPreload) {
          try {
            await self.registration.navigationPreload.enable();
          } catch {
            // ignore unsupported preload enable failures
          }
        }
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (!event || !event.data) return;
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

const trimCache = async (cacheName, maxEntries) => {
  const limit = Number(maxEntries) || 0;
  if (limit <= 0) return;
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= limit) return;
  await Promise.all(keys.slice(0, keys.length - limit).map((key) => cache.delete(key)));
};

const cacheFirstThenRevalidate = async (request, cacheName = RUNTIME_CACHE) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const freshPromise = fetch(request)
    .then((response) => {
      if (isCacheableResponse(response)) {
        cache.put(request, response.clone()).catch(() => null);
        if (cacheName === TILE_CACHE) trimCache(TILE_CACHE, TILE_CACHE_MAX_ENTRIES).catch(() => null);
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Fire and forget background revalidation.
    freshPromise.catch(() => null);
    return cached;
  }
  const fresh = await freshPromise;
  if (fresh) return fresh;
  return caches.match(OFFLINE_URL);
};

const networkFirst = async (request, event, { timeoutMs = 4500 } = {}) => {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    if (event && "preloadResponse" in event) {
      const preload = await event.preloadResponse;
      if (isCacheableResponse(preload)) {
        cache.put(request, preload.clone()).catch(() => null);
        return preload;
      }
    }
    const response = await withTimeout(fetch(request), timeoutMs);
    if (isCacheableResponse(response)) cache.put(request, response.clone()).catch(() => null);
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return caches.match(OFFLINE_URL) || caches.match("./index.html");
  }
};

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (!request || request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, event, { timeoutMs: 5000 }));
    return;
  }

  const url = new URL(request.url);
  const hostname = String(url.hostname || "").toLowerCase();
  if (TILE_HOSTS.has(hostname)) {
    event.respondWith(cacheFirstThenRevalidate(request, TILE_CACHE));
    return;
  }

  if (FONT_HOSTS.has(hostname) || CDN_HOSTS.has(hostname)) {
    event.respondWith(cacheFirstThenRevalidate(request, RUNTIME_CACHE));
    return;
  }

  if (!isSameOrigin(request)) return;

  const pathname = url.pathname || "";
  const isStaticAsset = /\.(?:css|js|json|svg|png|jpg|jpeg|webp|ico|woff2?)$/i.test(pathname);
  if (isStaticAsset) {
    event.respondWith(cacheFirstThenRevalidate(request, RUNTIME_CACHE));
    return;
  }

  event.respondWith(networkFirst(request, event, { timeoutMs: 4500 }));
});
