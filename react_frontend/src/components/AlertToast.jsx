import React from 'react';

// PUBLIC_INTERFACE
export default function AlertToast({ alerts = [] }) {
  /** Alerts toaster list. */
  if (!alerts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-40">
      {alerts.map((a, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-soft border-l-4 border-red-500 p-3 w-72">
          <div className="font-semibold text-red-600">{a.title || 'Alert'}</div>
          <div className="text-sm text-gray-600">{a.message || a.description}</div>
        </div>
      ))}
    </div>
  );
}
