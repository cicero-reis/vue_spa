FROM node:20-alpine

# Instala dependências do sistema
RUN apk add --no-cache bash git

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Expõe porta do Vite
EXPOSE 5173

# Comando para desenvolvimento
CMD ["npm", "run", "dev"]
