import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage: React.FC = () => {
  const handlePayment = () => {
    // Simuler le processus de paiement
    setTimeout(() => {
      window.location.href = '/success';
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-header">
          <h1>Confirmation du paiement</h1>
          <p>Vérifiez les détails de votre don avant de procéder au paiement</p>
        </div>

        <div className="payment-summary">
          <div className="summary-card">
            <h2>Résumé du don</h2>
            <div className="summary-details">
              <div className="detail-row">
                <span>Réseau mobile:</span>
                <span>MTN</span>
              </div>
              <div className="detail-row">
                <span>Numéro:</span>
                <span>+225 07 12 34 56 78</span>
              </div>
              <div className="detail-row">
                <span>Montant:</span>
                <span className="amount">5 000 FCFA</span>
              </div>
              <div className="detail-row total">
                <span>Total à payer:</span>
                <span className="total-amount">5 000 FCFA</span>
              </div>
            </div>
          </div>

          <div className="payment-methods">
            <h2>Méthodes de paiement</h2>
            <div className="method-cards">
              <div className="method-card selected">
                <div className="method-logo">📱</div>
                <div className="method-info">
                  <h3>Mobile Money</h3>
                  <p>Paiement via votre compte mobile</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-actions">
          <Link to="/donation" className="btn btn-secondary">
            Retour
          </Link>
          <button onClick={handlePayment} className="btn btn-primary btn-large">
            Confirmer le paiement
          </button>
        </div>

        <div className="security-info">
          <div className="security-badge">
            <span className="security-icon">🔒</span>
            <span>Paiement sécurisé</span>
          </div>
          <p>Vos informations sont protégées et chiffrées</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
