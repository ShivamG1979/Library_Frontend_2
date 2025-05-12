import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBook } from '../../context/BookContext';
import BookCard from './BookCard';
import 'animate.css';
import { useAuth } from '../../context/AuthContext';

const BookList = () => {
  const { books, loading, error, getAllBooks } = useBook();
  const { isAuthenticated } = useAuth();
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
      setRandomBooks([]);
    } else {
      const shuffledBooks = [...books].sort(() => 0.5 - Math.random());
      setRandomBooks(shuffledBooks.slice(0, 8));
    }
  }, [isAuthenticated, books]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = isAuthenticated ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook) : randomBooks;

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

  const renderPaginationItems = () => {
    const items = [];
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    items.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link custom-page-link"
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
    );

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      items.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active-page' : ''}`}>
          <button 
            className="page-link custom-page-link" 
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    items.push(
      <li key="next" className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
        <button
          className="page-link custom-page-link"
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
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-secondary">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">Available Books</h2>
        {isAuthenticated && (
          <div className="d-flex">
            <input
              type="text"
              className="form-control border-secondary"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        )}
      </div>

      {books.length === 0 ? (
        <div className="alert alert-secondary">No books available</div>
      ) : filteredBooks.length === 0 && isAuthenticated ? (
        <div className="alert alert-secondary">No books match your search</div>
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

          {isAuthenticated && (
            <div className="mt-4 text-center">
              <nav aria-label="Book pagination">
                <ul className="pagination justify-content-center mb-4 custom-pagination">
                  {renderPaginationItems()}
                </ul>
              </nav>
            </div>
          )}
        </>
      )}

      {!isAuthenticated && (
        <div className="text-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            <h3>Log in to see more books</h3>
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;