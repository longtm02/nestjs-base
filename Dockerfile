FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install rimraf -g
RUN npm install
RUN npm i bcrypt

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]