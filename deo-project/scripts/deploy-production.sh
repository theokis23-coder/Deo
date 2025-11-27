#!/bin/bash

echo "🚀 Déploiement DEO en production..."

# Arrêter les services existants
docker-compose -f docker-compose.production.yml down

# Construire les nouvelles images
docker-compose -f docker-compose.production.yml build

# Démarrer les services
docker-compose -f docker-compose.production.yml up -d

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente du démarrage de PostgreSQL..."
sleep 10

echo "✅ Déploiement réussi!"
echo "🌐 Application disponible sur: http://localhost:4000"
