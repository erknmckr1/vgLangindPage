FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
# Dev dependencies dahil
RUN npm install --save-dev ts-node-dev
COPY . .
EXPOSE 3002
CMD ["npm", "run", "start:dev"]