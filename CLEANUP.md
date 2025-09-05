# 🧹 Guía de Limpieza del Proyecto

## Archivos Eliminados en esta Limpieza

### ✅ **Archivos Removidos:**
- `test-setup.bat` - Script de prueba temporal
- `frontend/gestion-pozos/.angular/` - Caché de Angular CLI

### 📝 **Archivos que se Regeneran Automáticamente:**
- `.angular/cache/` - Se regenera con cada build de Angular
- `node_modules/` - Se instala con `npm install`
- `dist/` - Se genera con el build de producción

## 🛠 **Comandos de Limpieza Manual:**

### Limpiar Caché de Angular:
```bash
cd frontend/gestion-pozos
ng cache clean
# o manualmente:
rm -rf .angular
```

### Limpiar node_modules:
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend  
cd frontend/gestion-pozos
rm -rf node_modules
npm install
```

### Limpiar builds:
```bash
# Frontend
cd frontend/gestion-pozos
ng build --clean
rm -rf dist
```

## 📋 **Archivos a NO Eliminar:**

### ⚠️ **Importantes para el proyecto:**
- `docker-compose.yml` - Configuración de Docker
- `Dockerfile` (todos) - Imágenes de Docker
- `nginx.conf` - Configuración de proxy
- `database/init.sql` - Inicialización de BD
- `.gitignore` - Control de versiones
- `package.json` - Dependencias

### 📁 **Carpetas del código fuente:**
- `src/` - Código fuente
- `backend/src/` - API del backend
- `frontend/gestion-pozos/src/` - Aplicación Angular

## 🔄 **Mantenimiento Recomendado:**

### Semanal:
```bash
# Limpiar caché de Angular
ng cache clean

# Actualizar dependencias
npm update
```

### Mensual:
```bash
# Limpiar Docker (imágenes no usadas)
docker system prune -a

# Verificar dependencias vulnerables
npm audit fix
```

## 📊 **Tamaño del Proyecto (sin node_modules):**
- Código fuente: ~2MB
- Docker configs: ~1MB
- Base de datos: ~1MB
- **Total limpio: ~4MB**

---
*Última limpieza: $(Get-Date)*
