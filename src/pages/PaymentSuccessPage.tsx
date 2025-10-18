import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [paymentData, setPaymentData] = useState({
    orderNo: searchParams.get('orderNo') || '',
    transactionId: searchParams.get('transactionId') || '',
    amount: searchParams.get('amount') || '',
    currency: searchParams.get('currency') || 'XOF',
    network: searchParams.get('network') || '',
    phoneNumber: searchParams.get('phone') || ''
  });

  useEffect(() => {
    // Log du succès pour analytics
    console.log('Paiement réussi:', paymentData);
    
    // Optionnel: Envoyer des données à votre système d'analytics
    // gtag('event', 'purchase', {
    //   transaction_id: paymentData.transactionId,
    //   value: parseFloat(paymentData.amount) / 100,
    //   currency: paymentData.currency
    // });
  }, [paymentData]);

  const formatAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('fr-FR').format(numAmount);
  };

  return (
    <div className="payment-success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1 className="success-title">Paiement Réussi !</h1>
        <p className="success-message">
          Votre paiement a été traité avec succès. Merci pour votre générosité !
        </p>
        
        {paymentData.orderNo && (
          <div className="payment-details">
            <h3>Détails du Paiement</h3>
            
            {paymentData.orderNo && (
              <div className="detail-row">
                <span className="detail-label">Numéro de commande:</span>
                <span className="detail-value">{paymentData.orderNo}</span>
              </div>
            )}
            
            {paymentData.transactionId && (
              <div className="detail-row">
                <span className="detail-label">ID de transaction:</span>
                <span className="detail-value">{paymentData.transactionId}</span>
              </div>
            )}
            
            {paymentData.amount && (
              <div className="detail-row">
                <span className="detail-label">Montant:</span>
                <span className="detail-value">
                  {formatAmount(paymentData.amount)} {paymentData.currency}
                </span>
              </div>
            )}
            
            {paymentData.network && (
              <div className="detail-row">
                <span className="detail-label">Réseau:</span>
                <span className="detail-value">{paymentData.network.toUpperCase()}</span>
              </div>
            )}
            
            {paymentData.phoneNumber && (
              <div className="detail-row">
                <span className="detail-label">Numéro:</span>
                <span className="detail-value">{paymentData.phoneNumber}</span>
              </div>
            )}
            
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{new Date().toLocaleString('fr-FR')}</span>
            </div>
          </div>
        )}
        
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/campaigns" className="btn btn-secondary">
            Voir les campagnes
          </Link>
        </div>
        
        <div className="confirmation-info">
          <p>📧 Vous recevrez un email de confirmation sous peu.</p>
          <p>Si vous avez des questions, contactez notre support client.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;