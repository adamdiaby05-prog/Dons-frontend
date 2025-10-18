import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PaymentCancelPage.css';

const PaymentCancelPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [paymentData, setPaymentData] = useState({
    orderNo: searchParams.get('orderNo') || '',
    reason: searchParams.get('reason') || '',
    network: searchParams.get('network') || '',
    phoneNumber: searchParams.get('phone') || ''
  });

  useEffect(() => {
    // Log de l'annulation pour analytics
    console.log('Paiement annulé:', paymentData);
    
    // Optionnel: Envoyer des données à votre système d'analytics
    // gtag('event', 'payment_cancelled', {
    //   order_no: paymentData.orderNo,
    //   reason: paymentData.reason
    // });
  }, [paymentData]);

  const handleRetryPayment = () => {
    // Rediriger vers la page de montant avec les paramètres précédents
    const params = new URLSearchParams();
    if (paymentData.network) params.set('network', paymentData.network);
    if (paymentData.phoneNumber) params.set('phone', paymentData.phoneNumber);
    
    window.location.href = `/montant?${params.toString()}`;
  };

  return (
    <div className="payment-cancel-page">
      <div className="cancel-container">
        <div className="cancel-icon">❌</div>
        <h1 className="cancel-title">Paiement Annulé</h1>
        <p className="cancel-message">
          Vous avez annulé le processus de paiement. Aucun montant n'a été débité de votre compte.
        </p>
        
        <div className="info-box">
          <h3>ℹ️ Que s'est-il passé ?</h3>
          <p>Le paiement a été annulé avant d'être finalisé. Cela peut arriver si :</p>
          <ul>
            <li>Vous avez fermé la fenêtre de paiement</li>
            <li>Vous avez cliqué sur "Annuler" ou "Retour"</li>
            <li>La session a expiré</li>
            <li>Il y a eu un problème technique</li>
          </ul>
        </div>
        
        {paymentData.orderNo && (
          <div className="info-box">
            <h3>Détails de la commande</h3>
            <div className="detail-row">
              <span className="detail-label">Numéro de commande:</span>
              <span className="detail-value">{paymentData.orderNo}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{new Date().toLocaleString('fr-FR')}</span>
            </div>
            {paymentData.reason && (
              <div className="detail-row">
                <span className="detail-label">Raison:</span>
                <span className="detail-value">{paymentData.reason}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="steps">
          <h3>🔄 Que faire maintenant ?</h3>
          <ol>
            <li><strong>Vérifiez votre commande</strong> - Assurez-vous que tous les détails sont corrects</li>
            <li><strong>Réessayez le paiement</strong> - Cliquez sur "Réessayer le paiement" ci-dessous</li>
            <li><strong>Choisissez une autre méthode</strong> - Essayez une autre méthode de paiement si disponible</li>
            <li><strong>Contactez le support</strong> - Si le problème persiste, contactez notre équipe</li>
          </ol>
        </div>
        
        <div className="action-buttons">
          <button onClick={handleRetryPayment} className="btn btn-danger">
            Réessayer le paiement
          </button>
          <Link to="/" className="btn btn-secondary">
            Retour à l'accueil
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contacter le support
          </Link>
        </div>
        
        <div className="support-info">
          <p><strong>Besoin d'aide ?</strong></p>
          <p>Si vous rencontrez des difficultés, notre équipe support est là pour vous aider.</p>
          <p>📧 Email: support@dons.com | 📞 Téléphone: +225 XX XX XX XX</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;