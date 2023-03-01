# Define a imagem base
FROM node:14-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos para o diretório de trabalho
COPY . .

# Executa o comando para construir o aplicativo
RUN npm run build

# Define o comando padrão a ser executado quando o contêiner for iniciado
CMD ["npm", "start"]
