// src/components/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const {
    getLibraryStatistics,
    statistics,
    loading,
    getPendingRequests,
    pendingRequests,
  } = useAdmin();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    getLibraryStatistics();
    getPendingRequests();
  }, []);

  // Calculate days overdue function
  const calculateDaysOverdue = (dueDate) => {
    return Math.ceil((new Date() - new Date(dueDate)) / (1000 * 60 * 60 * 24));
  };

  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  if (loading || !statistics) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div
          className={`col-auto px-0 bg-dark text-white ${
            sidebarCollapsed ? "sidebar-collapsed" : ""
          }`}
          style={{
            width: sidebarCollapsed ? "4.5rem" : "250px",
            transition: "width 0.3s",
          }}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100 sticky-top">
            <div className="w-100 d-flex justify-content-between align-items-center px-3 py-3 border-bottom border-secondary">
              {!sidebarCollapsed && (
                <span className="fs-5 d-none d-sm-inline fw-bold">
                  Admin Panel
                </span>
              )}
              <button
                className="btn btn-sm btn-dark"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <i
                  className={`bi bi-${
                    sidebarCollapsed ? "chevron-right" : "chevron-left"
                  }`}
                ></i>
              </button>
            </div>

            <ul className="nav nav-pills flex-column mb-auto w-100 mt-2">
              <li className="nav-item w-100">
                <Link
                  to="/admin"
                  className={`nav-link text-white px-3 ${isActive("/admin")}`}
                >
                  <i className="bi bi-speedometer2 me-2"></i>
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link
                  to="/admin/books"
                  className={`nav-link text-white px-3 ${isActive(
                    "/admin/books"
                  )}`}
                >
                  <i className="bi bi-book-half me-2"></i>
                  {!sidebarCollapsed && <span>Manage Books</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link
                  to="/admin/users"
                  className={`nav-link text-white px-3 ${isActive(
                    "/admin/users"
                  )}`}
                >
                  <i className="bi bi-people me-2"></i>
                  {!sidebarCollapsed && <span>Manage Users</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link
                  to="/admin/requests"
                  className={`nav-link text-white px-3 ${isActive(
                    "/admin/requests"
                  )}`}
                >
                  <i className="bi bi-clipboard-check me-2"></i>
                  {!sidebarCollapsed && <span>Manage Requests</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link
                  to="/admin/stats"
                  className={`nav-link text-white px-3 ${isActive(
                    "/admin/stats"
                  )}`}
                >
                  <i className="bi bi-bar-chart-line me-2"></i>
                  {!sidebarCollapsed && <span>Library Statistics</span>}
                </Link>
              </li>
              <li className="nav-item w-100">
                <Link
                  to="/profile"
                  className={`nav-link text-white px-3 ${isActive("/profile")}`}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {!sidebarCollapsed && <span>Profile</span>}
                </Link>
              </li>
              <li className="nav-item w-100 mt-2">
                <Link to="/" className="nav-link text-white px-3">
                  <i className="bi bi-house-door me-2"></i>
                  {!sidebarCollapsed && <span>Back to Site</span>}
                </Link>
              </li>
              <li className="nav-item w-100 mt-2">
                <span
                  className="nav-link text-white px-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  {!sidebarCollapsed && <span>Logout</span>}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="col py-3"
          style={{
            marginLeft: sidebarCollapsed ? "4.5rem" : "250px",
            transition: "margin-left 0.3s",
          }}
        >
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col">
                <h2 className="mb-4">Admin Dashboard</h2>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-primary h-100">
                  <div className="card-header">Books</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title display-4">
                          {statistics.totalBooks}
                        </h5>
                        <p className="card-text">Total Books</p>
                      </div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-book fs-1"></i>
                      </div>
                    </div>
                    <hr className="my-2 opacity-50" />
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="badge bg-light text-primary fs-6">
                          {statistics.availableBooks}
                        </span>
                        <p className="small mb-0">Available</p>
                      </div>
                      <div>
                        <span className="badge bg-light text-primary fs-6">
                          {statistics.borrowedBooks}
                        </span>
                        <p className="small mb-0">Borrowed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card text-white bg-success h-100">
                  <div className="card-header">Users</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title display-4">
                          {statistics.totalUsers}
                        </h5>
                        <p className="card-text">Total Users</p>
                      </div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-people fs-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="card text-white bg-warning h-100">
                  <div className="card-header">Requests</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title display-4">
                          {statistics.pendingRequests}
                        </h5>
                        <p className="card-text">Pending Requests</p>
                      </div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-clock-history fs-1"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Requests Table */}
            <div className="row mb-4">
              <div className="col">
                <div className="card shadow-sm">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Pending Requests</h5>
                    {pendingRequests.length > 0 && (
                      <span className="badge bg-warning rounded-pill">
                        {pendingRequests.length}
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    {pendingRequests.length > 0 ? (
                      <>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Book</th>
                                <th>User</th>
                                <th>Request Date</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingRequests.slice(0, 5).map((request) => (
                                <tr key={request._id}>
                                  <td>{request.book.title}</td>
                                  <td>{request.user.username}</td>
                                  <td>
                                    {new Date(
                                      request.requestDate
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <Link
                                      to="/admin/requests"
                                      className="btn btn-sm btn-outline-primary"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {pendingRequests.length > 5 && (
                          <div className="text-center mt-3">
                            <Link
                              to="/admin/requests"
                              className="btn btn-outline-warning"
                            >
                              View All Pending Requests
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-center py-3 text-muted">
                        No pending requests
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Books Due Soon Table */}
            <div className="row mb-4">
              <div className="col">
                <div className="card shadow-sm">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Books Due Soon</h5>
                    {statistics.booksDueSoon && (
                      <span className="badge bg-info rounded-pill">
                        {statistics.booksDueSoon.length}
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    {statistics.booksDueSoon &&
                    statistics.booksDueSoon.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Book</th>
                              <th>Borrowed By</th>
                              <th>Due Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {statistics.booksDueSoon
                              .slice(0, 5)
                              .map((request) => (
                                <tr key={request._id}>
                                  <td>{request.book.title}</td>
                                  <td>{request.user.username}</td>
                                  <td>
                                    {new Date(
                                      request.dueDate
                                    ).toLocaleDateString()}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center py-3 text-muted">
                        No books due soon
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Overdue Books Table */}
            <div className="row mb-4">
              <div className="col">
                <div className="card shadow-sm">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Overdue Books</h5>
                    {statistics.overdueBooks && (
                      <span className="badge bg-danger rounded-pill">
                        {statistics.overdueBooks.length}
                      </span>
                    )}
                  </div>
                  <div className="card-body">
                    {statistics.overdueBooks &&
                    statistics.overdueBooks.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Book</th>
                              <th>Borrowed By</th>
                              <th>Due Date</th>
                              <th>Days Overdue</th>
                            </tr>
                          </thead>
                          <tbody>
                            {statistics.overdueBooks
                              .slice(0, 5)
                              .map((request) => (
                                <tr key={request._id} className="table-danger">
                                  <td>{request.book.title}</td>
                                  <td>{request.user.username}</td>
                                  <td>
                                    {new Date(
                                      request.dueDate
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    <span className="badge bg-danger">
                                      {calculateDaysOverdue(request.dueDate)}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center py-3 text-muted">
                        No overdue books
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
