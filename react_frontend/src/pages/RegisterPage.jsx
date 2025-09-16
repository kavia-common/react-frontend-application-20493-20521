import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// PUBLIC_INTERFACE
export default function RegisterPage() {
  /** Registration page. */
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: 'Ranger Rick', email: 'ranger@example.com', password: 'password', role: 'ranger' });
  const [error, setError] = useState('');

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft p-6">
        <h1 className="text-2xl font-semibold mb-1">Create account</h1>
        <p className="text-sm text-gray-600 mb-4">Join AnimalTrackr</p>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={form.name} onChange={e => update('name', e.target.value)} required className="w-full" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required className="w-full" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required className="w-full" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select value={form.role} onChange={e => update('role', e.target.value)} className="w-full">
              <option value="ranger">Ranger</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="btn w-full">Register</button>
        </form>
        <div className="text-sm text-gray-600 mt-3">
          Have an account? <Link to="/login" className="text-primary">Login</Link>
        </div>
      </div>
    </div>
  );
}
