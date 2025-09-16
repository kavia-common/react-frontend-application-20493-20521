import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI } from '../api/client';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides auth state and methods, persisting JWT and user in localStorage.
   */
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('animaltrackr_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('animaltrackr_jwt'));

  useEffect(() => {
    if (user) localStorage.setItem('animaltrackr_user', JSON.stringify(user));
    else localStorage.removeItem('animaltrackr_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('animaltrackr_jwt', token);
    else localStorage.removeItem('animaltrackr_jwt');
  }, [token]);

  const login = async (email, password) => {
    const data = await AuthAPI.login(email, password);
    // expect { token, user }
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const data = await AuthAPI.register(payload);
    // Optionally auto-login if backend returns token
    if (data.token) setToken(data.token);
    if (data.user) setUser(data.user);
    return data.user || null;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, login, register, logout, setUser }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth context. */
  return useContext(AuthContext);
}
