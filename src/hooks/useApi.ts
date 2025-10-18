import { useState, useEffect } from 'react';
import { apiService, Payment, CreatePaymentRequest } from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async <T>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      console.error('API Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleApiCall,
  };
};

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { loading, error, handleApiCall } = useApi();

  const fetchPayments = async () => {
    const result = await handleApiCall(() => apiService.getPayments());
    if (result?.data) {
      setPayments(result.data);
    }
  };

  const createPayment = async (paymentData: CreatePaymentRequest) => {
    const result = await handleApiCall(() => apiService.createPayment(paymentData));
    if (result) {
      // Rafraîchir la liste des paiements
      await fetchPayments();
    }
    return result;
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
  };
};

export const useApiHealth = () => {
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [databaseStatus, setDatabaseStatus] = useState<any>(null);
  const { loading, error, handleApiCall } = useApi();

  const checkHealth = async () => {
    const result = await handleApiCall(() => apiService.checkHealth());
    if (result) {
      setHealthStatus(result);
    }
  };

  const checkDatabase = async () => {
    const result = await handleApiCall(() => apiService.checkDatabase());
    if (result) {
      setDatabaseStatus(result);
    }
  };

  useEffect(() => {
    checkHealth();
    checkDatabase();
  }, []);

  return {
    healthStatus,
    databaseStatus,
    loading,
    error,
    checkHealth,
    checkDatabase,
  };
};
