import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DonationPage.css';

const DonationPage: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const networks = [
    { id: 'mtn', name: 'MTN', logo: '📱' },
    { id: 'orange', name: 'Orange', logo: '🍊' },
    { id: 'moov', name: 'Moov', logo: '📶' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNetwork && phoneNumber && amount) {
      // Rediriger vers la page de paiement
      window.location.href = '/payment';
    }
  };

  return (
    <div className="donation-page">
      <div className="container">
        <div className="donation-header">
          <h1>Faire un don</h1>
          <p>Soutenez la campagne présidentielle d'Ahoua Don Mello</p>
        </div>

        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-section">
            <h2>1. Choisir votre réseau mobile</h2>
            <div className="network-selection">
              {networks.map((network) => (
                <div
                  key={network.id}
                  className={`network-card ${selectedNetwork === network.id ? 'selected' : ''}`}
                  onClick={() => setSelectedNetwork(network.id)}
                >
                  <div className="network-logo">{network.logo}</div>
                  <span>{network.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>2. Numéro de téléphone</h2>
            <input
              type="tel"
              placeholder="Entrez votre numéro de téléphone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-section">
            <h2>3. Montant du don</h2>
            <div className="amount-selection">
              <div className="amount-options">
                <button
                  type="button"
                  className={`amount-btn ${amount === '1000' ? 'selected' : ''}`}
                  onClick={() => setAmount('1000')}
                >
                  1 000 FCFA
                </button>
                <button
                  type="button"
                  className={`amount-btn ${amount === '2000' ? 'selected' : ''}`}
                  onClick={() => setAmount('2000')}
                >
                  2 000 FCFA
                </button>
                <button
                  type="button"
                  className={`amount-btn ${amount === '5000' ? 'selected' : ''}`}
                  onClick={() => setAmount('5000')}
                >
                  5 000 FCFA
                </button>
                <button
                  type="button"
                  className={`amount-btn ${amount === '10000' ? 'selected' : ''}`}
                  onClick={() => setAmount('10000')}
                >
                  10 000 FCFA
                </button>
              </div>
              <input
                type="number"
                placeholder="Montant personnalisé"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                min="100"
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-secondary">
              Annuler
            </Link>
            <button type="submit" className="btn btn-primary">
              Continuer vers le paiement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;
