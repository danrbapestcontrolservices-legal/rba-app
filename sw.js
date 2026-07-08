// =========================================================
// RBA AUTO-UPDATE ROBOT
// Change the version number below whenever you update the app!
// =========================================================
const CACHE_NAME = 'rba-hr-v1.0';

// 1. INSTALL: Force the phone to download the new update immediately
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
});

// 2. ACTIVATE: Wipe the old app version from the phone's memory
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Deleting old app version:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim(); // Take control of the screen instantly
});

// 3. FETCH: "Network-First" Strategy
// Always try to get the newest code from the internet first.
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
