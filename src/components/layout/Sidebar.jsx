import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Declare the navigate function
  const { isAuthenticated, isAdmin, logout } = useAuth();

  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Handle logout and redirect to home page
  const handleLogout = async () => {
    await logout(); // Ensure logout completes before navigation
    navigate("/"); // Navigate to the home page after logout
  };

  return (
    <div
      className={`col-auto px-0 bg-dark text-white ${collapsed ? "sidebar-collapsed" : ""} position-fixed h-100`}
    >
      <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
        <div className="w-100 d-flex justify-content-between align-items-center px-3 py-3 border-bottom border-secondary">
          {!collapsed && (
            <span className="fs-5 d-none d-sm-inline fw-bold">
              Library System
            </span>
          )}
          <button
            className="btn btn-sm btn-dark"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className={`bi bi-${collapsed ? "chevron-right" : "chevron-left"}`}></i>
          </button>
        </div>

        <ul className="nav nav-pills flex-column mb-auto w-100 mt-2">
          {/* Public Links */}
          <li className="nav-item w-100">
            <Link to="/" className={`nav-link text-white px-3 ${isActive("/")}`}>
              <i className="bi bi-house-door me-2"></i>
              {!collapsed && <span>Home</span>}
            </Link>
          </li>
          <li className="nav-item w-100">
            <Link to="/books" className={`nav-link text-white px-3 ${isActive("/books")}`}>
              <i className="bi bi-book me-2"></i>
              {!collapsed && <span>Books</span>}
            </Link>
          </li>

          {/* Show only if user is authenticated */}
          {isAuthenticated && (
            <>
              <li className="nav-item w-100">
                <Link to="/dashboard" className={`nav-link text-white px-3 ${isActive("/dashboard")}`}>
                  <i className="bi bi-speedometer2 me-2"></i>
                  {!collapsed && <span>Dashboard</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/my-requests" className={`nav-link text-white px-3 ${isActive("/my-requests")}`}>
                  <i className="bi bi-bookmark me-2"></i>
                  {!collapsed && <span>My Requests</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/borrowed-books" className={`nav-link text-white px-3 ${isActive("/borrowed-books")}`}>
                  <i className="bi bi-collection me-2"></i>
                  {!collapsed && <span>Borrowed Books</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/profile" className={`nav-link text-white px-3 ${isActive("/profile")}`}>
                  <i className="bi bi-person-circle me-2"></i>
                  {!collapsed && <span>Profile</span>}
                </Link>
              </li>
            </>
          )}

          {/* Admin Links - Only visible if isAdmin is true */}
          {isAuthenticated && isAdmin && (
            <>
              <li className="nav-item w-100 mt-3">
                <div className={`${!collapsed ? "px-3 text-muted small" : "text-center"}`}>
                  {!collapsed ? "Admin" : <i className="bi bi-gear"></i>}
                </div>
              </li>
              <li className="nav-item w-100">
                <Link to="/admin" className={`nav-link text-white px-3 ${isActive("/admin")}`}>
                  <i className="bi bi-speedometer2 me-2"></i>
                  {!collapsed && <span>Admin Dashboard</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/admin/books" className={`nav-link text-white px-3 ${isActive("/admin/books")}`}>
                  <i className="bi bi-book-half me-2"></i>
                  {!collapsed && <span>Manage Books</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/admin/users" className={`nav-link text-white px-3 ${isActive("/admin/users")}`}>
                  <i className="bi bi-people me-2"></i>
                  {!collapsed && <span>Manage Users</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/admin/requests" className={`nav-link text-white px-3 ${isActive("/admin/requests")}`}>
                  <i className="bi bi-clipboard-check me-2"></i>
                  {!collapsed && <span>Manage Requests</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/admin/stats" className={`nav-link text-white px-3 ${isActive("/admin/stats")}`}>
                  <i className="bi bi-bar-chart-line me-2"></i>
                  {!collapsed && <span>Library Statistics</span>}
                </Link>
              </li>
            </>
          )}

          {/* Authentication Links */}
          {!isAuthenticated ? (
            <>
              <li className="nav-item w-100 mt-auto">
                <Link to="/login" className={`nav-link text-white px-3 ${isActive("/login")}`}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  {!collapsed && <span>Login</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link to="/register" className={`nav-link text-white px-3 ${isActive("/register")}`}>
                  <i className="bi bi-person-plus me-2"></i>
                  {!collapsed && <span>Register</span>}
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item w-100 mt-auto">
              <span
                className="nav-link text-white px-3"
                style={{ cursor: "pointer" }}
                onClick={handleLogout} // Use handleLogout instead of logout
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                {!collapsed && <span>Logout</span>}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
