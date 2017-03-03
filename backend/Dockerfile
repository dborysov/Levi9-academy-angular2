FROM node:7.7-alpine

WORKDIR /opt/app

# Copy the code
ADD . /opt/app

# Install packages
RUN yarn

EXPOSE 7778

CMD ["node", "server.js"]
