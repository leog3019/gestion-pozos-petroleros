#!/bin/bash

# Script para ejecutar el proyecto completo con Docker

echo "🐳 Iniciando Sistema de Gestión de Pozos Petroleros con Docker..."
echo ""

# Detener contenedores si están corriendo
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down

# Construir imágenes
echo "🔧 Construyendo imágenes Docker..."
docker-compose build --no-cache

# Iniciar servicios
echo "🚀 Iniciando servicios..."
docker-compose up -d

echo ""
echo "✅ ¡Proyecto iniciado exitosamente!"
echo ""
echo "📊 URLs disponibles:"
echo "   🌐 Frontend: http://localhost"
echo "   🔌 Backend API: http://localhost:3000"
echo "   💾 PostgreSQL: localhost:5432"
echo ""
echo "📝 Para ver los logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para detener:"
echo "   docker-compose down"
