#!/bin/bash

# 🚀 Script de déploiement Dokploy pour Dons-frontend
# Ce script déploie l'application React avec Dokploy

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement Dokploy du Frontend DONS..."

# Configuration
PROJECT_NAME="dons-frontend"
DOCKER_IMAGE="dons-frontend:latest"
CONTAINER_NAME="dons-frontend"
PORT="3000"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Vérifier les prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        error "Docker n'est pas installé"
    fi
    
    # Vérifier Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose n'est pas installé"
    fi
    
    # Vérifier que nous sommes dans le bon répertoire
    if [ ! -f "package.json" ]; then
        error "package.json non trouvé. Êtes-vous dans le bon répertoire ?"
    fi
    
    if [ ! -f "Dockerfile" ]; then
        error "Dockerfile non trouvé"
    fi
    
    log "✅ Prérequis vérifiés"
}

# Nettoyer les anciens conteneurs et images
cleanup() {
    log "Nettoyage des anciens conteneurs et images..."
    
    # Arrêter et supprimer le conteneur existant
    if docker ps -a --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        log "Arrêt du conteneur existant..."
        docker stop $CONTAINER_NAME || true
        docker rm $CONTAINER_NAME || true
    fi
    
    # Supprimer l'ancienne image
    if docker images --format "table {{.Repository}}:{{.Tag}}" | grep -q "^${DOCKER_IMAGE}$"; then
        log "Suppression de l'ancienne image..."
        docker rmi $DOCKER_IMAGE || true
    fi
    
    log "✅ Nettoyage terminé"
}

# Construire l'image Docker
build_image() {
    log "Construction de l'image Docker..."
    
    # Construire l'image
    docker build -t $DOCKER_IMAGE .
    
    # Vérifier que l'image a été créée
    if ! docker images --format "table {{.Repository}}:{{.Tag}}" | grep -q "^${DOCKER_IMAGE}$"; then
        error "Échec de la construction de l'image Docker"
    fi
    
    log "✅ Image Docker construite: $DOCKER_IMAGE"
}

# Déployer avec Docker Compose
deploy_with_compose() {
    log "Déploiement avec Docker Compose..."
    
    # Arrêter les services existants
    docker-compose down || true
    
    # Démarrer les services
    docker-compose up -d
    
    # Vérifier que le conteneur est en cours d'exécution
    sleep 5
    if ! docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        error "Le conteneur n'est pas en cours d'exécution"
    fi
    
    log "✅ Déploiement Docker Compose terminé"
}

# Tester le déploiement
test_deployment() {
    log "Test du déploiement..."
    
    # Attendre que le conteneur soit prêt
    sleep 10
    
    # Tester l'application
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT || echo "000")
    
    if [ "$response" = "200" ]; then
        log "✅ Application accessible (code: $response)"
    else
        warning "Application retourne un code inattendu: $response"
        info "Vérifiez les logs avec: docker logs $CONTAINER_NAME"
    fi
    
    # Afficher les informations du conteneur
    info "Informations du conteneur:"
    docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

# Afficher les logs
show_logs() {
    log "Affichage des logs du conteneur..."
    docker logs $CONTAINER_NAME --tail 50
}

# Fonction d'aide
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --cleanup-only    Nettoyer uniquement les anciens conteneurs"
    echo "  --build-only      Construire uniquement l'image Docker"
    echo "  --logs            Afficher les logs du conteneur"
    echo "  --help            Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0                # Déploiement complet"
    echo "  $0 --cleanup-only # Nettoyage uniquement"
    echo "  $0 --logs         # Afficher les logs"
}

# Fonction principale
main() {
    log "🚀 Début du déploiement Dokploy Frontend DONS"
    
    # Traiter les arguments
    case "${1:-}" in
        --cleanup-only)
            check_prerequisites
            cleanup
            log "🎉 Nettoyage terminé!"
            exit 0
            ;;
        --build-only)
            check_prerequisites
            cleanup
            build_image
            log "🎉 Construction terminée!"
            exit 0
            ;;
        --logs)
            show_logs
            exit 0
            ;;
        --help)
            show_help
            exit 0
            ;;
        "")
            # Déploiement complet
            ;;
        *)
            error "Option inconnue: $1. Utilisez --help pour voir les options disponibles."
            ;;
    esac
    
    # Déploiement complet
    check_prerequisites
    cleanup
    build_image
    deploy_with_compose
    test_deployment
    
    log "🎉 Déploiement terminé avec succès!"
    log "🌐 Application disponible sur: http://localhost:$PORT"
    log "📊 Conteneur: $CONTAINER_NAME"
    log "📝 Logs: docker logs $CONTAINER_NAME"
    log "🛑 Arrêt: docker-compose down"
}

# Exécuter le script
main "$@"
