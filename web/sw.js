const CACHE_VERSION = "v2";
const STATIC_CACHE = `auranet-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `auranet-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "./offline.html";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./app.webmanifest",
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
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (!event || !event.data) return;
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

const cacheFirstThenRevalidate = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const freshPromise = fetch(request)
    .then((response) => {
      if (response && response.status < 400) cache.put(request, response.clone()).catch(() => null);
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

const networkFirst = async (request, { timeoutMs = 4500 } = {}) => {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const response = await withTimeout(fetch(request), timeoutMs);
    if (response && response.status < 400) cache.put(request, response.clone()).catch(() => null);
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
    event.respondWith(networkFirst(request, { timeoutMs: 5000 }));
    return;
  }

  if (!isSameOrigin(request)) return;

  const url = new URL(request.url);
  const pathname = url.pathname || "";
  const isStaticAsset = /\.(?:css|js|json|svg|png|jpg|jpeg|webp|ico|woff2?)$/i.test(pathname);
  if (isStaticAsset) {
    event.respondWith(cacheFirstThenRevalidate(request));
    return;
  }

  event.respondWith(networkFirst(request, { timeoutMs: 4500 }));
});
