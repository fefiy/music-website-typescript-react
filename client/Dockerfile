FROM node:17-alpine

WORKDIR /app

COPY package*.json .
COPY vite.config.ts .

RUN npm install

COPY . .

EXPOSE 3500

CMD ["npm", "run", "dev"]
