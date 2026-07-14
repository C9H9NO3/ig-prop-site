// Network-first service worker.
// Why: iOS installed PWAs otherwise serve an aggressive stale snapshot (the app
// would show old builds even after a deploy, while Safari showed the new one).
// With network-first, an online launch ALWAYS fetches the current files; the cache
// is only a fallback when offline. Bump CACHE on each deploy so old caches are purged.
const CACHE = 'ig-v39';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    try {
      const fresh = await fetch(e.request);            // online: always current
      const cache = await caches.open(CACHE);
      cache.put(e.request, fresh.clone()).catch(() => {});
      return fresh;
    } catch (err) {
      const cached = await caches.match(e.request);    // offline: last-known copy
      if (cached) return cached;
      throw err;
    }
  })());
});
