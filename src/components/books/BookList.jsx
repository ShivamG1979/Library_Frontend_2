// src/components/books/BookList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBook } from '../../context/BookContext';
import BookCard from './BookCard';

const BookList = () => {
  const { books, loading, error, getAllBooks } = useBook();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="container mt-4">
        <div className="alert alert-danger">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Books</h2>
        <div className="w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {books.length === 0 ? (
        <div className="alert alert-info">No books available</div>
      ) : filteredBooks.length === 0 ? (
        <div className="alert alert-warning">No books match your search</div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredBooks.map(book => (
            <div className="col" key={book._id}>
              <Link 
                to={`/books/${book._id}`} 
                className="text-decoration-none text-dark"
              >
                <BookCard book={book} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;