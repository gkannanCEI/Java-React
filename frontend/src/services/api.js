import axios from 'axios';
import { isTokenExpired } from './tokenUtils';

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

/**
 * Request interceptor — attach the JWT or abort early if it has expired.
 *
 * Checking expiry client-side before sending the request prevents the
 * backend from logging spurious "expired JWT" warnings on every page
 * interaction when the user's session has simply timed out.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      if (isTokenExpired(token)) {
        // Evict the stale token and redirect to login without hitting the server.
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = '/login';
        // Return a rejected promise so the calling code's .catch() is invoked
        // and no network request is made.
        return Promise.reject(new Error('Session expired. Please log in again.'));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor — handle 401 Unauthorized responses.
 *
 * This is a safety net for edge cases where the server rejects the token
 * (e.g. secret key rotation, clock skew beyond the 30-second tolerance).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
