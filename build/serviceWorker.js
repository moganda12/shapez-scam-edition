const CACHE_NAME = "Shapez-se-v04"

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/bundle.js',
            '/main.css',
            '/favicon.ico',
            '/res/fonts/GameFont.woff2',
            '/res/sounds/music/menu.mp3',
            '/res/sounds/music/puzzle-full.mp3',
            '/res/sounds/music/theme-full.mp3',
            '/res/sounds/sfx.mp3',
            '/res/ui/building_icons/analyzer.png',
            '/res/ui/building_icons/balancer.png',
            '/res/ui/building_icons/belt.png'
        ]);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                const fetchResponse = await fetch(event.request);

                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                //fail
            }
        }
    })());
});
