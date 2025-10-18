import React from 'react';
import { Link } from 'react-router-dom';
import './PresentationPage.css';

const PresentationPage: React.FC = () => {
  return (
    <div className="presentation-page">
      {/* Header avec titre */}
      <header className="presentation-header">
        <h1 className="page-title">Présentation du candidat</h1>
        <div className="header-line"></div>
      </header>

      {/* Contenu principal */}
      <main className="presentation-content">
        {/* Image du candidat */}
        <div className="candidate-image-section">
          <img src="/images/pa.jpg" alt="Ahoua Don Mello" className="candidate-main-image" />
        </div>

        {/* Description du candidat */}
        <div className="candidate-description">
          <p className="description-text">
            <strong>Ahoua Don Mello</strong>, né le 23 juin 1958 à Bongouanou, est un enseignant-chercheur et homme politique ivoirien. Il dirige le Bureau national d'études techniques et de développement de 2000 à 2011. Ahoua Don Mello se déclare candidat à l'élection présidentielle de 2025.
          </p>
        </div>

        {/* Section priorités */}
        <div className="priorities-section">
          <div className="priorities-header">
            <div className="priority-icon">
              <img src="/images/c.png" alt="Priorités" className="priority-icon-image" />
            </div>
            <h3 className="priorities-title">Nos priorités pour la Côte d'Ivoire</h3>
          </div>

          {/* Cartes des priorités */}
          <div className="priorities-grid">
            {/* Carte Éducation */}
            <div className="priority-card education-card">
              <img src="/images/a.png" alt="Éducation" className="priority-image" />
            </div>

            {/* Carte Santé */}
            <div className="priority-card health-card">
              <img src="/images/b.png" alt="Santé" className="priority-image" />
            </div>
          </div>

          {/* Bouton de don */}
          <div className="donation-section">
            <Link to="/network" className="donation-button">
              Faire un don
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PresentationPage;
