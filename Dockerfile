FROM node:16

WORKDIR /home/node/server

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npx prisma generate

COPY . .

CMD [ "npm", "run", "server"]