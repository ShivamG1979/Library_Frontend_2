// src/components/layout/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBook } from '../../context/BookContext';
import BookCard from '../books/BookCard';

const HomePage = () => {
  const { books, loading, error, getAllBooks } = useBook();
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      // Get 4 random books for featured section
      const shuffled = [...books].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(4, books.length));
      setFeaturedBooks(selected);
    }
  }, [books]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <>
     {/* Hero Section */}
<div className="bg-primary text-white py-5 "> {/* Add mt-5 here */}
  <div className="container">
    <div className="row">
      <div className="col-md-8">
        <h1 className="display-5 fw-bold mb-3">Welcome to BookNook Library</h1>
        <p className="lead mb-4">
          Your digital gateway to a world of knowledge. Explore thousands of books at our library.
        </p>
        <div className="d-flex gap-3">
          <Link to="/books" className="btn btn-light">
            Explore Books
          </Link>
          <Link to="/register" className="btn btn-outline-light">
            Join Free
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>


      <div className="container my-5">
        {/* Featured Books Section */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Books</h2>
            <Link to="/books" className="btn btn-outline-primary">View All</Link>
          </div>

          {books.length === 0 ? (
            <div className="alert alert-info">
              No books available at the moment. Check back soon!
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
              {featuredBooks.map(book => (
                <div className="col" key={book._id}>
                  <Link 
                    to={`/books/${book._id}`} 
                    className="text-decoration-none"
                  >
                    <BookCard book={book} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
{/* How It Works - Simple Version */}
        <section className="mb-5">
          <h2 className="text-center mb-4">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="bi bi-person-plus fs-2 text-primary mb-3"></i>
                  <h5>1. Sign Up</h5>
                  <p className="card-text">Create your free account</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="bi bi-search fs-2 text-primary mb-3"></i>
                  <h5>2. Browse</h5>
                  <p className="card-text">Find your favorite books</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="bi bi-hand-index fs-2 text-primary mb-3"></i>
                  <h5>3. Request</h5>
                  <p className="card-text">Submit a borrowing request</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <i className="bi bi-book fs-2 text-primary mb-3"></i>
                  <h5>4. Read & Return</h5>
                  <p className="card-text">Enjoy and return on time</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="bg-light p-4 text-center mb-5 rounded">
          <h2 className="mb-3">Ready to Start Reading?</h2>
          <p className="mb-4">
            Create an account to borrow books and track your reading progress.
          </p>
          <div>
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              Register
            </Link>
          </div>
        </section>

        
      </div>
    </>
  );
};

export default HomePage;