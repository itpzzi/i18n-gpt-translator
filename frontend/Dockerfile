# Usar uma imagem oficial do Node.js (versão menor) como base
FROM node:20.17.0-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências e instalar antes de copiar o restante do código
COPY package*.json ./
RUN npm install --force && npm cache clean --force

# Copiar o código da aplicação
COPY . .

# Expor a porta onde o frontend será executado
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento (com hot-reloading)
CMD ["npm", "start"]
