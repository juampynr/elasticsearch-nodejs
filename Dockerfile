FROM node:boron

WORKDIR /usr/src/app

COPY app/package.json app/package-lock.json ./

RUN npm install

COPY app .

EXPOSE 8080
CMD [ "npm", "start" ]
