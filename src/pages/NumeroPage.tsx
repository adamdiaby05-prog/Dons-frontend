import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NumeroPage.css';

const NumeroPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedNetwork = searchParams.get('network') || 'wave';
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Configuration des réseaux
  const networkConfig = {
    'mtn': {
      name: 'MTN MoMo',
      logo: '/images/mtn.jpg',
      color: '#fbbf24',
      bgColor: '#fef3c7'
    },
    'moov': {
      name: 'MOOV Money',
      logo: '/images/moov.jpg',
      color: '#1e40af',
      bgColor: '#dbeafe'
    },
    'orange': {
      name: 'ORANGE Money',
      logo: '/images/orange.jpg',
      color: '#ea580c',
      bgColor: '#fed7aa'
    },
    'wave': {
      name: 'WAVE CI',
      logo: '/images/Wave.jpg',
      color: '#0891b2',
      bgColor: '#e0f2fe'
    }
  };

  const currentNetwork = networkConfig[selectedNetwork as keyof typeof networkConfig] || networkConfig.wave;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleContinue = () => {
    if (phoneNumber.trim()) {
      navigate(`/montant?network=${selectedNetwork}&phone=${encodeURIComponent('+225 ' + phoneNumber)}`);
    }
  };

  return (
    <div className="numero-page">
      {/* Header avec bouton retour et titre */}
      <header className="numero-header">
        <div className="header-content">
          <Link to="/network" className="back-button">
            ←
          </Link>
          <h1 className="page-title">Numéro</h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="numero-content">
        <p className="instruction-text">
          Veuillez saisir votre numero {currentNetwork.name.toLowerCase()}
        </p>
        
        {/* Boîte du réseau sélectionné */}
        <div 
          className="selected-network-box"
          style={{ backgroundColor: currentNetwork.bgColor }}
        >
          <div 
            className="network-icon-container"
            style={{ backgroundColor: currentNetwork.color }}
          >
            <img src={currentNetwork.logo} alt={currentNetwork.name} className="network-logo" />
          </div>
          <span className="network-name">{currentNetwork.name}</span>
        </div>

        {/* Champ de saisie du numéro */}
        <div className="input-section">
          <label className="input-label">numéro</label>
          <div className="phone-input-container">
            <span className="country-code">+225</span>
            <input 
              type="tel" 
              className="phone-input"
              placeholder="00 00 00 00 00"
              maxLength={14}
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
      </main>

      {/* Bouton continuer en bas */}
      <div className="continue-section">
        <button className="continue-button" onClick={handleContinue}>
          Continuer
        </button>
      </div>
    </div>
  );
};

export default NumeroPage;
