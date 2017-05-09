FROM node:7.10-alpine

WORKDIR /opt/app
EXPOSE 4200

COPY . /opt/app

RUN yarn

CMD yarn build -- --prod