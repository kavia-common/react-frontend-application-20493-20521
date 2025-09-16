import React from 'react';

// PUBLIC_INTERFACE
export default function DeviceCard({ device, onEdit }) {
  /** Card to display device info. */
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{device.name}</div>
          <div className="text-sm text-gray-600">IMEI: {device.imei || '—'}</div>
          <div className="text-xs text-gray-500">Battery: {device.battery || '--'}%</div>
        </div>
        <button className="btn btn-secondary" onClick={() => onEdit && onEdit(device)}>Edit</button>
      </div>
    </div>
  );
}
