FROM node:10.9.0-alpine

WORKDIR /opt/app
EXPOSE 7778

COPY . .

RUN yarn

CMD node server.js
