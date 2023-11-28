// TODO: Create a service worker that caches static assets:
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({ request }) => {
      console.log(request);
      return (
        // CSS
        request.destination === 'style' ||
        // JavaScript
        request.destination === 'script'
      );
    },
    new StaleWhileRevalidate({
      cacheName: 'static-resources',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );


registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
      cacheName: 'my-image-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );