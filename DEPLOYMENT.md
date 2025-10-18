# 🚀 Guide de Déploiement Dokploy - Dons Frontend

Ce guide vous explique comment déployer l'application React Dons-frontend avec Dokploy.

## 📋 Prérequis

- Docker installé sur votre serveur
- Docker Compose installé
- Accès SSH au serveur
- Repository GitHub configuré

## 🛠️ Installation de Dokploy

### 1. Installation sur le serveur

```bash
# Télécharger et installer Dokploy
curl -sSL https://dokploy.com/install.sh | sh

# Ou avec Docker
docker run -d --name dokploy \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v dokploy-data:/app/data \
  dokploy/dokploy:latest
```

### 2. Configuration initiale

1. Accédez à `http://votre-serveur:3000`
2. Créez un compte administrateur
3. Configurez votre serveur

## 🚀 Déploiement de l'application

### Méthode 1: Déploiement automatique avec GitHub

1. **Connecter GitHub à Dokploy**
   - Dans l'interface Dokploy, allez dans "Settings" > "Git Providers"
   - Connectez votre compte GitHub
   - Autorisez l'accès au repository

2. **Créer un nouveau projet**
   - Cliquez sur "New Project"
   - Nom: `dons-frontend`
   - Type: `Docker Compose`
   - Repository: `votre-username/dons-frontend`

3. **Configuration du déploiement**
   - Branch: `main` (ou votre branche principale)
   - Docker Compose File: `docker-compose.yml`
   - Build Context: `.`

4. **Variables d'environnement**
   ```
   REACT_APP_API_URL=http://localhost:8001
   REACT_APP_BARAPAY_CLIENT_ID=wjb7lzQVialbcwMNTPD1IojrRzPIIl
   NODE_ENV=production
   ```

5. **Déployer**
   - Cliquez sur "Deploy"
   - Dokploy va automatiquement:
     - Cloner le repository
     - Construire l'image Docker
     - Démarrer les conteneurs

### Méthode 2: Déploiement manuel

1. **Cloner le repository sur le serveur**
   ```bash
   git clone https://github.com/votre-username/dons-frontend.git
   cd dons-frontend
   ```

2. **Exécuter le script de déploiement**
   ```bash
   # Rendre le script exécutable
   chmod +x deploy-dokploy.sh
   
   # Déployer
   ./deploy-dokploy.sh
   ```

3. **Vérifier le déploiement**
   ```bash
   # Vérifier les conteneurs
   docker ps
   
   # Vérifier les logs
   docker logs dons-frontend
   
   # Tester l'application
   curl http://localhost:3000
   ```

## 🔧 Configuration avancée

### Variables d'environnement

Créez un fichier `.env` dans votre repository:

```env
# API Backend
REACT_APP_API_URL=http://localhost:8001

# Barapay Configuration
REACT_APP_BARAPAY_CLIENT_ID=wjb7lzQVialbcwMNTPD1IojrRzPIIl

# Production
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

### Configuration du domaine

Pour utiliser un domaine personnalisé:

1. **Modifier docker-compose.yml**
   ```yaml
   labels:
     - "traefik.enable=true"
     - "traefik.http.routers.dons-frontend.rule=Host(`votre-domaine.com`)"
     - "traefik.http.routers.dons-frontend.entrypoints=websecure"
     - "traefik.http.routers.dons-frontend.tls.certresolver=letsencrypt"
   ```

2. **Configurer le DNS**
   - Pointer votre domaine vers l'IP du serveur
   - Attendre la propagation DNS

### SSL/HTTPS

Dokploy peut automatiquement configurer SSL avec Let's Encrypt:

1. Dans l'interface Dokploy
2. Allez dans "Settings" > "SSL"
3. Activez "Auto SSL"
4. Ajoutez votre domaine

## 📊 Monitoring et Logs

### Voir les logs
```bash
# Logs du conteneur
docker logs dons-frontend

# Logs en temps réel
docker logs -f dons-frontend

# Logs Nginx
docker exec dons-frontend tail -f /var/log/nginx/access.log
```

### Monitoring avec Dokploy
- Accédez à l'interface Dokploy
- Allez dans votre projet
- Consultez les métriques et logs

## 🔄 Mise à jour

### Mise à jour automatique
1. Poussez vos changements sur GitHub
2. Dokploy détectera automatiquement les changements
3. Redéploiera automatiquement l'application

### Mise à jour manuelle
```bash
# Arrêter l'application
docker-compose down

# Mettre à jour le code
git pull

# Redéployer
./deploy-dokploy.sh
```

## 🛠️ Commandes utiles

### Gestion des conteneurs
```bash
# Voir tous les conteneurs
docker ps -a

# Arrêter l'application
docker-compose down

# Redémarrer l'application
docker-compose restart

# Supprimer tout
docker-compose down -v
```

### Debugging
```bash
# Entrer dans le conteneur
docker exec -it dons-frontend sh

# Vérifier la configuration Nginx
docker exec dons-frontend nginx -t

# Tester la connectivité
curl -I http://localhost:3000
```

## 🚨 Dépannage

### Problèmes courants

1. **Application non accessible**
   - Vérifiez que le port 3000 est ouvert
   - Vérifiez les logs: `docker logs dons-frontend`
   - Vérifiez la configuration Nginx

2. **Erreur de build**
   - Vérifiez que tous les fichiers sont présents
   - Vérifiez les permissions des fichiers
   - Vérifiez la configuration Docker

3. **Problèmes de réseau**
   - Vérifiez la configuration du réseau Docker
   - Vérifiez les variables d'environnement
   - Vérifiez la connectivité avec l'API backend

### Logs d'erreur
```bash
# Logs détaillés
docker logs dons-frontend 2>&1 | grep -i error

# Logs Nginx
docker exec dons-frontend cat /var/log/nginx/error.log
```

## 📞 Support

En cas de problème:
1. Vérifiez les logs
2. Consultez la documentation Dokploy
3. Vérifiez la configuration Docker
4. Contactez l'équipe de développement

## 🎉 Félicitations!

Votre application Dons-frontend est maintenant déployée avec Dokploy!

- **URL**: http://votre-serveur:3000
- **Interface Dokploy**: http://votre-serveur:3000 (port par défaut)
- **Logs**: Accessibles via l'interface Dokploy
