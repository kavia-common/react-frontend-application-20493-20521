/* global workbox */
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

precacheAndRoute(self.__WB_MANIFEST || []);

const apiBase = self?.ENV_API_BASE_URL || '';

registerRoute(
  ({url}) => url.origin === self.location.origin,
  new StaleWhileRevalidate({ cacheName: 'static-resources' })
);

registerRoute(
  ({url}) => url.href.startsWith(apiBase) && url.pathname.startsWith('/alerts'),
  new NetworkFirst({ cacheName: 'alerts-cache', networkTimeoutSeconds: 3 })
);

registerRoute(
  ({url}) => url.href.startsWith(apiBase) && (url.pathname.startsWith('/animals') || url.pathname.startsWith('/devices')),
  new StaleWhileRevalidate({ cacheName: 'entities-cache' })
);

// Background sync for telemetry and uploads
const bgSyncPlugin = new BackgroundSyncPlugin('animaltrackr-queue', {
  maxRetentionTime: 24 * 60
});

registerRoute(
  ({request, url}) => url.href.startsWith(apiBase) &&
    (url.pathname.startsWith('/telemetry') || url.pathname.startsWith('/camera-trap/upload')) &&
    request.method === 'POST',
  new NetworkOnly({ plugins: [bgSyncPlugin] }),
  'POST'
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
