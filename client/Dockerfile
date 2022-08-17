FROM node:16

WORKDIR /home/node/client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD [ "npm", "start"]