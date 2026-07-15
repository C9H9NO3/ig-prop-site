// Stale-while-revalidate service worker.
// Serve everything INSTANTLY from cache (no network wait at launch - that wait was
// the gray flash on iOS PWA cold starts), then refresh from the network in the
// background. If the background refresh finds a NEW app shell, clients are notified
// so they can silently reload while the splash still covers the screen.
// Bump CACHE on each deploy; activate purges older caches.
const CACHE = 'ig-v41';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const isShell = e.request.mode === 'navigate';
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(e.request);
    // clone BEFORE the cached response is handed to the page - once the page
    // consumes its body, clone() throws and would kill the background refresh
    const cachedCopy = (cached && isShell) ? cached.clone() : null;
    const refresh = (async () => {
      try {
        const fresh = await fetch(e.request);
        if (fresh && fresh.ok) {
          let changed = false;
          if (cachedCopy) {
            const [a, b] = await Promise.all([fresh.clone().text(), cachedCopy.text()]);
            changed = a !== b;
          }
          await cache.put(e.request, fresh.clone());   // store FIRST, then notify -
          if (changed) {                               // the reload must find the new copy
            for (let i = 0; i < 3; i++) {
              const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
              clients.forEach((c) => c.postMessage({ type: 'shell-updated' }));
              await new Promise((r) => setTimeout(r, 400));
            }
          }
        }
        return fresh;
      } catch (err) {
        return null;
      }
    })();
    if (cached) {
      e.waitUntil(refresh);      // keep SW alive so the background update completes
      return cached;             // instant - no network wait
    }
    const fresh = await refresh; // first ever visit: network
    if (fresh) return fresh;
    return new Response('offline', { status: 503 });
  })());
});
