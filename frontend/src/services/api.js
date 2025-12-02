import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

// Client API
export const clientAPI = {
  submit: (formData) => api.post('/clients/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getDashboard: () => api.get('/clients/me/dashboard'),
};

// Admin API
export const adminAPI = {
  getClients: (status = null) => {
    const params = status ? { status } : {};
    return api.get('/admin/clients', { params });
  },
  getClientDetail: (clientId) => api.get(`/admin/clients/${clientId}`),
  updateClientStatus: (clientId, status, notes) => 
    api.patch(`/admin/clients/${clientId}/status`, { status, notes }),
  getStats: () => api.get('/admin/stats'),
};

export default api;
