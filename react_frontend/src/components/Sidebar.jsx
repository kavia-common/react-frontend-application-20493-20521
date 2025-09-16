import React from 'react';
import { clsx } from 'clsx';

// PUBLIC_INTERFACE
export default function Sidebar({ animals = [], onSelect, selectedId }) {
  /** Sidebar animal list with status and quick select. */
  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-100 h-[calc(100vh-112px)] md:h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Animals</h2>
      </div>
      <ul className="divide-y">
        {animals.map(a => (
          <li key={a.id}>
            <button
              onClick={() => onSelect && onSelect(a)}
              className={clsx("w-full text-left px-4 py-3 hover:bg-primary/5 transition", selectedId === a.id && "bg-primary/10")}
            >
              <div className="flex items-center gap-3">
                <img alt={a.name} src={a.photo || 'https://placehold.co/48x48?text=A'} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{a.name}</span>
                    <span className={`badge ${a.online ? 'badge-online' : 'badge-offline'}`}>{a.online ? 'online' : 'offline'}</span>
                  </div>
                  <div className="text-xs text-gray-500">{a.species || 'Unknown species'}</div>
                </div>
              </div>
            </button>
          </li>
        ))}
        {animals.length === 0 && <li className="p-4 text-sm text-gray-500">No animals found.</li>}
      </ul>
    </aside>
  );
}
