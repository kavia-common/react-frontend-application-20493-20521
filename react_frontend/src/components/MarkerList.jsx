import React from 'react';

// PUBLIC_INTERFACE
export default function MarkerList({ items = [], onPlay }) {
  /** Small list of telemetry markers for quick actions. */
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Recent Telemetry</h3>
        {onPlay && <button className="btn btn-secondary" onClick={onPlay}>Playback</button>}
      </div>
      <ul className="space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{it.animalName}</div>
              <div className="text-xs text-gray-500">{new Date(it.timestamp).toLocaleString()}</div>
            </div>
            <div className="text-xs text-gray-600">{it.lat.toFixed(3)}, {it.lng.toFixed(3)}</div>
          </li>
        ))}
        {items.length === 0 && <div className="text-sm text-gray-500">No telemetry yet.</div>}
      </ul>
    </div>
  );
}
