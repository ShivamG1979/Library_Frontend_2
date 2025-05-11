// src/components/admin/LibraryStats.jsx
import { useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

const LibraryStats = () => {
  const { getLibraryStatistics, statistics, loading, error } = useAdmin();

  useEffect(() => {
    getLibraryStatistics();
  }, []);

  if (loading || !statistics) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Library Statistics</h2>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title h5 mb-0">Book Statistics</h3>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td className="fw-bold">Total Books:</td>
                    <td>{statistics.totalBooks}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Available Books:</td>
                    <td>{statistics.availableBooks}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Borrowed Books:</td>
                    <td>{statistics.borrowedBooks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="card-title h5 mb-0">User Statistics</h3>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td className="fw-bold">Total Users:</td>
                    <td>{statistics.totalUsers}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Active Borrowers:</td>
                    <td>{statistics.activeBorrowers}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h3 className="card-title h5 mb-0">Activity Statistics</h3>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td className="fw-bold">Pending Requests:</td>
                    <td>{statistics.pendingRequests}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Books Borrowed This Month:</td>
                    <td>{statistics.borrowedThisMonth}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Books Returned This Month:</td>
                    <td>{statistics.returnedThisMonth}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header bg-warning">
          <h3 className="card-title h5 mb-0">Overdue Books</h3>
        </div>
        <div className="card-body">
          {statistics.overdueBooks && statistics.overdueBooks.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Book</th>
                    <th>Borrowed By</th>
                    <th>Due Date</th>
                    <th>Days Overdue</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.overdueBooks.map(request => {
                    const daysOverdue = Math.ceil(
                      (new Date() - new Date(request.dueDate)) / (1000 * 60 * 60 * 24)
                    );
                    
                    return (
                      <tr key={request._id}>
                        <td>{request.book.title}</td>
                        <td>{request.user.username}</td>
                        <td>{new Date(request.dueDate).toLocaleDateString()}</td>
                        <td className="text-danger fw-bold">{daysOverdue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-success fw-bold mb-0">No overdue books</p>
          )}
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h3 className="card-title h5 mb-0">Popular Books</h3>
        </div>
        <div className="card-body">
          {statistics.popularBooks && statistics.popularBooks.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Book</th>
                    <th>Borrow Count</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.popularBooks.map(book => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.borrowCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mb-0">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryStats;