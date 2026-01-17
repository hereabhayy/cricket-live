import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🏏</span>
          <span className="logo-text">Cricket Live</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Live Matches
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
