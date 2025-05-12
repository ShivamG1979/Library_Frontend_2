import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on an admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't display the admin menu items in the navbar since they're in the sidebar now
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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

            {/* Home link */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            {/* Always show Books link */}
            <li className="nav-item">
              <Link to="/books" className="nav-link">
                All Books
              </Link>
            </li>

            {/* Only show Admin Dashboard link here, other admin links are in the sidebar */}
            {isAuthenticated && isAdmin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin Dashboard
                </Link>
              </li>
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