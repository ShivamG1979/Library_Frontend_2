// src/config/apiConfig.js

/**
 * API Configuration for Library Management System
 * This file centralizes all API endpoint configurations
 */

// Base URL for backend API
const API_BASE_URL = 'https://library-backend-2-8104.onrender.com/api';

// Endpoints grouped by feature
const API_ENDPOINTS = {
  // Authentication endpoints
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
  
  // Book endpoints
  books: {
    getAll: `${API_BASE_URL}/books`,
    getById: (id) => `${API_BASE_URL}/books/${id}`,
    request: `${API_BASE_URL}/books/request`,
    userRequests: `${API_BASE_URL}/books/user/requests`,
    userBorrowed: `${API_BASE_URL}/books/user/borrowed`,
  },
  
  // Admin endpoints
  admin: {
    // User management
    users: {
      getAll: `${API_BASE_URL}/admin/users`,
      create: `${API_BASE_URL}/admin/users`,
      update: (id) => `${API_BASE_URL}/admin/users/${id}`,
      delete: (id) => `${API_BASE_URL}/admin/users/${id}`,
    },
    
    // Book management
    books: {
      getAll: `${API_BASE_URL}/admin/books`,
      create: `${API_BASE_URL}/admin/books`,
      update: (id) => `${API_BASE_URL}/admin/books/${id}`,
      delete: (id) => `${API_BASE_URL}/admin/books/${id}`,
    },
    
    // Request management
    requests: {
      getAll: `${API_BASE_URL}/admin/requests`,
      getPending: `${API_BASE_URL}/admin/requests/pending`,
      approve: (id) => `${API_BASE_URL}/admin/requests/approve/${id}`,
      reject: (id) => `${API_BASE_URL}/admin/requests/reject/${id}`,
      processReturn: (id) => `${API_BASE_URL}/admin/requests/return/${id}`,
    },
    
    // Statistics
    statistics: `${API_BASE_URL}/admin/statistics`,
  },
};

/**
 * Utility function to get auth configuration with token
 * @returns {Object} config object with headers including auth token
 */
export const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token
    }
  };
};

export { API_BASE_URL, API_ENDPOINTS };
export default API_ENDPOINTS;