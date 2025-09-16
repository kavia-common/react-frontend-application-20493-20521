/**
 * Axios API client with JWT interceptor and convenient endpoint calls.
 */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Create client
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT from localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('animaltrackr_jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// PUBLIC_INTERFACE
export const AuthAPI = {
  /** Login with email/password; stores token and returns user */
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  /** Register new user. */
  register: async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },
};

// PUBLIC_INTERFACE
export const AnimalsAPI = {
  /** CRUD for animals. */
  list: async () => (await api.get('/animals')).data,
  get: async (id) => (await api.get(`/animals/${id}`)).data,
  create: async (payload) => (await api.post('/animals', payload)).data,
  update: async (id, payload) => (await api.put(`/animals/${id}`, payload)).data,
  remove: async (id) => (await api.delete(`/animals/${id}`)).data,
};

// PUBLIC_INTERFACE
export const DevicesAPI = {
  /** CRUD for devices. */
  list: async () => (await api.get('/devices')).data,
  get: async (id) => (await api.get(`/devices/${id}`)).data,
  create: async (payload) => (await api.post('/devices', payload)).data,
  update: async (id, payload) => (await api.put(`/devices/${id}`, payload)).data,
};

// PUBLIC_INTERFACE
export const TelemetryAPI = {
  /** Telemetry submission and retrieval. */
  post: async (payload) => (await api.post('/telemetry', payload)).data,
  query: async (params) => (await api.get('/telemetry', { params })).data,
};

// PUBLIC_INTERFACE
export const AlertsAPI = {
  list: async () => (await api.get('/alerts')).data
};

// PUBLIC_INTERFACE
export const AnalyticsAPI = {
  predictMovement: async (animal_id, window) => (await api.get('/analytics/movement-predict', { params: { animal_id, window } })).data
};

// PUBLIC_INTERFACE
export const DashboardAPI = {
  get: async () => (await api.get('/dashboard')).data
};

// PUBLIC_INTERFACE
export default api;
