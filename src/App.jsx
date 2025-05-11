// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/layout/PrivateRoute';

// Public Components
import BookList from './components/books/BookList';
import BookDetail from './components/books/BookDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// User Components
import UserDashboard from './components/user/UserDashboard';
import UserRequests from './components/user/UserRequests';
import BorrowedBooks from './components/user/BorrowedBooks';
import UserProfile from './components/user/UserProfile';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import ManageBooks from './components/admin/ManageBooks';
import ManageUsers from './components/admin/ManageUsers';
import BookRequestsManager from './components/admin/BookRequestsManager';
import LibraryStats from './components/admin/LibraryStats';

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="container py-4 flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/my-requests" element={<PrivateRoute><UserRequests /></PrivateRoute>} />
          <Route path="/borrowed-books" element={<PrivateRoute><BorrowedBooks /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/books" element={<PrivateRoute adminOnly={true}><ManageBooks /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute adminOnly={true}><ManageUsers /></PrivateRoute>} />
          <Route path="/admin/requests" element={<PrivateRoute adminOnly={true}><BookRequestsManager /></PrivateRoute>} />
          <Route path="/admin/stats" element={<PrivateRoute adminOnly={true}><LibraryStats /></PrivateRoute>} />
        </Routes>
      </div>
      <footer className="bg-light py-3 mt-auto">
        <div className="container text-center">
          <p className="mb-0 text-muted">© 2025 Library Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;