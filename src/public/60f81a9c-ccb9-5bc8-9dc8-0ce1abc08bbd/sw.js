/**
 * Cache version, change name to force reload
 */
const CACHE_VERSION = '0.0.1';
const CACHE_NAME = `Green8-${CACHE_VERSION}`;

const scope = '/';

/**
 * Stuff to put in the cache at install
 */
const CACHE_FILES = [
  scope,
  scope + 'index.html',

  scope + 'img/icons-192.png',
  scope + 'img/icons-512.png',

  scope + 'css/style.css',

  scope + 'js/use_sw.js',
  scope + 'js/main.js',
];

/**
 * Service worker 'install' event.
 * If all the files are successfully cached, then the service worker will be installed.
 * If any of the files fail to download, then the install step will fail.
 */
this.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log('Installing...');
        return cache.addAll(CACHE_FILES);
      })
      .then(function () {
        this.skipWaiting();
      })
      .catch(function (error) {
        console.error(error);
      })
  );
});

this.addEventListener('activate', function (event) {
  event.waitUntil(this.clients.claim());
});

/**
 * After a service worker is installed and the user navigates to a different page or refreshes,
 * the service worker will begin to receive fetch events.
 *
 * Network-first approach: if online, request is fetched from network and not from cache
 */
this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME)
          .then(cache => cache.match(event.request, {ignoreSearch: true}))
          .then(function (response) {
            console.log(event.request, response);
            // Cache hit - return response
            if (response) {
              return response;
            }

            return fetch(event.request).then(function (response) {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();

              caches.open(CACHE_NAME).then(function (cache) {
                cache.put(event.request, responseToCache);
              });

              return response;
            });
          })
  );
});
