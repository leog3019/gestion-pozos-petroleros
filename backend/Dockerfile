# Dockerfile para Backend Node.js + TypeScript
FROM node:20-alpine

# Instalar wget para healthcheck
RUN apk add --no-cache wget

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar TODAS las dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
