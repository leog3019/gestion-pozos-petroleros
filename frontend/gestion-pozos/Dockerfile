# Multi-stage build para Frontend Angular
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Build de producción
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine

# Copiar archivos build al directorio de nginx
COPY --from=build /app/dist/gestion-pozos /usr/share/nginx/html

# Copiar configuración nginx personalizada
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto de nginx
CMD ["nginx", "-g", "daemon off;"]
