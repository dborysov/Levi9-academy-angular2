FROM node:7.8-alpine

WORKDIR /opt/app
EXPOSE 4200

COPY . /opt/app

RUN yarn

CMD yarn build -- --prod