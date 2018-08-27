FROM node:10.9.0-alpine

WORKDIR /opt/app
EXPOSE 4200

COPY . .

RUN yarn

CMD yarn build --prod