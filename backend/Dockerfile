FROM node:7.8-alpine

WORKDIR /opt/app
EXPOSE 7778

COPY . /opt/app

RUN yarn

CMD node server.js
