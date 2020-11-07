const CACHE_NAME = "footbalku-v4";
var urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/article.html",
  "/pages/home.html",
  "/pages/competition.html",
  "/pages/team.html", 
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/manifest.json",
  "/js/nav.js",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/sw.js",
  "/js/notif.js",
  "/assets/icon.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("install", function(event) {
  console.log("ServiceWorker: Menginstall..");
 
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});


//Menyimpan cache secara dinamis
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME, ignoreSearch : true})
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        }
      );
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith("footbalku")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options),
  );
});