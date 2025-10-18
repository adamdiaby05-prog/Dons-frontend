import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
                  <Link to="/" className="logo">
                    <div className="logo-container">
                      <img src="/images/ad.png" alt="ADM Logo" className="logo-image" />
                    </div>
                  </Link>
          
          <div className="header-icon">
            <img src="/images/shield.png" alt="Shield" className="shield-icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
