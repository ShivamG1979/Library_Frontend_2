// src/components/books/BookCard.jsx
const BookCard = ({ book }) => {
  return (
    <div className="card h-100 shadow-sm border-0 hover-effect">
      <div 
        className="card-img-top d-flex align-items-center justify-content-center bg-light"
        style={{ height: '300px', overflow: 'hidden' }}
      >
        <img 
          src={book.image || 'https://placehold.co/300x200?text=No+Image'} 
          alt={book.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate mb-2">{book.title}</h5>
        <p className="card-text mb-1">
          <i className="bi bi-person me-2"></i>
          <small className="text-muted">Author: {book.author}</small>
        </p>
        <p className="card-text mb-2">
          <i className="bi bi-calendar me-2"></i>
          <small className="text-muted">Year: {book.year}</small>
        </p>
        <div className="mt-auto">
          <span className={`badge px-3 py-2 ${book.available ? 'bg-success' : 'bg-danger'}`}>
            {book.available ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
