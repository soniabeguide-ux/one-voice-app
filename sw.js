const CACHE_NAME = "one-voice-v4";
const SHELL_FILES = ["/", "/index.html", "/style.css", "/app.js", "/data.js", "/manifest.json", "/assets/hero-worship.jpg", "/assets/logo-1v.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});

// Réseau en priorité pour le shell de l'app : si le site a été redéployé,
// la nouvelle version s'affiche immédiatement. Le cache ne sert que de
// secours si le réseau est indisponible (usage hors-ligne).
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
