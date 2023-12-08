# Use uma imagem base do Node.js com a versão desejada
FROM node:latest

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Execute o comando npm install para instalar as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Execute o comando npm run build para construir o projeto Next.js
RUN npm run build

# Exponha a porta 3000 (ou a porta que você configurou no seu projeto Next.js)
EXPOSE 3000

# Execute o comando npm start para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "start"]
