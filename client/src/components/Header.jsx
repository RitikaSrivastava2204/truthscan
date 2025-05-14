import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TruthScan</Link>
      </div>

      {/* Navigation Links */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/features" onClick={toggleMenu}>Key Features</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login / Signup</Link></li>
          <li><Link to="/start-detecting" className="start-detecting-link" onClick={toggleMenu}>Start Detecting</Link></li>
        </ul>
      </nav>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
