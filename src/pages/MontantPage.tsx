import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MontantPage.css';

const MontantPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedNetwork = searchParams.get('network') || 'wave';
  const phoneNumber = searchParams.get('phone') || '+225 07 08 09 10 11';
  
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
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Formatage pour accepter seulement les nombres et un point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleValidate = async () => {
    try {
      // Envoyer les données de paiement à l'API backend
      const paymentData = {
        amount: amount,
        phone_number: phoneNumber,
        network: selectedNetwork
      };

      const response = await fetch('http://localhost:8002/api_barapay_authentic_fixed.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (result.success && result.checkout_url) {
        console.log('Lien de paiement généré:', result);
        console.log('Redirection vers Barapay:', result.checkout_url);
        // Redirection automatique vers Barapay
        window.location.href = result.checkout_url;
      } else {
        console.error('Erreur lors de la génération du lien:', result.message);
        alert('Erreur lors de la génération du lien de paiement: ' + result.message);
      }
    } catch (error) {
      console.error('Erreur de connexion à l\'API:', error);
      alert('Erreur de connexion au serveur. Veuillez réessayer.');
    }
  };

  return (
    <div className="montant-page">
      {/* Header avec bouton retour et titre */}
      <header className="montant-header">
        <div className="header-content">
          <Link to="/numero" className="back-button">
            ←
          </Link>
          <h1 className="page-title">Montant</h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="montant-content">
        <p className="instruction-text">
          Veuillez entrer le montant souhaité
        </p>
        
        {/* Boîte du réseau sélectionné avec numéro */}
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
          <span className="phone-number">{phoneNumber}</span>
        </div>

        {/* Champ de saisie du montant */}
        <div className="amount-input-section">
          <div className="amount-input-container">
            {amount === '' && <span className="currency-prefix">0.00</span>}
            <input 
              type="text" 
              className="amount-input"
              value={amount}
              onChange={handleAmountChange}
              placeholder=""
            />
            <span className="currency-suffix">F</span>
          </div>
        </div>
      </main>

      {/* Bouton valider en bas */}
      <div className="validate-section">
        <button className="validate-button" onClick={handleValidate}>
          Valider
        </button>
      </div>
    </div>
  );
};

export default MontantPage;
