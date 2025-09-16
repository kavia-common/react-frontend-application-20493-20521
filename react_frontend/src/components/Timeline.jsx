import React from 'react';

// PUBLIC_INTERFACE
export default function Timeline({ points = [] }) {
  /** Telemetry timeline list. */
  return (
    <div className="card">
      <h3 className="font-semibold mb-2">Timeline</h3>
      <ul className="space-y-2 max-h-64 overflow-auto">
        {points.map((p, idx) => (
          <li key={idx} className="text-sm text-gray-700">
            <span className="font-medium">{new Date(p.timestamp).toLocaleString()}</span>
            <span className="ml-2 text-gray-500">{p.lat.toFixed(3)}, {p.lng.toFixed(3)}</span>
          </li>
        ))}
        {points.length === 0 && <div className="text-sm text-gray-500">No points.</div>}
      </ul>
    </div>
  );
}
