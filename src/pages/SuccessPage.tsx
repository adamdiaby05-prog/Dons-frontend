import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage: React.FC = () => {
  return (
    <div className="success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <span>✅</span>
          </div>
          
          <h1>Paiement réussi !</h1>
          <p className="success-message">
            Merci pour votre don de <strong>5 000 FCFA</strong> à la campagne 
            présidentielle d'Ahoua Don Mello.
          </p>
          
          <div className="donation-details">
            <h2>Détails du don</h2>
            <div className="detail-card">
              <div className="detail-row">
                <span>Montant:</span>
                <span>5 000 FCFA</span>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <span>{new Date().toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="detail-row">
                <span>Statut:</span>
                <span className="status-success">Confirmé</span>
              </div>
            </div>
          </div>
          
          <div className="thank-you-message">
            <h2>Merci pour votre soutien !</h2>
            <p>
              Votre contribution nous aide à construire une Côte d'Ivoire plus 
              prospère, juste et souveraine. Ensemble, nous pouvons faire la différence.
            </p>
          </div>
          
          <div className="action-buttons">
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
            <Link to="/campaign" className="btn btn-secondary">
              En savoir plus sur la campagne
            </Link>
          </div>
          
          <div className="social-share">
            <p>Partagez votre engagement :</p>
            <div className="share-buttons">
              <button className="share-btn facebook">📘 Facebook</button>
              <button className="share-btn twitter">🐦 Twitter</button>
              <button className="share-btn whatsapp">💬 WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
