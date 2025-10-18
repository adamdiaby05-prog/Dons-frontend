# 🚀 Dockerfile pour l'application React Dons-frontend
# Configuration optimisée pour Dokploy

# Étape 1: Build de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production --silent

# Copier le code source
COPY . .

# Utiliser les variables d'environnement de Dokploy
# Les variables REACT_APP_* sont automatiquement injectées par Docker
# Pas besoin de créer un fichier .env.production

# Construire l'application
RUN npm run build

# Étape 2: Serveur de production avec Nginx
FROM nginx:alpine

# Copier les fichiers build depuis l'étape précédente
COPY --from=builder /app/build /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
