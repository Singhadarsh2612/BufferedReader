import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage1 from '/cse.png';
import "./Navbar.css";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isSticky, setIsSticky] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 115);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`Topnav ${isSticky ? 'sticky' : ''}`}>
      <div className="logo">
        <a href="https://cses.iitism.ac.in/" target="_blank" rel="noopener noreferrer">
          <img src={logoImage1} alt="CSE Logo" />
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className={`nav-group ${isMobile ? 'desktop-only' : ''}`}>
        <div className="nav-basic11">
          <Link to="/" className="nav-link active" onClick={closeMenu}>
            Home
            <div className="active-indicator"></div>
          </Link>
          <Link to="/teams" className="nav-link" onClick={closeMenu}>Teams</Link>
        </div>
        <div className="nav-special">
          <Link to="/bytestreams" className="nav-link highlight bytestreams" onClick={closeMenu}>
            Bytestreams
          </Link>
          <Link to="/buffered-readers" className="nav-link highlight buffered-readers" onClick={closeMenu}>
            Buffered Readers
          </Link>
        </div>
        <div className="nav-about">
          <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
        </div>
      </div>

      {/* Hamburger Icon */}
      {isMobile && (
        <div className="hamburger-icon" onClick={toggleMenu} aria-label="Menu">
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      )}

      {/* Dropdown Menu */}
      {isMobile && (
        <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="menu-content">
            <Link to="/" className="menu-link" onClick={closeMenu}>Home</Link>
            <Link to="/teams" className="menu-link" onClick={closeMenu}>Teams</Link>
            <Link to="/bytestreams" className="menu-link highlight" onClick={closeMenu}>Bytestreams</Link>
            <Link to="/buffered-readers" className="menu-link highlight" onClick={closeMenu}>Buffered Readers</Link>
            <Link to="/about" className="menu-link" onClick={closeMenu}>About Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
