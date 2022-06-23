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

// Self refers to the service worker object
