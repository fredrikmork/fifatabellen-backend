FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js ./

EXPOSE 8081

CMD [ "node", "server.js" ]