const CACHE_NAME = "password-manager-cache";
const ASSETS_TO_CACHE = [
  "/index.html/",
  "/manifest.json/",
  "/service-worker.js/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets for audio-recorder...");
      return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
        console.error("Failed to cache some assets:", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((cacheToDelete) => caches.delete(cacheToDelete))
      );
    })
  );
});
