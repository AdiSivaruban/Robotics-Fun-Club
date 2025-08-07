// Service Worker for Robotics Fun Club
const CACHE_NAME = 'robotics-fun-club-v1';
const urlsToCache = [
    '/',
    '/home.html',
    '/projects.html',
    '/gallery.html',
    '/about.html',
    '/events.html',
    '/reviews.html',
    '/styles.css',
    '/home.css',
    '/projects.css',
    '/gallery.css',
    '/about.css',
    '/events.css',
    '/reviews.css',
    '/navigation.js',
    '/nature-walk-poster.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
            .catch(() => {
                // Return offline page for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/home.html');
                }
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Handle any background sync tasks
    return Promise.resolve();
}