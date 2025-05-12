import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBook } from '../../context/BookContext';
import BookCard from './BookCard';
import 'animate.css';

const BookList = () => {
  const { books, loading, error, getAllBooks } = useBook();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const navigate = useNavigate();
  const location = useLocation();

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

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => {
    const query = new URLSearchParams();
    if (pageNumber !== 1) query.set('page', pageNumber);
    if (searchTerm) query.set('search', searchTerm);

    const queryString = query.toString();
    navigate({
      pathname: location.pathname,
      search: queryString ? `?${queryString}` : ''
    });
  };

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

    items.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
    );

    if (currentPage > 3) {
      items.push(
        <li key="1" className="page-item">
          <button className="page-link" onClick={() => paginate(1)}>1</button>
        </li>
      );

      if (currentPage > 4) {
        items.push(
          <li key="ellipsis1" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      items.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => paginate(i)}>{i}</button>
        </li>
      );
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        items.push(
          <li key="ellipsis2" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      items.push(
        <li key={totalPages} className="page-item">
          <button className="page-link" onClick={() => paginate(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    items.push(
      <li key="next" className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
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
      ) : filteredBooks.length === 0 ? (
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

          <div className="mt-4 text-center">
            <nav aria-label="Book pagination">
              <ul className="pagination justify-content-center mb-4">
                {renderPaginationItems()}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;
