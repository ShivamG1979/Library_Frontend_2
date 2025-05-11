// src/components/layout/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          Library Manager
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Always show Books link */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Books
              </Link>
            </li>

            {/* Authenticated Admin */}
            {isAuthenticated && isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/books" className="nav-link">
                    Manage Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/users" className="nav-link">
                    Manage Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/requests" className="nav-link">
                    Manage Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/stats" className="nav-link">
                    Library Statistics
                  </Link>
                </li>
              </>
            )}

            {/* Authenticated Regular User */}
            {isAuthenticated && !isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/borrowed-books" className="nav-link">
                    My Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-requests" className="nav-link">
                    My Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              </>
            )}

            {/* Logout Link */}
            {isAuthenticated && (
              <li className="nav-item">
                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </span>
              </li>
            )}

            {/* Guest Links */}
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
