// src/components/books/BookDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import BookRequest from './BookRequest';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, book, loading, error } = useBook();
  const { isAuthenticated } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    getBookById(id);
  }, [id]);

  const handleRequestClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowRequestForm(true);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Book not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Books</a></li>
          <li className="breadcrumb-item active" aria-current="page">{book.title}</li>
        </ol>
      </nav>
      
      <h2 className="mb-4">{book.title}</h2>
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="bg-light d-flex align-items-center justify-content-center rounded shadow" style={{ height: '400px', overflow: 'hidden' }}>
            <img 
              src={book.image || 'https://placehold.co/300x400?text=No+Image'} 
              alt={book.title} 
              className="img-fluid h-100"
              style={{ objectFit: 'contain', maxWidth: '100%' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/300x400?text=No+Image';
              }}
            />
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Book Details</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Author:</strong> {book.author}
                </li>
                <li className="list-group-item">
                  <strong>Year:</strong> {book.year}
                </li>
                <li className="list-group-item">
                  <strong>Availability:</strong> 
                  <span className={`ms-2 badge ${book.available ? 'bg-success' : 'bg-danger'}`}>
                    {book.available ? 'Available' : 'Not Available'}
                  </span>
                </li>
              </ul>

              {book.available && (
                <div className="mt-4">
                  <button 
                    className="btn btn-primary" 
                    onClick={handleRequestClick}
                  >
                    Request Book
                  </button>
                </div>
              )}

              {showRequestForm && (
                <div className="mt-4">
                  <BookRequest bookId={id} setShowRequestForm={setShowRequestForm} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
