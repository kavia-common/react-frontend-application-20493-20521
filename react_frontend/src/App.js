import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Navbar from './components/Navbar';
import OfflineSyncIndicator from './components/OfflineSyncIndicator';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AnimalsPage from './pages/AnimalsPage';
import DevicesPage from './pages/DevicesPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// PUBLIC_INTERFACE
function ProtectedRoute({ children, roles }) {
  /** Protect routes by requiring authentication and optional role(s). */
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col gradient-surface">
      <Navbar />
      <OfflineSyncIndicator />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/animals" element={
            <ProtectedRoute>
              <AnimalsPage />
            </ProtectedRoute>
          } />
          <Route path="/devices" element={
            <ProtectedRoute roles={['admin']}>
              <DevicesPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">AnimalTrackr • Ocean Professional</footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root app with providers and router. */
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
