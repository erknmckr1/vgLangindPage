FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Linux dosya sistemi değişikliklerini algılayabilsin diye
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000

CMD ["npm", "run", "dev"]
