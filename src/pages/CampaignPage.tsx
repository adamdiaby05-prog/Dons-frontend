import React from 'react';
import { Link } from 'react-router-dom';
import './CampaignPage.css';

const CampaignPage: React.FC = () => {
  return (
    <div className="campaign-page">
      <div className="container">
        <div className="campaign-header">
          <h1>Présentation du candidat</h1>
        </div>

        <div className="candidate-banner">
          <div className="banner-content">
            <div className="candidate-info">
              <div className="candidate-logo">ADM MELLO</div>
              <h2>DON MELLO</h2>
              <h3>PRÉSIDENT</h3>
              <div className="election-badge">PRÉSIDENTIELLE 2025</div>
              <p className="slogan">SOUVERAINETÉ - ÉGALITÉ - JUSTICE</p>
            </div>
            <div className="candidate-photo">
              <div className="photo-placeholder">
                <span>Photo du candidat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="biography-section">
          <h2>Biographie</h2>
          <p>
            <strong>Ahoua Don Mello</strong>, né le 23 juin 1958 à Bongouanou, 
            est un enseignant-chercheur et homme politique ivoirien. Il dirige 
            le Bureau national d'études techniques et de développement de 2000 à 2011. 
            <strong>Ahoua Don Mello</strong> se déclare candidat à l'élection 
            présidentielle de 2025.
          </p>
        </div>

        <div className="priorities-section">
          <h2>Nos priorités pour la Côte d'Ivoire</h2>
          
          <div className="priority-cards">
            <div className="priority-card education">
              <div className="priority-icon">📚</div>
              <h3>Éducation</h3>
              <p>Améliorer l'accès à une éducation de qualité pour tous les enfants ivoiriens</p>
            </div>
            
            <div className="priority-card health">
              <div className="priority-icon">🏥</div>
              <h3>Santé</h3>
              <p>Renforcer le système de santé et garantir l'accès aux soins pour tous</p>
            </div>
          </div>
        </div>

        <div className="action-section">
          <Link to="/donation" className="btn btn-primary btn-large">
            Faire un don
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
