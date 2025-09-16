import React from 'react';

// PUBLIC_INTERFACE
export default function AnimalCard({ animal, onEdit, onDelete }) {
  /** Card to display animal info. */
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <img alt={animal.name} src={animal.photo || 'https://placehold.co/80x80?text=A'} className="h-20 w-20 object-cover rounded-lg" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{animal.name}</h4>
            <span className={`badge ${animal.online ? 'badge-online' : 'badge-offline'}`}>{animal.online ? 'online' : 'offline'}</span>
          </div>
          <div className="text-sm text-gray-600">{animal.species || 'Unknown species'}</div>
          <div className="text-xs text-gray-500">Device: {animal.device_id || 'N/A'}</div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={() => onEdit && onEdit(animal)}>Edit</button>
          <button className="btn bg-red-500 hover:opacity-90" onClick={() => onDelete && onDelete(animal)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
