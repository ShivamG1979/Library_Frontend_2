// src/components/admin/ManageUsers.jsx
import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

const ManageUsers = () => {
  const { users, getAllUsers, addUser, updateUser, deleteUser, loading, error } = useAdmin();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const success = await addUser(formData);
    if (success) {
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'user'
      });
      setShowAddForm(false);
      setSuccessMessage('User added successfully');
      getAllUsers();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { password, ...updateData } = formData;
    // Only include password if it was provided
    if (password) {
      updateData.password = password;
    }
    
    const success = await updateUser(editId, updateData);
    if (success) {
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'user'
      });
      setShowEditForm(false);
      setEditId(null);
      setSuccessMessage('User updated successfully');
      getAllUsers();
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Don't set password for security
      role: user.role
    });
    setEditId(user._id);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const success = await deleteUser(id);
      if (success) {
        setSuccessMessage('User deleted successfully');
        getAllUsers();
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Users</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className={`btn ${showAddForm ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false);
            setSuccessMessage('');
          }}
        >
          {showAddForm ? 'Cancel' : 'Add New User'}
        </button>
        
        {!showAddForm && !showEditForm && (
          <div className="w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search users..."
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
              <h3 className="card-title mb-3">Add New User</h3>
              
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <button type="submit" className="btn btn-success">Add User</button>
            </form>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleEditSubmit}>
              <h3 className="card-title mb-3">Edit User</h3>
              
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
                <div className="form-text">Leave blank to keep current password</div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-warning">Update User</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditId(null);
                    setFormData({
                      username: '',
                      email: '',
                      password: '',
                      role: 'user'
                    });
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
          ) : filteredUsers.length === 0 ? (
            <div className="alert alert-info">No users found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-info" onClick={() => handleEdit(user)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default ManageUsers;