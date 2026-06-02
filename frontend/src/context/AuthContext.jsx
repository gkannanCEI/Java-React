import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services';
import { isTokenExpired } from '../services/tokenUtils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token    = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role     = localStorage.getItem('role');

    if (token && username) {
      if (isTokenExpired(token)) {
        // Silently evict the stale session so the user is redirected to login
        // rather than hammering the backend with guaranteed-401 requests.
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
      } else {
        setUser({ token, username, role });
      }
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginService({ username, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);

      setUser({ token, username, role });
      return { success: true, role };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false };
    }
  };

  const register = async (username, password, role) => {
    try {
      await registerService({ username, password, role });
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
