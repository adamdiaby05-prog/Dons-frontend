// Service API pour communiquer avec le backend DONS
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://adm.pront-ix.com';

export interface Payment {
  id: number;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  created_at: string;
}

export interface CreatePaymentRequest {
  amount: number;
  currency?: string;
  payment_method?: string;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Vérifier la santé de l'API
  async checkHealth(): Promise<ApiResponse<any>> {
    return this.request('/health');
  }

  // Vérifier la connexion à la base de données
  async checkDatabase(): Promise<ApiResponse<any>> {
    return this.request('/database');
  }

  // Obtenir tous les paiements
  async getPayments(): Promise<ApiResponse<Payment[]>> {
    return this.request('/api/payments');
  }

  // Obtenir un paiement spécifique
  async getPayment(id: number): Promise<ApiResponse<Payment>> {
    return this.request(`/api/payments/${id}`);
  }

  // Créer un nouveau paiement
  async createPayment(payment: CreatePaymentRequest): Promise<ApiResponse<any>> {
    return this.request('/api/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }

  // Obtenir les informations de l'API
  async getApiInfo(): Promise<ApiResponse<any>> {
    return this.request('/');
  }
}

export const apiService = new ApiService();
export default apiService;
