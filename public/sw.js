const CACHE_NAME = 'mwangaza-v1'

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/mwangaza_icon.png',
  '/favicon.svg',
]

// Install — cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
  self.skipWaiting()
})

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

// Fetch — network first, fall back to cache
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Skip YouTube and external requests — never cache these
  if (
    url.origin !== self.location.origin ||
    url.hostname.includes('youtube') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic')
  ) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and cache successful responses
        if (response && response.status === 200) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone)
          })
        }
        return response
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached

          // For navigation requests, serve the cached index.html (SPA fallback)
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html')
          }

          return new Response('Offline', {
            status: 503,
            statusText: 'Offline',
          })
        })
      })
  )
})