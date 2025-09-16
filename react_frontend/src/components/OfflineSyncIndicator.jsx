import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function OfflineSyncIndicator() {
  /**
   * Shows connectivity status and sync status when background sync is pending.
   */
  const [online, setOnline] = useState(navigator.onLine);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    const interval = setInterval(async () => {
      // Heuristic: show pending if Background Sync queue likely has items.
      // Without direct access, we toggle when offline as a hint.
      setPending(!navigator.onLine);
    }, 5000);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      clearInterval(interval);
    };
  }, []);

  if (online && !pending) return null;
  return (
    <div className="mx-auto max-w-7xl px-4 pt-2">
      <div className="rounded-lg px-3 py-2 text-sm shadow-soft bg-yellow-50 text-yellow-800 border border-yellow-200">
        {online ? 'Syncing queued updates...' : 'Offline: changes will sync when online.'}
      </div>
    </div>
  );
}
