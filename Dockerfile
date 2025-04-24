# Usa una imagen oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos
COPY package*.json ./
RUN npm install
COPY . .

# Expone el puerto de NestJS
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "run", "start:dev"]
