import axios from 'axios';

/**
 * Base URL:
 *   - In development the Vite dev-server proxy forwards /api/* to
 *     http://localhost:8080/api/*, so the browser never sends a
 *     cross-origin request and CORS is not involved.
 *   - In production set VITE_API_URL to your backend origin
 *     (e.g. https://api.myapp.com/api) via an .env.production file.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// Add a request interceptor to inject the JWT token
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

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - could trigger a logout or redirect here
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
