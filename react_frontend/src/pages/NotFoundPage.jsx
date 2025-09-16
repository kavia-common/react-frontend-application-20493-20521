import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFoundPage() {
  /** 404 page. */
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl font-bold text-primary">404</div>
        <p className="text-gray-600 mt-2">Page not found</p>
        <Link to="/" className="btn mt-4">Go Home</Link>
      </div>
    </div>
  );
}
