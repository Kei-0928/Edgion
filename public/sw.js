const CACHE_NAME = "edgion-shell-v8";
const BASE_PATH = "/Edgion/";
const APP_SHELL = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}support.html`,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}icon-192.png`,
  `${BASE_PATH}icon-512.png`,
];

const getBuildAssetUrls = (html) => {
  const matches = html.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g);

  return Array.from(
    new Set(
      Array.from(matches)
        .map((match) => new URL(match[1], self.location.origin).pathname)
        .filter((pathname) => pathname.startsWith(`${BASE_PATH}assets/`)),
    ),
  );
};

const cacheAppShell = async () => {
  const cache = await caches.open(CACHE_NAME);

  await cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: "reload" })));

  const cachedIndex = await cache.match(`${BASE_PATH}index.html`);
  if (!cachedIndex) {
    return;
  }

  const assetUrls = getBuildAssetUrls(await cachedIndex.text());
  await Promise.all(
    assetUrls.map((url) =>
      cache.add(new Request(url, { cache: "reload" })).catch(() => undefined),
    ),
  );
};

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("edgion-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  const isAppShellNavigation =
    url.pathname === BASE_PATH || url.pathname === `${BASE_PATH}index.html`;
  const isScopedNavigation =
    event.request.mode === "navigate" && url.pathname.startsWith(BASE_PATH);

  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (isAppShellNavigation) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(BASE_PATH, copy.clone());
            cache.put(`${BASE_PATH}index.html`, copy);
          });
          return response;
        })
        .catch(() =>
          caches
            .match(BASE_PATH)
            .then((cached) => cached ?? caches.match(`${BASE_PATH}index.html`)),
        ),
    );
    return;
  }

  if (isScopedNavigation) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((cached) => cached ?? caches.match(BASE_PATH))
            .then((cached) => cached ?? caches.match(`${BASE_PATH}index.html`)),
        ),
    );
    return;
  }

  if (url.pathname.endsWith("/sw.js")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(`${BASE_PATH}index.html`));
    }),
  );
});
