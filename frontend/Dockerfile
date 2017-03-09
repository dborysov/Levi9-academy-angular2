FROM node:7.7-alpine

WORKDIR /opt/app
EXPOSE 4200

ADD . /opt/app

RUN yarn

CMD yarn start -- --host 0.0.0.0
