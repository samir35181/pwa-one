self.addEventListener('install', function(event) {
// Instalar de inmediato
if (self.skipWaiting) { self.skipWaiting(); }
  event.waitUntil(
    caches.open('cache01').then(function(cache) {
      return cache.addAll([
        './',
  'index.html'

      ]);
    })
  );
});
// Cache, falling back to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
 // Elimina archivos de cache viejos
  var cacheWhitelist = ['cache01'];
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    });
    caches.keys().then(function(cacheKeys) {
    // Muestra en la consola la cache instalada 
    console.log('Versión SW: '+cacheKeys);
});  


//////////////////////
'use strict';
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
 console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  

  const title = 'Notificación';
  const options = {
    body: `${event.data.text()}`,
    icon: 'images/noti.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://www.uth.edu.mx')
  );
});