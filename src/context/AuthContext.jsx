// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in when app loads
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'x-auth-token': token
        }
      };

      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', config);
        setUser(res.data.user);
        setIsAuthenticated(true);
        setIsAdmin(res.data.user.role === 'admin');
      } catch (err) {
        localStorage.removeItem('token');
        setError(err.response?.data?.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', userData);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', userData);
      
      localStorage.setItem('token', res.data.token);
      
      setUser(res.data.user);
      setIsAuthenticated(true);
      setIsAdmin(res.data.role === 'admin');
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Update profile
  const updateProfile = async (profileData) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    try {
      const res = await axios.put('http://localhost:5000/api/auth/profile', profileData, config);
      setUser(res.data.user);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;