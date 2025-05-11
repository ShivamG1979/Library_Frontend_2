// src/components/books/BookRequest.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBook } from '../../context/BookContext';

const BookRequest = ({ bookId, setShowRequestForm }) => {
  const { requestBook, loading, error } = useBook();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await requestBook(bookId);
    if (result) {
      setShowRequestForm(false);
      navigate('/my-requests');
    }
  };

  return (
    <div className="card border-light">
      <div className="card-body">
        <h5 className="card-title">Request Book</h5>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <p className="card-text">Are you sure you want to request this book?</p>
          
          <div className="d-flex gap-2">
            <button 
              type="submit" 
              className="btn btn-success" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : 'Confirm Request'}
            </button>
            
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setShowRequestForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookRequest;