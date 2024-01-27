// named cache in Cache Storage
const CACHE_NAME = 'devtools-tips-v3';

// list of requests whose responses will be pre-cached at install
const INITIAL_CACHED_RESOURCES = [
    "/",
    '/dist/index-wWxAU_rf.css',
    '/dist/index-UuXobATa.js',
    '/dist/index.html',
    '/dist/icon.svg',
    '/dist/manifest.json'
];

// install event handler (note async operation)
// opens named cache, pre-caches identified resources above
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(INITIAL_CACHED_RESOURCES);
    })());
});


// We have a cache-first strategy, 
// where we look for resources in the cache first
// and only on the network if this fails.
self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Try the cache first.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse !== undefined) {
            // Cache hit, let's send the cached resource.
            return cachedResponse;
        } else fetch(fetchEvent.request);
    }))

});