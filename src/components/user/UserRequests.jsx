// src/components/user/UserRequests.jsx
import { useEffect } from 'react';
import { useBook } from '../../context/BookContext';

const UserRequests = () => {
  const { userRequests, getUserRequests, loading, error } = useBook();

  useEffect(() => {
    getUserRequests();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'approved':
        return <span className="badge bg-success">Approved</span>;
      case 'rejected':
        return <span className="badge bg-danger">Rejected</span>;
      case 'returned':
        return <span className="badge bg-info">Returned</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">My Book Requests</h2>
      
      {userRequests.length === 0 ? (
        <div className="alert alert-info" role="alert">
          You have no book requests.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Book</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.map(request => (
                  <tr key={request.id}>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="fw-bold">{request.book.title}</span>
                        <small className="text-muted">by {request.book.author}</small>
                      </div>
                    </td>
                    <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                    <td>{getStatusBadge(request.status)}</td>
                    <td>
                      {request.dueDate
                        ? new Date(request.dueDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRequests;