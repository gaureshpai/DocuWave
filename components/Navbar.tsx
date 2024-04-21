import React from 'react';
import '../public/styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#" className="navbar-logo">PDF-Reader</a>
      </div>
      <div className="navbar-right">
        <div className="dropdown">
          <button type="button" className="dropbtn">Links</button>
          <div className="dropdown-content">
            <a href="https://github.com/gaureshpai">GitHub</a>
            <a href="https://linkedin.com/in/gaureshpai">LinkedIn</a>
            <a href="https://twitter.com/hseruag">Twitter</a>
            <a href="https://youtube.com/@hseruag">YouTube</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
