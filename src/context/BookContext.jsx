// src/context/BookContext.jsx
import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, getAuthConfig } from '../config/apiConfig';

const BookContext = createContext();

export const useBook = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [userRequests, setUserRequests] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all books
  const getAllBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.books.getAll);
      setBooks(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  // Get single book
  const getBookById = async (bookId) => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.books.getById(bookId));
      setBook(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch book details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Request a book
  const requestBook = async (bookId) => {
    setLoading(true);
    try {
      const res = await axios.post(
        API_ENDPOINTS.books.request,
        { bookId },
        getAuthConfig()
      );
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request book');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get user's book requests
  const getUserRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        API_ENDPOINTS.books.userRequests,
        getAuthConfig()
      );
      setUserRequests(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user requests');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get user's borrowed books
  const getUserBorrowedBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        API_ENDPOINTS.books.userBorrowed,
        getAuthConfig()
      );
      setBorrowedBooks(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch borrowed books');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const value = {
    books,
    book,
    userRequests,
    borrowedBooks,
    loading,
    error,
    getAllBooks,
    getBookById,
    requestBook,
    getUserRequests,
    getUserBorrowedBooks
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export default BookContext;