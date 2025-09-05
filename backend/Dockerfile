# Dockerfile para Backend Node.js + TypeScript
FROM node:18-alpine

# Instalar wget para healthcheck
RUN apk add --no-cache wget

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
