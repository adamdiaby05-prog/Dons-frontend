// Configuration de l'API
export const API_CONFIG = {
  // URL de base de l'API backend
  BASE_URL: process.env.REACT_APP_API_URL || 'https://adm.pront-ix.com',
  
  // Endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    DATABASE: '/database',
    PAYMENTS: '/api/payments',
    CREATE_PAYMENT: '/api/payments'
  },
  
  // Configuration Barapay
  BARAPAY: {
    CLIENT_ID: process.env.REACT_APP_BARAPAY_CLIENT_ID || 'wjb7lzQVialbcwMNTPD1IojrRzPIIl',
    SANDBOX: process.env.REACT_APP_BARAPAY_SANDBOX === 'true' || true
  }
};

// Fonction pour construire l'URL complète
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// URLs complètes
export const API_URLS = {
  HEALTH: buildApiUrl(API_CONFIG.ENDPOINTS.HEALTH),
  DATABASE: buildApiUrl(API_CONFIG.ENDPOINTS.DATABASE),
  PAYMENTS: buildApiUrl(API_CONFIG.ENDPOINTS.PAYMENTS),
  CREATE_PAYMENT: buildApiUrl(API_CONFIG.ENDPOINTS.CREATE_PAYMENT)
};
