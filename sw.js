// sw.js - Version 3 (Auto-update)
const CACHE_NAME = 'math-magic-chess-v3';

self.addEventListener('install', event => {
  console.log('[SW] Install v3');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate v3');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Menghapus cache lama:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Selalu ambil dari internet, jangan pakai cache
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});