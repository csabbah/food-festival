const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  './index.html',
  './events.html',
  './tickets.html',
  './schedule.html',
  './assets/css/style.css',
  './assets/css/bootstrap.css',
  './assets/css/tickets.css',
  './dist/app.bundle.js',
  './dist/events.bundle.js',
  './dist/tickets.bundle.js',
  './dist/schedule.bundle.js',
];

// service workers run before the window object has been created.
// So, by using self, we instantiate listeners on the service worker.
self.addEventListener('install', function (e) {
  // Wait until the work is complete before terminating the service worker
  // This ensures the service worker doesn't move from installing phase UNTIL it finished executing all of its code
  e.waitUntil(
    // We use caches.open to find the specific caches by name, the n add every file frm the FILES_TO_CACHE
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });

      cacheKeeplist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// Listen for the fetch event, log the URL of the requested resource then...
// begin to define how we will response wto the request
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url);
  // The lines inside responseWith will deliver the resources directly from the cache, otherwise...
  // The resources will be retrieved normally
  e.respondWith(
    // We use .match() to check if the resources already exists in caches
    caches.match(e.request).then(function (request) {
      if (request) {
        // If resources exist, log the URL with a message then return the cached resources
        console.log('responding with cache : ' + e.request.url);
        return request;
      } else {
        // If resources do not exist in cache, allow th resource to be retrieved from the online network as usual
        console.log('file is not cached, fetching : ' + e.request.url);
        return fetch(e.request);
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  );
});

// Self refers to the service worker object
