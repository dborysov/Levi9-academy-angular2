FROM node:7.7-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

# Copy the code
ADD . /opt/app

# Install packages
RUN yarn

EXPOSE 4200

CMD [ "yarn", "run", "ng", "--", "serve", "--host", "0.0.0.0"]
