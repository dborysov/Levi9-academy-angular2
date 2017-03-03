FROM node:7.6

WORKDIR /opt/app
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Copy the code
ADD . /opt/app

# Install packages
RUN yarn

EXPOSE 7778

CMD ["node", "server.js"]
