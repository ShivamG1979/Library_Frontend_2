import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import PrivateRoute from './components/layout/PrivateRoute';

// Public Components
import HomePage from './components/layout/Home';
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
  const location = useLocation();
  
  // Hide sidebar on login and register pages
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    ); 
  }

  return (
    <div>
      <div>
        <div>
          {/* Sidebar - Don't show on login/register pages */}
          {!hideSidebar && <Sidebar />}
          
          {/* Main Content Area */}
          <div 
            style={{ marginLeft: hideSidebar ? '0' : '250px', transition: 'margin-left 0.3s', minHeight: '100vh' }}
          >
            <div>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BookList />} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
