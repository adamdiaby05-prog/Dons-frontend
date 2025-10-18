import React from 'react';
import { Link } from 'react-router-dom';
import './NetworkPage.css';

const NetworkPage: React.FC = () => {
  return (
    <div className="network-page">
      {/* Header avec bouton retour et titre */}
      <header className="network-header">
        <div className="header-content">
          <Link to="/" className="back-button">
            ←
          </Link>
          <h1 className="page-title">Réseau</h1>
        </div>
        <div className="header-line"></div>
      </header>

      {/* Contenu principal */}
      <main className="network-content">
        <p className="instruction-text">Choisissez votre reseau</p>
        
        <div className="network-options">
          {/* MTN MoMo */}
          <Link to="/numero?network=mtn" className="network-option mtn-momo">
            <div className="option-icon mtn-icon">
              <img src="/images/mtn.jpg" alt="MTN" className="network-logo" />
            </div>
            <span className="option-text">MTN MoMo</span>
          </Link>

          {/* MOOV Money */}
          <Link to="/numero?network=moov" className="network-option moov-money">
            <div className="option-icon moov-icon">
              <img src="/images/moov.jpg" alt="MOOV" className="network-logo" />
            </div>
            <span className="option-text">MOOV Money</span>
          </Link>

          {/* ORANGE Money */}
          <Link to="/numero?network=orange" className="network-option orange-money">
            <div className="option-icon orange-icon">
              <img src="/images/orange.jpg" alt="ORANGE" className="network-logo" />
            </div>
            <span className="option-text">ORANGE Money</span>
          </Link>

          {/* WAVE CI */}
          <Link to="/numero?network=wave" className="network-option wace-ci">
            <div className="option-icon wace-icon">
              <img src="/images/Wave.jpg" alt="WAVE" className="network-logo" />
            </div>
            <span className="option-text">WAVE CI</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NetworkPage;
