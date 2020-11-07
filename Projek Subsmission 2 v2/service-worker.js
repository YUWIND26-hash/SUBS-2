const CACHE_NAME = "footbalku-v2";
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
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    }),
  );
});

// var token = "56e0ea311d714bfa9a6e1b1ce934dd62";

self.addEventListener("fetch", function (event) {
  var base_url = "http://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      }),
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        }),
    );
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker : cache ${cacheName} dihapus !!`);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
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
