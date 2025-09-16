import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top navigation with role-aware links and logout. */
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const doLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-30 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">AT</span>
          <span className="font-semibold">AnimalTrackr</span>
        </Link>
        <nav className="flex items-center gap-2">
          {user && (
            <>
              <NavLink to="/" className="nav-link">Dashboard</NavLink>
              <NavLink to="/animals" className="nav-link">Animals</NavLink>
              {user.role === 'admin' && <NavLink to="/devices" className="nav-link">Devices</NavLink>}
              <NavLink to="/profile" className="nav-link">Profile</NavLink>
              <button className="btn btn-secondary ml-2" onClick={doLogout}>Logout</button>
            </>
          )}
          {!user && (
            <>
              <NavLink to="/login" className="btn">Login</NavLink>
              <NavLink to="/register" className="btn btn-secondary">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
