import React from 'react';

// PUBLIC_INTERFACE
export default function Heatmap({ stats = [] }) {
  /** Simple heat summary bar by hour or region (placeholder analytics UI). */
  return (
    <div className="card">
      <h3 className="font-semibold mb-2">Activity Heat</h3>
      <div className="grid grid-cols-12 gap-1">
        {stats.map((v, i) => (
          <div key={i} title={`Hour ${i}: ${v}`} className="h-8 rounded" style={{ backgroundColor: `rgba(37,99,235,${Math.min(0.1 + v/100, 0.85)})`}} />
        ))}
      </div>
    </div>
  );
}
