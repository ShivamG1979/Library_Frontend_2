// src/components/user/UserDashboard.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBook } from '../../context/BookContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const { borrowedBooks, userRequests, getUserBorrowedBooks, getUserRequests } = useBook();

  useEffect(() => {
    getUserBorrowedBooks();
    getUserRequests();
  }, []);

  const pendingRequests = userRequests.filter(req => req.status === 'pending');

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-1">Dashboard</h2>
          <h3 className="text-muted mb-4">Welcome, {user.username}</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h4 className="mb-0">Your Borrowed Books</h4>
              <span className="badge bg-primary rounded-pill">{borrowedBooks.length}</span>
            </div>
            <div className="card-body">
              {borrowedBooks.length > 0 ? (
                <>
                  {borrowedBooks.slice(0, 3).map(request => (
                    <div key={request._id} className="mb-3 border-bottom pb-3">
                      <h5 className="card-title">{request.book.title}</h5>
                      <p className="card-text">
                        Due Date: <span className="text-danger fw-bold">
                          {new Date(request.dueDate).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  ))}
                  {borrowedBooks.length > 3 && (
                    <div className="text-center mt-3">
                      <Link to="/borrowed-books" className="btn btn-outline-primary btn-sm">
                        View All Borrowed Books
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <p className="card-text text-center py-4">You haven't borrowed any books yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
              <h4 className="mb-0">Your Pending Requests</h4>
              <span className="badge bg-warning rounded-pill">{pendingRequests.length}</span>
            </div>
            <div className="card-body">
              {pendingRequests.length > 0 ? (
                <>
                  {pendingRequests.slice(0, 3).map(request => (
                    <div key={request._id} className="mb-3 border-bottom pb-3">
                      <h5 className="card-title">{request.book.title}</h5>
                      <p className="card-text">
                        Status: <span className="badge bg-warning text-dark">Pending</span>
                      </p>
                    </div>
                  ))}
                  {pendingRequests.length > 3 && (
                    <div className="text-center mt-3">
                      <Link to="/my-requests" className="btn btn-outline-warning btn-sm">
                        View All Requests
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <p className="card-text text-center py-4">You don't have any pending requests.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h4 className="mb-0">Quick Links</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 col-6 mb-3">
                  <Link to="/" className="btn btn-outline-primary w-100 h-100 d-flex flex-column justify-content-center align-items-center py-3">
                    <i className="bi bi-book fs-4 mb-2"></i>
                    Browse Books
                  </Link>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <Link to="/borrowed-books" className="btn btn-outline-success w-100 h-100 d-flex flex-column justify-content-center align-items-center py-3">
                    <i className="bi bi-journal-bookmark fs-4 mb-2"></i>
                    My Books
                  </Link>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <Link to="/my-requests" className="btn btn-outline-warning w-100 h-100 d-flex flex-column justify-content-center align-items-center py-3">
                    <i className="bi bi-card-list fs-4 mb-2"></i>
                    My Requests
                  </Link>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <Link to="/profile" className="btn btn-outline-info w-100 h-100 d-flex flex-column justify-content-center align-items-center py-3">
                    <i className="bi bi-person-circle fs-4 mb-2"></i>
                    My Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;