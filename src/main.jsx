import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { AdminProvider } from './context/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Add custom styles here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <BookProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </BookProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
