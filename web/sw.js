const CACHE_NAME = "auranet-shell-v1";
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
  "./paper-map/index.html",
  "./paper-map/app.js",
  "./paper-map/styles.css",
  "./paper-map/data/locations.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
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
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

const isSameOrigin = (request) => {
  try {
    const url = new URL(request.url);
    return url.origin === self.location.origin;
  } catch {
    return false;
  }
};

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (!request || request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => null);
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL) || caches.match("./index.html"))
        )
    );
    return;
  }

  if (!isSameOrigin(request)) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        fetch(request)
          .then((fresh) => {
            if (!fresh || fresh.status >= 400) return;
            caches.open(CACHE_NAME).then((cache) => cache.put(request, fresh.clone())).catch(() => null);
          })
          .catch(() => null);
        return cached;
      }
      return fetch(request)
        .then((response) => {
          if (!response || response.status >= 400) return response;
          caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone())).catch(() => null);
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
