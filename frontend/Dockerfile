FROM node:9.2-alpine

WORKDIR /opt/app
EXPOSE 4200

COPY . .

RUN yarn

CMD yarn build --prod