FROM node:7.6

RUN mkdir -p /opt/app

WORKDIR /opt/app
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Copy the code
ADD . /opt/app

# Install packages
RUN yarn

EXPOSE 4200

CMD [ "yarn", "run", "ng", "--", "serve", "--host", "0.0.0.0"]
