FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3007

CMD ["npm", "run", "dev"]
