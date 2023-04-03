const cacheName = 'v1';
const cacheAssests = [
    '/',
    '/offline',
    '/css/stylesheet.css',
    '/script/script.js',
    '/images/rijksmuseum.svg'
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

// Call fetch event
self.addEventListener('fetch', e => {
    console.log('service worker: fetching');
    e.respondWith(
        // fetch(e.request).catch(() => caches.match(e.request))
        caches.match(e.request).then(response => {
            if (response) {
                // If the response is already cached, return it
                return response;
            }
            // If the request is for a specific object objectNumber, cache the response
            if (e.request.url.includes('/object/')) {
                return caches.open(cacheName).then(cache => {
                    return fetch(e.request).then(response => {
                        cache.put(e.request, response.clone());
                        return response;
                    });
                });
            } else {
                return caches.match('/offline');
            }
        })
    )
    console.log('service worker: fetching finished');

})