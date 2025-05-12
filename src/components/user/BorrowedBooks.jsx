// src/components/user/BorrowedBooks.jsx
import { useEffect } from 'react';
import { useBook } from '../../context/BookContext';

const BorrowedBooks = () => {
  const { borrowedBooks, getUserBorrowedBooks, loading, error } = useBook();

  useEffect(() => {
    getUserBorrowedBooks();
  }, []);

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
      <h2 className="mb-4 text-black">My Borrowed Books</h2>
      
      {borrowedBooks.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          You have no borrowed books.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Book</th>
                  <th>Borrowed Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map(request => {
                  const isOverdue = new Date(request.dueDate) < new Date();
                  
                  return (
                    <tr key={request.id}>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="fw-bold">{request.book.title}</span>
                          <small className="text-muted">by {request.book.author}</small>
                        </div>
                      </td>
                      <td>{new Date(request.approvalDate).toLocaleDateString()}</td>
                      <td>
                        <div className={isOverdue ? "text-danger" : ""}>
                          {new Date(request.dueDate).toLocaleDateString()}
                          {isOverdue && ' (Overdue)'}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;