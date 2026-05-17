import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const getApiBaseUrl = (): string => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  const trimmedUrl = configuredUrl.replace(/\/$/, '');

  return trimmedUrl.endsWith('/api') ? trimmedUrl : `${trimmedUrl}/api`;
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
