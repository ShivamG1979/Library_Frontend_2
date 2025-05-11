// // src/utils/api.js
// import axios from 'axios';

// // Base URL
// const API_URL = 'http://localhost:5000/api';

// // Get token from local storage
// const getToken = () => localStorage.getItem('token');

// // Create axios instance with base URL
// const api = axios.create({
//   baseURL: API_URL
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers['x-auth-token'] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle common errors
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle 401 Unauthorized - redirect to login
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: (userData) => api.post('/auth/login', userData),
//   register: (userData) => api.post('/auth/register', userData),
//   getProfile: () => api.get('/auth/profile'),
//   updateProfile: (userData) => api.put('/auth/profile', userData)
// };

// // Books API
// export const booksAPI = {
//   getAllBooks: () => api.get('/books'),
//   getBookById: (id) => api.get(`/books/${id}`),
//   requestBook: (bookId) => api.post('/books/request', { bookId }),
//   getUserRequests: () => api.get('/books/user/requests'),
//   getUserBorrowedBooks: () => api.get('/books/user/borrowed')
// };

// // Admin API
// export const adminAPI = {
//   // User management
//   getAllUsers: () => api.get('/admin/users'),
//   addUser: (userData) => api.post('/admin/users', userData),
//   updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
//   deleteUser: (id) => api.delete(`/admin/users/${id}`),
  
//   // Book management
//   getAllBooksAdmin: () => api.get('/admin/books'),
//   addBook: (bookData) => api.post('/admin/books', bookData),
//   updateBook: (id, bookData) => api.put(`/admin/books/${id}`, bookData),
//   deleteBook: (id) => api.delete(`/admin/books/${id}`),
  
//   // Request management
//   getAllBookRequests: () => api.get('/admin/requests'),
//   getPendingRequests: () => api.get('/admin/requests/pending'),
//   approveRequest: (id, dueDate) => api.put(`/admin/requests/approve/${id}`, { dueDate }),
//   rejectRequest: (id) => api.put(`/admin/requests/reject/${id}`),
//   processReturn: (id) => api.put(`/admin/requests/return/${id}`),
  
//   // Statistics
//   getLibraryStatistics: () => api.get('/admin/statistics')
// };

// export default api;