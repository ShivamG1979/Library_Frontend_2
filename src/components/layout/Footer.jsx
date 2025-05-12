import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-3 ">
      <div className="container text-center">
        <p className="mb-0">© {year} BookNook Library. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
