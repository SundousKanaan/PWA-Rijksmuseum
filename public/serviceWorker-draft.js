const CORE_CACHE_NAME = 'cache-v3';
const RUNTIME_CACHE_NAME = 'runtime-cache';
const CORE_ASSETS = [
  '/offline',
  '/css/stylesheet.css',
  '/script/script.js'
]

// Voeg een eventlistener toe voor het 'install' event van de servicewerker
self.addEventListener("install", (event) => {
  console.log('install')
  // Gebruik event.waitUntil om ervoor te zorgen dat de servicewerker blijft wachten tot de cache is opgeslagen
  event.waitUntil(
    // Open de cache met de opgegeven cache-naam en voeg de opgegeven assets toe aan de cache
    caches.open(CORE_CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
    // Zodra alle assets zijn toegevoegd aan de cache, activeer de servicewerker
    .then(() => self.skipWaiting())
  );
});

// Voeg een eventlistener toe voor het 'activate' event van de servicewerker
self.addEventListener('activate', (event) => {
  console.log('acitvate')
  // Gebruik event.waitUntil om ervoor te zorgen dat de servicewerker blijft wachten tot alle caches zijn opgeruimd
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        // Maak een array van alle promises om alle caches op te ruimen
        return Promise.all(
          cacheNames.map(cacheName => {
            // Als de cache-naam niet de CORE_CACHE_NAME of de RUNTIME_CACHE_NAME is, verwijder deze dan uit de cache
            if (cacheName !== CORE_CACHE_NAME && cacheName !== RUNTIME_CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        )
      })
  )
})

// This code adds a fetch event listener to the service worker.
self.addEventListener('fetch', (event) => {

  // Extracts the path from the requested URL
  const path = new URL(event.request.url).pathname

  // Checks if the request header includes 'text/html'
  if (event.request.headers.get('accept').includes('text/html')) {
    // If yes, it responds with a cache match or a fetch response and caches the response
    event.respondWith(
      caches.open(RUNTIME_CACHE_NAME)
        .then(cache => cache.match(event.request))
        .then(response => response || fetchAndCache(event.request))
        .catch(() => caches.open(CORE_CACHE_NAME)
          .then(cache => cache.match('/offline')))
    )
    // If the requested path is in the list of core assets
  } else if (CORE_ASSETS.includes(path)) {
    // Responds with a cache match
    event.respondWith(
      caches.open(CORE_CACHE_NAME)
        .then(cache => cache.match(path))
    )
  }
})



// This function fetches a request and caches the response for future use
function fetchAndCache(request) {
  return fetch(request) // Fetch the request from the network
    .then(response => {
      const clone = response.clone() // Clone the response to prevent it from being consumed
      caches.open(RUNTIME_CACHE_NAME) // Open the runtime cache
        .then(cache => cache.put(request, clone)) // Cache the response
      return response // Return the original response to the caller
    })
}



// *****************************************************************
// *****************************************************************

self.addEventListener('fetch', e => {
    console.log('service worker: fetching');
    e.respondWith(
        caches.match(e.request).then(response => {
            if (response) {
                // If the response is already cached, return it
                return response;
            } else if (e.request.url.includes('/object/')) {
                // If the request is for a specific object objectNumber, cache the response
                return caches.open(cacheName).then(cache => {
                    return fetch(e.request).then(response => {
                        cache.put(e.request, response.clone());
                        return response;
                    })
                        .catch(() => caches.open(cacheName)).then(caches => caches.match('/offline'))
                })
            }
        })
    )
    console.log('service worker: fetching finished');
})