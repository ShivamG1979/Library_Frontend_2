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
      const shuffled = [...books].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(4, books.length));
      setFeaturedBooks(selected);
    }
  }, [books]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border text-secondary" role="status" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="min-vh-100 bg-soft-light">
      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold text-dark mb-4">Discover Your Next Read</h1>
            <p className="lead text-muted mb-5">
              Explore a world of stories, knowledge, and imagination. Your digital library awaits.
            </p>
            <div className="d-flex gap-3">
              <Link to="/books" className="btn btn-dark">
                Browse Library
              </Link>
              <Link to="/register" className="btn btn-outline-dark">
                Get Started
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <img 
              src="/image1.webp" 
              alt="Library illustration" 
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold">Featured Books</h2>
          <Link to="/books" className="btn btn-outline-dark">View All</Link>
        </div>
        
        {books.length === 0 ? (
          <div className="alert alert-info text-center">
            No books available. Check back soon!
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {featuredBooks.map(book => (
              <div key={book._id} className="col">
                <Link to={`/books/${book._id}`} className="text-decoration-none">
                  <BookCard book={book} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Steps */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">How It Works</h2>
          <div className="row g-4">
            {[
              { icon: 'bi-person-plus', title: 'Sign Up', desc: 'Create your account' },
              { icon: 'bi-search', title: 'Explore', desc: 'Find your perfect book' },
              { icon: 'bi-hand-index', title: 'Borrow', desc: 'Request your book' },
              { icon: 'bi-book', title: 'Enjoy', desc: 'Read and return' }
            ].map((step, index) => (
              <div key={step.title} className="col-md-3">
                <div className="card border-0 text-center h-100 hover-lift">
                  <div className="card-body">
                    <i className={`bi ${step.icon} fs-2 text-secondary mb-3`}></i>
                    <h5 className="mb-2">{`${index + 1}. ${step.title}`}</h5>
                    <p className="text-muted">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container py-5 text-center">
        <div className="bg-dark text-white p-5 rounded-4">
          <h2 className="mb-4 fw-bold">Start Your Reading Journey</h2>
          <p className="lead mb-5">
            Join thousands of readers. Access unlimited books at your fingertips.
          </p>
          <div>
            <Link to="/login" className="btn btn-light me-3">Log In</Link>
            <Link to="/register" className="btn btn-outline-light">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
