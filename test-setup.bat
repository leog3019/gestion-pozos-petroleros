@echo off
echo 🔍 Script de Verificación - Sistema de Gestión de Pozos
echo ============================================================
echo.

echo 📋 1. Verificando Docker...
docker --version
if %errorlevel% neq 0 (
    echo ❌ Docker no está disponible
    goto :manual_setup
)

echo.
echo 🐳 2. Verificando Docker Compose...
docker compose version
if %errorlevel% neq 0 (
    echo ❌ Docker Compose no está disponible
    goto :manual_setup
)

echo.
echo 🛑 3. Limpiando contenedores previos...
docker compose down -v 2>nul

echo.
echo 🔧 4. Construyendo imágenes...
docker compose build --no-cache

echo.
echo 🚀 5. Iniciando servicios...
docker compose up -d

echo.
echo ⏳ 6. Esperando que los servicios se inicien...
timeout /t 30 /nobreak

echo.
echo 📊 7. Verificando estado de servicios...
docker compose ps

echo.
echo 🌐 8. URLs de la aplicación:
echo    Frontend: http://localhost
echo    Backend API: http://localhost:3000
echo    Base de datos: localhost:5432
echo.
echo 📝 Para ver logs: docker compose logs -f
echo 🛑 Para detener: docker compose down
echo.
goto :end

:manual_setup
echo.
echo 🔄 CONFIGURACIÓN MANUAL (sin Docker):
echo =====================================
echo.
echo 1. 💾 Instalar PostgreSQL:
echo    - Descargar desde https://www.postgresql.org/download/
echo    - Crear base de datos 'gestion_pozos'
echo    - Ejecutar script: database/init.sql
echo.
echo 2. 🚀 Iniciar Backend:
echo    cd backend
echo    npm install
echo    npm run dev
echo.
echo 3. 🎨 Iniciar Frontend:
echo    cd frontend/gestion-pozos
echo    npm install
echo    ng serve
echo.
echo URLs sin Docker:
echo - Frontend: http://localhost:4200
echo - Backend: http://localhost:3000

:end
pause
