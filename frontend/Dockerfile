# Usar uma imagem oficial do Node.js como base
FROM node:20.17.0

# Definir o diretório de trabalho
WORKDIR /app

# Instalar as dependências do projeto
COPY package*.json ./
RUN npm cache clean --force && npm install --force

# Copiar o código da aplicação
COPY . .

# Expor a porta onde o frontend será executado
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento (com hot-reloading)
CMD ["npm", "start"]
