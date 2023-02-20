FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd client && npm install && npm run build && cd ..

CMD ["npm", "start"]
