// src/context/AdminContext.jsx
import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [adminBooks, setAdminBooks] = useState([]);
  const [bookRequests, setBookRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get auth token for headers
  const getConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'x-auth-token': token
      }
    };
  };

  // User Management
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', getConfig());
      setUsers(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/admin/users',
        userData,
        getConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${userId}`,
        userData,
        getConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, getConfig());
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Book Management
  const getAllBooksAdmin = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/books', getConfig());
      setAdminBooks(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/admin/books',
        bookData,
        getConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (bookId, bookData) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/books/${bookId}`,
        bookData,
        getConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/admin/books/${bookId}`, getConfig());
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete book');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Book Request Management
  const getAllBookRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/requests', getConfig());
      setBookRequests(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch book requests');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getPendingRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/requests/pending', getConfig());
      setPendingRequests(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pending requests');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const approveBookRequest = async (requestId, dueDate) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/requests/approve/${requestId}`,
        { dueDate },
        getConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve request');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const rejectBookRequest = async (requestId) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/requests/reject/${requestId}`,
        {},
        getConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject request');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const processBookReturn = async (requestId) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/requests/return/${requestId}`,
        {},
        getConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process book return');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Library Statistics
  const getLibraryStatistics = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/admin/statistics', getConfig());
      setStatistics(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch library statistics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    users,
    adminBooks,
    bookRequests,
    pendingRequests,
    statistics,
    loading,
    error,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    getAllBooksAdmin,
    addBook,
    updateBook,
    deleteBook,
    getAllBookRequests,
    getPendingRequests,
    approveBookRequest,
    rejectBookRequest,
    processBookReturn,
    getLibraryStatistics
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContext;