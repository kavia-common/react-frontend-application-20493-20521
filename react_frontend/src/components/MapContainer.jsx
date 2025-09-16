import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { patchLeafletIcons } from '../leafletFix';

// PUBLIC_INTERFACE
export default function MapContainer({ center = [0,0], zoom = 3, markers = [], heat = [], onMarkerClick }) {
  /**
   * Leaflet based map with markers and optional heat points using CircleMarker approximation.
   * Note: For production heatmaps, integrate leaflet.heat plugin. Here we render density via small circles.
   */
  const mapRef = useRef(null);

  const heatPoints = useMemo(() => heat.slice(0, 1000), [heat]);

  useEffect(() => {
    // Ensure map invalidates size when container dimensions change (responsive)
    if (mapRef.current) {
      setTimeout(() => { mapRef.current.invalidateSize(); }, 100);
    }
    // Patch Leaflet icons once
    patchLeafletIcons();
  }, []);

  return (
    <div className="h-[60vh] md:h-[calc(100vh-160px)] w-full rounded-xl overflow-hidden shadow-soft">
      <LeafletMap center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} ref={mapRef}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {heatPoints.map((p, idx) => (
          <CircleMarker key={`h-${idx}`} center={[p.lat, p.lng]} radius={3} pathOptions={{ color: 'rgba(37,99,235,0.4)' }} />
        ))}
        {markers.map(m => (
          <Marker key={m.id} position={[m.lat, m.lng]} eventHandlers={{ click: () => onMarkerClick && onMarkerClick(m) }}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{m.title}</div>
                {m.subtitle && <div className="text-gray-600">{m.subtitle}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
}
