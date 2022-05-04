// service worker
// 监听生命周期

const cachesDir = 'statics';
const staticAssets= [
    '/home',
    '/index.js'
];

// 预充 cache
self.addEventListener('install', event => {
    const cacheTask = caches.open(cachesDir);
    event.waitUtil(
        caches.open(cachesDir)
            .then(cache => {
                const resourceTask = staticAssets.map(uri => {
                    return fetch(uri)
                        then(response => {
                            cache.put(uri, response.clone());
                        })
                })
            })
    );
    console.log('i have been install');
})

self.addEventListener('activate', event => {
    console.log('i have been activate');
})

