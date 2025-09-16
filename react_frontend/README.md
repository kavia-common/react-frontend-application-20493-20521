# AnimalTrackr Frontend (React + Tailwind)

Modern, offline-first Ranger/Admin UI for tracking wildlife devices.

## Features
- Auth (login/register) with JWT stored in localStorage, protected routes, role-aware links
- Dashboard with Leaflet map, animal/device markers, heat overlay, telemetry timeline
- Animals and Devices CRUD (modals)
- Alerts toast, offline sync indicator, background sync for telemetry/uploads
- WebSocket realtime updates (REACT_APP_SOCKET_URL)
- Ocean Professional theme (blue primary, amber accents)

## Quick start
1) Install deps
   npm install
2) Configure env
   cp .env.example .env
   # adjust API and WS URLs
3) Run
   npm start

## Build
npm run build

## Config (.env)
- REACT_APP_API_BASE_URL
- REACT_APP_SOCKET_URL
- REACT_APP_MAPBOX_ACCESS_TOKEN (optional if switching to Mapbox)
- REACT_APP_MEDIA_STORAGE_URL
- REACT_APP_JWT_SECRET (dev only)

## Notes
- Service worker registered via serviceWorkerRegistration.js, Workbox-based sw.js handles caching and background sync.
- Map uses Leaflet with OSM tiles by default to avoid token requirements.
- Replace API endpoints with your backend paths (see src/api/client.js).
