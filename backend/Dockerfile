FROM node:9.2-alpine

WORKDIR /opt/app
EXPOSE 7778

COPY . .

RUN yarn

CMD node server.js
