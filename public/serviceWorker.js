const cacheName = 'v1';
const cacheAssests = [
    '/',
    '/offline',
    '/css/stylesheet.css',
    '/script/script.js',
    '/images/rijksmuseum.svg',
    '/images/offline.svg'
]

// Call install event
// Put everything in the cache
self.addEventListener('install', e => {
    console.log('service worker: installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('service worker: cashing files');
                cache.addAll(cacheAssests);
            })
            .then(() => self.skipWaiting())
    );
});


// Call activate event
// Delete the old cache versies
self.addEventListener('activate', e => {
    console.log('service worker: activated');

    // Remove the old caches
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            console.log('service worker: clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );
});

// // Call fetch event
self.addEventListener('fetch', e => {
    const path = new URL(e.request.url).pathname


    if (e.request.headers.get('accept').includes('text/html')) {
        e.respondWith(
            caches.open(cacheName)
                .then(cache => cache.match(e.request))
                .then(response => response || fetchAndCache(e.request))
                .catch(() => caches.open(cacheName)
                    .then(cache => cache.match('/offline')))
        )
    } else if (cacheAssests.includes(path)) {
        // Responds with a cache match
        e.respondWith(
            caches.open(cacheName)
                .then(cache => cache.match(path))
        )
    }
})

// This function fetches a request and caches the response for new url
function fetchAndCache(request) {
    return fetch(request) // Fetch the request from the network
        .then(response => {
            const clone = response.clone() // Clone the response to prevent it from being consumed
            caches.open(cacheName) // Open the cache
                .then(cache => cache.put(request, clone)) // Cache the response
            return response // Return the original response
        })
}
