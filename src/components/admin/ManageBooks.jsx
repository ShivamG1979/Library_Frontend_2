// src/components/admin/ManageBooks.jsx
import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

const ManageBooks = () => {
  const {
    adminBooks,
    getAllBooksAdmin,
    addBook,
    updateBook,
    deleteBook,
    loading,
    error
  } = useAdmin();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    image: ''
  });
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllBooksAdmin();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const success = await addBook(formData);
    if (success) {
      setFormData({ title: '', author: '', year: '', image: '' });
      setShowAddForm(false);
      setSuccessMessage('Book added successfully');
      getAllBooksAdmin();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const success = await updateBook(editId, formData);
    if (success) {
      setFormData({ title: '', author: '', year: '', image: '' });
      setShowEditForm(false);
      setEditId(null);
      setSuccessMessage('Book updated successfully');
      getAllBooksAdmin();
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year,
      image: book.image
    });
    setEditId(book._id);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const success = await deleteBook(id);
      if (success) {
        setSuccessMessage('Book deleted successfully');
        getAllBooksAdmin();
      }
    }
  };

  const filteredBooks = adminBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Books</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="d-flex justify-content-between mb-4">
        <button
          className={`btn ${showAddForm ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false);
            setSuccessMessage('');
            setFormData({ title: '', author: '', year: '', image: '' });
          }}
        >
          {showAddForm ? 'Cancel' : 'Add New Book'}
        </button>

        {!showAddForm && !showEditForm && (
          <div className="w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleAddSubmit}>
              <h4 className="card-title mb-3">Add Book</h4>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <input 
                  type="text" 
                  name="author" 
                  className="form-control" 
                  value={formData.author} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Year</label>
                <input 
                  type="number" 
                  name="year" 
                  className="form-control" 
                  value={formData.year} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input 
                  type="text" 
                  name="image" 
                  className="form-control" 
                  value={formData.image} 
                  onChange={handleChange} 
                />
              </div>
              <button type="submit" className="btn btn-success">Add Book</button>
            </form>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleEditSubmit}>
              <h4 className="card-title mb-3">Edit Book</h4>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <input 
                  type="text" 
                  name="author" 
                  className="form-control" 
                  value={formData.author} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Year</label>
                <input 
                  type="number" 
                  name="year" 
                  className="form-control" 
                  value={formData.year} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input 
                  type="text" 
                  name="image" 
                  className="form-control" 
                  value={formData.image} 
                  onChange={handleChange} 
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-warning">Update Book</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditId(null);
                    setFormData({ title: '', author: '', year: '', image: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showAddForm && !showEditForm && (
        <>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="alert alert-info">No books found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year}</td>
                      <td>
                        <span className={`badge ${book.available ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {book.available ? 'Available' : 'Borrowed'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-info" onClick={() => handleEdit(book)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageBooks;