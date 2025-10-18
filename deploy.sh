#!/bin/bash

# 🚀 Script de déploiement Frontend DONS
# Ce script déploie l'application React sur un serveur

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement du Frontend DONS..."

# Configuration
FRONTEND_DIR="/var/www/dons-frontend"
NGINX_CONFIG="/etc/nginx/sites-available/dons-frontend"
NGINX_ENABLED="/etc/nginx/sites-enabled/dons-frontend"
NODE_VERSION="18"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERREUR: $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ATTENTION: $1${NC}"
}

# Vérifier les prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js n'est pas installé"
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        error "npm n'est pas installé"
    fi
    
    # Vérifier Nginx
    if ! command -v nginx &> /dev/null; then
        error "Nginx n'est pas installé"
    fi
    
    log "✅ Prérequis vérifiés"
}

# Installer Node.js et npm
install_nodejs() {
    log "Installation de Node.js..."
    
    # Ajouter le repository NodeSource
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    
    # Installer Node.js
    sudo apt install -y nodejs
    
    # Vérifier l'installation
    node_version=$(node --version)
    npm_version=$(npm --version)
    
    log "✅ Node.js $node_version installé"
    log "✅ npm $npm_version installé"
}

# Installer les dépendances
install_dependencies() {
    log "Installation des dépendances..."
    
    # Installer les dépendances npm
    npm install
    
    # Installer les dépendances globales (optionnel)
    # npm install -g pm2
    
    log "✅ Dépendances installées"
}

# Construire l'application
build_app() {
    log "Construction de l'application..."
    
    # Créer le fichier .env.production
    cat > .env.production <<EOF
REACT_APP_API_URL=http://localhost:8001
REACT_APP_BARAPAY_CLIENT_ID=wjb7lzQVialbcwMNTPD1IojrRzPIIl
GENERATE_SOURCEMAP=false
EOF
    
    # Construire l'application
    npm run build
    
    # Vérifier que le build a réussi
    if [ ! -d "build" ]; then
        error "Échec de la construction de l'application"
    fi
    
    log "✅ Application construite"
}

# Configurer Nginx
setup_nginx() {
    log "Configuration de Nginx..."
    
    # Créer la configuration Nginx
    sudo tee $NGINX_CONFIG > /dev/null <<EOF
server {
    listen 80;
    server_name dons.local;
    root $FRONTEND_DIR/build;
    index index.html;

    # Logs
    access_log /var/log/nginx/dons-frontend-access.log;
    error_log /var/log/nginx/dons-frontend-error.log;

    # Gestion des routes React
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache pour les assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Sécurité
    location ~ /\. {
        deny all;
    }

    # Headers de sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
EOF

    # Activer le site
    sudo ln -sf $NGINX_CONFIG $NGINX_ENABLED
    
    # Tester la configuration
    sudo nginx -t
    
    # Redémarrer Nginx
    sudo systemctl restart nginx
    
    log "✅ Nginx configuré"
}

# Déployer l'application
deploy_app() {
    log "Déploiement de l'application..."
    
    # Créer le répertoire
    sudo mkdir -p $FRONTEND_DIR
    
    # Copier les fichiers build
    sudo cp -r build/* $FRONTEND_DIR/
    
    # Définir les permissions
    sudo chown -R www-data:www-data $FRONTEND_DIR
    sudo chmod -R 755 $FRONTEND_DIR
    
    log "✅ Application déployée"
}

# Configurer PM2 (optionnel)
setup_pm2() {
    log "Configuration de PM2..."
    
    # Installer PM2 globalement
    sudo npm install -g pm2
    
    # Créer le fichier de configuration PM2
    cat > ecosystem.config.js <<EOF
module.exports = {
  apps: [{
    name: 'dons-frontend',
    script: 'serve',
    args: '-s build -l 3000',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

    # Démarrer avec PM2
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    
    log "✅ PM2 configuré"
}

# Configurer les services
setup_services() {
    log "Configuration des services..."
    
    # Activer Nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    
    log "✅ Services configurés"
}

# Tester le déploiement
test_deployment() {
    log "Test du déploiement..."
    
    # Attendre que Nginx soit prêt
    sleep 2
    
    # Tester l'application
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
    
    if [ "$response" = "200" ]; then
        log "✅ Application accessible (code: $response)"
    else
        warning "Application retourne un code inattendu: $response"
    fi
    
    # Tester les assets statiques
    if curl -s http://localhost/static/js/ > /dev/null; then
        log "✅ Assets statiques accessibles"
    else
        warning "Assets statiques non accessibles"
    fi
}

# Optimiser les performances
optimize_performance() {
    log "Optimisation des performances..."
    
    # Compresser les fichiers
    sudo apt install -y gzip
    
    # Configurer la compression dans Nginx
    sudo tee -a $NGINX_CONFIG > /dev/null <<EOF

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
EOF

    # Redémarrer Nginx
    sudo systemctl restart nginx
    
    log "✅ Performances optimisées"
}

# Fonction principale
main() {
    log "🚀 Début du déploiement Frontend DONS"
    
    check_prerequisites
    install_nodejs
    install_dependencies
    build_app
    setup_nginx
    deploy_app
    setup_services
    test_deployment
    optimize_performance
    
    log "🎉 Déploiement terminé avec succès!"
    log "🌐 Application disponible sur: http://localhost"
    log "📝 Logs: /var/log/nginx/dons-frontend-*.log"
    log "📊 Build: $FRONTEND_DIR"
}

# Exécuter le script
main "$@"