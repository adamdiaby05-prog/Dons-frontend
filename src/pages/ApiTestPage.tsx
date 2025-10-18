import React, { useState } from 'react';
import { usePayments, useApiHealth } from '../hooks/useApi';
import { CreatePaymentRequest } from '../services/api';
import './ApiTestPage.css';

const ApiTestPage: React.FC = () => {
  const { payments, loading, error, createPayment } = usePayments();
  const { healthStatus, databaseStatus, checkHealth, checkDatabase } = useApiHealth();
  const [newPayment, setNewPayment] = useState<CreatePaymentRequest>({
    amount: 0,
    currency: 'XOF',
    payment_method: 'barapay'
  });

  const handleCreatePayment = async () => {
    if (newPayment.amount > 0) {
      await createPayment(newPayment);
      setNewPayment({
        amount: 0,
        currency: 'XOF',
        payment_method: 'barapay'
      });
    }
  };

  return (
    <div className="api-test-page">
      <div className="container">
        <h1>🧪 Test API Backend DONS</h1>
        
        {/* Status de l'API */}
        <div className="status-section">
          <h2>📊 Status de l'API</h2>
          <div className="status-grid">
            <div className="status-card">
              <h3>🏥 Health Check</h3>
              {healthStatus ? (
                <div className="status-success">
                  <p>✅ {healthStatus.status}</p>
                  <p>🕒 {healthStatus.timestamp}</p>
                </div>
              ) : (
                <p>⏳ Chargement...</p>
              )}
              <button onClick={checkHealth}>🔄 Rafraîchir</button>
            </div>

            <div className="status-card">
              <h3>🗄️ Base de données</h3>
              {databaseStatus ? (
                <div className="status-success">
                  <p>✅ {databaseStatus.status}</p>
                  <p>📊 Tables: {databaseStatus.tables_created}</p>
                  <p>🏠 Host: {databaseStatus.host}</p>
                </div>
              ) : (
                <p>⏳ Chargement...</p>
              )}
              <button onClick={checkDatabase}>🔄 Rafraîchir</button>
            </div>
          </div>
        </div>

        {/* Créer un nouveau paiement */}
        <div className="create-payment-section">
          <h2>💳 Créer un nouveau paiement</h2>
          <div className="payment-form">
            <div className="form-group">
              <label>Montant (XOF):</label>
              <input
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({
                  ...newPayment,
                  amount: parseFloat(e.target.value) || 0
                })}
                placeholder="Ex: 5000"
              />
            </div>
            
            <div className="form-group">
              <label>Devise:</label>
              <select
                value={newPayment.currency}
                onChange={(e) => setNewPayment({
                  ...newPayment,
                  currency: e.target.value
                })}
              >
                <option value="XOF">XOF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div className="form-group">
              <label>Méthode de paiement:</label>
              <select
                value={newPayment.payment_method}
                onChange={(e) => setNewPayment({
                  ...newPayment,
                  payment_method: e.target.value
                })}
              >
                <option value="barapay">Barapay</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="bank_transfer">Virement bancaire</option>
              </select>
            </div>

            <button 
              onClick={handleCreatePayment}
              disabled={newPayment.amount <= 0 || loading}
              className="create-button"
            >
              {loading ? '⏳ Création...' : '💳 Créer le paiement'}
            </button>
          </div>
        </div>

        {/* Liste des paiements */}
        <div className="payments-section">
          <h2>📋 Liste des paiements</h2>
          {error && (
            <div className="error-message">
              ❌ Erreur: {error}
            </div>
          )}
          
          {loading ? (
            <p>⏳ Chargement des paiements...</p>
          ) : (
            <div className="payments-list">
              {payments.length === 0 ? (
                <p>Aucun paiement trouvé</p>
              ) : (
                payments.map((payment) => (
                  <div key={payment.id} className="payment-card">
                    <div className="payment-info">
                      <h3>Paiement #{payment.id}</h3>
                      <p><strong>Montant:</strong> {payment.amount} {payment.currency}</p>
                      <p><strong>Méthode:</strong> {payment.payment_method}</p>
                      <p><strong>Statut:</strong> 
                        <span className={`status ${payment.status}`}>
                          {payment.status}
                        </span>
                      </p>
                      <p><strong>Date:</strong> {new Date(payment.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;
