import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

const BookRequestsManager = () => {
  const { 
    bookRequests, 
    getAllBookRequests, 
    approveBookRequest, 
    rejectBookRequest, 
    processBookReturn,
    loading, 
    error 
  } = useAdmin();
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [dueDateForm, setDueDateForm] = useState({
    requestId: null,
    dueDate: ''
  });

  useEffect(() => {
    getAllBookRequests();
  }, []);

  const handleApprove = async (requestId) => {
    setDueDateForm({
      requestId,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
    });
  };

  const handleSubmitDueDate = async (e) => {
    e.preventDefault();
    const success = await approveBookRequest(dueDateForm.requestId, dueDateForm.dueDate);
    if (success) {
      setSuccessMessage(`Request approved with due date: ${new Date(dueDateForm.dueDate).toLocaleDateString()}`);
      setDueDateForm({ requestId: null, dueDate: '' });
      getAllBookRequests();
    }
  };

  const handleReject = async (requestId) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      const success = await rejectBookRequest(requestId);
      if (success) {
        setSuccessMessage('Request rejected successfully');
        getAllBookRequests();
      }
    }
  };

  const handleReturn = async (requestId) => {
    if (window.confirm('Mark this book as returned?')) {
      const success = await processBookReturn(requestId);
      if (success) {
        setSuccessMessage('Book return processed successfully');
        getAllBookRequests();
      }
    }
  };

  const filteredRequests = bookRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Book Requests</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      {dueDateForm.requestId && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmitDueDate}>
              <h3 className="card-title">Set Due Date</h3>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDateForm.dueDate}
                  onChange={(e) => setDueDateForm({...dueDateForm, dueDate: e.target.value})}
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">Approve Request</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setDueDateForm({ requestId: null, dueDate: '' })}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="mb-3">
        <label className="form-label me-2">Filter by Status:</label>
        <select 
          className="form-select d-inline-block w-auto" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="returned">Returned</option>
        </select>
      </div>
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="alert alert-info">No requests found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Book</th>
                <th>User</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request._id}>
                  <td>{request.book.title}</td>
                  <td>{request.user.username}</td>
                  <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${
                      request.status === 'approved' ? 'bg-success' :
                      request.status === 'pending' ? 'bg-warning text-dark' :
                      request.status === 'rejected' ? 'bg-danger' :
                      request.status === 'returned' ? 'bg-secondary' : 'bg-secondary'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.dueDate 
                      ? new Date(request.dueDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    {request.status === 'pending' && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-success" onClick={() => handleApprove(request._id)}>
                          Approve
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleReject(request._id)}>
                          Reject
                        </button>
                      </div>
                    )}
                    {request.status === 'approved' && (
                      <button className="btn btn-sm btn-secondary" onClick={() => handleReturn(request._id)}>
                        Process Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookRequestsManager;
