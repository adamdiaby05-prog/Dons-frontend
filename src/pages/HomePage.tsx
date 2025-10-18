import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Section Hero avec design de l'image */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              EN MARCHE POUR UNE CÔTE<br />
              D'IVOIRE SOUVERAINE, JUSTE,<br />
              ET FORTE
            </h1>
            <p className="hero-slogan">SOUVERAINETÉ - ÉGALITÉ - JUSTICE</p>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-shapes">
              <div className="candidate-photo">
                <img src="/images/pa.png" alt="Ahoua Don Mello" className="candidate-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vision */}
      <section className="vision-section">
        <ResponsiveContainer>
          <div className="vision-box">
            <h2 className="vision-title">Notre vision pour 2030</h2>
            <p className="vision-text">
              "Une Côte d'Ivoire prospère où chaque citoyen a accès à l'éducation, 
              aux soins de santé et aux opportunités d'emploi. Ensemble, nous 
              bâtirons un pays uni dans sa diversité, fort de ses valeurs et 
              tourné vers l'avenir."
            </p>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Bouton d'action principal */}
              <section className="cta-section">
                <ResponsiveContainer>
                  <Link to="/network" className="btn btn-primary cta-button">
                    Faire un don
                  </Link>
                </ResponsiveContainer>
              </section>
    </div>
  );
};

export default HomePage;
