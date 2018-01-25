FROM node:8.8.1

MAINTAINER MTT Team "admin@mttjsc.com"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install source app
COPY build/ /usr/src/app/

# Install dependencies
RUN npm install

EXPOSE 8081
CMD [ "npm", "start" ]
