import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Login page with email/password. */
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('ranger@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft p-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-sm text-gray-600 mb-4">Sign in to AnimalTrackr</p>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="w-full" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="w-full" placeholder="••••••••" />
          </div>
          <button className="btn w-full">Login</button>
        </form>
        <div className="text-sm text-gray-600 mt-3">
          No account? <Link to="/register" className="text-primary">Register</Link>
        </div>
      </div>
    </div>
  );
}
