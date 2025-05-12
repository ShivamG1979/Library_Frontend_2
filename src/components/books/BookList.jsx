import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBook } from '../../context/BookContext';
import BookCard from './BookCard';
import 'animate.css';
import { useAuth } from '../../context/AuthContext';

const BookList = () => {
  const { books, loading, error, getAllBooks } = useBook();
  const { isAuthenticated } = useAuth(); // Check authentication status
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const navigate = useNavigate();
  const location = useLocation();
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page')) || 1;
    const search = query.get('search') || '';

    setCurrentPage(page);
    setSearchTerm(search);
  }, [location.search]);

  useEffect(() => {
    if (isAuthenticated) {
      setRandomBooks([]); // Clear random books if authenticated
    } else {
      // Show 8 random books when not logged in
      const shuffledBooks = [...books].sort(() => 0.5 - Math.random());
      setRandomBooks(shuffledBooks.slice(0, 8));
    }
  }, [isAuthenticated, books]); // Re-run when books or authentication state changes

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = isAuthenticated ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook) : randomBooks;

  // Handle search change
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const query = new URLSearchParams();
    if (searchValue) query.set('search', searchValue);

    navigate({
      pathname: location.pathname,
      search: searchValue ? `?${query}` : ''
    });
  };

  // Pagination buttons
  const renderPaginationItems = () => {
    const items = [];
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    items.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
    );

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      items.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(i)}>{i}</button>
        </li>
      );
    }

    items.push(
      <li key="next" className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    );

    return items;
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
            onChange={handleSearch}
          />
        </div>
      </div>

      {books.length === 0 ? (
        <div className="alert alert-info">No books available</div>
      ) : filteredBooks.length === 0 && isAuthenticated ? (
        <div className="alert alert-warning">No books match your search</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {currentBooks.map((book, index) => (
              <div
                className="col animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                key={book._id}
              >
                <Link
                  to={`/books/${book._id}`}
                  className="text-decoration-none text-dark"
                >
                  <BookCard book={book} />
                </Link>
              </div>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Log in to see more books
              </button>
            </div>
          )}

          {isAuthenticated && (
            <div className="mt-4 text-center">
              <nav aria-label="Book pagination">
                <ul className="pagination justify-content-center mb-4">
                  {renderPaginationItems()}
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookList;
