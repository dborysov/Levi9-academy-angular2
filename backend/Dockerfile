FROM node:7.10-alpine

WORKDIR /opt/app
EXPOSE 7778

COPY . /opt/app

RUN yarn

CMD node server.js
