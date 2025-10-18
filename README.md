# 🎨 DONS Frontend React

Application React pour le système de dons avec intégration Barapay.

## 📋 Vue d'ensemble

Ce repository contient l'application frontend React qui permet aux utilisateurs de :
- Faire des dons via différents réseaux (MTN, MOOV, ORANGE, WAVE)
- Gérer leurs paiements via Barapay
- Voir l'historique des transactions
- Naviguer dans l'interface utilisateur

## 🔧 Configuration

### Prérequis
- Node.js 16+
- npm ou yarn
- Backend API (port 8001)

### Variables d'environnement
```bash
# API Backend
REACT_APP_API_URL=http://localhost:8001

# Barapay (optionnel)
REACT_APP_BARAPAY_CLIENT_ID=wjb7lzQVialbcwMNTPD1IojrRzPIIl
```

## 🚀 Installation

### 1. Cloner le repository
```bash
git clone <repository-url>
cd dons-frontend
```

### 2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

### 3. Démarrer l'application
```bash
# Développement
npm start

# Production
npm run build
```

## 📁 Structure du projet

```
frontend/
├── public/
│   ├── images/           # Images des réseaux
│   └── index.html
├── src/
│   ├── components/      # Composants réutilisables
│   ├── pages/           # Pages de l'application
│   │   ├── HomePage.tsx
│   │   ├── NetworkPage.tsx
│   │   ├── NumeroPage.tsx
│   │   ├── MontantPage.tsx
│   │   ├── PaymentSuccessPage.tsx
│   │   └── PaymentCancelPage.tsx
│   ├── utils/           # Utilitaires
│   └── App.tsx          # Composant principal
├── package.json
└── README.md
```

## 🎯 Pages principales

### HomePage
Page d'accueil avec présentation du système de dons.

### NetworkPage
Sélection du réseau de paiement (MTN, MOOV, ORANGE, WAVE).

### NumeroPage
Saisie du numéro de téléphone avec validation.

### MontantPage
Saisie du montant et génération du lien de paiement Barapay.

### PaymentSuccessPage
Page de confirmation après paiement réussi.

### PaymentCancelPage
Page d'annulation avec options de retry.

## 🔌 Intégration API

### Endpoint principal
```typescript
// POST http://localhost:8001/api_barapay_authentic.php
const paymentData = {
  amount: 5000,
  phone_number: '+225 05 05 97 98 84',
  network: 'wave'
};

const response = await fetch('http://localhost:8001/api_barapay_authentic.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(paymentData)
});
```

### Gestion des réponses
```typescript
if (result.success && result.checkout_url) {
  // Redirection vers Barapay
  window.location.href = result.checkout_url;
} else {
  // Gestion des erreurs
  alert('Erreur: ' + result.message);
}
```

## 🎨 Design et UX

### Thème
- Couleurs principales : Bleu (#007bff), Vert (#28a745), Rouge (#dc3545)
- Design responsive avec mobile-first
- Animations CSS pour les interactions

### Composants
- Header avec navigation
- Boutons avec états (hover, active, disabled)
- Formulaires avec validation
- Modales pour les confirmations

## 📱 Responsive Design

### Breakpoints
- Mobile : < 768px
- Tablet : 768px - 1024px
- Desktop : > 1024px

### Adaptations
- Navigation mobile avec menu hamburger
- Formulaires adaptés aux écrans tactiles
- Images optimisées pour différents DPI

## 🧪 Tests

### Tests unitaires
```bash
npm test
```

### Tests d'intégration
```bash
npm run test:integration
```

### Tests E2E
```bash
npm run test:e2e
```

## 🚀 Déploiement

### Développement
```bash
npm start
# Ouvre http://localhost:3000
```

### Production
```bash
npm run build
# Génère le dossier build/ pour le déploiement
```

### Variables d'environnement
```bash
# .env.production
REACT_APP_API_URL=https://api.dons.com
REACT_APP_BARAPAY_CLIENT_ID=your_client_id
```

## 📊 Analytics

### Google Analytics (optionnel)
```typescript
// Événements de paiement
gtag('event', 'purchase', {
  transaction_id: transactionId,
  value: amount,
  currency: 'XOF'
});

// Événements d'annulation
gtag('event', 'payment_cancelled', {
  order_no: orderNo,
  reason: reason
});
```

## 🔐 Sécurité

### Validation des données
- Validation côté client et serveur
- Sanitisation des entrées utilisateur
- Protection contre XSS

### HTTPS
- Redirection automatique vers HTTPS en production
- Cookies sécurisés
- Headers de sécurité

## 🆘 Dépannage

### Erreurs courantes

#### "Network Error"
- Vérifier que le backend est démarré sur le port 8001
- Vérifier la configuration CORS

#### "Module not found"
- Exécuter `npm install`
- Vérifier les imports dans les fichiers

#### "Build failed"
- Vérifier la syntaxe TypeScript
- Vérifier les dépendances

### Support
- 📧 Email: support@dons.com
- 📚 Documentation: [reactjs.org](https://reactjs.org)

## 📈 Évolutions futures

### Fonctionnalités prévues
- [ ] PWA (Progressive Web App)
- [ ] Mode hors ligne
- [ ] Notifications push
- [ ] Dark mode
- [ ] Internationalisation (i18n)

### Améliorations techniques
- [ ] Tests automatisés
- [ ] CI/CD
- [ ] Monitoring des performances
- [ ] Optimisation des images

---

**Version:** 1.0.0  
**Dernière mise à jour:** 2025-01-18  
**Auteur:** Équipe DONS  
**Licence:** MIT