import React from 'react';
import { useAuth } from '../auth/AuthContext';

// PUBLIC_INTERFACE
export default function ProfilePage() {
  /** Profile page to show user info and role. */
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 my-6">
      <div className="card">
        <h1 className="text-xl font-semibold mb-3">Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className="font-medium">{user.name || '—'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{user.email || '—'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Role</div>
            <div className="font-medium capitalize">{user.role || 'ranger'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
