FROM node:7.7-alpine

WORKDIR /opt/app
EXPOSE 7778

COPY . /opt/app

RUN yarn

CMD node server.js
