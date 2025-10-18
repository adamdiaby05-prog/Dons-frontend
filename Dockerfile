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

# Créer le fichier .env.production
RUN echo "REACT_APP_API_URL=http://localhost:8001" > .env.production && \
    echo "REACT_APP_BARAPAY_CLIENT_ID=wjb7lzQVialbcwMNTPD1IojrRzPIIl" >> .env.production && \
    echo "GENERATE_SOURCEMAP=false" >> .env.production

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
